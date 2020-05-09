// @flow

import type {ResourcePath} from "../../../../resource/path/resource-path";
import type {ArmDozerId} from "gbraver-burst-core/lib/player/armdozer/armdozer";
import {armDozerId2URL} from "./armdozer-id-to-url";

/**
 * 対戦カードシーン ビュー
 */
export class MatchCardView {
  _root: HTMLElement;

  /**
   * コンストラクタ
   *
   * @param resourcePath リソースパス
   * @param player プレイヤー側 アームドーザID
   * @param enemy 敵側 アームドーザID
   * @param caption ステージ名
   */
  constructor(resourcePath: ResourcePath, player: ArmDozerId, enemy: ArmDozerId, caption: string) {
    this._root = document.createElement('div');
    this._root.className = 'match-card';
    this._root.innerHTML = `
      <div class="match-card__contents">
        <div class="match-card__contents__caption">
          ${caption}
        </div>
        <div class="match-card__contents__cards">
          <img class="match-card__contents__cards__enemy" src="${armDozerId2URL(resourcePath, enemy)}">
          <div class="match-card__contents__cards__vs">vs</div>
          <img class="match-card__contents__cards__player" src="${armDozerId2URL(resourcePath, player)}">
        </div>
      </div>
    `;
  }

  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}
