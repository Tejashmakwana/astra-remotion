import React from 'react';
import {AbsoluteFill, Audio, Img, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';

const blue='#87A7FA';
const ease=(f:number,a:number,b:number,x=0,y=1)=>interpolate(f,[a,b],[x,y],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:t=>1-Math.pow(1-t,3)});
const enter=(f:number,d=0)=>({opacity:ease(f,d,d+7),transform:`translateY(${ease(f,d,d+15,32,0)}px)`,filter:`blur(${ease(f,d,d+10,9,0)}px)`});
const center:React.CSSProperties={display:'flex',alignItems:'center',justifyContent:'center'};
const panel:React.CSSProperties={background:'#fff',border:'2px solid #d5d5d5',borderRadius:34};
const Mark:React.FC<{size?:number;white?:boolean}>=({size=100,white=false})=><Img src={staticFile('openai-mark.png')} style={{width:size,height:size,objectFit:'contain',filter:white?'invert(1)':undefined,mixBlendMode:white?'screen':'multiply'}}/>;
const Cursor:React.FC<{x:number;y:number;scale?:number}>=({x,y,scale=1})=><svg style={{position:'absolute',left:x,top:y,filter:'drop-shadow(2px 4px 3px #0005)',transform:`scale(${scale})`,transformOrigin:'top left'}} width="65" height="86" viewBox="0 0 65 86"><path d="M6 4 L6 68 L23 52 L36 79 L48 73 L34 47 L58 45 Z" fill="black" stroke="white" strokeWidth="4"/></svg>;
const Pill:React.FC<{children:React.ReactNode;style?:React.CSSProperties}>=({children,style})=><div style={{...panel,borderRadius:70,padding:'22px 34px',...style}}>{children}</div>;

