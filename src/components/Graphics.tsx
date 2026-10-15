import { useState } from 'react';
import { characterImages } from '@/lib/content';

export function Heart({className=''}:{className?:string}) {return <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M32 53 9 30C-4 9 24 2 32 20 40 2 68 9 55 30Z" stroke="currentColor" strokeWidth="2"/><path d="M8 33h13l7-13 7 24 7-11h14" stroke="currentColor" strokeWidth="2"/></svg>;}
export function Arrow({direction='right'}:{direction?:'right'|'left'|'down'}){return <svg aria-hidden="true" viewBox="0 0 36 24" style={{transform:`rotate(${direction==='left'?180:direction==='down'?90:0}deg)`}} fill="none"><path d="M1 12h31M23 3l10 9-10 9" stroke="currentColor" strokeWidth="1.4"/></svg>;}
export function Star({className=''}:{className?:string}){return <svg className={className} viewBox="0 0 80 80" aria-hidden="true"><path d="m40 0 7 30 33 10-33 7-7 33-9-33L0 40l31-10Z" fill="currentColor"/></svg>;}
export function Paw(){return <svg viewBox="0 0 64 64" aria-hidden="true" fill="currentColor"><ellipse cx="18" cy="18" rx="6" ry="10" transform="rotate(-28 18 18)"/><ellipse cx="33" cy="12" rx="6" ry="10"/><ellipse cx="48" cy="22" rx="6" ry="10" transform="rotate(28 48 22)"/><path d="M13 48c0-11 14-23 21-23s21 15 21 24c0 16-17 3-21 3S13 63 13 48"/></svg>;}

export function OfficialArt({id,className='',eager=false}:{id:string;className?:string;eager?:boolean}) {
  const [failedSrc,setFailedSrc]=useState<string|null>(null);
  const src=characterImages[id];
  if (!src || failedSrc===src) return <div className={`art-missing ${className}`}><span>{id==='moa'?'南 最愛':id==='daichi'?'米山 大地':'公式ビジュアル'}</span><small>圖片暫時無法載入<br/>角色資料來源連結位於下方</small></div>;
  // Original-domain embedding: no official image is downloaded or rehosted by this site.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={src} alt={`${({kuroe:'赤石黑繪',harugon:'哈爾岡',arata:'南新汰',manatsu:'友里真夏',raimu:'河野來夢',rinko:'赤石凜子',kotaro:'響野光太郎',jumboking:'巨霸王',akae:'紅繪 アカエ',daichi:'米山大地，畫面左側紅髮男孩，右側為黑繪',moa:'南最愛，金色雙馬尾的小妹妹'} as Record<string,string>)[id]}`} loading={eager?'eager':'lazy'} fetchPriority={eager?'high':'auto'} decoding="async" referrerPolicy="no-referrer" onError={()=>setFailedSrc(src)}/>;
}

export function City({className='',layer=0}:{className?:string;layer?:number}) {return <svg className={`city ${className}`} viewBox="0 0 1440 360" preserveAspectRatio="none" aria-hidden="true"><g fill="currentColor">{Array.from({length:40},(_,i)=>{const h=35+(i*67+layer*31)%200;return <g key={i}><path d={`M${i*39-10} 360v-${h}h${22+i%5*3}v${h}Z`}/>{Array.from({length:4},(_,j)=><path key={j} d={`M${i*39-5} ${365-h+j*29}h4v9h-4Z`} fill="var(--window-color,#d67c81)" opacity=".35"/>)}</g>})}<path d="m1060 360 35-210 35 210h-10l-25-175-25 175Zm26-190h18v-20h-18Zm7-20v-51h4v51Z"/><path d="M270 360V95h12V72h6v23h13v265Z"/></g></svg>;}

export function MonsterSilhouette({className=''}:{className?:string}) {return <svg className={className} viewBox="0 0 800 720" fill="currentColor" aria-label="原創怪獸尾巴與巨大身影圖形" role="img"><path d="M213 690c-48-15-46-55-22-75l-2-98-48-18-32 32-23-3 12-33-18 13-20-8 33-50 44-25 37-79 48-43 23-58-28-13-25-31 16-12 38-6 5-35-4-66 26 33 3-72 20 52 29 22 19 24 15 67 44 35 14 39 58 75 61 37 8 31-16 3-28-18 9 20-19-2-53-37-38-45 8 92-19 70c76 88 192 94 275 32 85-63 71-131 89-180 41 83 14 164-71 223-84 58-184 52-283 30l-7 39-34 10-68-9 8-22 14-12-19-34-40-6-4 45-17 19-54-4Z"/><g fill="var(--spine-color,#b14666)"><path d="m315 264 48-49-12 77 47-18-20 62 47-8-20 53 44 1-23 37 38 11-29 29 36 24-37 15 51 33-34 17 53 15-27 22 55 6-12 21 57-4-5 21 52-19 4 19 37-34 11 16 25-40 11 9 13-38 10 13-17 54-49 51-67 20-95-8-75-29-52-41-31-82-10-98-31-87Z"/></g><path d="m232 247 16-5-8 11Z" fill="#f6d2bb"/></svg>;}

export function EpisodeGlyph({motif}:{motif:string}) {
  const paths:Record<string,string>={
    heartbeat:'M0 60h40l15-28 18 58 16-35h60',door:'M45 110V15h65v95M58 105V25l44 8v72M89 65h3',
    wheel:'M75 12v100M25 62h100M39 26l73 73M39 99l73-73M50 120l25-58 25 58M22 62a53 53 0 1 0 106 0 53 53 0 1 0-106 0',
    music:'M45 85V25l65-12v64M45 39l65-12M45 85c-30-20-44 18-16 17 15 0 16-17 16-17M110 77c-30-20-44 18-16 17 15 0 16-17 16-17',
    lipstick:'M54 113V54h45v59ZM59 54V28l30-14v40M49 83h55',leaf:'M75 118V48M75 75C20 66 30 20 25 13c60 7 56 44 50 62ZM75 98c-3-46 41-52 59-58-6 37-19 58-59 58Z',
    camera:'M20 106V36h32l9-18h32l9 18h29v70ZM54 70a22 22 0 1 0 44 0 22 22 0 1 0-44 0M112 49h6',island:'M7 108q68-35 137 0M72 98V38M72 38Q27 20 29 58M72 38Q79 2 109 12M72 38q31-15 51 19M72 38Q39 2 26 26',
    wave:'M0 42q20-20 40 0t40 0 40 0 40 0M0 67q20-20 40 0t40 0 40 0 40 0M0 92q20-20 40 0t40 0 40 0 40 0',tear:'M75 8C66 40 36 58 36 83a39 39 0 0 0 78 0C114 58 84 40 75 8ZM51 85q0 20 20 23',
    claw:'m30 112 30-98-8 99M65 118l30-110-7 108M102 111l27-95-6 98',heart:'M75 112 25 62C-12 12 55-5 75 33 95-5 162 12 125 62Z',
  }; return <svg viewBox="0 0 150 130" fill="none" aria-hidden="true"><path d={paths[motif]||paths.heart} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
