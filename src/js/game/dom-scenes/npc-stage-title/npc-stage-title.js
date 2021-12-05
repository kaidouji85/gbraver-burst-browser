// @flow

import type {DOMScene} from "../dom-scene";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";

/** ルート要素 class属性 */
const ROOT_CLASS = 'npc-stage-title';

export function rootInnerHTML(resources: Resources): string {
  const armdozer = resources.paths.find(v => v.id === PathIds.NEO_LANDOZER_ICON)?.path ?? '';
  return `
    <div class="${ROOT_CLASS}__title">
      <div class="${ROOT_CLASS}__title__stage">STAGE</div>
      <div class="${ROOT_CLASS}__title__stage-number">10</div>
      <div class="${ROOT_CLASS}__title__caption">敵よりも大きい</div>
      <div class="${ROOT_CLASS}__title__caption">バッテリーを出せ</div>
    </div>
    <img class="${ROOT_CLASS}__armdozer-icon" src="${armdozer}">
  `;
}

/** NPCステージタイトル */
export class NpcStageTitle implements DOMScene {
  _root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor(resources: Resources) {
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS;
    this._root.innerHTML = rootInnerHTML(resources);
  }
  /** @override */
  destructor(): void {
    // NOP
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}