const canvas = document.querySelector('#phase');
const ctx = canvas.getContext('2d');
const entryInputs = ['a11', 'a12', 'a21', 'a22'].map(id => document.querySelector(`#${id}`));
const fieldInput = document.querySelector('#show-field');
const eigenInput = document.querySelector('#show-eigen');
const eigenNote = document.querySelector('#eigen-note');
const clearButton = document.querySelector('#clear');
const lambda1Value = document.querySelector('#lambda1');
const lambda2Value = document.querySelector('#lambda2');
const traceValue = document.querySelector('#trace');
const detValue = document.querySelector('#det');
const typeValue = document.querySelector('#type');

const A_MAX = 5;          // largest allowed |entry|
const T_MAX = 20;         // solutions are traced on 0 ≤ t ≤ T_MAX
const SPEED = 2.5;        // units of t per real second
const X2_RANGE = 4;       // the panel shows −4 ≤ x2 ≤ 4 (x1 range follows from the aspect ratio)
const FIELD_SPACING = 0.5;
const EPS = 1e-12;
// trajectory colours follow the textbook phase portraits (purple, red, green, orange, blue, gold, pink, teal)
const PALETTE = ['#7b3f9e', '#d12b2b', '#1a8a4a', '#ea8a2a', '#2a7fd1', '#d4a017', '#e0559a', '#1f6f8b'];
const FIELD_COLOR = '#c8102e';
const EIGEN_COLOR = '#1b1b1b';

const state = { A: { a: 1, b: 0, c: 0, d: 1 }, analysis: null, solve: null, curves: [], colorIndex: 0, lastFrame: 0, animating: false };

/* ---------- linear algebra ---------- */
function analyze(A) {
  const { a, b, c, d } = A;
  const tr = a + d, det = a * d - b * c, mu = tr / 2, disc = mu * mu - det; // disc = (tr² − 4 det) / 4
  const N = [a - mu, b, c, d - mu]; // traceless part, N² = disc · I
  let kind, q = 0, w = 0, lambda;
  if (disc > EPS) { kind = 'real'; q = Math.sqrt(disc); lambda = [{ re: mu + q, im: 0 }, { re: mu - q, im: 0 }]; }
  else if (disc < -EPS) { kind = 'complex'; w = Math.sqrt(-disc); lambda = [{ re: mu, im: w }, { re: mu, im: -w }]; }
  else { kind = 'repeated'; lambda = [{ re: mu, im: 0 }, { re: mu, im: 0 }]; }
  const star = kind === 'repeated' && N.every(v => Math.abs(v) < EPS); // A = μI
  let vectors = [];
  if (kind === 'real') vectors = lambda.map(l => eigenvector(A, l.re));
  else if (kind === 'repeated') vectors = star ? [[1, 0], [0, 1]] : [eigenvector(A, mu)];
  return { tr, det, mu, disc, N, kind, q, w, lambda, vectors, star, defective: kind === 'repeated' && !star };
}
function eigenvector(A, l) {
  const { a, b, c, d } = A;
  let v;
  if (Math.abs(b) > EPS) v = [b, l - a];
  else if (Math.abs(c) > EPS) v = [l - d, c];
  else v = Math.abs(l - a) <= Math.abs(l - d) ? [1, 0] : [0, 1];
  const n = Math.hypot(v[0], v[1]); v = [v[0] / n, v[1] / n];
  if (v[0] < -EPS || (Math.abs(v[0]) <= EPS && v[1] < 0)) v = [-v[0], -v[1]];
  return v;
}
// exact solution x(t) = e^{At} x0, using e^{At} = e^{μt}(C(t) I + S(t) N) with
// C, S = cosh, sinh(qt)/q  (real),  cos, sin(ωt)/ω  (complex),  1, t  (repeated)
function makeSolver(an) {
  const { mu, N, kind, q, w } = an;
  return (x0, t) => {
    const e = Math.exp(mu * t);
    let C, S;
    if (kind === 'real') { C = Math.cosh(q * t); S = Math.sinh(q * t) / q; }
    else if (kind === 'complex') { C = Math.cos(w * t); S = Math.sin(w * t) / w; }
    else { C = 1; S = t; }
    const nx = N[0] * x0[0] + N[1] * x0[1], ny = N[2] * x0[0] + N[3] * x0[1];
    return [e * (C * x0[0] + S * nx), e * (C * x0[1] + S * ny)];
  };
}
function velocity(x) { const { a, b, c, d } = state.A; return [a * x[0] + b * x[1], c * x[0] + d * x[1]]; }
function classify(an) {
  const { tr, det, disc, star, defective } = an;
  const stable = tr < -EPS ? ' (asymptotically stable)' : tr > EPS ? ' (unstable)' : '';
  if (Math.abs(det) < EPS) {
    if (an.N.every(v => Math.abs(v) < EPS) && Math.abs(tr) < EPS) return 'point of a plane of equilibria';
    return 'point on a line of equilibria';
  }
  if (det < 0) return 'saddle point';
  if (disc > EPS) return `node${stable}`;
  if (disc < -EPS) return Math.abs(tr) < EPS ? 'center (stable)' : `spiral point${stable}`;
  if (star) return `proper node${stable}`;
  if (defective) return `improper node${stable}`;
  return 'node';
}

