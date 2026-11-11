const canvas = document.querySelector('#simulation');
const ctx = canvas.getContext('2d');
const speedInput = document.querySelector('#speed');
const modesInput = document.querySelector('#modes');
const rateInput = document.querySelector('#rate');
const speedValue = document.querySelector('#speed-value');
const timeValue = document.querySelector('#time');
const positionButton = document.querySelector('#draw-position');
const velocityButton = document.querySelector('#draw-velocity');
const positionStatus = document.querySelector('#position-status');
const velocityStatus = document.querySelector('#velocity-status');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const resetButton = document.querySelector('#reset');
const clearButton = document.querySelector('#clear');
const eraseButton = document.querySelector('#erase-profile');

const SAMPLES = 201;
const L = 1;
const POSITION_LIMIT = 1.25;
const VELOCITY_LIMIT = 5;
const margin = { left: 58, right: 25, top: 28, bottom: 45 };
const colors = { position: '#df6253', velocity: '#6876c8', solution: '#087c6d' };
const state = {
  active: 'position', points: { position: [], velocity: [] },
  profiles: { position: null, velocity: null }, coefficients: null,
  solution: null, time: 0, running: false, drawing: false, lastFrame: 0
};

const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
function verticalLimit(kind = state.active) {
  return kind === 'velocity' ? VELOCITY_LIMIT : POSITION_LIMIT;
}
function settings() {
  const modes = clamp(Math.round(Number(modesInput.value) || 40), 4, 100);
  modesInput.value = modes;
  return { c: Number(speedInput.value), modes, rate: Number(rateInput.value) };
}
function plotSize() {
  return { width: canvas.clientWidth, height: canvas.clientHeight, pw: canvas.clientWidth - margin.left - margin.right, ph: canvas.clientHeight - margin.top - margin.bottom };
}
function screenPoint(event) {
  const rect = canvas.getBoundingClientRect();
  const { pw, ph } = plotSize();
  const limit = verticalLimit();
  return {
    x: clamp((event.clientX - rect.left - margin.left) / pw, 0, L),
    y: clamp(limit - (event.clientY - rect.top - margin.top) / ph * (2 * limit), -limit, limit)
  };
}
function samplePoints(points, kind) {
  const result = new Array(SAMPLES).fill(0);
  if (points.length < 2) return result;
  const sorted = [...points].sort((a, b) => a.x - b.x);
  let segment = 0;
  for (let j = 1; j < SAMPLES - 1; j++) {
    const x = j / (SAMPLES - 1);
    if (x < sorted[0].x || x > sorted[sorted.length - 1].x) continue;
    while (segment < sorted.length - 2 && sorted[segment + 1].x < x) segment++;
    const p = sorted[segment], q = sorted[segment + 1];
    const alpha = Math.abs(q.x - p.x) < 1e-8 ? 0 : (x - p.x) / (q.x - p.x);
    const limit = verticalLimit(kind);
    result[j] = clamp(p.y + alpha * (q.y - p.y), -limit, limit);
  }
  return result;
}
function prepareSolution() {
  for (const kind of ['position', 'velocity']) {
    state.profiles[kind] = state.points[kind].length >= 2 ? samplePoints(state.points[kind], kind) : new Array(SAMPLES).fill(0);
  }
  computeCoefficients();
  updateSolution();
}
function computeCoefficients() {
  const { modes } = settings();
  const a = new Array(modes).fill(0), g = new Array(modes).fill(0);
  for (let n = 1; n <= modes; n++) {
    for (let j = 1; j < SAMPLES - 1; j++) {
      const basis = Math.sin(n * Math.PI * j / (SAMPLES - 1));
      a[n - 1] += 2 * state.profiles.position[j] * basis / (SAMPLES - 1);
      g[n - 1] += 2 * state.profiles.velocity[j] * basis / (SAMPLES - 1);
    }
  }
  state.coefficients = { a, g };
}
function updateSolution() {
  if (!state.coefficients) return;
  const { c, modes } = settings();
  state.solution = new Array(SAMPLES).fill(0);
  for (let j = 1; j < SAMPLES - 1; j++) {
    const x = j / (SAMPLES - 1);
    for (let n = 1; n <= modes; n++) {
      const omega = c * n * Math.PI;
      state.solution[j] += (state.coefficients.a[n - 1] * Math.cos(omega * state.time) + state.coefficients.g[n - 1] / omega * Math.sin(omega * state.time)) * Math.sin(n * Math.PI * x);
    }
  }
}
function drawCurve(values, color, width, alpha = 1, limit = POSITION_LIMIT) {
  if (!values) return;
  const { pw, ph } = plotSize();
  const sx = x => margin.left + x * pw;
  const sy = y => margin.top + (limit - y) / (2 * limit) * ph;
  ctx.save(); ctx.globalAlpha = alpha; ctx.beginPath();
  values.forEach((y, i) => i ? ctx.lineTo(sx(i / (values.length - 1)), sy(y)) : ctx.moveTo(sx(0), sy(y)));
  ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore();
}
function drawnCurve(kind) {
  const points = state.points[kind];
  if (!points.length) return null;
  return points.map(point => point.y);
}
function drawRawPoints(points, color, alpha, limit) {
  if (!points.length) return;
  const { pw, ph } = plotSize(), sx = x => margin.left + x * pw, sy = y => margin.top + (limit-y)/(2*limit)*ph;
  ctx.save(); ctx.globalAlpha = alpha; ctx.beginPath();
  points.forEach((p,i) => i ? ctx.lineTo(sx(p.x),sy(p.y)) : ctx.moveTo(sx(p.x),sy(p.y)));
  ctx.strokeStyle=color;ctx.lineWidth=3;ctx.lineJoin='round';ctx.lineCap='round';ctx.stroke();ctx.restore();
}
function draw() {
  const { width, height, pw, ph } = plotSize();
  const axisLimit = state.solution ? POSITION_LIMIT : verticalLimit();
  const sx = x => margin.left + x * pw;
  const sy = y => margin.top + (axisLimit - y) / (2 * axisLimit) * ph;
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = '#d8e4df'; ctx.lineWidth = 1;
  for (let i=0;i<=10;i++){const x=margin.left+i*pw/10;ctx.beginPath();ctx.moveTo(x,margin.top);ctx.lineTo(x,height-margin.bottom);ctx.stroke();}
  for (let i=0;i<=5;i++){const y=margin.top+i*ph/5;ctx.beginPath();ctx.moveTo(margin.left,y);ctx.lineTo(width-margin.right,y);ctx.stroke();}
  ctx.strokeStyle='#6f8881';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(margin.left,margin.top);ctx.lineTo(margin.left,height-margin.bottom);ctx.moveTo(margin.left,sy(0));ctx.lineTo(width-margin.right,sy(0));ctx.stroke();
  ctx.fillStyle='#587068';ctx.font='12px system-ui';ctx.textAlign='center';[0,.25,.5,.75,1].forEach(x=>ctx.fillText(x.toFixed(2),sx(x),height-17));ctx.textAlign='right';[-.8,-.4,0,.4,.8].forEach(fraction=>{const y=fraction*axisLimit;ctx.fillText(y.toFixed(1),margin.left-10,sy(y)+4);});
  if (state.solution) {
    drawCurve(state.profiles.position, colors.position, 2, .25);
    drawCurve(state.profiles.velocity, colors.velocity, 2, .22, VELOCITY_LIMIT);
    drawCurve(state.solution, colors.solution, 3.5);
  } else {
    drawRawPoints(state.points.position, colors.position, state.active === 'position' ? 1 : .55, POSITION_LIMIT);
    drawRawPoints(state.points.velocity, colors.velocity, state.active === 'velocity' ? 1 : .55, VELOCITY_LIMIT);
  }
  if (!state.solution && !state.points.position.length && !state.points.velocity.length) {
    ctx.fillStyle='#71877f';ctx.font='15px system-ui';ctx.textAlign='center';ctx.fillText('Drag across the plot to draw the selected function',margin.left+pw/2,margin.top+ph/2-3);
    ctx.font='13px system-ui';ctx.fillStyle='#8da098';ctx.fillText('Both endpoints are fixed at zero',margin.left+pw/2,margin.top+ph/2+21);
  }
  ctx.fillStyle=state.solution?colors.solution:colors[state.active];
  for (const x of [0,1]) { ctx.beginPath();ctx.arc(sx(x),sy(0),4,0,Math.PI*2);ctx.fill(); }
  speedValue.value = Number(speedInput.value).toFixed(2);
  timeValue.textContent = `${state.time.toFixed(3)} s`;
  positionStatus.textContent = state.points.position.length >= 2 ? 'drawn' : 'not drawn';
  velocityStatus.textContent = state.points.velocity.length >= 2 ? 'drawn' : 'not drawn';
  positionStatus.classList.toggle('ready', state.points.position.length >= 2);
  velocityStatus.classList.toggle('ready', state.points.velocity.length >= 2);
  pauseButton.disabled = !state.running;
}
function setActive(kind) {
  if (state.running) return;
  state.active = kind;
  positionButton.classList.toggle('active', kind === 'position');
  velocityButton.classList.toggle('active', kind === 'velocity');
  positionButton.setAttribute('aria-pressed', kind === 'position');
  velocityButton.setAttribute('aria-pressed', kind === 'velocity');
  draw();
}
function stop() { state.running=false; state.lastFrame=0; canvas.classList.remove('running'); draw(); }
function animate(stamp) {
  if (!state.running) return;
  if (!state.lastFrame) state.lastFrame=stamp;
  const elapsed=Math.min((stamp-state.lastFrame)/1000,.1);state.lastFrame=stamp;
  state.time += elapsed * settings().rate; updateSolution(); draw(); requestAnimationFrame(animate);
}
function resize() {
  const ratio=Math.min(devicePixelRatio||1,2),width=canvas.clientWidth,height=Math.max(360,Math.min(520,width*.54));
  canvas.width=width*ratio;canvas.height=height*ratio;canvas.style.height=`${height}px`;ctx.setTransform(ratio,0,0,ratio,0,0);draw();
}

