// @flow

import * as THREE from 'three';

/** Loading要素のセレクタ */
export const LoadingDom = '.loading';

/** LoadingManagerにイベントを関連づける */
export function addEventToLoadingManager(): void {
  THREE.DefaultLoadingManager.onProgress = function(url: string, itemsLoaded: number, itemsTotal: number) {
    console.log(`itemsLoaded: ${itemsLoaded}, itemsTotal: ${itemsTotal}`);
  };

  THREE.DefaultLoadingManager.onLoad = function(url: string, itemsLoaded: number, itemsTotal: number) {
    hiddenLoadingDOM();
  };
}

/** Loading要素を非表示にする */
function hiddenLoadingDOM(): void {
  document.querySelectorAll(LoadingDom).forEach(e => {
    e.style.display = 'none';
  });
}
