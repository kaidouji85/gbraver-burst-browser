// @flow

import type {DOMEventNotifier} from "./dom-event-notifier";
import {WindowResize} from "./resize";

/** HTMLイベント通知者と実際のHTMLイベントを関連づける */
export function bindDOMEvent(notifier: DOMEventNotifier, renderDom: HTMLElement): void {
  new WindowResize({
    onResize: () => {
      notifier.notify({type: 'resize'});
    }
  });

  renderDom.addEventListener('touchstart', (event: TouchEvent) => {
    event.preventDefault();
    notifier.notify({type: 'touchStart', event});
  });

  renderDom.addEventListener('touchend', (event: TouchEvent) => {
    event.preventDefault();
    notifier.notify({type: 'touchEnd', event});
  });

  renderDom.addEventListener('touchmove', (event: TouchEvent) => {
    event.preventDefault();
    notifier.notify({type: 'touchMove', event});
  });

  renderDom.addEventListener('mousedown', (event: MouseEvent) => {
    event.preventDefault();
    notifier.notify({type: 'mouseDown', event});
  });

  renderDom.addEventListener('mousemove', (event: MouseEvent) => {
    event.preventDefault();
    notifier.notify({type: 'mouseMove', event});
  });

  renderDom.addEventListener('mouseup', (event: MouseEvent) => {
    event.preventDefault();
    notifier.notify({type: 'mouseUp', event});
  });

}