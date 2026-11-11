const canvas = document.querySelector('#simulation');
const ctx = canvas.getContext('2d');
const springInput = document.querySelector('#spring');
const massInput = document.querySelector('#mass');
const dampingInput = document.querySelector('#damping');
const runningInput = document.querySelector('#running');
const measureInput = document.querySelector('#measure');
const resetButton = document.querySelector('#reset');
const springValue = document.querySelector('#spring-value');
const massValue = document.querySelector('#mass-value');
const dampingValue = document.querySelector('#damping-value');
const periodValue = document.querySelector('#period');
const frequencyValue = document.querySelector('#frequency');
const motionType = document.querySelector('#motion-type');

const state = { x: 56, v: 0, lastTime: 0, trace: [], dragging: false, dragOffset: 0 };
function parameters() { return { k: Number(springInput.value), m: Number(massInput.value) / 10, c: Number(dampingInput.value) }; }
function motion() {
  const { k, m, c } = parameters(); const omega0 = Math.sqrt(k / m); const critical = 2 * Math.sqrt(k * m); const zeta = c / critical;
  if (c === 0) return { type: 'Undamped', omega: omega0 };
  if (zeta < .9999) return { type: 'Underdamped', omega: omega0 * Math.sqrt(1 - zeta ** 2) };
  if (zeta <= 1.0001) return { type: 'Critical', omega: 0 };
  return { type: 'Overdamped', omega: 0 };
}
function updateLabels() {
  const { k, m, c } = parameters(); const { type, omega } = motion(); const t = omega ? 2 * Math.PI / omega : null;
  springValue.value = `${k.toFixed(1)} N/m`; massValue.value = `${m.toFixed(1)} kg`; dampingValue.value = `${c.toFixed(2)} N·s/m`;
  periodValue.textContent = t ? `${t.toFixed(3)} s` : '—'; frequencyValue.textContent = t ? `${(1 / t).toFixed(3)} Hz` : '—'; motionType.textContent = type;
}
function resize() { const ratio = Math.min(window.devicePixelRatio || 1, 2); const width = canvas.clientWidth; const height = Math.max(390, Math.min(520, width * .53)); canvas.width = width * ratio; canvas.height = height * ratio; ctx.setTransform(ratio, 0, 0, ratio, 0, 0); }
function spring(x, y1, y2, width, coils) {
  const previousJoin = ctx.lineJoin;
  ctx.lineJoin = 'round';
  ctx.miterLimit = 1;
  ctx.beginPath(); ctx.moveTo(x, y1); const lead = 15; ctx.lineTo(x, y1 + lead);
  const start = y1 + lead, end = y2 - lead;
  for (let i = 0; i <= coils * 2; i++) { const y = start + (end - start) * i / (coils * 2); ctx.lineTo(x + (i % 2 ? width : -width), y); }
  ctx.lineTo(x, y2); ctx.stroke(); ctx.lineJoin = previousJoin;
}
function advance(dt) {
  const { k, m, c } = parameters(); const steps = Math.max(1, Math.ceil(dt / .006)); const h = dt / steps;
  for (let i = 0; i < steps; i++) { state.v += (-k * state.x - c * state.v) / m * h; state.x += state.v * h; }
}
function draw(ts) {
  const dt = state.lastTime ? Math.min((ts - state.lastTime) / 1000, .06) : 0; state.lastTime = ts;
  if (runningInput.checked && !state.dragging) advance(dt);
  const width = canvas.clientWidth, height = canvas.clientHeight; ctx.clearRect(0, 0, width, height);
  const springX = width - 185, baseY = height * .46, graphX = 62, graphW = Math.max(150, width - graphX - 245);
  const { k, m } = parameters(); const massY = baseY + state.x; const radius = 18 + 8 * Math.pow(m, .32);
  ctx.lineWidth = 1; ctx.strokeStyle = '#b6c8c1'; ctx.setLineDash([4, 6]); ctx.beginPath(); ctx.moveTo(25, baseY); ctx.lineTo(width - 20, baseY); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = '#527167'; ctx.font = '600 12px system-ui'; ctx.fillText('equilibrium', springX + 46, baseY - 8);
  ctx.strokeStyle = '#76948b'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(springX - 68, 32); ctx.lineTo(springX + 68, 32); ctx.stroke();
  ctx.strokeStyle = '#223f3a'; ctx.lineWidth = 1.6 + k * .2; spring(springX, 33, massY - radius, 18, 13);
  ctx.fillStyle = '#087c6d'; ctx.beginPath(); ctx.arc(springX, massY, radius, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#d9f3e9'; ctx.font = '700 12px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(`${m.toFixed(1)} kg`, springX, massY); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  const sample = { t: ts / 1000, y: state.x }; if (!state.dragging && runningInput.checked) state.trace.unshift(sample); state.trace = state.trace.filter(p => sample.t - p.t < 7.2);
  ctx.strokeStyle = '#c4d6d0'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(graphX, baseY - 95); ctx.lineTo(graphX, baseY + 95); ctx.moveTo(graphX, baseY); ctx.lineTo(graphX + graphW, baseY); ctx.stroke();
  ctx.fillStyle = '#527167'; ctx.font = '600 12px system-ui'; ctx.fillText('displacement', graphX, baseY - 108); ctx.fillText('time', graphX + graphW - 26, baseY + 22);
  if (state.trace.length > 1) { ctx.beginPath(); state.trace.forEach((p, i) => { const x = graphX + graphW - ((sample.t - p.t) / 7.2) * graphW; const y = baseY + p.y; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.strokeStyle = '#df6253'; ctx.lineWidth = 2.4; ctx.stroke(); }
  const { type, omega } = motion(); const t = omega ? 2 * Math.PI / omega : null;
  if (measureInput.checked && t) { const px = Math.min(graphX + graphW - 5, graphX + (t / 7.2) * graphW); ctx.strokeStyle = '#1687b5'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(graphX + 3, baseY - 76); ctx.lineTo(px, baseY - 76); ctx.stroke(); ctx.fillStyle = '#0874a0'; ctx.textAlign = 'center'; ctx.fillText(`T = ${t.toFixed(3)} s`, (graphX + px) / 2, baseY - 84); ctx.textAlign = 'left'; }
  if (measureInput.checked && !t) { ctx.fillStyle = '#0874a0'; ctx.fillText(`${type}: no repeating period`, graphX + 8, baseY - 76); }
  requestAnimationFrame(draw);
}
function setDisplacement(event) { const y = event.clientY - canvas.getBoundingClientRect().top; const baseY = canvas.clientHeight * .46; state.x = Math.max(-92, Math.min(92, y - baseY - state.dragOffset)); state.v = 0; state.trace = []; }
canvas.addEventListener('pointerdown', e => { const y = e.clientY - canvas.getBoundingClientRect().top; const currentY = canvas.clientHeight * .46 + state.x; if (Math.abs(y - currentY) < 55) { state.dragging = true; state.dragOffset = y - currentY; canvas.setPointerCapture(e.pointerId); canvas.classList.add('dragging'); } });
canvas.addEventListener('pointermove', e => { if (state.dragging) setDisplacement(e); });
canvas.addEventListener('pointerup', () => { state.dragging = false; canvas.classList.remove('dragging'); });
[springInput, massInput, dampingInput].forEach(input => input.addEventListener('input', () => { updateLabels(); state.trace = []; }));
resetButton.addEventListener('click', () => { state.x = 56; state.v = 0; state.trace = []; });
window.addEventListener('resize', resize); resize(); updateLabels(); requestAnimationFrame(draw);
