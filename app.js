(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const canvas = $('meshCanvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const stage = $('stage');
  const video = $('videoSource');

  const shapes = ['Sphere','Blob','Torus','Ellipsoid','Heart','Sheet','Shell','Cube'];
  const styles = ['Elastic Web','Fluid Membrane','Geodesic Lattice','Neural Network','Magnetic Tendrils','Constellation','Ribbon Weave','Liquid Bridges'];

  const themes = [
    {name:'Electric Orbit',shape:'Sphere',style:'Neural Network',nodes:90,density:4,line:'#62e6ff',node:'#f5fbff',bg:'#07090f',thickness:1.2,nodeSize:2.2,glow:62,glowRadius:24,falloff:48,softness:40,intensity:88,zoom:1.2,pull:72,radius:32,spring:42,damping:88,motion:35,rotation:18},
    {name:'Neon Plasma',shape:'Blob',style:'Liquid Bridges',nodes:120,density:5,line:'#ff4fd8',node:'#55f4ff',bg:'#160724',thickness:2.8,nodeSize:2.8,glow:92,glowRadius:39,falloff:78,softness:80,intensity:96,zoom:1.4,pull:84,radius:46,spring:28,damping:91,motion:65,rotation:12},
    {name:'Constellation',shape:'Sphere',style:'Constellation',nodes:65,density:3,line:'#c5deff',node:'#ffffff',bg:'#020a1e',thickness:.7,nodeSize:1.7,glow:33,glowRadius:14,falloff:88,softness:28,intensity:70,zoom:1,pull:58,radius:21,spring:35,damping:93,motion:22,rotation:8},
    {name:'Golden Filament',shape:'Ellipsoid',style:'Magnetic Tendrils',nodes:80,density:4,line:'#ffbf4d',node:'#fff2c2',bg:'#120c05',thickness:1,nodeSize:2,glow:66,glowRadius:27,falloff:72,softness:60,intensity:91,zoom:1.25,pull:64,radius:38,spring:38,damping:91,motion:27,rotation:10},
    {name:'Arctic Crystal',shape:'Sphere',style:'Geodesic Lattice',nodes:55,density:5,line:'#6e9bb8',node:'#d9f6ff',bg:'#dce9ed',thickness:1.1,nodeSize:2.5,glow:12,glowRadius:8,falloff:12,softness:8,intensity:72,zoom:1.1,pull:50,radius:24,spring:72,damping:86,motion:12,rotation:9},
    {name:'Deep Ocean',shape:'Ellipsoid',style:'Fluid Membrane',nodes:110,density:6,line:'#19d2c4',node:'#8ffff3',bg:'#00121f',thickness:2.2,nodeSize:2.4,glow:74,glowRadius:33,falloff:82,softness:83,intensity:80,zoom:1.3,pull:77,radius:53,spring:22,damping:95,motion:48,rotation:6},
    {name:'Solar Core',shape:'Sphere',style:'Liquid Bridges',nodes:150,density:7,line:'#ff722e',node:'#fff078',bg:'#090200',thickness:3.1,nodeSize:2.6,glow:100,glowRadius:43,falloff:60,softness:58,intensity:100,zoom:1.5,pull:82,radius:41,spring:52,damping:82,motion:72,rotation:21},
    {name:'Living Cell',shape:'Blob',style:'Fluid Membrane',nodes:75,density:5,line:'#79be54',node:'#d8ff9e',bg:'#eee7d7',thickness:2.5,nodeSize:3,glow:29,glowRadius:18,falloff:76,softness:88,intensity:62,zoom:1.15,pull:88,radius:56,spring:18,damping:95,motion:31,rotation:5},
    {name:'Synthwave Grid',shape:'Torus',style:'Ribbon Weave',nodes:100,density:5,line:'#ff4ba4',node:'#58dfff',bg:'#10001e',thickness:2,nodeSize:2,glow:86,glowRadius:32,falloff:44,softness:35,intensity:94,zoom:1.35,pull:69,radius:36,spring:63,damping:84,motion:38,rotation:24},
    {name:'Ghost Silk',shape:'Sheet',style:'Ribbon Weave',nodes:45,density:4,line:'#e7efff',node:'#ffffff',bg:'#16181d',thickness:1.4,nodeSize:1.4,glow:37,glowRadius:30,falloff:93,softness:93,intensity:48,zoom:1.2,pull:92,radius:64,spring:14,damping:96,motion:46,rotation:2},
    {name:'Cyber Network',shape:'Cube',style:'Neural Network',nodes:180,density:4,line:'#27f289',node:'#c1ffda',bg:'#000704',thickness:.8,nodeSize:1.7,glow:76,glowRadius:21,falloff:32,softness:20,intensity:92,zoom:1.1,pull:61,radius:25,spring:68,damping:83,motion:52,rotation:18},
    {name:'Lava Web',shape:'Blob',style:'Elastic Web',nodes:95,density:5,line:'#ff3b18',node:'#fff07d',bg:'#100201',thickness:2.6,nodeSize:2.5,glow:90,glowRadius:37,falloff:55,softness:54,intensity:98,zoom:1.3,pull:75,radius:39,spring:58,damping:81,motion:61,rotation:16},
    {name:'Pearl Membrane',shape:'Ellipsoid',style:'Fluid Membrane',nodes:70,density:6,line:'#d6d5ef',node:'#ffffff',bg:'#bfc3cc',thickness:3,nodeSize:2.7,glow:24,glowRadius:17,falloff:90,softness:96,intensity:58,zoom:1.25,pull:70,radius:47,spring:26,damping:94,motion:19,rotation:5},
    {name:'Quantum Foam',shape:'Blob',style:'Constellation',nodes:220,density:3,line:'#9d8cff',node:'#ffffff',bg:'#02020c',thickness:.55,nodeSize:1.2,glow:58,glowRadius:18,falloff:65,softness:35,intensity:80,zoom:1.6,pull:55,radius:16,spring:48,damping:79,motion:79,rotation:28},
    {name:'Forest Mycelium',shape:'Shell',style:'Magnetic Tendrils',nodes:130,density:4,line:'#9fe36e',node:'#ffca64',bg:'#031007',thickness:1.4,nodeSize:2,glow:51,glowRadius:23,falloff:81,softness:67,intensity:78,zoom:1.2,pull:82,radius:50,spring:33,damping:91,motion:43,rotation:7},
    {name:'Rose Energy',shape:'Heart',style:'Liquid Bridges',nodes:85,density:5,line:'#ff477e',node:'#ffdfa2',bg:'#19040b',thickness:2.4,nodeSize:2.6,glow:81,glowRadius:32,falloff:76,softness:70,intensity:91,zoom:1.3,pull:73,radius:45,spring:37,damping:90,motion:39,rotation:8},
    {name:'Mono Architect',shape:'Sphere',style:'Geodesic Lattice',nodes:60,density:5,line:'#131820',node:'#05070a',bg:'#edf1f4',thickness:1,nodeSize:2,glow:0,glowRadius:0,falloff:0,softness:0,intensity:85,zoom:1,pull:54,radius:28,spring:78,damping:88,motion:5,rotation:6},
    {name:'Aurora Veil',shape:'Sheet',style:'Ribbon Weave',nodes:105,density:5,line:'#55ffc3',node:'#ba98ff',bg:'#030509',thickness:2.1,nodeSize:1.8,glow:89,glowRadius:44,falloff:91,softness:91,intensity:82,zoom:1.45,pull:94,radius:62,spring:12,damping:96,motion:56,rotation:3},
    {name:'Cosmic Portal',shape:'Torus',style:'Magnetic Tendrils',nodes:140,density:5,line:'#704cff',node:'#65dfff',bg:'#020106',thickness:1.6,nodeSize:2.2,glow:96,glowRadius:42,falloff:67,softness:62,intensity:95,zoom:1.5,pull:78,radius:43,spring:44,damping:87,motion:64,rotation:25},
    {name:'Dream Cloud',shape:'Blob',style:'Fluid Membrane',nodes:50,density:6,line:'#ff9de2',node:'#fff3ff',bg:'#27305a',thickness:3.7,nodeSize:3.3,glow:65,glowRadius:48,falloff:100,softness:100,intensity:61,zoom:1.15,pull:89,radius:70,spring:8,damping:98,motion:18,rotation:3}
  ];

  const state = {
    shape:'Sphere', style:'Neural Network', nodes:90, density:4,
    line:'#62e6ff', node:'#f5fbff', bg:'#07090f', thickness:1.2, nodeSize:2.2,
    glow:62, glowRadius:24, falloff:48, softness:40, intensity:88, zoom:1.2,
    pull:72, radius:32, spring:42, damping:88, motion:35, rotation:18,
    showNodes:true, hold:false, reduced:false, theme:'Electric Orbit', videoMode:'portal',
    stereo:'off', eyeSep:40, stereoPlane:0, paneSize:100, stereoDots:true
  };

  // Camera distance in mesh units (matches the original 3.6 / (3.6 - z*.62) perspective)
  const CAM = 3.6 / .62;
  // The viewport currently being projected into (one pane in stereo, the whole stage in mono)
  const view = { x:0, w:1, cx:0, cy:0, eye:0 };

  let nodes = [], edges = [], pointers = new Map(), width = 1, height = 1, dpr = 1;
  let rotX = -.12, rotY = .3, lastTime = performance.now(), elapsed = 0, frameCount = 0, fpsTime = lastTime;
  let lastTap = null, lastPinch = null, topologyPending = false, objectUrl = null, recorder = null, chunks = [], toastTimer = null;

  function vec(x=0,y=0,z=0){ return {x,y,z}; }
  function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }
  function hexRgb(hex){ const n=parseInt(hex.slice(1),16); return [(n>>16)&255,(n>>8)&255,n&255]; }
  function rgba(hex,a){ const [r,g,b]=hexRgb(hex); return `rgba(${r},${g},${b},${a})`; }
  function showToast(message){ const el=$('toast'); el.textContent=message; el.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),1800); }

  function fibonacciPoint(i,n){
    const y=1-(i/(Math.max(1,n-1)))*2;
    const r=Math.sqrt(Math.max(0,1-y*y));
    const theta=Math.PI*(3-Math.sqrt(5))*i;
    return vec(Math.cos(theta)*r,y,Math.sin(theta)*r);
  }

  function shapePoint(i,n){
    const p=fibonacciPoint(i,n), t=(i/n)*Math.PI*2;
    switch(state.shape){
      case 'Blob': { const m=1+.14*Math.sin(t*3)+.09*Math.cos(t*7); return vec(p.x*m,p.y*m,p.z*m); }
      case 'Torus': { const u=t, v=((i*7)%n)/n*Math.PI*2, R=.66, r=.34; return vec((R+r*Math.cos(v))*Math.cos(u),r*Math.sin(v),(R+r*Math.cos(v))*Math.sin(u)); }
      case 'Ellipsoid': return vec(p.x*1.16,p.y*.78,p.z*.92);
      case 'Heart': { const x=Math.pow(Math.sin(t),3), y=(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))/16; return vec(x,-y*.92,p.z*.32); }
      case 'Sheet': { const cols=Math.ceil(Math.sqrt(n)), row=Math.floor(i/cols), col=i%cols, rows=Math.ceil(n/cols); return vec((col/(Math.max(1,cols-1))-.5)*1.8,(row/(Math.max(1,rows-1))-.5)*-1.55,Math.sin(col*.8+row*.55)*.13); }
      case 'Shell': { const a=t*2.1, rr=.16+.72*(i/n); return vec(Math.cos(a)*rr,(i/n-.5)*1.55,Math.sin(a)*rr); }
      case 'Cube': { const m=Math.max(Math.abs(p.x),Math.abs(p.y),Math.abs(p.z))||1; return vec(p.x/m*.78,p.y/m*.78,p.z/m*.78); }
      default: return p;
    }
  }

  function rebuild(preserve=false){
    const old=nodes;
    nodes=Array.from({length:state.nodes},(_,i)=>{
      const base=shapePoint(i,state.nodes);
      const prior=preserve&&old.length?old[Math.floor(i/Math.max(1,state.nodes-1)*(old.length-1))]:null;
      const pos=prior?vec(prior.pos.x,prior.pos.y,prior.pos.z):vec(base.x,base.y,base.z);
      return {base,pos,vel:vec(),screen:vec(),depth:0,index:i};
    });
    const set=new Set(); edges=[];
    for(let i=0;i<nodes.length;i++){
      const distances=[];
      for(let j=0;j<nodes.length;j++) if(i!==j){
        const a=nodes[i].base,b=nodes[j].base,dx=a.x-b.x,dy=a.y-b.y,dz=a.z-b.z;
        distances.push([dx*dx+dy*dy+dz*dz,j]);
      }
      distances.sort((a,b)=>a[0]-b[0]);
      for(let k=0;k<Math.min(state.density,distances.length);k++){
        const j=distances[k][1], key=i<j?`${i}-${j}`:`${j}-${i}`;
        if(!set.has(key)){set.add(key);edges.push([i,j]);}
      }
    }
    $('nodeReadout').textContent=`${nodes.length} nodes`;
    $('edgeReadout').textContent=`${edges.length} edges`;
  }

  function queueRebuild(){ if(topologyPending)return; topologyPending=true; requestAnimationFrame(()=>{topologyPending=false;rebuild(true);}); }

  function resize(){
    const rect=canvas.getBoundingClientRect(); dpr=Math.min(window.devicePixelRatio||1,2);
    width=Math.max(1,rect.width); height=Math.max(1,rect.height);
    canvas.width=Math.round(width*dpr); canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  function rotated(p){
    const cy=Math.cos(rotY),sy=Math.sin(rotY),cx=Math.cos(rotX),sx=Math.sin(rotX);
    const x=p.x*cy-p.z*sy, z=p.x*sy+p.z*cy;
    return vec(x,p.y*cx-z*sx,p.y*sx+z*cx);
  }

  // ---------- Stereo ----------
  // Panes: one full-stage pane in mono, two side-by-side panes in stereo.
  // Parallel: left-eye image on the left. Cross-eyed: left-eye image on the right.
  function panes(){
    if(state.stereo==='off') return [{x:0,w:width,eye:0}];
    const half=width/2, pw=half*state.paneSize/100, cross=state.stereo==='cross';
    return [{x:half-pw,w:pw,eye:cross?1:-1},{x:half,w:pw,eye:cross?-1:1}];
  }
  function setView(p){ view.x=p.x; view.w=p.w; view.cx=p.x+p.w/2; view.cy=height/2; view.eye=p.eye; }
  function eyeHalf(){ return (state.eyeSep/100)*.5; }           // half the interocular distance, mesh units
  function planeZ(){ return -(state.stereoPlane/100); }          // depth of the zero-parallax (screen) plane

  function project(node,time){
    const amp=state.reduced?0:(state.motion/100)*.045;
    const wobble=amp*Math.sin(time*1.3+node.index*.71);
    const q=rotated(vec(node.pos.x*(1+wobble),node.pos.y*(1+wobble),node.pos.z*(1+wobble)));
    const perspective=CAM/(CAM-q.z);
    const scale=Math.min(view.w,height)*.31*state.zoom;
    // Off-axis stereo: shift the camera by ex, then re-centre so points at planeZ have zero parallax.
    const ex=view.eye*eyeHalf(), k=CAM/(CAM-planeZ());
    node.screen.x=view.cx+((q.x-ex)*perspective+ex*k)*scale;
    node.screen.y=view.cy-q.y*scale*perspective;
    node.depth=q.z;
    return scale;
  }

  function convexHull(points){
    const pts=points.map(p=>({x:p.screen.x,y:p.screen.y})).sort((a,b)=>a.x===b.x?a.y-b.y:a.x-b.x);
    if(pts.length<3)return pts;
    const cross=(o,a,b)=>(a.x-o.x)*(b.y-o.y)-(a.y-o.y)*(b.x-o.x);
    const lo=[]; for(const p of pts){while(lo.length>=2&&cross(lo[lo.length-2],lo[lo.length-1],p)<=0)lo.pop();lo.push(p);}
    const hi=[]; for(let i=pts.length-1;i>=0;i--){const p=pts[i];while(hi.length>=2&&cross(hi[hi.length-2],hi[hi.length-1],p)<=0)hi.pop();hi.push(p);}
    lo.pop();hi.pop();return lo.concat(hi);
  }

  function meshPath(){
    const hull=convexHull(nodes); if(!hull.length)return null;
    const path=new Path2D(); path.moveTo(hull[0].x,hull[0].y); for(let i=1;i<hull.length;i++)path.lineTo(hull[i].x,hull[i].y); path.closePath(); return {path,hull};
  }

  function drawVideo(){
    if(!video.src||video.readyState<2)return;
    const data=meshPath(); if(!data)return;
    const xs=data.hull.map(p=>p.x), ys=data.hull.map(p=>p.y);
    const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
    ctx.save(); ctx.clip(data.path);
    ctx.globalAlpha=state.videoMode==='inner'?.46:.78;
    if(state.videoMode==='facets') ctx.filter='saturate(1.25) contrast(1.1)';
    ctx.drawImage(video,minX,minY,maxX-minX,maxY-minY);
    if(state.videoMode==='facets'){
      ctx.globalCompositeOperation='multiply'; ctx.globalAlpha=.2; ctx.fillStyle='#09101d';
      for(let i=0;i<edges.length;i+=3){const [a,b]=edges[i],c=nodes[(a+b+i)%nodes.length];ctx.beginPath();ctx.moveTo(nodes[a].screen.x,nodes[a].screen.y);ctx.lineTo(nodes[b].screen.x,nodes[b].screen.y);ctx.lineTo(c.screen.x,c.screen.y);ctx.closePath();ctx.fill();}
    }
    ctx.restore();
  }

  function edgeColor(edgeIndex){
    if(state.videoMode==='edges'&&video.src){ const hue=(video.currentTime*38+edgeIndex*7)%360; return `hsl(${hue} 90% 65%)`; }
    return state.line;
  }

  function strokeEdge(a,b,index,time){
    const color=edgeColor(index), alpha=(state.intensity/100)*(.52+clamp((a.depth+b.depth+2)/5,0,.42));
    let lineWidth=state.thickness, curved=false, controlX=(a.screen.x+b.screen.x)/2, controlY=(a.screen.y+b.screen.y)/2;
    if(state.style==='Fluid Membrane'||state.style==='Liquid Bridges') lineWidth*=state.style==='Liquid Bridges'?2.6:1.9;
    if(state.style==='Ribbon Weave') lineWidth*=2.2;
    if(state.style==='Neural Network'||state.style==='Magnetic Tendrils'||state.style==='Ribbon Weave'){
      curved=true; const dx=b.screen.x-a.screen.x,dy=b.screen.y-a.screen.y,len=Math.hypot(dx,dy)||1;
      const bend=Math.sin(index*2.31+time*1.2)*(state.style==='Magnetic Tendrils'?16:8);
      controlX+=-dy/len*bend;controlY+=dx/len*bend;
    }
    ctx.beginPath(); ctx.moveTo(a.screen.x,a.screen.y);
    if(curved)ctx.quadraticCurveTo(controlX,controlY,b.screen.x,b.screen.y);else ctx.lineTo(b.screen.x,b.screen.y);
    if(state.style==='Constellation')ctx.setLineDash([1,3]); else if(state.style==='Neural Network')ctx.setLineDash([Math.max(1,lineWidth*2),Math.max(2,lineWidth*3)]); else ctx.setLineDash([]);
    const f=state.falloff/100;
    if(f>.03){
      const g=ctx.createLinearGradient(a.screen.x,a.screen.y,b.screen.x,b.screen.y);
      g.addColorStop(0,rgba(color,alpha*(1-f)));g.addColorStop(.5,rgba(color,alpha));g.addColorStop(1,rgba(color,alpha*(1-f)));ctx.strokeStyle=g;
    }else ctx.strokeStyle=rgba(color,alpha);
    ctx.lineCap=state.softness>35?'round':'butt'; ctx.lineWidth=lineWidth;
    ctx.shadowColor=color;ctx.shadowBlur=(state.glowRadius*(state.glow/100))*(.7+state.softness/180);
    ctx.stroke();
    if(state.style==='Liquid Bridges'){
      ctx.setLineDash([]);ctx.shadowBlur=0;ctx.lineWidth=Math.max(.5,lineWidth*.22);ctx.strokeStyle=rgba('#ffffff',alpha*.78);ctx.stroke();
    }
  }

  function drawScene(time){
    if(video.src&&state.videoMode!=='edges')drawVideo();
    const sorted=edges.slice().sort((e1,e2)=>(nodes[e1[0]].depth+nodes[e1[1]].depth)-(nodes[e2[0]].depth+nodes[e2[1]].depth));
    ctx.save();ctx.globalCompositeOperation=state.glow>4?'lighter':'source-over';
    sorted.forEach((edge,i)=>strokeEdge(nodes[edge[0]],nodes[edge[1]],i,time));
    ctx.restore();ctx.setLineDash([]);ctx.shadowBlur=0;
    if(state.showNodes){
      const sortedNodes=nodes.slice().sort((a,b)=>a.depth-b.depth);
      for(const n of sortedNodes){
        const r=state.nodeSize*(.78+clamp((n.depth+1)/4,0,.55)); if(r<=.1)continue;
        ctx.beginPath();ctx.arc(n.screen.x,n.screen.y,r,0,Math.PI*2);ctx.fillStyle=state.node;ctx.shadowColor=state.node;ctx.shadowBlur=state.glowRadius*(state.glow/100)*.65;ctx.fill();
      }
    }
    ctx.shadowBlur=0;
  }

  function render(time){
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle=state.bg;ctx.fillRect(0,0,width,height);
    const ps=panes(); let scale=1;
    if(ps.length===1){
      setView(ps[0]); for(const n of nodes)scale=project(n,time);
      drawScene(time);
      return scale;
    }
    for(const p of ps){
      setView(p); for(const n of nodes)project(n,time);
      ctx.save();ctx.beginPath();ctx.rect(p.x,0,p.w,height);ctx.clip();
      drawScene(time);
      ctx.restore();
      if(state.stereoDots){
        ctx.beginPath();ctx.arc(p.x+p.w/2,16,3.5,0,Math.PI*2);ctx.fillStyle=state.node;ctx.fill();
      }
    }
    // Leave a centre-eye projection (in pane-local coordinates) for touch picking and physics.
    setView({x:0,w:ps[0].w,eye:0}); for(const n of nodes)scale=project(n,time);
    return scale;
  }

  function physics(dt,scale,time){
    const spring=.012+(state.spring/100)*.095, damping=state.damping/100;
    for(const n of nodes){
      const breathe=state.reduced?1:1+Math.sin(time*.8+n.index*.035)*(state.motion/100)*.015;
      const tx=n.base.x*breathe,ty=n.base.y*breathe,tz=n.base.z*breathe;
      n.vel.x+=(tx-n.pos.x)*spring*dt*60;n.vel.y+=(ty-n.pos.y)*spring*dt*60;n.vel.z+=(tz-n.pos.z)*spring*dt*60;
    }
    for(const p of pointers.values()) if(p.mode==='pull'){
      const anchor=nodes[p.node]; if(!anchor)continue;
      const dx=(p.x-p.startX)/Math.max(20,scale),dy=-(p.y-p.startY)/Math.max(20,scale);
      const radius=.05+(state.radius/100)*1.05, force=.035+(state.pull/100)*.16;
      for(const n of nodes){
        const bx=n.base.x-anchor.base.x,by=n.base.y-anchor.base.y,bz=n.base.z-anchor.base.z;
        const dist=Math.sqrt(bx*bx+by*by+bz*bz),w=Math.max(0,1-dist/radius);if(!w)continue;
        const targetX=n.base.x+dx*w,targetY=n.base.y+dy*w;
        n.vel.x+=(targetX-n.pos.x)*force*dt*60;n.vel.y+=(targetY-n.pos.y)*force*dt*60;
        n.vel.z+=Math.hypot(dx,dy)*.015*w*dt*60;
      }
    }
    for(const n of nodes){
      n.vel.x*=Math.pow(damping,dt*60);n.vel.y*=Math.pow(damping,dt*60);n.vel.z*=Math.pow(damping,dt*60);
      n.pos.x+=n.vel.x*dt*60;n.pos.y+=n.vel.y*dt*60;n.pos.z+=n.vel.z*dt*60;
      const max=2.25,mag=Math.hypot(n.pos.x,n.pos.y,n.pos.z);if(mag>max){n.pos.x*=max/mag;n.pos.y*=max/mag;n.pos.z*=max/mag;}
    }
  }

  function loop(now){
    const dt=Math.min(.033,(now-lastTime)/1000||.016);lastTime=now;elapsed+=dt;
    if(!state.reduced&&!pointers.size)rotY+=dt*(state.rotation/100)*.38;
    const scale=render(elapsed);physics(dt,scale,elapsed);
    frameCount++; if(now-fpsTime>700){$('fpsReadout').textContent=`${Math.round(frameCount*1000/(now-fpsTime))} fps`;frameCount=0;fpsTime=now;}
    requestAnimationFrame(loop);
  }

  function pointFromEvent(e){ const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}; }
  function nearestNode(x,y){ let best=0,dist=Infinity;for(const n of nodes){const d=(n.screen.x-x)**2+(n.screen.y-y)**2;if(d<dist){dist=d;best=n.index;}}return{index:best,distance:Math.sqrt(dist)}; }
  // In stereo, a touch in either pane is mapped into pane-local coordinates.
  function paneOffsetAt(x){
    const ps=panes(); if(ps.length===1)return 0;
    return x<width/2?ps[0].x:ps[1].x;
  }

  canvas.addEventListener('pointerdown',(e)=>{
    if(isImmersive()&&e.clientY<Math.max(64,window.innerHeight*.12)){e.preventDefault();revealUI();return;}
    // Double tap / double click anywhere on the mesh in 3D view: apply a new random theme.
    if(state.stereo!=='off'&&pointers.size===0){
      const now=e.timeStamp;
      if(lastTap&&now-lastTap.t<320&&Math.hypot(e.clientX-lastTap.x,e.clientY-lastTap.y)<40){lastTap=null;e.preventDefault();randomTheme();return;}
      lastTap={t:now,x:e.clientX,y:e.clientY};
    }
    e.preventDefault();canvas.setPointerCapture(e.pointerId);const p=pointFromEvent(e),off=paneOffsetAt(p.x),near=nearestNode(p.x-off,p.y);
    const paneW=panes()[0].w, threshold=Math.max(62,Math.min(paneW,height)*.12);
    pointers.set(e.pointerId,{x:p.x,y:p.y,lastX:p.x,lastY:p.y,startX:p.x,startY:p.y,node:near.index,mode:near.distance<threshold?'pull':'rotate'});
    $('gestureHint').classList.add('hidden');
    if(navigator.vibrate&&near.distance<threshold)navigator.vibrate(8);
    updatePinch();
  });
  canvas.addEventListener('pointermove',(e)=>{
    const pstate=pointers.get(e.pointerId);if(!pstate)return;e.preventDefault();const p=pointFromEvent(e);
    if(pstate.mode==='rotate'&&lastPinch===null){rotY+=(p.x-pstate.lastX)*.006;rotX+=(p.y-pstate.lastY)*.006;rotX=clamp(rotX,-1.45,1.45);}
    pstate.lastX=pstate.x;pstate.lastY=pstate.y;pstate.x=p.x;pstate.y=p.y;
    const pair=[...pointers.values()].filter(v=>v.mode==='rotate').slice(0,2);
    if(pair.length===2){const dist=Math.hypot(pair[0].x-pair[1].x,pair[0].y-pair[1].y);if(lastPinch){state.zoom=clamp(state.zoom*(dist/lastPinch),.25,8);syncOne('zoom',state.zoom);}lastPinch=dist;}
  });
  function releasePointer(e){
    const p=pointers.get(e.pointerId);if(!p)return;
    if(state.hold&&p.mode==='pull')for(const n of nodes){const a=nodes[p.node],d=Math.hypot(n.base.x-a.base.x,n.base.y-a.base.y,n.base.z-a.base.z),r=.05+state.radius/100*1.05;if(d<r){n.base=vec(n.pos.x,n.pos.y,n.pos.z);}}
    pointers.delete(e.pointerId);lastPinch=null;updatePinch();
  }
  canvas.addEventListener('pointerup',releasePointer);canvas.addEventListener('pointercancel',releasePointer);
  canvas.addEventListener('wheel',(e)=>{e.preventDefault();state.zoom=clamp(state.zoom*Math.exp(-e.deltaY*.001),.25,8);syncOne('zoom',state.zoom);},{passive:false});
  function updatePinch(){const pair=[...pointers.values()].filter(v=>v.mode==='rotate').slice(0,2);lastPinch=pair.length===2?Math.hypot(pair[0].x-pair[1].x,pair[0].y-pair[1].y):null;}

  const controlMap={
    complexity:['nodes',Number,v=>`${v} nodes`,true],density:['density',Number,v=>v,true],thickness:['thickness',Number,v=>Number(v).toFixed(1)],nodeSize:['nodeSize',Number,v=>Number(v).toFixed(1)],zoom:['zoom',Number,v=>`${Number(v).toFixed(2)}×`],
    intensity:['intensity',Number,v=>`${v}%`],glow:['glow',Number,v=>`${v}%`],glowRadius:['glowRadius',Number,v=>v],falloff:['falloff',Number,v=>`${v}%`],softness:['softness',Number,v=>`${v}%`],
    pullStrength:['pull',Number,v=>`${v}%`],pullRadius:['radius',Number,v=>`${v}%`],spring:['spring',Number,v=>`${v}%`],damping:['damping',Number,v=>`${v}%`],motion:['motion',Number,v=>`${v}%`],rotation:['rotation',Number,v=>`${v}%`]
  };
  Object.entries(controlMap).forEach(([id,[key,parse,format,rebuildNeeded]])=>{
    $(id).addEventListener('input',e=>{state[key]=parse(e.target.value);$(`${id}Out`).value=format(state[key]);state.theme='Custom';$('themeTitle').textContent='Custom';if(rebuildNeeded)queueRebuild();});
  });
  function syncOne(id,value){const cfg=controlMap[id];if(!cfg)return;$(id).value=value;$(`${id}Out`).value=cfg[2](value);}
  function populateSelect(id,items){$(id).innerHTML=items.map(x=>`<option value="${x}">${x}</option>`).join('');}
  populateSelect('shapeSelect',shapes);populateSelect('styleSelect',styles);
  $('shapeSelect').addEventListener('change',e=>{state.shape=e.target.value;state.theme='Custom';$('themeTitle').textContent='Custom';rebuild(false);});
  $('styleSelect').addEventListener('change',e=>{state.style=e.target.value;state.theme='Custom';$('themeTitle').textContent='Custom';});
  [['lineColor','line'],['nodeColor','node'],['bgColor','bg']].forEach(([id,key])=>$(id).addEventListener('input',e=>{state[key]=e.target.value;state.theme='Custom';$('themeTitle').textContent='Custom';}));
  $('showNodes').addEventListener('change',e=>state.showNodes=e.target.checked);$('holdDeform').addEventListener('change',e=>state.hold=e.target.checked);$('reducedMotion').addEventListener('change',e=>state.reduced=e.target.checked);

  // ---------- Immersive mode: in fullscreen 3D, hide the interface after 10s idle ----------
  const UI_HIDE_MS=10000;
  let uiTimer=null, immersiveTipShown=false;
  function isFullView(){
    return !!(document.fullscreenElement||document.webkitFullscreenElement)
      ||window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
  }
  function immersiveEligible(){ return state.stereo!=='off'&&isFullView(); }
  function isImmersive(){ return document.body.classList.contains('immersive'); }
  function setImmersive(on){
    document.body.classList.toggle('immersive',on);
    if(on&&!immersiveTipShown){immersiveTipShown=true;showToast('Tap the top edge to show controls');}
  }
  function scheduleHide(){
    clearTimeout(uiTimer);uiTimer=null;
    if(!immersiveEligible()){setImmersive(false);return;}
    uiTimer=setTimeout(()=>{if(immersiveEligible())setImmersive(true);},UI_HIDE_MS);
  }
  function revealUI(){ setImmersive(false);scheduleHide(); }
  // Any touch on the interface (not the mesh) keeps it visible for another 10s.
  document.addEventListener('pointerdown',e=>{if(!isImmersive()&&!e.target.closest('#meshCanvas'))scheduleHide();},true);
  document.addEventListener('input',()=>{if(!isImmersive())scheduleHide();},true);
  document.addEventListener('fullscreenchange',scheduleHide);
  document.addEventListener('webkitfullscreenchange',scheduleHide);

  // ---------- Stereo controls (not part of themes) ----------
  const stereoModes=['off','cross','parallel'];
  const stereoLabels={off:'Off',parallel:'Parallel',cross:'Cross-eyed'};
  const stereoHelp={
    off:'Split the stage into a left-eye and right-eye pair you can free-view in 3D.',
    parallel:'Relax your eyes and look “through” the screen, as if at something far away, until the two images drift together into a third in the middle. Keep the pair small — on big screens, lower Pair width so the two centres are no farther apart than your eyes. Also works in a phone stereoscope.',
    cross:'Cross your eyes slightly until the two images overlap into a third in the middle. Tip: hold a fingertip halfway to the screen and focus on it, then let the mesh come into focus behind it. Works at any size.'
  };
  const stereoSliders={
    eyeSep:['eyeSep',v=>`${v}%`],
    stereoPlane:['stereoPlane',v=>v>0?`Out ${v}`:v<0?`In ${-v}`:'Screen'],
    paneSize:['paneSize',v=>`${v}%`]
  };
  Object.entries(stereoSliders).forEach(([id,[key,format]])=>{
    $(id).addEventListener('input',e=>{state[key]=Number(e.target.value);$(`${id}Out`).value=format(state[key]);});
  });
  $('stereoDots').addEventListener('change',e=>state.stereoDots=e.target.checked);
  function setStereo(mode,announce=true){
    state.stereo=mode;
    document.querySelectorAll('#stereoMode button').forEach(b=>{const on=b.dataset.mode===mode;b.classList.toggle('active',on);b.setAttribute('aria-checked',on);});
    $('stereoHelp').textContent=stereoHelp[mode];
    stage.classList.toggle('stereo',mode!=='off');
    $('panelToggleBtn').hidden=mode==='off';if(mode==='off')setPanelHidden(false);
    scheduleHide();
    const btn=$('stereoBtn');btn.classList.toggle('on',mode!=='off');btn.setAttribute('aria-label',`Stereo view: ${stereoLabels[mode]}`);btn.title=`Stereo view: ${stereoLabels[mode]}`;
    if(announce){
      if(mode==='off')showToast('Stereo off');
      else showToast(`${stereoLabels[mode]} stereo${height>width?' · turn sideways for a bigger pair':''}`);
    }
  }
  function setPanelHidden(hide){
    document.querySelector('.studio').classList.toggle('panel-hidden',hide);
    const b=$('panelToggleBtn');b.classList.toggle('on',hide);b.setAttribute('aria-pressed',hide);
    b.title=b.ariaLabel=hide?'Show controls':'Hide controls';b.setAttribute('aria-label',b.title);
  }
  $('panelToggleBtn').addEventListener('click',()=>setPanelHidden(!document.querySelector('.studio').classList.contains('panel-hidden')));
  $('stereoMode').addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(b)setStereo(b.dataset.mode);});
  $('stereoBtn').addEventListener('click',()=>setStereo(stereoModes[(stereoModes.indexOf(state.stereo)+1)%stereoModes.length]));
  function syncStereo(){
    Object.entries(stereoSliders).forEach(([id,[key,format]])=>{$(id).value=state[key];$(`${id}Out`).value=format(state[key]);});
    $('stereoDots').checked=state.stereoDots;setStereo(state.stereo,false);
  }

  function syncControls(){
    Object.entries(controlMap).forEach(([id,[key,,format]])=>{ $(id).value=state[key];$(`${id}Out`).value=format(state[key]); });
    $('shapeSelect').value=state.shape;$('styleSelect').value=state.style;$('lineColor').value=state.line;$('nodeColor').value=state.node;$('bgColor').value=state.bg;
    $('showNodes').checked=state.showNodes;$('holdDeform').checked=state.hold;$('reducedMotion').checked=state.reduced;
  }
  function applyTheme(index){
    const t=themes[index];Object.assign(state,{shape:t.shape,style:t.style,nodes:t.nodes,density:t.density,line:t.line,node:t.node,bg:t.bg,thickness:t.thickness,nodeSize:t.nodeSize,glow:t.glow,glowRadius:t.glowRadius,falloff:t.falloff,softness:t.softness,intensity:t.intensity,zoom:t.zoom,pull:t.pull,radius:t.radius,spring:t.spring,damping:t.damping,motion:t.motion,rotation:t.rotation,theme:t.name});
    $('themeTitle').textContent=t.name;syncControls();rebuild(false);document.querySelectorAll('.theme-card').forEach((el,i)=>el.classList.toggle('selected',i===index));showToast(`${t.name} applied`);
  }
  function buildThemes(){
    $('themeGrid').innerHTML=themes.map((t,i)=>`<button class="theme-card${i===0?' selected':''}" data-theme="${i}" style="--swatch:${t.line};--swatch-bg:${t.bg}"><strong>${t.name}</strong><span>${t.style.replace(' Network','')}</span></button>`).join('');
    $('themeGrid').addEventListener('click',e=>{const card=e.target.closest('[data-theme]');if(card)applyTheme(Number(card.dataset.theme));});
  }

  document.querySelectorAll('.tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t===tab));document.querySelectorAll('.tab-panel').forEach(p=>p.classList.toggle('active',p.id===`tab-${tab.dataset.tab}`));}));
  const panel=$('controlPanel');$('panelHandle').addEventListener('click',()=>panel.classList.toggle('open'));$('panelClose').addEventListener('click',()=>panel.classList.remove('open'));
  $('dismissHint').addEventListener('click',()=>$('gestureHint').classList.add('hidden'));
  $('resetBtn').addEventListener('click',()=>{rotX=-.12;rotY=.3;nodes.forEach(n=>{n.pos=vec(n.base.x,n.base.y,n.base.z);n.vel=vec();});showToast('Mesh reset');});
  function randomTheme(){
    const current=themes.findIndex(t=>t.name===state.theme);
    let i=Math.floor(Math.random()*themes.length);
    if(themes.length>1&&i===current)i=(i+1+Math.floor(Math.random()*(themes.length-1)))%themes.length;
    applyTheme(i);
  }
  $('randomizeBtn').addEventListener('click',randomTheme);
  $('fullscreenBtn').addEventListener('click',async()=>{try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen();else await document.exitFullscreen();}catch{showToast('Fullscreen is unavailable');}});

  $('videoFile').addEventListener('change',e=>{
    const file=e.target.files?.[0];if(!file)return;if(objectUrl)URL.revokeObjectURL(objectUrl);objectUrl=URL.createObjectURL(file);video.src=objectUrl;video.muted=true;video.play().catch(()=>{});$('videoName').textContent=file.name;$('videoBar').hidden=false;showToast('Video added locally');
  });
  $('videoPlay').addEventListener('click',()=>{if(video.paused){video.play();$('videoPlay').textContent='Ⅱ';}else{video.pause();$('videoPlay').textContent='▶';}});
  $('videoMute').addEventListener('click',()=>{video.muted=!video.muted;$('videoMute').textContent=video.muted?'Muted':'Sound';});
  $('videoMode').addEventListener('change',e=>state.videoMode=e.target.value);
  $('videoRemove').addEventListener('click',()=>{video.pause();video.removeAttribute('src');video.load();if(objectUrl)URL.revokeObjectURL(objectUrl);objectUrl=null;$('videoBar').hidden=true;$('videoFile').value='';showToast('Video removed');});

  $('savePngBtn').addEventListener('click',()=>{const a=document.createElement('a');a.download=`premier-mesh-${state.stereo!=='off'?state.stereo+'-stereo-':''}${Date.now()}.png`;a.href=canvas.toDataURL('image/png');a.click();showToast('PNG captured');});
  $('saveProjectBtn').addEventListener('click',()=>{localStorage.setItem('premierMeshProject',JSON.stringify(state));showToast('Project saved on this device');});
  $('recordBtn').addEventListener('click',()=>{
    if(!window.MediaRecorder||!canvas.captureStream){showToast('Recording is unavailable');return;}
    if(recorder&&recorder.state==='recording'){recorder.stop();return;}
    chunks=[];const stream=canvas.captureStream(60);recorder=new MediaRecorder(stream,{mimeType:MediaRecorder.isTypeSupported('video/webm;codecs=vp9')?'video/webm;codecs=vp9':'video/webm'});
    recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};recorder.onstop=()=>{const blob=new Blob(chunks,{type:'video/webm'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`premier-mesh-${Date.now()}.webm`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);$('recordBtn').textContent='Record';showToast('Recording saved');};recorder.start();$('recordBtn').textContent='Stop';showToast('Recording started');
  });

  document.addEventListener('visibilitychange',()=>{if(document.hidden&&recorder?.state==='recording')recorder.stop();});
  new ResizeObserver(resize).observe(stage);window.addEventListener('resize',resize);

  buildThemes();syncControls();syncStereo();resize();rebuild();requestAnimationFrame(loop);
})();
