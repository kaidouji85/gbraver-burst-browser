// @flow

import type {HtmlNotifier} from "./html-notifier";

/** HTMLイベント通知者と実際のHTMLイベントを関連づける */
export function bindHtmlEvent(notifier: HtmlNotifier): void {
  window.addEventListener('resize', () => {
    console.log('resize');// TODO 開発が終わったら消す
    notifier.notify({type: 'resize'})
  }, false);
}