'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { episodes, official } from '@/lib/content';
import { makeL, type Lang } from '@/lib/i18n';
import stills from '@/lib/episode-images.json';
import { Arrow } from './Graphics';

const external={target:'_blank',rel:'noopener noreferrer'} as const;
function Still({src,alt,className=''}:{src:string;alt:string;className?:string}){
  const [failedSrc,setFailedSrc]=useState<string|null>(null);
  if(failedSrc===src)return <span className={`still-unavailable ${className}`}>劇照暫時無法載入<br/>画像を読み込めません</span>;
  // Public promotional still embedded from the official origin, without rehosting.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} width={1280} height={720} loading="lazy" decoding="async" draggable={false} referrerPolicy="no-referrer" onError={()=>setFailedSrc(src)}/>;
}

export default function Memories({lang,quiet}:{lang:Lang;quiet:boolean}){
  const {S,L}=makeL(lang);
  const [episode,setEpisode]=useState(0),[still,setStill]=useState(0),[lightbox,setLightbox]=useState<number|null>(null);
  const dialog=useRef<HTMLDialogElement>(null), section=useRef<HTMLElement>(null), list=useRef<HTMLDivElement>(null), firstRender=useRef(true), imageReady=useRef(false);
  const memory=episodes[episode], images=stills[episode].images;
  const emotion=lang==='ja'?memory.ja.emotion:memory.emotion, summary=lang==='ja'?memory.ja.summary:memory.summary;
  const partId=`https://animestore.docomo.ne.jp/animestore/ci_pc?partId=29113${String(episode+1).padStart(3,'0')}&workId=29113`;
  const platforms=[
    {name:S('巴哈姆特動畫瘋','巴哈ムート アニメ'),note:S('台灣・第一季播放清單','台湾・第1期プレイリスト'),href:official.bahamut},
    {name:'Crunchyroll',note:S('全球・字幕串流','全世界・字幕配信'),href:official.crunchyroll},
    {name:'Prime Video',note:S('Amazon・第一季','Amazon・第1期'),href:official.prime},
    {name:S('d 動畫商城','dアニメストア'),note:S(`直達第 ${episode+1} 集`,`第${episode+1}話へ直接移動`),href:partId},
    {name:S('更多平台','その他の配信'),note:S('官方配信一覽','公式配信一覧'),href:official.onair},
  ];
  useEffect(()=>{
    const frame=requestAnimationFrame(()=>ScrollTrigger.refresh());
    return()=>cancelAnimationFrame(frame);
  },[episode,lang]);
  useEffect(()=>{
    const el=dialog.current;if(!el)return;
    if(lightbox!==null&&!el.open)el.showModal();
    if(lightbox===null&&el.open)el.close();
  },[lightbox]);
  useEffect(()=>{
    const active=list.current?.querySelector<HTMLElement>('[aria-current="true"]');
    const box=list.current;if(!active||!box)return;
    if(box.scrollWidth>box.clientWidth+4)box.scrollTo({left:active.offsetLeft-box.clientWidth/2+active.clientWidth/2,behavior:quiet?'auto':'smooth'});
    else if(box.scrollHeight>box.clientHeight+4)box.scrollTo({top:active.offsetTop-box.clientHeight/2+active.clientHeight/2,behavior:quiet?'auto':'smooth'});
  },[episode,quiet]);
  const choose=(index:number)=>{if(index===episode)return;setEpisode(index);setStill(0);setLightbox(null);};
  const step=(offset:number)=>choose((episode+offset+episodes.length)%episodes.length);
  const changeImage=(offset:number)=>setLightbox(current=>current===null?null:(current+offset+images.length)%images.length);
  const stepStill=(offset:number)=>{setStill(current=>(current+offset+images.length)%images.length);};

  useGSAP(()=>{
    if(quiet)return;
    gsap.from('.memories-heading>div>*',{autoAlpha:0,y:24,stagger:.1,duration:.8,ease:'power3.out',scrollTrigger:{trigger:'.memories-heading',start:'top 82%',toggleActions:'play none none reverse'}});
    gsap.from('.mem-item',{autoAlpha:0,x:-34,stagger:.05,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.mem-layout',start:'top 82%',toggleActions:'play none none reverse'}});
    gsap.from('.mem-viewer',{autoAlpha:0,y:50,duration:.9,ease:'power3.out',scrollTrigger:{trigger:'.mem-layout',start:'top 80%',toggleActions:'play none none reverse'}});
    gsap.from('.rewatch',{autoAlpha:0,y:60,duration:.9,ease:'power3.out',scrollTrigger:{trigger:'.rewatch',start:'top 88%',toggleActions:'play none none reverse'}});
    gsap.from('.rewatch-card',{autoAlpha:0,y:30,stagger:.08,duration:.6,ease:'power3.out',scrollTrigger:{trigger:'.rewatch-grid',start:'top 90%',toggleActions:'play none none reverse'}});
    gsap.fromTo('.rewatch-glow',{xPercent:-20,yPercent:-10},{xPercent:25,yPercent:15,ease:'none',scrollTrigger:{trigger:'.rewatch',start:'top bottom',end:'bottom top',scrub:1}});
  },{scope:section,dependencies:[quiet,lang],revertOnUpdate:true});

  useGSAP(()=>{
    if(firstRender.current){firstRender.current=false;return;}
    if(quiet)return;
    const t=gsap.timeline({defaults:{ease:'power3.out'}});
    t.from('.mem-number',{autoAlpha:0,x:-30,duration:.5})
      .from('.mem-copy>*',{autoAlpha:0,y:16,stagger:.07,duration:.5},.05);
  },{scope:section,dependencies:[episode]});
  useGSAP(()=>{
    if(!imageReady.current){imageReady.current=true;return;}
    if(quiet)return;
    gsap.fromTo('.mem-hero img,.mem-hero .still-unavailable',{clipPath:'inset(0 100% 0 0)',scale:1.08},{clipPath:'inset(0 0% 0 0)',scale:1,duration:.8,ease:'power3.inOut',overwrite:'auto'});
  },{scope:section,dependencies:[episode,still]});

  return <section ref={section} id="memories" className="memories-section scene section-pad">
    <div className="memories-heading"><div><p className="eyebrow"><span>04</span><span className="eyebrow-line"/>TWELVE HEARTBEATS / {S('第一季回憶','第1期の思い出')}</p><h2>{lang==="ja"?<>12のときめき<br/><span className="rose">ひとつひとつの場面を、心に</span></>:<>十二次心動<br/><span className="rose">把每一幕，留在心裡</span></>}</h2><p className="memory-collection">{S('全 12 集完整收錄 · 72 張公開劇照','全12話収録 · 公開スチール72枚')}</p></div></div>
    <div className="mem-layout">
      <div ref={list} className="mem-list" role="group" aria-label={S('選擇集數','話数を選択')} onKeyDown={e=>{
        const move=e.key==='ArrowDown'||e.key==='ArrowRight'?1:e.key==='ArrowUp'||e.key==='ArrowLeft'?-1:0;
        if(!move)return;e.preventDefault();const next=(episode+move+episodes.length)%episodes.length;choose(next);
        list.current?.querySelectorAll<HTMLElement>('.mem-item')[next]?.focus({preventScroll:true});
      }}>{episodes.map((ep,i)=><button className={`mem-item ${episode===i?'selected':''}`} key={ep.title} onClick={()=>choose(i)} aria-current={episode===i} aria-label={S(`第 ${i+1} 集，${ep.title}`,`第${i+1}話、${ep.title}`)}><span className="mem-item-thumb"><Still src={stills[i].images[0]} alt=""/></span><span className="mem-item-no">{String(i+1).padStart(2,'0')}</span><span className="mem-item-text"><b>{ep.title}</b><small>{lang==='ja'?ep.ja.emotion:ep.emotion}</small></span>{i===11&&<em>FINALE</em>}</button>)}</div>
      <div className="mem-viewer">
        <div className="mem-hero">
          <button className="mem-hero-still" onClick={()=>setLightbox(still)} aria-label={S('放大目前劇照','現在のスチールを拡大')}><Still src={images[still]} alt={S(`第 ${episode+1} 集〈${memory.title}〉官方劇照 ${still+1}`,`第${episode+1}話「${memory.title}」公式スチール ${still+1}`)}/><span className="mem-hero-hint">{S('點擊放大','クリックで拡大')} ＋</span></button>
          <div className="mem-hero-bar"><button onClick={()=>stepStill(-1)} aria-label={S('上一張劇照','前のスチール')}><Arrow direction="left"/></button><span>{String(still+1).padStart(2,'0')} <i>/</i> {String(images.length).padStart(2,'0')}</span><button onClick={()=>stepStill(1)} aria-label={S('下一張劇照','次のスチール')}><Arrow/></button></div>
        </div>
        <div className="mem-thumbs" role="group" aria-label={S('本集劇照','この話のスチール')}>{images.map((src,i)=><button key={src} className={`mem-thumb ${still===i?'selected':''}`} onClick={()=>setStill(i)} aria-current={still===i} aria-label={S(`第 ${i+1} 張劇照`,`スチール ${i+1}`)}><Still src={src} alt=""/></button>)}</div>
        <div className="mem-info" aria-live="polite">
          <div className="mem-number">{String(episode+1).padStart(2,'0')}<span>/ 12</span></div>
          <div className="mem-copy"><p className="mem-kicker">EPISODE {String(episode+1).padStart(2,'0')}{episode===11?' / FINALE':''} · {emotion}</p><h3>{memory.title}</h3><p className="mem-summary">{summary}</p><div className="mem-actions"><a className="inline-link" href={stills[episode].source} {...external}>{S('官方本集故事','公式ストーリーページ')} ↗</a><a className="inline-link" href={official.photos} {...external}>{S('官方 X 圖片集','公式 X 画像集')} ↗</a></div></div>
          <div className="mem-step"><button onClick={()=>step(-1)} aria-label={S('上一集','前の話')}><Arrow direction="left"/><span>PREV EP</span></button><button onClick={()=>step(1)} aria-label={S('下一集','次の話')}><span>NEXT EP</span><Arrow/></button></div>
        </div>
      </div>
    </div>
    <div className="rewatch"><span className="rewatch-glow" aria-hidden="true"/>
      <div className="rewatch-head"><p className="rewatch-eyebrow">WATCH AGAIN</p><h3>{S('第一季，再看一次','第1期を、もう一度')}</h3><p className="rewatch-lead">{L('從第一次心動開始\n選一個你慣用的平台，重溫每一幕','最初のときめきから\n好きなプラットフォームで、すべての場面をもう一度')}</p><p className="rewatch-note">{S('觀看資格、集數供應與地區限制依平台授權而異','視聴資格、配信話数、地域制限はプラットフォームにより異なります')}</p></div>
      <div className="rewatch-grid">{platforms.map((p,i)=><a key={p.name} className="rewatch-card" href={p.href} {...external}><span className="rewatch-index">{String(i+1).padStart(2,'0')}</span><span className="rewatch-name">{p.name}</span><span className="rewatch-sub">{p.note}</span><span className="rewatch-arrow"><Arrow/></span></a>)}</div>
    </div>
    <dialog ref={dialog} className="still-dialog" onCancel={()=>setLightbox(null)} onClose={()=>setLightbox(null)} onClick={e=>{if(e.target===e.currentTarget)setLightbox(null);}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();changeImage(1);}if(e.key==='ArrowLeft'){e.preventDefault();changeImage(-1);}}} aria-label={S('官方劇照放大檢視','公式スチール拡大表示')}><div className="dialog-header"><span>EPISODE {String(episode+1).padStart(2,'0')} · {lightbox===null?'':lightbox+1} / 6</span><button onClick={()=>setLightbox(null)} aria-label={S('關閉劇照','スチールを閉じる')}>×</button></div>{lightbox!==null&&<><Still src={images[lightbox]} alt={S(`第 ${episode+1} 集〈${memory.title}〉官方劇照 ${lightbox+1}，完整畫面`,`第${episode+1}話「${memory.title}」公式スチール ${lightbox+1}（全体）`)} className="enlarged-still"/><div className="still-dialog-footer"><button onClick={()=>changeImage(-1)} aria-label={S('上一張劇照','前のスチール')}><Arrow direction="left"/></button><a href={stills[episode].source} {...external}>{S('動畫官方來源','アニメ公式ソース')} ↗</a><button onClick={()=>changeImage(1)} aria-label={S('下一張劇照','次のスチール')}><Arrow/></button></div></>}</dialog>
  </section>;
}
