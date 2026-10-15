'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { characters, official, scenes, sceneNamesJa, assetRecords } from '@/lib/content';
import { makeL, type Lang } from '@/lib/i18n';
import Memories from './Memories';
import { Arrow, City, Heart, MonsterSilhouette, OfficialArt, Paw, Star } from './Graphics';

gsap.registerPlugin(ScrollTrigger, Flip, ScrollToPlugin, useGSAP);
const external={target:'_blank',rel:'noopener noreferrer'} as const;
function SplitText({text}:{text:string}){return <span aria-label={text}>{Array.from(text).map((letter,i)=><span className="letter" aria-hidden="true" key={i}>{letter===' '?'\u00a0':letter}</span>)}</span>;}
function Eyebrow({n,children}:{n:string;children:React.ReactNode}){return <p className="eyebrow"><span>{n}</span><span className="eyebrow-line"/>{children}</p>;}

export default function Tribute(){
  const root=useRef<HTMLDivElement>(null), characterStage=useRef<HTMLDivElement>(null);
  const intro=useRef<gsap.core.Timeline|null>(null);
  const introHasPlayed=useRef(false);
  const [activeScene,setActiveScene]=useState(0), [selected,setSelected]=useState(0);
  const [reduced,setReduced]=useState(false), [lang,setLang]=useState<Lang>('zh');
  const [menu,setMenu]=useState(false), [pv,setPv]=useState(false), [credits,setCredits]=useState(false);
  const modalRef=useRef<HTMLDialogElement>(null), pvRef=useRef<HTMLDialogElement>(null);
  const quiet=reduced;
  const {S,L}=makeL(lang);
  const selectedRef=useRef(0), charTrigger=useRef<ScrollTrigger|null>(null), autoScrolling=useRef(false);
  const person=characters[selected];

  useEffect(()=>{
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync=()=>setReduced(media.matches); media.addEventListener('change',sync);
    const frame=requestAnimationFrame(()=>{
      sync();
      try {
        const saved=localStorage.getItem('caramel-lang');
        if(saved==='ja'||saved==='zh')setLang(saved);
      } catch{}
    });
    return ()=>{cancelAnimationFrame(frame);media.removeEventListener('change',sync);};
  },[]);
  useEffect(()=>{selectedRef.current=selected;},[selected]);
  useEffect(()=>{
    document.documentElement.lang=lang==='ja'?'ja':'zh-Hant';
    document.title=lang==='ja'?'乙女怪獣キャラメリゼ｜第1期完結記念':'少女怪獸焦糖戀心｜第一季完結紀念';
  },[lang]);
  useEffect(()=>{
    const block=(e:DragEvent)=>{if(e.target instanceof HTMLImageElement||e.target instanceof SVGElement)e.preventDefault();};
    document.addEventListener('dragstart',block);return()=>document.removeEventListener('dragstart',block);
  },[]);
  const go=useCallback((index:number)=>{
    const clamped=Math.max(0,Math.min(scenes.length-1,index));
    const node=document.getElementById(scenes[clamped][0]);
    node?.scrollIntoView({behavior:quiet?'instant':'smooth',block:'start'});setMenu(false);
  },[quiet,setMenu]);
  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{
      if(menu||credits||pv||e.altKey||e.ctrlKey||e.metaKey) return;
      if((e.target as HTMLElement).closest('button,a,input,textarea,select,[role="tablist"],dialog')) return;
      if(e.key==='ArrowDown'||e.key==='PageDown'){e.preventDefault();go(activeScene+1);}
      if(e.key==='ArrowUp'||e.key==='PageUp'){e.preventDefault();go(activeScene-1);}
      if(e.key==='Home'){e.preventDefault();go(0);}
      if(e.key==='End'){e.preventDefault();go(scenes.length-1);}
    };window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey);
  },[activeScene,go,menu,credits,pv]);
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){const i=scenes.findIndex(s=>s[0]===entry.target.id);if(i>=0)setActiveScene(i);}});},{rootMargin:'-20% 0px -65% 0px'});
    scenes.forEach(([id])=>{const el=document.getElementById(id);if(el) observer.observe(el);});
    return()=>observer.disconnect();
  },[]);
  useEffect(()=>{if(credits)modalRef.current?.showModal();else modalRef.current?.close();},[credits]);
  useEffect(()=>{if(pv)pvRef.current?.showModal();else pvRef.current?.close();},[pv]);

  useGSAP(()=>{
    if(quiet){gsap.set('.intro-veil',{autoAlpha:0});return;}
    if(!introHasPlayed.current&&window.scrollY<window.innerHeight*.3){
    gsap.set('.intro-veil',{autoAlpha:1});
    intro.current=gsap.timeline({defaults:{ease:'power3.out'},onComplete:()=>{introHasPlayed.current=true;}})
      .to('.intro-heart',{scale:1.2,duration:.18,repeat:1,yoyo:true})
      .to('.intro-veil',{autoAlpha:0,duration:.7},.65)
      .from('.hero-kaiju',{y:110,opacity:0,duration:1.5},.45)
      .from('.hero-girl',{y:65,opacity:0,duration:1.2},.65)
      .from('.hero-title .letter',{yPercent:110,rotate:6,opacity:0,stagger:.045,duration:1},.6)
      .from('.hero-meta,.hero-description,.hero-actions',{y:16,opacity:0,stagger:.1,duration:.75},1.05);
    }else{gsap.set('.intro-veil',{autoAlpha:0});}
    gsap.to('.heartbeat-line',{strokeDashoffset:0,duration:3.2,repeat:-1,ease:'none'});
    gsap.to('.orbit-star',{rotation:180,repeat:-1,duration:35,ease:'none'});
    gsap.to('.floating-petal',{y:'-=30',rotation:'+=32',stagger:.13,duration:4,repeat:-1,yoyo:true,ease:'sine.inOut'});
    const hero=root.current?.querySelector<HTMLElement>('.hero');
    const girl=root.current?.querySelector('.hero-girl');
    const xTo=girl?gsap.quickTo(girl,'x',{duration:1.2,ease:'power2.out'}):()=>{};
    const yTo=girl?gsap.quickTo(girl,'y',{duration:1.2,ease:'power2.out'}):()=>{};
    const pointer=(event:PointerEvent)=>{if(event.pointerType!=='mouse'||innerWidth<768)return;const rect=hero?.getBoundingClientRect();if(rect){xTo((event.clientX/rect.width-.5)*16);yTo((event.clientY/rect.height-.5)*10);}};
    const leave=()=>{xTo(0);yTo(0);};
    hero?.addEventListener('pointermove',pointer);hero?.addEventListener('pointerleave',leave);
    gsap.utils.toArray<HTMLElement>('.reveal-heading').forEach(el=>{
      gsap.from(el.querySelectorAll('.letter'),{yPercent:105,opacity:0,stagger:.035,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none reverse'}});
    });
    gsap.utils.toArray<HTMLElement>('.manga-panel').forEach((el,i)=>{
      gsap.fromTo(el,{y:70+i*25,rotate:i%2?4:-4},{y:-25,rotate:i%2?-2:2,ease:'none',scrollTrigger:{trigger:'.manga-panels',start:'top bottom',end:'bottom top',scrub:1}});
    });
    gsap.to('.girl-claw',{clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:{trigger:'#girl',start:'center center',end:'bottom center',scrub:true}});
    const mm=gsap.matchMedia();
    mm.add('(min-width: 768px)',()=>{
      const monster=gsap.timeline({scrollTrigger:{trigger:'.kaiju-scroll',start:'top top',end:'+=150%',pin:'.kaiju-stage',scrub:1.2,anticipatePin:1}});
      monster.fromTo('.monster-art',{y:180,scale:.7,opacity:.15},{y:0,scale:1,opacity:1,duration:1.2})
        .to('.city-back',{x:-50,y:30,scale:1.1,duration:2},0)
        .to('.city-front',{x:80,y:75,scale:1.25,duration:2},0)
        .fromTo('.kaiju-tail',{xPercent:55,rotate:15},{xPercent:-18,rotate:-7,duration:1.4},.2)
        .fromTo('.kaiju-scratch',{clipPath:'polygon(0 0,0 0,0 100%,0 100%)'},{clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)',duration:.6},1)
        .fromTo('.heat-beam',{scaleX:0,opacity:0},{scaleX:1,opacity:.5,duration:.5},1.6)
        .to('.kaiju-stage',{x:3,y:2,duration:.06,repeat:5,yoyo:true},1.8);
    });
    mm.add('(max-width: 767px)',()=>{
      gsap.from('.monster-art',{y:90,opacity:0,ease:'none',scrollTrigger:{trigger:'.kaiju-stage',start:'top 80%',end:'center center',scrub:1}});
      gsap.to('.city-front',{x:30,ease:'none',scrollTrigger:{trigger:'.kaiju-stage',start:'top bottom',end:'bottom top',scrub:1}});
    });
    mm.add('(min-width: 900px) and (min-height: 760px)',()=>{
      const count=characters.length;
      const trigger=ScrollTrigger.create({trigger:'#characters',start:'top top',end:()=>`+=${window.innerHeight*.5*count}`,pin:true,anticipatePin:1,invalidateOnRefresh:true,
        onUpdate:self=>{
          if(autoScrolling.current)return;
          const index=Math.min(count-1,Math.floor(self.progress*count));
          if(index!==selectedRef.current){selectedRef.current=index;setSelected(index);}
        }});
      charTrigger.current=trigger;
      gsap.from('.character-section .section-heading,.character-tabs',{autoAlpha:0,y:24,stagger:.1,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'#characters',start:'top 80%',toggleActions:'play none none reverse'}});
      return()=>{charTrigger.current=null;autoScrolling.current=false;};
    });
    const embrace=gsap.timeline({scrollTrigger:{trigger:'.embrace-scroll',start:'top top',end:()=>`+=${window.innerHeight*(window.innerWidth<768?1.4:2)}`,pin:'.embrace-stage',scrub:1.5,anticipatePin:1}});
    embrace.fromTo('.surface-image',{scale:1.04},{scale:1.18,duration:2},0)
      .to('.embrace-copy-first',{autoAlpha:0,y:-30,duration:.7},1)
      .fromTo('.underwater-layer',{clipPath:'circle(0% at 50% 55%)',opacity:0},{clipPath:'circle(80% at 50% 55%)',opacity:1,duration:1.5},1.3)
      .fromTo('.underwater-image',{scale:1.13,rotation:-4},{scale:1.04,rotation:0,duration:2.2},1.3)
      .fromTo('.embrace-copy-last',{autoAlpha:0,y:30},{autoAlpha:1,y:0,duration:.8},2.7)
      .fromTo('.embrace-topline',{autoAlpha:0,y:-18},{autoAlpha:1,y:0,duration:.5},0)
      .fromTo('.embrace-copy-first>*',{autoAlpha:0,y:26},{autoAlpha:1,y:0,stagger:.18,duration:.6},.05)
      .to('.embrace-scroll-cue',{autoAlpha:0,y:12,duration:.4},.7)
      .fromTo('.water-shade',{opacity:.55},{opacity:1,duration:2.5},.8)
      .fromTo('.embrace-copy-last>*',{y:22,autoAlpha:0},{y:0,autoAlpha:1,stagger:.15,duration:.6},2.75)
      .to('.embrace-credit',{opacity:.9,duration:.6},3)
      .to('.water-light',{xPercent:20,opacity:.7,duration:3.5},0);
    gsap.to('.embrace-scroll-cue>span',{y:8,duration:.9,repeat:-1,yoyo:true,ease:'sine.inOut'});
    gsap.utils.toArray<HTMLElement>('.bubble').forEach((el,i)=>gsap.to(el,{y:-180-(i%5)*25,x:(i%2?-1:1)*25,opacity:.5,duration:5+i%4,repeat:-1,delay:i*.24,ease:'sine.inOut'}));
    gsap.to('.water-ripple',{scale:1.5,opacity:0,stagger:1.2,duration:4,repeat:-1,ease:'power1.out'});
    gsap.from('.finale-title .letter',{yPercent:110,rotate:7,stagger:.045,duration:1,ease:'back.out(1.2)',scrollTrigger:{trigger:'.finale-title',start:'top 90%',toggleActions:'play none none reverse'}});
    const finale=gsap.timeline({defaults:{ease:'power3.out'},scrollTrigger:{trigger:'#finale',start:'top 65%',toggleActions:'play none none reverse'}});
    finale.from('.finale-section>.eyebrow',{autoAlpha:0,y:16,duration:.6})
      .from('.finale-kicker',{autoAlpha:0,y:20,letterSpacing:'14px',duration:.9},.15)
      .from('.finale-message',{autoAlpha:0,y:22,duration:.8},.9)
      .from('.season-two>*',{autoAlpha:0,y:18,stagger:.15,duration:.7},1.15)
      .from('.finale-links a',{autoAlpha:0,y:14,stagger:.12,duration:.6},1.5);
    gsap.fromTo('.finale-photo',{yPercent:-8},{yPercent:8,ease:'none',scrollTrigger:{trigger:'#finale',start:'top bottom',end:'bottom top',scrub:true}});
    gsap.utils.toArray<HTMLElement>('.finale-stars svg').forEach((el,i)=>{
      gsap.to(el,{opacity:.12,scale:1.4,rotation:i%2?-90:90,duration:2.2+i*.5,repeat:-1,yoyo:true,ease:'sine.inOut',delay:i*.4});
      gsap.to(el,{y:-60-i*30,ease:'none',scrollTrigger:{trigger:'#finale',start:'top bottom',end:'bottom top',scrub:1}});
    });
    gsap.to('.season-two>strong',{opacity:.55,duration:1.4,repeat:-1,yoyo:true,ease:'sine.inOut'});
    const onRefresh=()=>ScrollTrigger.refresh();
    document.fonts.ready.then(onRefresh);
    return()=>{mm.revert();intro.current=null;hero?.removeEventListener('pointermove',pointer);hero?.removeEventListener('pointerleave',leave);};
  },{scope:root,dependencies:[quiet,lang],revertOnUpdate:true});

  useGSAP(()=>{
    const stage=characterStage.current;if(!stage||quiet) return;
    const t=gsap.timeline();
    const state=Flip.getState(stage.querySelectorAll('.character-fact'));
    Flip.from(state,{duration:.5,ease:'power2.out',absolute:false});
    t.fromTo('.character-art-wrap',{clipPath:'inset(0 100% 0 0)',x:30},{clipPath:'inset(0 0% 0 0)',x:0,duration:.8,ease:'power3.inOut'})
      .from('.character-jp .letter',{yPercent:110,stagger:.055,duration:.6,ease:'power3.out'},.2)
      .from('.character-detail>*',{y:20,opacity:0,stagger:.08,duration:.5},.3);
    const targets:Record<string,gsap.TweenVars>={
      kuroe:{scale:1.1,duration:.32,repeat:1,yoyo:true},harugon:{x:4,y:2,duration:.075,repeat:3,yoyo:true},
      arata:{opacity:.4,scale:1.3,duration:1},manatsu:{rotation:14,scale:1.2,duration:.7,ease:'back.out(3)'},
      raimu:{clipPath:'circle(100% at 50% 50%)',duration:1},rinko:{rotation:-5,duration:1},kotaro:{rotation:90,duration:1.3},
      jumboking:{y:-18,duration:.3,repeat:3,yoyo:true,ease:'power2.out'},moa:{rotation:20,scale:1.4,duration:.7},
      daichi:{x:40,duration:.7,ease:'steps(4)'},akae:{scale:1.15,duration:.8},
    };t.to('.character-motif',targets[person.id],.3);
  },{scope:characterStage,dependencies:[selected,quiet,lang],revertOnUpdate:true});

  const sceneName=(i:number)=>lang==='ja'?sceneNamesJa[i]:scenes[i][1];
  const changeLang=(next:Lang)=>{setLang(next);try{localStorage.setItem('caramel-lang',next);}catch{}};
  const changeCharacter=(raw:number)=>{
    const index=(raw+characters.length)%characters.length;
    const trigger=charTrigger.current;
    if(trigger){
      setSelected(index);selectedRef.current=index;autoScrolling.current=true;
      const y=trigger.start+(trigger.end-trigger.start)*((index+.5)/characters.length);
      gsap.to(window,{scrollTo:{y,autoKill:false},duration:.6,ease:'power2.inOut',onComplete:()=>{autoScrolling.current=false;}});
    }else setSelected(index);
  };
  const { contextSafe }=useGSAP({scope:root});
  // eslint-disable-next-line react-hooks/refs
  const burst=contextSafe(()=>{
    if(quiet)return;
    const t=gsap.timeline();t.to('.monster-art',{scale:1.06,duration:.3,overwrite:'auto'}).to('.monster-art',{scale:1,duration:.8}).fromTo('.heat-beam',{scaleX:0,opacity:0},{scaleX:1,opacity:.6,duration:.4},0).to('.heat-beam',{opacity:0,duration:.7},.4);
  });

  return <div ref={root} className={`tribute ${quiet?'low-motion':''}`} data-lang={lang}>
    <a href="#main" className="skip-link">{S('跳至主要內容','メインコンテンツへ移動')}</a>
    <div className="intro-veil" aria-hidden="true"><Heart className="intro-heart"/><span>{S('心動、啟程','ときめきの、はじまり')}</span></div>
    <header className="site-header">
      <a className="wordmark" href="#opening" aria-label={S('少女怪獸焦糖戀心，回到首頁','乙女怪獣キャラメリゼ、トップへ戻る')}><Heart/><span>乙女怪獣<small>キャラメリゼ</small></span></a>
      <p className="header-label">A LOVE LETTER TO SEASON 1<span>{S('非官方・第一季完結紀念企劃','非公式・第1期完結記念企画')}</span></p>
      <div className="header-controls">
        <div className="lang-toggle" role="group" aria-label={S('語言','言語')}><button lang="zh-Hant" aria-pressed={lang==='zh'} onClick={()=>changeLang('zh')}>中</button><button lang="ja" aria-pressed={lang==='ja'} onClick={()=>changeLang('ja')}>日</button></div>
        <button className={`menu-toggle ${menu?'open':''}`} aria-label={menu?S('關閉章節選單','章メニューを閉じる'):S('開啟章節選單','章メニューを開く')} aria-expanded={menu} aria-controls="chapter-menu" onClick={()=>setMenu(!menu)}><i/><i/></button>
      </div>
    </header>
    <nav className="scene-rail" aria-label={S('章節導覽','章ナビゲーション')}>{scenes.map(([id],i)=><button key={id} onClick={()=>go(i)} className={activeScene===i?'active':''} aria-current={activeScene===i?'location':undefined} aria-label={`${i+1} ${sceneName(i)}`}><span>{String(i+1).padStart(2,'0')}</span><i/><em>{sceneName(i)}</em></button>)}</nav>
    {menu&&<nav id="chapter-menu" className="chapter-menu" aria-label={S('全部章節','すべての章')} onKeyDown={e=>{if(e.key==='Escape')setMenu(false);}}>{scenes.map(([id,,en],i)=><button key={id} onClick={()=>go(i)}><small>0{i+1}</small><span>{sceneName(i)}</span><em>{en}</em><Arrow/></button>)}<p>{S('用滾輪、上下滑動或鍵盤 ↑ ↓，讓故事繼續','スクロール、スワイプ、キーボードの ↑ ↓ で物語を進めよう')}</p></nav>}
    <main id="main">
      <section id="opening" className="hero scene">
        <div className="hero-topline"><span>SEASON 01 / FINALE TRIBUTE</span><span>2026.07 — 2026.09</span></div>
        <div className="hero-art" aria-hidden="true"><div className="hero-sun"/><div className="hero-orbit"/><span className="floating-petal petal-one"/><span className="floating-petal petal-two"/><span className="floating-petal petal-three"/><OfficialArt id="harugon" className="hero-kaiju" eager/><OfficialArt id="kuroe" className="hero-girl" eager/><City className="hero-city"/><Star className="orbit-star"/><div className="hero-art-credit">OFFICIAL CHARACTER VISUALS · ORIGINAL SOURCE ↗</div></div>
        <div className="hero-copy"><p className="hero-meta"><span className="red-dot"/> {S('12 集的故事，無數次的心動','全12話の物語、数えきれないときめき')}</p><h1 className="hero-title"><SplitText text="恋か、"/><br/><span className="rose"><SplitText text="破壊か"/></span></h1><p className="hero-zh">{lang==='ja'?<>乙女怪獣<span>キャラメリゼ</span></>:<>少女怪獸<span>焦糖戀心</span></>}</p><p className="hero-en">KAIJU GIRL CARAMELISE</p><p className="hero-description">{L('戀愛的心跳，足以撼動整座城市\n獻給那個笨拙、溫柔，又無比巨大的初戀','恋の鼓動は、街ひとつを揺るがすほど\n不器用で、やさしくて、とてつもなく大きな初恋に捧ぐ')}</p><div className="hero-actions"><button className="button-dark" onClick={()=>go(1)}>{S('讓心跳，繼續','鼓動を、続けよう')}<Arrow/></button><button className="text-button" onClick={()=>setPv(true)}>{S('觀看官方 PV','公式PVを見る')} <span>↗</span></button></div></div>
        <div className="fin-badge"><span>ありがとう</span><strong>{L('第一季\n完結紀念','第1期\n完結記念')}</strong><small>AND SEE YOU AGAIN.</small></div>
        <div className="hero-bottom"><button onClick={()=>go(1)} className="scroll-cue"><span className="scroll-track"><i/></span>SCROLL TO FEEL</button><span className="hero-footnote">原作 蒼木スピカ<span>FAN-MADE / UNOFFICIAL</span></span><svg className="hero-ecg" viewBox="0 0 220 50" aria-hidden="true"><path className="heartbeat-line" d="M0 25h62l8-10 8 10h12l9-22 12 44 12-30 8 8h89" fill="none" stroke="currentColor"/></svg></div>
      </section>
      <div className="chapter-strip" aria-hidden="true"><span>LOVE IS A LITTLE MONSTROUS.</span><Heart/><span>小さな恋が、大きな奇跡になる</span><Star/><span>LOVE IS A LITTLE MONSTROUS.</span><Heart/></div>

      <section id="girl" className="girl-section scene section-pad">
        <Eyebrow n="01">THE GIRL / {S('少女的心事','少女の想い')}</Eyebrow>
        <div className="girl-intro"><h2 className="reveal-heading">{lang==='ja'?<>ささやかなときめきが、<br/><span className="rose"><SplitText text="巨大な初恋になる"/></span></>:<>一點點心動，<br/><span className="rose"><SplitText text="一場巨大的初戀"/></span></>}</h2><p>{L('從習慣獨處，到慢慢靠近\n藏在制服下的秘密，\n在戀愛裡悄悄發芽','ひとりに慣れた日々から、少しずつ近づいて\n制服の下に隠した秘密が、\n恋のなかでそっと芽吹く')}</p></div>
        <div className="manga-panels"><article className="manga-panel panel-lonely"><span className="panel-tag">{S('01 / 孤獨','01 / 孤独')}</span><OfficialArt id="kuroe"/><p>ひとりで、<br/>よかったはずなのに</p><span className="panel-caption">{S('以為一個人，就足夠了','ひとりで十分だと思っていた')}</span></article><article className="manga-panel panel-love"><span className="panel-tag">{S('02 / 心動','02 / ときめき')}</span><OfficialArt id="arata"/><div className="love-bubble">どきっ</div><Heart className="panel-heart"/><span className="panel-caption">{S('心動，讓世界開始發光','ときめきが、世界を輝かせる')}</span></article><article className="manga-panel panel-transform"><span className="panel-tag">{S('03 / 變身','03 / 変身')}</span><OfficialArt id="harugon"/><div className="girl-claw"><i/><i/><i/></div><span className="panel-caption">{S('藏不住的心意，開始有了形狀','隠しきれない想いが、かたちになり始める')}</span></article></div>
        <p className="creative-note">{S('本頁情感文字為粉絲原創，非角色官方台詞','このページの感情表現はファンによる創作で、公式のセリフではありません')}</p>
      </section>

      <section id="kaiju" className="kaiju-section scene"><div className="kaiju-scroll"><div className="kaiju-stage">
        <div className="kaiju-grain"/><div className="kaiju-moon"/><City className="city-back" layer={2}/><OfficialArt id="harugon" className="monster-art"/><MonsterSilhouette className="kaiju-tail"/><div className="heat-beam"/><City className="city-front" layer={1}/><div className="kaiju-scratch"><i/><i/><i/></div>
        <div className="kaiju-content"><Eyebrow n="02">LOVE × KAIJU / {S('心跳失控','鼓動が止まらない')}</Eyebrow><h2>LOVE<span className="kaiju-x">×</span><em>KAIJU</em></h2><p>{L('不只是喜歡\n是足以撼動世界的，喜歡','ただの「好き」じゃない\n世界を揺るがすほどの、「好き」')}</p><button className="outline-button" onClick={burst}>{S('感受這次心跳','この鼓動を感じる')} <Heart/></button></div>
        <div className="kaiju-scale"><span>HARUGON / ハルゴン</span><div><strong>110<small>m</small></strong><i/><p>65,000 t<br/><small>{S('一顆少女的心','ひとりの少女の心')}</small></p></div><p>{S('尺寸資料：動畫官方角色頁','サイズ資料：アニメ公式キャラクターページ')}</p></div><span className="vertical-caption">恋心が、怪獣になる</span>
      </div></div></section>

      <section id="characters" className="character-section scene section-pad" style={{'--character-color':person.color} as CSSProperties}>
        <div className="section-heading"><Eyebrow n="03">CHARACTER ARCHIVE / {S('角色圖鑑','キャラクター図鑑')}</Eyebrow><span className="section-count">11 CHARACTERS & FORMS</span></div>
        <div className="character-tabs" role="tablist" aria-label={S('選擇角色','キャラクターを選択')} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const next=(selected+(e.key==='ArrowRight'?1:-1)+characters.length)%characters.length;changeCharacter(next);document.getElementById(`tab-${characters[next].id}`)?.focus({preventScroll:true});}}}>{characters.map((c,i)=><button key={c.id} id={`tab-${c.id}`} role="tab" tabIndex={selected===i?0:-1} aria-selected={selected===i} aria-controls="character-panel" onClick={()=>changeCharacter(i)}><small>{String(i+1).padStart(2,'0')}</small>{lang==='ja'?c.jp:c.name}</button>)}</div>
        <div ref={characterStage} className={`character-stage theme-${person.id}`} id="character-panel" role="tabpanel" aria-labelledby={`tab-${person.id}`}>
          <div className="character-giant-number" aria-hidden="true">{String(selected+1).padStart(2,'0')}</div><div className="character-orbit"/><div className="character-motif" aria-hidden="true">{person.id==='jumboking'?<Paw/>:person.id==='kotaro'?<span>＋</span>:person.id==='manatsu'?<Star/>:<Heart/>}</div>
          <div className="character-art-wrap"><OfficialArt id={person.id} className="character-art"/><span className="image-origin-label">{person.id==='daichi'?S('米山大地（畫面左側）','米山大地（画面左側）'):person.id==='moa'?S('南最愛 · 新汰的妹妹','南最愛 · 新汰の妹'):S('動畫官方角色視覺','アニメ公式キャラクタービジュアル')}</span></div>
          <div className="character-detail"><p className="character-en">{person.en}</p><h2 className="character-jp"><SplitText text={person.jp}/></h2><p className="character-theme">{person.theme}</p>{person.cv!=='官方未公開'&&<p className="character-cv">CV <strong>{person.cv}</strong></p>}<p className="character-description">{lang==='ja'?person.ja.description:person.description}</p><p className="character-fact">{lang==='ja'?person.ja.detail:person.detail}</p><a className="source-link" href={person.source} {...external}>{S('查看角色資料來源','キャラクター情報の出典を見る')} <span>↗</span></a>{(person.id==='kuroe'||person.id==='harugon')&&<button className="transform-button" onClick={()=>changeCharacter(person.id==='kuroe'?1:0)}><Heart/> {person.id==='kuroe'?S('心跳加速，切換哈爾岡','鼓動が加速、ハルゴンへ'):S('讓心平靜，回到黑繪','心を静めて、黒絵に戻る')} <Arrow/></button>}</div>
        </div>
        <div className="character-navigation"><button aria-label={S('上一位角色','前のキャラクター')} onClick={()=>changeCharacter(selected-1)}><Arrow direction="left"/> PREV</button><div className="character-progress"><span>{String(selected+1).padStart(2,'0')} <i>/</i> 11</span><div className="character-progress-bar" aria-hidden="true"><b style={{transform:`scaleX(${(selected+1)/characters.length})`}}/></div><small className="character-scroll-hint">{S('向下滾動，角色自動切換 ↓','スクロールでキャラクターが切り替わる ↓')}</small></div><button aria-label={S('下一位角色','次のキャラクター')} onClick={()=>changeCharacter(selected+1)}>NEXT <Arrow/></button></div>
        <p className="archive-footnote">{S('以官方角色資料與授權平台交叉核實','公式キャラクター情報と配信プラットフォームで照合')}<button className="inline-link" onClick={()=>setCredits(true)}>{S('素材與資料來源','素材と情報の出典')} ↗</button></p>
      </section>

      <Memories lang={lang} quiet={quiet}/>

      <section id="embrace" className="embrace-section scene"><div className="embrace-scroll"><div className="embrace-stage">
        <div className="embrace-layer surface-layer"><Image src="/art/surface.webp" alt={S('使用者提供的完結紀念圖片：黑繪與新汰在深藍色、映著粉色光芒的水面緊緊擁抱','提供された完結記念イラスト：深い青と桃色の光が揺れる水面で、黒絵と新汰が抱きしめ合う')} className="surface-image" fill sizes="100vw" quality={90} draggable={false}/></div>
        <div className="embrace-layer underwater-layer"><Image src="/art/underwater.webp" alt={S('使用者提供的完結紀念圖片：兩人在光線折射與氣泡之間相擁，沉入寧靜的水中','提供された完結記念イラスト：光の屈折と泡のなか、二人が抱き合って静かな水中へ沈んでいく')} className="underwater-image" fill sizes="100vw" quality={90} draggable={false}/></div>
        <div className="water-light"/><div className="water-shade"/><div className="water-ripple ripple-one"/><div className="water-ripple ripple-two"/>
        <div className="water-bubbles" aria-hidden="true">{Array.from({length:quiet?4:18},(_,i)=><i className="bubble" key={i} style={{left:`${(i*37+9)%100}%`,bottom:`${(i*17)%65}%`,width:`${4+i%4*4}px`,height:`${4+i%4*4}px`}}/>)}</div>
        <div className="embrace-topline"><Eyebrow n="05">FINAL EMBRACE / {S('最後的擁抱','最後の抱擁')}</Eyebrow><span>あの瞬間を、ずっと</span></div>
        <div className="embrace-copy embrace-copy-first"><small>{S('喧鬧漸遠','喧騒が遠ざかる')}</small><h2>{L('只剩下，\n擁抱與心跳','残るのは、\n抱擁と鼓動だけ')}</h2><p>{S('所有巨大的不安，在這一刻，有了歸處','あの大きな不安が、この瞬間、帰る場所を見つけた')}</p></div>
        <div className="embrace-copy embrace-copy-last"><small>{S('讓時間，再慢一點','時間よ、もう少しゆっくり')}</small><h2>{L('就這樣，\n再抱緊一點','このまま、\nもう少しだけ強く')}</h2><p>{S('所有不安，終於有了歸處','すべての不安が、ようやく帰る場所を見つけた')}</p></div>
        <span className="embrace-credit">{S('使用者珍藏圖片 · 保留原圖人物與畫風 · 非官方授權聲明','提供された記念イラスト · キャラクターと画風はそのまま · 公式の許諾を示すものではありません')}</span>
        <span className="embrace-scroll-cue">SCROLL SLOWLY <span>↓</span></span>
      </div></div>{quiet&&<div className="quiet-underwater"><Image src="/art/underwater.webp" alt={S('水下的擁抱，低動態模式下完整靜態呈現','水中の抱擁。低モーション設定のため静止画で表示')} width={1672} height={941} draggable={false}/><p>{S('就這樣，再抱緊一點','このまま、もう少しだけ強く')}</p></div>}</section>

      <section id="finale" className="finale-section scene section-pad"><div className="finale-photo"><Image src="/art/underwater.webp" alt={S('水下擁抱的紀念畫面，陪伴第一季最後的道別','水中の抱擁。第1期最後の別れに寄り添う記念ビジュアル')} fill sizes="100vw" draggable={false}/></div><div className="finale-stars" aria-hidden="true"><Star/><Star/><Star/></div><Eyebrow n="06">THANK YOU, SEASON 1 / {S('寫給下一次相遇','また会う日のために')}</Eyebrow><p className="finale-kicker">{S('第一季，完結紀念','第1期、完結記念')}</p><h2 className="finale-title"><SplitText text="ありがとう、"/><br/><span><SplitText text="そして第2期へ"/></span></h2><p className="finale-message">{L('謝謝這段讓心跳化為怪獸的故事\n還想看見，更多故事的後續','鼓動が怪獣になる、この物語をありがとう\nもっと、その先の物語が見たい')}</p><div className="season-two"><span>第2期、待っています！</span><strong>WAITING FOR SEASON 2</strong></div><div className="finale-links"><a href={official.bahamut} {...external}>{S('重溫第一季','第1期をもう一度')} <Arrow/></a><a href={official.manga} {...external}>{S('繼續閱讀原作','原作の続きを読む')} <span>↗</span></a></div></section>
    </main>

    <footer className="site-footer"><div className="footer-top"><a className="footer-title" href="#opening">乙女怪獣<br/><span>キャラメリゼ</span></a><div><span className="unofficial-stamp">FAN-MADE / UNOFFICIAL</span><p>{L('謝謝第一季的每次心動\n期待下一次故事開始','第1期のすべてのときめきをありがとう\n次の物語の始まりを楽しみに')}</p></div><button className="back-top" onClick={()=>go(0)}>{S('回到最初的心動','最初のときめきへ戻る')} <Arrow direction="left"/></button></div><div className="footer-links"><a href={official.home} {...external}>{S('動畫官方網站','アニメ公式サイト')} ↗</a><a href="https://comic-alive.jp/" {...external}>原作・月刊コミックアライブ ↗</a><a href={official.tbs} {...external}>{S('TBS 作品資料','TBS 作品情報')} ↗</a><a href={official.bahamut} {...external}>{S('巴哈姆特動畫瘋','巴哈ムート アニメ')} ↗</a><a href={official.onair} {...external}>{S('更多觀看平台','その他の配信')} ↗</a><a href={official.x} {...external}>{S('官方 X','公式 X')} ↗</a><button onClick={()=>setCredits(true)}>{S('素材與資料來源','素材と情報の出典')} ＋</button></div><p className="legal">{L('本網站為粉絲自發製作的非官方紀念企劃，與原作者、出版社、動畫製作委員會及相關權利人無官方合作或從屬關係\n作品名稱、角色與相關官方視覺素材之權利歸原權利人所有\n角色視覺由官方原站載入並附來源；不代表取得官方授權','本サイトはファンが自主制作した非公式の記念企画で、原作者・出版社・アニメ製作委員会・関係権利者とは公式な提携・従属関係はありません\n作品名、キャラクターおよび公式ビジュアルの権利は各権利者に帰属します\nキャラクタービジュアルは公式サイトから読み込み、出典を明記しています。公式の許諾を示すものではありません')}</p><div className="footer-bottom"><span>© 蒼木スピカ / KADOKAWA / 乙女怪獣キャラメリゼ製作委員会</span><span>A LITTLE LOVE. A GIANT HEARTBEAT.</span><span className="credit-author">Made by <a href="https://reikama414.vercel.app/" {...external}>ReiKama414</a><a className="credit-icon" href="https://reikama414.vercel.app/" {...external} aria-label={S('作者網站','作者のサイト')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/></svg></a><a className="credit-icon" href="https://github.com/ReiKama414" {...external} aria-label="GitHub"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg></a></span></div></footer>
    <div className="scene-progress" aria-hidden="true"><span style={{transform:`scaleX(${(activeScene+1)/scenes.length})`}}/></div>
    <dialog ref={pvRef} className="pv-dialog" onCancel={()=>setPv(false)} onClick={e=>{if(e.target===e.currentTarget)setPv(false);}}><div className="dialog-header"><span>OFFICIAL PROMOTION VIDEO</span><button aria-label={S('關閉預告片','PVを閉じる')} onClick={()=>setPv(false)}>×</button></div>{pv&&<iframe src="https://www.youtube-nocookie.com/embed/ECtHlHde3EQ?rel=0" title={S('乙女怪獣キャラメリゼ 官方 PV','乙女怪獣キャラメリゼ 公式PV')} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen/>}<p>{S('動畫官方網站所連結之 PV','アニメ公式サイトからリンクされているPV')}<a href="https://www.youtube.com/watch?v=ECtHlHde3EQ" {...external}>{S('在 YouTube 觀看','YouTubeで見る')} ↗</a></p></dialog>
    <dialog ref={modalRef} className="credits-dialog" onCancel={()=>setCredits(false)} onClick={e=>{if(e.target===e.currentTarget)setCredits(false);}}><div className="dialog-header"><span>SOURCES & CREDITS</span><button aria-label={S('關閉來源說明','出典を閉じる')} onClick={()=>setCredits(false)}>×</button></div><div className="credits-content"><h2>{L('每份心意，\n都值得被好好註明','すべての想いに、\nきちんと出典を')}</h2><h3>{S('作品與資料','作品と資料')}</h3><p>{L('原作：蒼木スピカ\n日文作品名：乙女怪獣キャラメリゼ\n第一季共 12 集；第 11 集〈クロエVSアカエ〉，最終話為第 12 集〈この一撃に愛をこめて〉\n資料核對日期：2026.10.15','原作：蒼木スピカ\n作品名：乙女怪獣キャラメリゼ\n第1期は全12話。第11話「クロエVSアカエ」、最終話は第12話「この一撃に愛をこめて」\n資料確認日：2026.10.15')}</p><a href={official.home} {...external}>{S('動畫官方網站','アニメ公式サイト')} ↗</a><a href={official.tbs} {...external}>{S('TBS 作品目錄','TBS 作品情報')} ↗</a><a href={official.daichi} {...external}>{S('d 動畫商城集數／聲優資料','dアニメストア 話数・声優情報')} ↗</a><h3>{S('圖片與使用範圍','画像と使用範囲')}</h3><p>{L('角色立繪從動畫官方原站載入，不下載、不重新託管、不修改人物畫風\n原站若限制嵌入或圖片無法載入，保留官方來源連結\n這是來源連結展示，不表示取得官方授權','キャラクター立ち絵はアニメ公式サイトから読み込み、ダウンロード・再ホスト・画風の改変は行いません\n公式サイト側で埋め込みが制限された場合や画像が読み込めない場合は、出典リンクを残します\nこれは出典リンクの表示であり、公式の許諾を示すものではありません')}</p><p>{L('擁抱圖片與大地、最愛劇照由使用者提供\n未推定為官方劇照，也未推定提供者具有公開再發布授權；目前僅作本機審閱素材\n公開發佈檢查會要求先確認使用範圍','抱擁のイラストと大地・最愛のスチールは提供されたものです\n公式スチールとは見なさず、提供者に公開再配布の権利があるとも見なしていません。現在はローカル確認用の素材です\n公開前のチェックでは、使用範囲の確認が必要です')}</p><p>{L('城市、心跳、爪痕、水波與氣泡為本網站原創程式圖形\n所有情感文案均為粉絲創作，非官方台詞','街、鼓動、爪痕、水面の波紋と泡は、本サイト独自のプログラムグラフィックです\n感情表現はすべてファンによる創作で、公式のセリフではありません')}</p><h3>{S('角色資料與圖片來源','キャラクター情報と画像の出典')}</h3>{characters.map((c,i)=><details key={c.id}><summary>{String(i+1).padStart(2,'0')} {lang==='ja'?c.jp:c.name}</summary><p>{lang==='ja'?c.ja.verification:c.verification}</p><p>{S('用途：角色介紹與敘事分鏡','用途：キャラクター紹介と物語の見せ場')}<br/>{characterImagesFor(c.id)?S('原站透明背景 PNG，人物輪廓未經去背處理；以原圖尺寸呈現，不推定有高解析度重製權','公式サイトの透過PNG。人物の輪郭は切り抜き加工なし。原寸で表示し、高解像度での再制作権は想定しません'):S('使用者提供的原畫風劇照，保留完整人物；大地為合照左側，最愛為金色雙馬尾的小妹妹','提供された原作画風のスチール。人物は全体を保持。大地は集合写真の左側、最愛は金色ツインテールの小さな女の子')}</p><p>{assetRecords[i].officialImageUse.replace('、不熱連官方圖檔','，原圖自官方來源嵌入')}</p><a href={c.source} {...external}>{S('原始資料頁','元の資料ページ')} ↗</a></details>)}<h3>{S('字體','フォント')}</h3><p>粉圓 Huninn · Zen Maru Gothic<br/>SIL Open Font License 1.1</p><a href="https://github.com/justfont/Huninn" {...external}>{S('粉圓字體','Huninn フォント')} ↗</a><h3>{S('觀看與原作','視聴と原作')}</h3><a href={official.onair} {...external}>{S('官方配信平台清單','公式配信プラットフォーム一覧')} ↗</a><a href={official.prime} {...external}>{S('Prime Video 第一季','Prime Video 第1期')} ↗</a><a href={official.crunchyroll} {...external}>{S('Crunchyroll 第一季','Crunchyroll 第1期')} ↗</a><p>{L('觀看資格、集數供應與地區限制依平台授權而異\n第二季文案僅表達粉絲期待，不構成官方製作公告','視聴資格、配信話数、地域制限はプラットフォームのライセンスにより異なります\n第2期に関する文言はファンの期待を表すもので、公式の制作発表ではありません')}</p></div></dialog>
  </div>;
}
function characterImagesFor(id:string){return !['moa','daichi'].includes(id);}
