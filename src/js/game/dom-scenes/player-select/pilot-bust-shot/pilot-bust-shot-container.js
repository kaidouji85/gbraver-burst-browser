// @flow

import type {Resources} from "../../../../resource";
import type {PilotId} from 'gbraver-burst-core';

/**
 * ルート要素のクラス名
 */
export const ROOT_CLASS_NAME = 'player-select__pilot-bust-shot';

/**
 * パイロット バストショット
 */
export class PilotBustShotContainer {
  _resources: Resources;
  _root: HTMLImageElement;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._resources = resources;
    this._root = document.createElement('img');
    this.hidden();
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * パイロットカットインを切り替える
   * 
   * @param pilotId 切り替えるパイロットID
   */
  switch(pilotId: PilotId): void {
    // TODO バストショットクラスを生成する
    this._root.className = ROOT_CLASS_NAME;
    this._root.src = `${this._resources.rootPath.get()}/pilot/shinya/skill-cutin.png`;
  }

  /**
   * 非表示にする
   */
  hidden(): void {
    this._root.className = `${ROOT_CLASS_NAME}__hidden`;
    this._root.src = '';
  }
}