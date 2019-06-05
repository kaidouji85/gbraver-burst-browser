// @flow

import * as THREE from 'three';

const LoadingDOM = '.loading';
const LoadingCaptionDOM = '.loading__caption';
const LoadingBarCompletedDOM = '.loading__bar_completed';

/** LoadingManagerにイベントを関連づける */
export function addEventToLoadingManager(): void {
  setLoadingCompleteness(0);

  THREE.DefaultLoadingManager.onProgress = function(url: string, itemsLoaded: number, itemsTotal: number) {
    setLoadingCompleteness(itemsLoaded / itemsTotal);
  };

  THREE.DefaultLoadingManager.onLoad = function(url: string) {
    setLoadingCompleteness(1);
    hiddenLoadingDOM();
  };
}

/** Loading要素を非表示にする */
function hiddenLoadingDOM(): void {
  document.querySelectorAll(LoadingDOM).forEach(e => {
    e.style.display = 'none';
  });
}

/**
 * ロード完了率を設定する
 *
 * @param completedRate 0から1で指定する完了率、1で完了
 */
function setLoadingCompleteness(completedRate: number): void {
  document.querySelectorAll(LoadingCaptionDOM).forEach(element => {
    element.innerText = `LOADING... ${Math.floor(completedRate * 100)}%`;
  });

  document.querySelectorAll(LoadingBarCompletedDOM).forEach(element => {
    element.style.width = `${completedRate * 100}%`;
  });
}