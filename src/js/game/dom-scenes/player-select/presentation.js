// @flow

import type {Resources} from "../../../resource";
import {ArmdozerSelector} from "./arndozer-selector";
import type {ArmDozerId} from "gbraver-burst-core";

/**
 * プレイヤーセレクト プレゼンテーション
 */
export class PlayerSelectPresentation {
  _root: HTMLElement;
  _armdozerSelector: ArmdozerSelector;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param armDozerIds 選択できるアームドーザのID
   */
  constructor(resources: Resources, armDozerIds: ArmDozerId[]) {
    this._root = document.createElement('div');
    this._root.className = 'player-select';

    this._armdozerSelector = new ArmdozerSelector(resources,armDozerIds);
    this._root.appendChild(this._armdozerSelector.getRootHTMLElement());
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
   * リソース読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    return this._armdozerSelector.waitUntilLoaded();
  }
}