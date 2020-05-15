// @flow

import type {ResourcePath} from "../../../../resource/path/resource-path";
import type {ArmDozerId} from "gbraver-burst-core";
import {getArmdozerIconURL} from "../../../../resource/urls/armdozer-icon-urls";

/**
 * 対戦カードシーン ビュー
 */
export class MatchCardView {
  _root: HTMLElement;
  _imageURLs: {
    player: string,
    enemy: string,
  }

  /**
   * コンストラクタ
   *
   * @param resourcePath リソースパス
   * @param player プレイヤー側 アームドーザID
   * @param enemy 敵側 アームドーザID
   * @param caption ステージ名
   */
  constructor(resourcePath: ResourcePath, player: ArmDozerId, enemy: ArmDozerId, caption: string) {
    this._imageURLs = {
      player: getArmdozerIconURL(resourcePath, player),
      enemy: getArmdozerIconURL(resourcePath, enemy),
    };

    this._root = document.createElement('div');
    this._root.className = 'match-card';
    this._root.innerHTML = `
      <div class="match-card__contents">
        <div class="match-card__contents__caption">
          ${caption}
        </div>
        <div class="match-card__contents__cards">
          <img class="match-card__contents__cards__enemy" src="${this._imageURLs.enemy}">
          <div class="match-card__contents__cards__vs">vs</div>
          <img class="match-card__contents__cards__player" src="${this._imageURLs.player}">
        </div>
      </div>
    `;
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
   * 本ビューが利用している画像URLを全て返す
   *
   * @return 取得結果
   */
  getImageURLs(): string[] {
    return Object.values(this._imageURLs)
      .filter(v => typeof (v) === 'string')
      .map(v => ((v: any): string));
  }
}
