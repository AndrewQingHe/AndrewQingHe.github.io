const canvas = document.querySelector('#simulation');
const ctx = canvas.getContext('2d');
const kappaInput = document.querySelector('#kappa');
const dxInput = document.querySelector('#dx');
const dtInput = document.querySelector('#dt');
const leftTypeInput = document.querySelector('#left-type');
const rightTypeInput = document.querySelector('#right-type');
const leftBoundaryInput = document.querySelector('#left-boundary');
const rightBoundaryInput = document.querySelector('#right-boundary');
const leftBoundaryLabel = document.querySelector('#left-boundary-label');
const rightBoundaryLabel = document.querySelector('#right-boundary-label');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const clearButton = document.querySelector('#clear');
const kappaValue = document.querySelector('#kappa-value');
const timeValue = document.querySelector('#time');
const gridValue = document.querySelector('#grid');

const state = { points: [], u: null, time: 0, running: false, drawing: false, lastFrame: 0, accumulator: 0 };
const margin = { left: 58, right: 25, top: 28, bottom: 45 };
const uMin = -1.25, uMax = 1.25, L = 1;

function clampBoundary(input, type) {
  const value = Number(input.value);
  const limit = type === 'neumann' ? 2 : 1.5;
  input.value = Number.isFinite(value) ? Math.max(-limit, Math.min(limit, value)) : 0;
  return Number(input.value);
}
function boundarySettings() {
  const leftType = leftTypeInput.value, rightType = rightTypeInput.value;
  return {
    left: { type: leftType, value: clampBoundary(leftBoundaryInput, leftType) },
    right: { type: rightType, value: clampBoundary(rightBoundaryInput, rightType) }
  };
}
function applyBoundaryEndpoints(values, dx) {
  const { left, right } = boundarySettings(), n = values.length - 1;
  values[0] = left.type === 'dirichlet' ? left.value : values[1] - dx * left.value;
  values[n] = right.type === 'dirichlet' ? right.value : values[n-1] + dx * right.value;
}

