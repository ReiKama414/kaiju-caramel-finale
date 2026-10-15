import type { Metadata, Viewport } from 'next';
import '@fontsource/huninn/400.css';
import '@fontsource/zen-maru-gothic/500.css';
import '@fontsource/zen-maru-gothic/700.css';
import './globals.css';
import './ui.css';
export const metadata: Metadata = {
  metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title:'少女怪獸焦糖戀心｜第一季完結紀念',
  description:'戀愛的心跳，足以撼動整座城市｜獻給《乙女怪獣キャラメリゼ》第一季的非官方互動紀念企劃｜十二次心動，期待下一季',
  applicationName:'KAIJU GIRL CARAMELISE · FAN TRIBUTE',
  openGraph:{title:'戀か、破壊か｜少女怪獸焦糖戀心',description:'12 episodes. Countless heartbeats. A fan-made love letter to Season 1.',locale:'zh_TW',type:'website',images:[{url:'/og.png',width:1200,height:630,alt:'少女怪獸焦糖戀心：第一季完結紀念，非官方粉絲企劃'}]},
  twitter:{card:'summary_large_image',title:'少女怪獸焦糖戀心｜第一季完結紀念',images:['/og.png']},
  icons:{icon:'/icon.svg'},
};
export const viewport: Viewport = {width:'device-width',initialScale:1,themeColor:'#f7f2e9'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="zh-Hant"><body>{children}</body></html>;}