function KineticText({text,f,size=160,delay=0,stagger=0.65,exitAt=10000,accentFrom=10000,glow=false}:{text:string;f:number;size?:number;delay?:number;stagger?:number;exitAt?:number;accentFrom?:number;glow?:boolean}) {
 const out=ease(f,exitAt,exitAt+5);
 return <div style={{whiteSpace:'pre',fontSize:size,fontWeight:500,letterSpacing:-size*.055,lineHeight:1.1,transform:`translateX(${-out*320}px) scale(${1-out*.025})`,opacity:1-out,filter:`blur(${out*13}px)`}}>{Array.from(text).map((char,i)=>{
  const age=f-delay-i*stagger;
  const p=ease(age,0,6);
  return <span key={i} style={{display:'inline-block',opacity:p,transform:`translate(${(1-p)*24}px,${(1-p)*8}px)`,filter:`blur(${(1-p)*16}px)`,color:i>=accentFrom && (text!=="Build with it." || i<5)?blue:undefined,textShadow:glow&&i>=accentFrom?'0 0 15px #b1caff,0 0 42px #7c9dfb':undefined}}>{char}</span>;
 })}</div>;
}
function Intro({f}:{f:number}) {
 const beat=f<22?0:f<61?1:f<80?2:3;
 const starts=[0,22,61,80];
 const labels=['Introducing','Claude Fable 5.1','Kidding.','No, we’re moving to Astra.'];
 const sizes=[170,180,195,115];
 const lengths=[22,39,19,40];
 return <AbsoluteFill style={center}><KineticText key={beat} text={labels[beat]} f={f-starts[beat]} size={sizes[beat]} stagger={beat===3?.45:.65} exitAt={lengths[beat]-5}/></AbsoluteFill>;
}
function Connect({f}:{f:number}) {
 const opened=f>35;
 return <AbsoluteFill style={{...center,background:opened?'radial-gradient(ellipse at 90% 0%,#96b5ff99,transparent 45%),radial-gradient(ellipse at 60% 100%,#ff997e88,transparent 45%),#fff':'white'}}>
 <div style={{position:'absolute',left:210,top:250,width:790,height:240,borderRadius:80,background:'#181818',boxShadow:'0 12px 24px #0003',color:'white',...center, gap:35,transform:`scale(${ease(f,0,25,1.65,1)})`,opacity:opened?0:1}}><span style={{fontSize:75}}>✳</span><Mark size={70} white/><span style={{fontSize:76}}>✦ G</span><div style={{marginLeft:60,fontSize:100,lineHeight:.5}}>☰</div></div>
 {!opened&&<><div style={{position:'absolute',left:1000,top:363,width:280,height:16,background:'#aaa',transformOrigin:'left',transform:`scaleX(${ease(f,12,27)})`}}/><Pill style={{position:'absolute',left:1250,top:280,background:blue,color:'white',border:0,fontSize:65,...enter(f,15)}}>↗ Astra</Pill><Cursor x={ease(f,0,35,1060,1330)} y={520}/></>}
 {opened&&<><svg style={{position:'absolute',inset:0}} width="1920" height="1080">{[220,390,550,720,880].map((y,i)=><path key={i} d={`M390 ${y} C720 ${y},640 545,965 545`} stroke="#b6b6b6" strokeWidth="2" fill="none" style={{opacity:ease(f,40+i*3,60+i*3)}}/>)}</svg>{['G','◉','✳','⌘','✦'].map((s,i)=><div key={s} style={{position:'absolute',left:260+(i%2)*100,top:150+i*164,width:138,height:138,borderRadius:25,background:'#050505',color:'white',fontSize:105,...center,...enter(f,36+i*3)}}>{s==='◉'?<Mark size={100} white/>:s}</div>)}<div style={{position:'absolute',left:965,top:445,display:'flex',alignItems:'center',gap:30,...enter(f,43)}}><div style={{width:180,height:180,borderRadius:44,background:'#151515',boxShadow:'0 10px 24px #0004',...center}}><Mark size={136} white/></div><span style={{fontSize:84,fontWeight:650,letterSpacing:-4}}>OpenAI <span style={{color:blue}}>Astra</span></span></div></>}
 </AbsoluteFill>;
}
function Chat({f}:{f:number}) {
 const prompt='Did we just achieve AGI again?';
 const zoom=ease(f,0,22,1,1.46)-ease(f,93,113,0,.46);
 return <AbsoluteFill><div style={{position:'absolute',left:70,top:45,display:'flex',alignItems:'center',gap:16,fontSize:36}}><Mark size={75}/>ChatGPT <span style={{color:'#777'}}>⌄</span></div>
 <div style={{position:'absolute',left:270,top:330,width:1380,transform:`scale(${zoom})`,transformOrigin:'40% 45%'}}><div style={{fontSize:78,letterSpacing:-4,textAlign:'center',marginBottom:90,color:'#515151'}}>Which model are we glazing today?</div><div style={{...panel,height:280,borderRadius:140,boxShadow:'0 18px 20px #0003',padding:'55px 90px',fontSize:50}}>{prompt.slice(0,Math.floor(ease(f,24,103,0,prompt.length)))}<span style={{opacity:f%20<12?1:0,color:'#777'}}>|</span><div style={{marginTop:50,fontSize:55}}>＋</div></div><Cursor x={ease(f,0,110,720,1110)} y={335}/></div></AbsoluteFill>;
}
const cards=[['✎','1. New model drops','The benchmarks are green. The timeline loses its mind.'],['♧','2. Declare AGI','For the twentieth time this year. This one is different.'],['↗','3. Cancel Claude','Fable 5 is so last week. Move every project. Again.'],['◎','4. Repeat Thursday','The next release is already typing…']];
function Plan({f}:{f:number}) {
 return <AbsoluteFill style={{padding:'85px 330px'}}><Pill style={{float:'right',alignSelf:'flex-end',width:'fit-content',border:0,background:'#eee',fontSize:28,padding:'18px 26px'}}>Did we just achieve AGI again?</Pill><div style={{clear:'both',paddingTop:65,fontSize:31,lineHeight:1.15,...enter(f,6)}}>Checking the timeline…<br/>We’ve achieved AGI 20 times this year.<br/>And somehow, we’re still fixing the same bug.</div><div style={{fontSize:39,fontWeight:550,marginTop:48,...enter(f,15)}}>The new best model: <span style={{color:blue}}>until Thursday.</span></div><div style={{display:'flex',gap:10,marginTop:35}}>{cards.map(([icon,title,body],i)=><div key={title} style={{...panel,width:305,height:285,borderRadius:34,padding:22,...enter(f,22+i*6)}}><div style={{fontSize:36,color:[blue,'#ba76bc','#777','#7ba58a'][i]}}>{icon}</div><div style={{fontSize:23,fontWeight:650,margin:'20px 0'}}>{title}</div><div style={{fontSize:24,lineHeight:1.15,color:'#666'}}>{body}</div></div>)}</div><Pill style={{position:'absolute',bottom:120,left:310,right:310,fontSize:31,boxShadow:'0 8px 20px #0002',display:'flex',justifyContent:'space-between'}}>＋ Did we just achieve AGI again?<span style={{color:blue}}>●</span></Pill></AbsoluteFill>;
}
const actions=[['Context','Another $200, well spent'],['Direction','Three days of brand loyalty'],['First draft','20 breakthroughs. Same year.'],['Next step','Already reconsidering everything']];
function Actions({f}:{f:number}) {
 return <AbsoluteFill style={{padding:'290px 210px'}}><div style={{display:'flex',alignItems:'center',gap:30,fontSize:72,fontWeight:650,letterSpacing:-3,...enter(f)}}><Mark size={130}/>Migrating. Again. <span style={{opacity:.5+Math.sin(f/5)*.5}}>•••</span></div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:28,marginTop:50}}>{actions.map(([a,b],i)=><Pill key={a} style={{height:115,borderRadius:65,fontSize:31,...enter(f,i*5+8)}}>{f<30+i*8?<><div style={{height:17,width:'95%',background:blue,borderRadius:20,marginBottom:15}}/><div style={{height:17,width:'58%',background:'#a9c3ff',borderRadius:20}}/></>:<div style={{display:'flex',gap:20}}><span style={{color:blue}}>☑</span><div>{a}<div style={{color:'#537dcc'}}>{b}</div></div></div>}</Pill>)}</div></AbsoluteFill>;
}
function Report({f}:{f:number}) {
 const scroll=ease(f,15,70,0,-320);
 return <AbsoluteFill><div style={{position:'absolute',left:290,top:95+scroll,width:1340}}><Pill style={{float:'right',alignSelf:'flex-end',width:'fit-content',border:0,background:'#eee',fontSize:30}}>Tell the team. We’ve moved to Astra.</Pill><div style={{clear:'both',paddingTop:70,fontSize:34,...enter(f,5)}}>Packing our prompts. Again.<br/>Updating our entire personality.</div><div style={{fontSize:44,fontWeight:550,margin:'55px 0 30px',...enter(f,10)}}>Preparing the victory lap <span style={{color:blue}}>•••</span></div><div style={{...panel,padding:32,width:850,borderRadius:15,...enter(f,20)}}><div style={{fontSize:32,fontWeight:600,paddingBottom:28,borderBottom:'1px solid #ddd'}}>This week’s final verdict</div>{['Astra just killed Claude Fable 5.','We’ve achieved AGI 20 times this year.','We’ve moved to Astra. It’s official.','Until the next release, obviously.'].map((s,i)=><div key={s} style={{fontSize:29,display:'flex',gap:28,marginTop:28,...enter(f,25+i*5)}}><span style={{color:blue}}>↗</span>{s}</div>)}</div><div style={{fontSize:53,margin:'65px 0 45px',...enter(f,48)}}>Ready to post with absolute confidence</div><div style={{...panel,display:'flex',alignItems:'center',gap:40,padding:40,...enter(f,52)}}><div style={{color:blue,fontSize:100,transform:'rotate(-10deg)'}}>▤</div><div style={{fontSize:42}}>Why Astra changes everything. Again.<div style={{fontSize:31,color:'#aaa',marginTop:12}}>Hot take · Expires next release</div></div><span style={{marginLeft:'auto',fontSize:55,color:blue}}>↗</span></div></div><Cursor x={ease(f,62,82,1020,465)} y={ease(f,62,82,900,820)}/></AbsoluteFill>;
}
function Notification({f}:{f:number}) {return <AbsoluteFill style={{...center,background:'#c2d3ff'}}><div style={{display:'flex',alignItems:'center',gap:35,width:1080,padding:48,borderRadius:75,background:'white',boxShadow:'0 9px 18px #52639455',transform:`scale(${spring({frame:f,fps:25,config:{damping:16,stiffness:140}})})`}}><div style={{width:175,height:175,background:'#25282b',borderRadius:40,flexShrink:0,...center}}><svg width="120" height="120" viewBox="0 0 120 120">{['#36c5f0','#2eb67d','#ecb22e','#e01e5a'].map((c,i)=><g key={c} transform={`rotate(${i*90} 60 60)`}><rect x="23" y="47" width="49" height="22" rx="11" fill={c}/><rect x="23" y="21" width="22" height="22" rx="11" fill={c}/></g>)}</svg></div><div style={{fontSize:32,lineHeight:1.15}}><div style={{fontSize:35,fontWeight:550,marginBottom:20}}>New message in #model-hopping</div>We’ve moved to Astra.<br/>Until the next release.<br/>AGI achieved: 20 times this year.</div><span style={{fontSize:30,color:'#888',alignSelf:'flex-start'}}>Now</span></div></AbsoluteFill>;}
function Outro({f}:{f:number}) {
 if(f>=128) {
  const local=f-128;
  return <AbsoluteFill style={{...center,background:'radial-gradient(ellipse at 0% 110%,#6e2b2499,transparent 48%),radial-gradient(ellipse at 105% -10%,#2d467c88,transparent 50%),#090909'}}><div style={{...center,flexDirection:'column',gap:44}}><Pill style={{background:'transparent',color:'white',border:'2px solid #fffd',padding:'35px 65px',boxShadow:`0 0 ${ease(local,0,22,4,24)}px #fff8,inset 0 0 22px #ffffff18`,textShadow:'0 0 12px #fff8',transform:`scale(${ease(local,0,24,.48,1)})`,opacity:ease(local,0,7)}}><KineticText text="OpenAI Astra" f={local} size={76} stagger={1.3}/></Pill><div style={{color:'#aaa',fontSize:23,letterSpacing:3,...enter(local,24)}}>UNTIL THE NEXT RELEASE.</div></div></AbsoluteFill>;
 }
 const black=f>=36&&f<89;
 return <AbsoluteFill style={{...center,background:black?'#000':'#fff',color:black?'white':'#080808'}}>
 {f<36?<KineticText text="We’re moving" f={f} size={f<19?ease(f,0,18,245,165):165} stagger={1.1} exitAt={32}/>:f<68?<KineticText text="We’re moving to Astra." f={f-36} size={105} accentFrom={16} glow stagger={.45} exitAt={63-36}/>:f<89?<KineticText text="Astra" f={f-68} size={295} accentFrom={0} glow stagger={.8} exitAt={86-68}/>:<KineticText text="Build with it." f={f-89} size={160} accentFrom={0} stagger={.7} exitAt={124-89}/>}
 </AbsoluteFill>;
}
export const Film:React.FC=()=>{const frame=useCurrentFrame();let scene:React.ReactNode;
 if(frame<120)scene=<Intro f={frame}/>;
 else if(frame<225)scene=<Connect f={frame-120}/>;
 else if(frame<350)scene=<Chat f={frame-225}/>;
 else if(frame<455)scene=<Plan f={frame-350}/>;
 else if(frame<560)scene=<Actions f={frame-455}/>;
 else if(frame<740)scene=<Report f={frame-560}/>;
 else if(frame<815)scene=<Notification f={frame-740}/>;
 else scene=<Outro f={frame-815}/>;
 return <AbsoluteFill style={{background:'white',color:'#080808',fontFamily:'Arial, Helvetica, sans-serif',overflow:'hidden'}}>{scene}<Audio src={staticFile('soundtrack.m4a')}/></AbsoluteFill>;
};
