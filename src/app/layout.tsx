import type { Metadata, Viewport } from 'next';
import '@fontsource/huninn/400.css';
import '@fontsource/zen-maru-gothic/500.css';
import '@fontsource/zen-maru-gothic/700.css';
import './globals.css';
import './ui.css';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/,'');

export const metadata: Metadata = {
  metadataBase:new URL(siteUrl),
  title:'少女怪獸焦糖戀心｜第一季完結紀念',
  description:'《乙女怪獣キャラメリゼ》第一季完結紀念粉絲站｜全 12 集劇照與角色資料',
  applicationName:'KAIJU GIRL CARAMELISE · FAN TRIBUTE',
  openGraph:{title:'戀か、破壊か｜少女怪獸焦糖戀心',description:'Season 1 fan tribute for Kaiju Girl Caramelise. Unofficial.',locale:'zh_TW',type:'website',images:[{url:`${siteUrl}/og.png`,width:1200,height:630,alt:'少女怪獸焦糖戀心：第一季完結紀念（非官方）'}]},
  twitter:{card:'summary_large_image',title:'少女怪獸焦糖戀心｜第一季完結紀念',images:[`${siteUrl}/og.png`]},
  icons:{
    icon:[{url:`${siteUrl}/icon.svg`,type:'image/svg+xml'}],
    shortcut:`${siteUrl}/icon.svg`,
  },
};
export const viewport: Viewport = {width:'device-width',initialScale:1,themeColor:'#f7f2e9'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="zh-Hant"><body>{children}</body></html>;}
