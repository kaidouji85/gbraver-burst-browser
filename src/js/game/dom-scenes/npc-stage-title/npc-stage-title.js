// @flow

import type {DOMScene} from "../dom-scene";

/** ルート要素 class属性 */
const ROOT_CLASS = 'npc-stage-title';

/** NPCステージタイトル */
export class NpcStageTitle implements DOMScene {
  _root: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS;
    this._root.innerHTML = `NPCステージタイトル`;
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