/* ---------- formatting ---------- */
function fmt(x) {
  if (!Number.isFinite(x)) return '—';
  let s = (Math.abs(x) < 5e-4 ? 0 : x).toFixed(3).replace(/\.?0+$/, '');
  if (s === '-0') s = '0';
  return s.replace('-', '−');
}
function fmtComplex({ re, im }) {
  if (Math.abs(im) < 5e-4) return fmt(re);
  const mag = Math.abs(im), imText = Math.abs(mag - 1) < 5e-4 ? 'i' : `${fmt(mag)}i`;
  if (Math.abs(re) < 5e-4) return `${im < 0 ? '−' : ''}${imText}`;
  return `${fmt(re)} ${im < 0 ? '−' : '+'} ${imText}`;
}
function updateReadout() {
  const an = state.analysis;
  lambda1Value.textContent = fmtComplex(an.lambda[0]);
  lambda2Value.textContent = fmtComplex(an.lambda[1]);
  traceValue.textContent = fmt(an.tr);
  detValue.textContent = fmt(an.det);
  typeValue.textContent = classify(an);
  let note = '';
  if (an.kind === 'complex') note = 'Complex eigenvalues: there are no real eigenvectors to show.';
  else if (an.star) note = 'A = λI, so every nonzero vector is an eigenvector; the coordinate directions are shown.';
  else if (an.defective) note = 'Repeated eigenvalue with only one eigenvector direction.';
  eigenNote.textContent = note;
  eigenNote.hidden = !(eigenInput.checked && note);
}

/* ---------- matrix input ---------- */
function readEntry(input) {
  let v = Number(input.value);
  if (input.value.trim() === '' || !Number.isFinite(v)) v = 0;
  v = Math.max(-A_MAX, Math.min(A_MAX, v));
  input.value = String(Number(v.toFixed(4)));
  return Number(input.value);
}
function setMatrix() {
  const [a, b, c, d] = entryInputs.map(readEntry);
  state.A = { a, b, c, d };
  state.analysis = analyze(state.A);
  state.solve = makeSolver(state.analysis);
  state.curves = [];
  state.colorIndex = 0;
  updateReadout();
  draw();
}

/* ---------- geometry ---------- */
function geometry() {
  const w = canvas.clientWidth, h = canvas.clientHeight, ppu = h / (2 * X2_RANGE);
  return { w, h, ppu, cx: w / 2, cy: h / 2, x1Range: w / (2 * ppu), x2Range: X2_RANGE };
}
function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = canvas.clientWidth, height = Math.max(380, Math.min(600, Math.round(width * .66)));
  canvas.width = width * ratio; canvas.height = height * ratio; canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  draw();
}
function toPlane(event) {
  const rect = canvas.getBoundingClientRect(), g = geometry();
  return [(event.clientX - rect.left - g.cx) / g.ppu, (g.cy - (event.clientY - rect.top)) / g.ppu];
}

/* ---------- solution curves ---------- */
function addCurve(x0) {
  const color = PALETTE[state.colorIndex++ % PALETTE.length];
  state.curves.push({ x0, t: 0, pts: [x0], head: x0, color, done: false, exited: false });
  if (!state.animating) { state.animating = true; state.lastFrame = 0; requestAnimationFrame(frame); }
}
function advance(curve, dT) {
  const g = geometry(), target = Math.min(curve.t + dT, T_MAX);
  while (curve.t < target) {
    const v = velocity(curve.head), speed = Math.hypot(v[0], v[1]) * g.ppu; // pixels per unit time
    let dt = Math.max(1e-4, Math.min(.02, 1.2 / (speed + 1e-9)));
    dt = Math.min(dt, target - curve.t);
    curve.t += dt;
    const x = state.solve(curve.x0, curve.t);
    curve.head = x;
    const last = curve.pts[curve.pts.length - 1];
    if (Math.hypot(x[0] - last[0], x[1] - last[1]) * g.ppu >= .5) curve.pts.push(x);
    if (Math.abs(x[0]) > g.x1Range + .3 || Math.abs(x[1]) > g.x2Range + .3) { curve.done = true; curve.exited = true; break; }
    if (Math.hypot(x[0], x[1]) * g.ppu < .05 && curve.t > .5) { curve.done = true; break; } // settled onto the origin
  }
  if (curve.t >= T_MAX) curve.done = true;
  if (curve.done && curve.pts[curve.pts.length - 1] !== curve.head) curve.pts.push(curve.head);
}
function frame(ts) {
  const dtReal = state.lastFrame ? Math.min((ts - state.lastFrame) / 1000, .05) : 0;
  state.lastFrame = ts;
  let active = false;
  for (const curve of state.curves) if (!curve.done) { advance(curve, dtReal * SPEED); if (!curve.done) active = true; }
  draw();
  if (active) requestAnimationFrame(frame); else { state.animating = false; state.lastFrame = 0; }
}

