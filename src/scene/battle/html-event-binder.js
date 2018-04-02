// @flow

import type {Observer} from "../observer";

/**
 * HTMLイベントとシーンのアクションをつなげる
 *
 * @param scene シーン
 * @param renderDom レンダーのHTML要素
 */
export function bindHtmlEventToScene(scene: Observer, renderDom: HTMLElement) {
  window.addEventListener('resize', () => {
    scene.notify({type: 'resize'})
  }, false);

  renderDom.addEventListener('touchstart', (event: TouchEvent) => {
    event.preventDefault();
    scene.notify({type: 'touchStart', event});
  });

  renderDom.addEventListener('touchend', (event: TouchEvent) => {
    event.preventDefault();
    scene.notify({type: 'touchEnd', event});
  });

  renderDom.addEventListener('mousedown', (event: MouseEvent) => {
    event.preventDefault();
    scene.notify({type: 'mouseDown', event});
  });

  renderDom.addEventListener('mousemove', (event: MouseEvent) => {
    event.preventDefault();
    scene.notify({type: 'mouseMove', event});
  });

  renderDom.addEventListener('mouseup', (event: MouseEvent) => {
    event.preventDefault();
    scene.notify({type: 'mouseUp', event});
  });

  renderDom.addEventListener('mouseleave', (event: MouseEvent) => {
    event.preventDefault();
    scene.notify({type: 'mouseLeave', event});
  });
}