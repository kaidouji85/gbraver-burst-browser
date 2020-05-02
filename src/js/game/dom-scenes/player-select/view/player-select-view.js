// @flow

import type {ArmdozerIcon, PlayerSelectState} from "../state/player-select-state";
import type {ResourcePath} from "../../../../resource/path/resource-path";
import {domUuid} from "../../../../uuid/dom-uuid";

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
}

/**
 * アームドーザアイコン ビュー
 */
export class ArmdozerIconView {
  _root: HTMLElement;

  constructor(state: ArmdozerIcon) {
    this._root = document.createElement('img');
    this._root.src = state.image;
    this._root.className = 'player-select__armdozers__icon';
  }

  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}