/* ---------- drawing ---------- */
function arrowHead(x, y, angle, len, color) {
  const wid = len * .55;
  ctx.save(); ctx.translate(x, y); ctx.rotate(angle);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-len, wid); ctx.lineTo(-len * .7, 0); ctx.lineTo(-len, -wid); ctx.closePath();
  ctx.fillStyle = color; ctx.fill(); ctx.restore();
}
function drawAxes(g) {
  const { w, h, cx, cy, ppu, x1Range, x2Range } = g, sx = x => cx + x * ppu, sy = y => cy - y * ppu;
  ctx.strokeStyle = '#e3ebe8'; ctx.lineWidth = 1;
  for (let i = -Math.floor(x1Range); i <= Math.floor(x1Range); i++) { ctx.beginPath(); ctx.moveTo(sx(i), 0); ctx.lineTo(sx(i), h); ctx.stroke(); }
  for (let j = -x2Range; j <= x2Range; j++) { ctx.beginPath(); ctx.moveTo(0, sy(j)); ctx.lineTo(w, sy(j)); ctx.stroke(); }
  ctx.strokeStyle = '#4a5a56'; ctx.lineWidth = 1.3;
  ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.moveTo(cx, h); ctx.lineTo(cx, 0); ctx.stroke();
  arrowHead(w - 1, cy, 0, 9, '#4a5a56'); arrowHead(cx, 1, -Math.PI / 2, 9, '#4a5a56');
  ctx.fillStyle = '#4a5a56'; ctx.font = '11px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  for (let i = -Math.floor(x1Range); i <= Math.floor(x1Range); i++) {
    if (i === 0) continue;
    ctx.beginPath(); ctx.moveTo(sx(i), cy - 4); ctx.lineTo(sx(i), cy + 4); ctx.stroke();
    ctx.fillText(String(i).replace('-', '−'), sx(i), cy + 7);
  }
  ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
  for (let j = -x2Range; j <= x2Range; j++) {
    if (j === 0) continue;
    ctx.beginPath(); ctx.moveTo(cx - 4, sy(j)); ctx.lineTo(cx + 4, sy(j)); ctx.stroke();
    ctx.fillText(String(j).replace('-', '−'), cx - 7, sy(j));
  }
  ctx.font = 'italic 15px Georgia, serif'; ctx.fillStyle = '#2d3a37';
  ctx.textAlign = 'right'; ctx.textBaseline = 'bottom'; ctx.fillText('x', w - 12, cy - 6);
  ctx.font = 'italic 10px Georgia, serif'; ctx.textAlign = 'left'; ctx.fillText('1', w - 11, cy - 4);
  ctx.font = 'italic 15px Georgia, serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillText('x', cx + 9, 6);
  ctx.font = 'italic 10px Georgia, serif'; ctx.fillText('2', cx + 18, 13);
}
function drawField(g) {
  const { cx, cy, ppu, x1Range, x2Range } = g, sp = FIELD_SPACING;
  const maxLen = .82 * sp * ppu, vRef = 1.5, headMax = Math.min(7, .33 * maxLen);
  ctx.strokeStyle = FIELD_COLOR; ctx.lineWidth = 1.2; ctx.lineCap = 'round';
  for (let X = (Math.floor(-x1Range / sp) + .5) * sp; X <= x1Range; X += sp) {
    for (let Y = (Math.floor(-x2Range / sp) + .5) * sp; Y <= x2Range; Y += sp) {
      const v = velocity([X, Y]), n = Math.hypot(v[0], v[1]);
      if (n < 1e-9) continue;
      const len = maxLen * Math.tanh(n / vRef), head = Math.min(headMax, .45 * len);
      const ux = v[0] / n, uy = -v[1] / n, px = cx + X * ppu, py = cy - Y * ppu;
      const x0 = px - ux * len / 2, y0 = py - uy * len / 2, x1 = px + ux * len / 2, y1 = py + uy * len / 2;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - ux * head * .6, y1 - uy * head * .6); ctx.stroke();
      arrowHead(x1, y1, Math.atan2(uy, ux), head, FIELD_COLOR);
    }
  }
}
function drawEigenvectors(g) {
  const an = state.analysis; if (!an.vectors.length) return;
  const { cx, cy, ppu, w, h } = g, reach = Math.hypot(w, h);
  an.vectors.forEach((v, i) => {
    const angle = Math.atan2(-v[1], v[0]);
    ctx.save();
    ctx.strokeStyle = EIGEN_COLOR; ctx.lineWidth = 1.3; ctx.setLineDash(i === 1 ? [7, 6] : []);
    ctx.beginPath(); ctx.moveTo(cx - v[0] * reach, cy + v[1] * reach); ctx.lineTo(cx + v[0] * reach, cy - v[1] * reach); ctx.stroke();
    ctx.setLineDash([]); ctx.lineWidth = 2.6; ctx.lineCap = 'round';
    const tipX = cx + v[0] * ppu, tipY = cy - v[1] * ppu;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(tipX - Math.cos(angle) * 5, tipY - Math.sin(angle) * 5); ctx.stroke();
    arrowHead(tipX, tipY, angle, 10, EIGEN_COLOR);
    if (!an.star) {
      const nx = v[1], ny = v[0]; // perpendicular offset in screen space (y flipped)
      const lx = cx + v[0] * ppu * 1.18 + nx * 15, ly = cy - v[1] * ppu * 1.18 + ny * 15;
      ctx.fillStyle = EIGEN_COLOR; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.font = 'italic 15px Georgia, serif'; ctx.fillText('ξ', lx - 8, ly);
      ctx.font = '9px Georgia, serif'; ctx.fillText(`(${i + 1})`, lx, ly - 7);
    }
    ctx.restore();
  });
}
function drawCurves(g) {
  const { cx, cy, ppu } = g, sx = x => cx + x * ppu, sy = y => cy - y * ppu;
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  for (const curve of state.curves) {
    const pts = curve.pts;
    ctx.strokeStyle = curve.color; ctx.lineWidth = 2.2;
    ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(sx(p[0]), sy(p[1])) : ctx.moveTo(sx(p[0]), sy(p[1])));
    if (pts[pts.length - 1] !== curve.head) ctx.lineTo(sx(curve.head[0]), sy(curve.head[1]));
    ctx.stroke();
    ctx.fillStyle = curve.color; ctx.beginPath(); ctx.arc(sx(curve.x0[0]), sy(curve.x0[1]), 3.6, 0, Math.PI * 2); ctx.fill();
    if (!curve.done) { ctx.beginPath(); ctx.arc(sx(curve.head[0]), sy(curve.head[1]), 4.5, 0, Math.PI * 2); ctx.fill(); continue; }
    // direction marker halfway along a finished curve
    let total = 0; const seg = [];
    for (let i = 1; i < pts.length; i++) { const d = Math.hypot(sx(pts[i][0]) - sx(pts[i - 1][0]), sy(pts[i][1]) - sy(pts[i - 1][1])); seg.push(d); total += d; }
    if (total < 30) continue;
    let acc = 0;
    for (let i = 0; i < seg.length; i++) {
      if (acc + seg[i] >= total / 2) {
        const a = pts[i], b = pts[i + 1], f = (total / 2 - acc) / seg[i];
        const x = sx(a[0]) + (sx(b[0]) - sx(a[0])) * f, y = sy(a[1]) + (sy(b[1]) - sy(a[1])) * f;
        arrowHead(x, y, Math.atan2(sy(b[1]) - sy(a[1]), sx(b[0]) - sx(a[0])), 9, curve.color);
        break;
      }
      acc += seg[i];
    }
  }
}
function draw() {
  const g = geometry();
  ctx.clearRect(0, 0, g.w, g.h);
  drawAxes(g);
  if (fieldInput.checked) drawField(g);
  if (eigenInput.checked) drawEigenvectors(g);
  drawCurves(g);
  if (!state.curves.length) {
    ctx.fillStyle = '#8a9c96'; ctx.font = '14px system-ui'; ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
    ctx.fillText('Click anywhere to start a solution curve', 14, g.h - 10);
  }
}

/* ---------- events ---------- */
canvas.addEventListener('pointerdown', e => { if (e.button === 0) { e.preventDefault(); addCurve(toPlane(e)); } });
entryInputs.forEach(input => {
  input.addEventListener('change', setMatrix);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') input.blur(); });
});
fieldInput.addEventListener('change', draw);
eigenInput.addEventListener('change', () => { updateReadout(); draw(); });
clearButton.addEventListener('click', () => { state.curves = []; state.colorIndex = 0; draw(); });
window.addEventListener('resize', resize);
setMatrix(); resize();