function settings() {
  const requestedDx = Math.max(.0025, Number(dxInput.value) || .02);
  const n = Math.max(4, Math.min(400, Math.round(L / requestedDx)));
  return { n, dx: L / n, dt: Math.max(.0001, Number(dtInput.value) || .01), kappa: Number(kappaInput.value) };
}
function updateLabels() { const { n, dx } = settings(); kappaValue.value = Number(kappaInput.value).toFixed(2); gridValue.textContent = `${n} intervals (Δx = ${dx.toFixed(4)})`; timeValue.textContent = `${state.time.toFixed(3)} s`; }
function resize() { const ratio = Math.min(devicePixelRatio || 1, 2), width = canvas.clientWidth, height = Math.max(380, Math.min(540, width * .56)); canvas.width = width * ratio; canvas.height = height * ratio; canvas.style.height = `${height}px`; ctx.setTransform(ratio,0,0,ratio,0,0); draw(); }
function plotSize() { return { width: canvas.clientWidth, height: canvas.clientHeight, pw: canvas.clientWidth-margin.left-margin.right, ph: canvas.clientHeight-margin.top-margin.bottom }; }
function screenPoint(event) { const rect = canvas.getBoundingClientRect(), { pw, ph } = plotSize(); return { x: (event.clientX-rect.left-margin.left)/pw*L, u: uMax-(event.clientY-rect.top-margin.top)/ph*(uMax-uMin) }; }
function sampleDrawing() {
  const { n, dx } = settings(), values = new Array(n+1).fill(Infinity);
  for (let j=0;j<=n;j++) { const x=j*dx; for (let i=1;i<state.points.length;i++) { const p=state.points[i-1],q=state.points[i]; if (x<Math.min(p.x,q.x)||x>Math.max(p.x,q.x)) continue; let u; if (Math.abs(q.x-p.x)<1e-9) { if (Math.abs(x-p.x)>dx/2) continue; u=Math.min(p.u,q.u); } else { const a=(x-p.x)/(q.x-p.x); u=p.u+a*(q.u-p.u); } values[j]=Math.min(values[j],u); } }
  let previous=0; for(let j=0;j<=n;j++){ if(!Number.isFinite(values[j])) values[j]=previous; previous=values[j]; } applyBoundaryEndpoints(values,dx); state.u=values;
}
function backwardEuler() {
  const { n, dx, dt, kappa } = settings(), r=kappa*dt/(dx*dx), count=n-1, a=new Array(count).fill(-r), b=new Array(count).fill(1+2*r), c=new Array(count).fill(-r), d=state.u.slice(1,-1);
  const { left, right }=boundarySettings();
  if(left.type==='dirichlet') d[0]+=r*left.value; else { b[0]-=r; d[0]-=r*dx*left.value; }
  if(right.type==='dirichlet') d[count-1]+=r*right.value; else { b[count-1]-=r; d[count-1]+=r*dx*right.value; }
  for(let i=1;i<count;i++){const m=a[i]/b[i-1];b[i]-=m*c[i-1];d[i]-=m*d[i-1];}
  const next=new Array(n+1).fill(0);next[n-1]=d[count-1]/b[count-1];for(let i=count-2;i>=0;i--)next[i+1]=(d[i]-c[i]*next[i+2])/b[i];applyBoundaryEndpoints(next,dx);state.u=next;state.time+=dt;
}
function draw() {
  const { width,height,pw,ph }=plotSize(), sx=x=>margin.left+x/L*pw, sy=u=>margin.top+(uMax-u)/(uMax-uMin)*ph;ctx.clearRect(0,0,width,height);
  ctx.strokeStyle='#d8e4df';ctx.lineWidth=1;for(let i=0;i<=10;i++){const x=margin.left+i*pw/10;ctx.beginPath();ctx.moveTo(x,margin.top);ctx.lineTo(x,height-margin.bottom);ctx.stroke();}for(let i=0;i<=5;i++){const y=margin.top+i*ph/5;ctx.beginPath();ctx.moveTo(margin.left,y);ctx.lineTo(width-margin.right,y);ctx.stroke();}
  ctx.strokeStyle='#6f8881';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(margin.left,margin.top);ctx.lineTo(margin.left,height-margin.bottom);ctx.moveTo(margin.left,sy(0));ctx.lineTo(width-margin.right,sy(0));ctx.stroke();
  ctx.fillStyle='#587068';ctx.font='12px system-ui';ctx.textAlign='center';[0,.25,.5,.75,1].forEach(x=>ctx.fillText(x.toFixed(2),sx(x),height-17));ctx.textAlign='right';[-1,-.5,0,.5,1].forEach(u=>ctx.fillText(u.toFixed(1),margin.left-10,sy(u)+4));
  const curve=state.u?state.u.map((u,i)=>({x:i/(state.u.length-1),u})):state.points;if(curve.length){ctx.beginPath();curve.forEach((p,i)=>i?ctx.lineTo(sx(p.x),sy(p.u)):ctx.moveTo(sx(p.x),sy(p.u)));ctx.strokeStyle=state.u?'#087c6d':'#df6253';ctx.lineWidth=3;ctx.lineJoin='round';ctx.lineCap='round';ctx.stroke();}
  if(!curve.length){ctx.fillStyle='#7b938b';ctx.font='15px system-ui';ctx.textAlign='center';ctx.fillText('Drag across the plot to draw u(0, x)',margin.left+pw/2,margin.top+ph/2);}
  const boundaries=boundarySettings(),left=state.u?state.u[0]:(boundaries.left.type==='dirichlet'?boundaries.left.value:0),right=state.u?state.u[state.u.length-1]:(boundaries.right.type==='dirichlet'?boundaries.right.value:0);ctx.fillStyle='#087c6d';ctx.beginPath();ctx.arc(sx(0),sy(left),4,0,Math.PI*2);ctx.arc(sx(1),sy(right),4,0,Math.PI*2);ctx.fill();updateLabels();
}
function animate(stamp){if(state.running){if(!state.lastFrame)state.lastFrame=stamp;state.accumulator+=Math.min((stamp-state.lastFrame)/1000,.1);state.lastFrame=stamp;const {dt}=settings();let steps=0;while(state.accumulator>=1/30&&steps<20){backwardEuler();state.accumulator-=1/30;steps++;}draw();requestAnimationFrame(animate);}}
canvas.addEventListener('pointerdown',e=>{if(state.running)return;state.drawing=true;canvas.setPointerCapture(e.pointerId);state.points=[screenPoint(e)];state.u=null;state.time=0;draw();});
canvas.addEventListener('pointermove',e=>{if(state.drawing&&!state.running){state.points.push(screenPoint(e));draw();}});
function finishDrawing(){state.drawing=false;} canvas.addEventListener('pointerup',finishDrawing);canvas.addEventListener('pointercancel',finishDrawing);
startButton.addEventListener('click',()=>{if(!state.u){if(state.points.length<2)return;sampleDrawing();}if(!state.running){state.running=true;state.lastFrame=0;canvas.classList.add('running');requestAnimationFrame(animate);}});
pauseButton.addEventListener('click',()=>{state.running=false;canvas.classList.remove('running');});
clearButton.addEventListener('click',()=>{state.running=false;state.points=[];state.u=null;state.time=0;canvas.classList.remove('running');draw();});
[kappaInput,dxInput,dtInput].forEach(input=>input.addEventListener('input',()=>{if(input===dxInput){state.u=null;state.time=0;}draw();}));
function updateBoundaryControl(side) {
  const isLeft=side==='left',typeInput=isLeft?leftTypeInput:rightTypeInput,valueInput=isLeft?leftBoundaryInput:rightBoundaryInput,label=isLeft?leftBoundaryLabel:rightBoundaryLabel;
  const isNeumann=typeInput.value==='neumann',limit=isNeumann?2:1.5;
  label.textContent=isNeumann?`${isLeft?'Left':'Right'} boundary ∂u/∂x (${isLeft?'0':'1'})`:`${isLeft?'Left':'Right'} boundary u(${isLeft?'0':'1'})`;
  valueInput.min=-limit;valueInput.max=limit;clampBoundary(valueInput,typeInput.value);
  if(state.u) applyBoundaryEndpoints(state.u,settings().dx);
  draw();
}
[leftBoundaryInput,rightBoundaryInput].forEach(input=>input.addEventListener('change',()=>updateBoundaryControl(input===leftBoundaryInput?'left':'right')));
leftTypeInput.addEventListener('change',()=>updateBoundaryControl('left'));
rightTypeInput.addEventListener('change',()=>updateBoundaryControl('right'));
window.addEventListener('resize',resize);resize();
