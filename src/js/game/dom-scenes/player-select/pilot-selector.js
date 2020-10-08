// @flow

import type {Resources} from "../../../resource";
import type {PilotId} from "gbraver-burst-core";

/**
 * ルート要素のclass名
 */
export const ROOT_CLASS_NAME = 'player-select__pilot-selector';

/**
 * パイロットセレクタ
 */
export class PilotSelector {
  _root: HTMLElement;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param pilotIds 選択可能なパイロットIDリスト
   */
  constructor(resources: Resources, pilotIds: PilotId[]) {
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = `
      <div>
        テスト
      </div>
    `;
  }

  /**
   * 本コンポネントを表示する
   */
  show(): void {
    this._root.className = ROOT_CLASS_NAME;
  }

  /**
   * 本コンポネントを非表示にする
   */
  hidden(): void {
    this._root.className = `${ROOT_CLASS_NAME}--hidden`;
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}