canvas.addEventListener('pointerdown', event => {
  if (state.running) return;
  if (state.solution) { state.solution=null; state.coefficients=null; state.time=0; }
  state.drawing=true;canvas.setPointerCapture(event.pointerId);state.points[state.active]=[screenPoint(event)];draw();
});
canvas.addEventListener('pointermove', event => { if(state.drawing&&!state.running){state.points[state.active].push(screenPoint(event));draw();} });
const finishDrawing=()=>{state.drawing=false;};canvas.addEventListener('pointerup',finishDrawing);canvas.addEventListener('pointercancel',finishDrawing);
positionButton.addEventListener('click',()=>setActive('position'));velocityButton.addEventListener('click',()=>setActive('velocity'));
eraseButton.addEventListener('click',()=>{if(state.running)return;state.points[state.active]=[];state.solution=null;state.coefficients=null;state.time=0;draw();});
startButton.addEventListener('click',()=>{if(!state.coefficients)prepareSolution();if(!state.running){state.running=true;state.lastFrame=0;canvas.classList.add('running');draw();requestAnimationFrame(animate);}});
pauseButton.addEventListener('click',stop);
resetButton.addEventListener('click',()=>{stop();state.time=0;if(!state.coefficients)prepareSolution();updateSolution();draw();});
clearButton.addEventListener('click',()=>{stop();state.points={position:[],velocity:[]};state.profiles={position:null,velocity:null};state.coefficients=null;state.solution=null;state.time=0;draw();});
speedInput.addEventListener('input',()=>{if(state.coefficients)updateSolution();draw();});
modesInput.addEventListener('change',()=>{if(state.coefficients){computeCoefficients();updateSolution();}draw();});
rateInput.addEventListener('change',draw);window.addEventListener('resize',resize);resize();
