
import type en from '../../messages/en.json';
import type pt from '../../messages/pt.json';

type Same<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

export const messagesHaveSameShape: Same<typeof en, typeof pt> = true;
