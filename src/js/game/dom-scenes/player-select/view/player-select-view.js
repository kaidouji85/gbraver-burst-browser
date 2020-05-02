// @flow

import type {PlayerSelectState} from "../state/player-select-state";
import type {ResourcePath} from "../../../../resource/path/resource-path";
import {domUuid} from "../../../../uuid/dom-uuid";
import {ArmdozerIconView} from "./armdozer-icon-view";
import {merge, Observable} from "rxjs";
import type {ArmDozerId} from "gbraver-burst-core";

/**
 * イベント通知
 */
export type Notifier = {
  select: Observable<ArmDozerId>;
};

/**
 * プレイヤーセレクト ビュー
 */
export class PlayerSelectView {
  _root: HTMLElement;
  _armdozers: HTMLElement;
  _armdozerIcons: ArmdozerIconView[];

  /**
   * コンストラクタ
   *
   * @param resourcePath リソースパス
   * @param initialState 初期ステート
   */
  constructor(resourcePath: ResourcePath, initialState: PlayerSelectState) {
    const armdozersId = domUuid();
    this._root = document.createElement('div');
    this._root.innerHTML = `
      <span class="player-select__caption">搭乗機を選択してください</span>
      <div class="player-select__armdozers" id-data="${armdozersId}">
      </div>
    `;

    this._armdozers = this._root.querySelector(`[id-data="${armdozersId}"]`) ?? document.createElement('div');
    this._armdozerIcons = initialState.armdozerIcons.map(icon => new ArmdozerIconView(icon));
    this._armdozerIcons
      .map(icon => icon.getRootHTMLElement())
      .forEach(element => {
        this._armdozers.appendChild(element);
      });

    this.engage(initialState);
  }

  /**
   * ステートをビューに反映させる
   *
   * @param state ステート
   */
  engage(state: PlayerSelectState): void {
    this._root.className = state.isVisible
      ? 'player-select'
      : 'player-select--invisible';
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * イベント通知を取得する
   *
   * @return 取得結果
   */
  notifier(): Notifier {
    const selects: Observable<ArmDozerId>[] = this._armdozerIcons.map(icon => icon.notifier().select);
    return {
      select: merge(...selects)
    };
  }
}