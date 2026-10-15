import { Fragment, type ReactNode } from 'react';

export type Lang = 'zh' | 'ja';

export function makeL(lang: Lang) {
  const S = (zh: string, ja: string) => (lang === 'ja' ? ja : zh);
  const L = (zh: string, ja: string): ReactNode =>
    S(zh, ja).split('\n').map((part, i) => <Fragment key={i}>{i > 0 && <br />}{part}</Fragment>);
  return { S, L };
}
