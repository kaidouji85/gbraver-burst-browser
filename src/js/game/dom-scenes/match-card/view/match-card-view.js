// @flow

import type {ResourcePath} from "../../../../resource/path/resource-path";
import type {ArmDozerId} from "gbraver-burst-core";
import {getArmdozerIconURL} from "../../../../resource/urls/armdozer-icon-urls";
import {domUuid} from "../../../../uuid/dom-uuid";

/**
 * 対戦カードシーン ビュー
 */
export class MatchCardView {
  _root: HTMLElement;
  _isPlayerLoaded: Promise<void>;
  _isEnemyLoaded: Promise<void>;

  /**
   * コンストラクタ
   *
   * @param resourcePath リソースパス
   * @param player プレイヤー側 アームドーザID
   * @param enemy 敵側 アームドーザID
   * @param caption ステージ名
   */
  constructor(resourcePath: ResourcePath, player: ArmDozerId, enemy: ArmDozerId, caption: string) {
    const playerId = domUuid();
    const enemyId = domUuid();
    this._root = document.createElement('div');
    this._root.className = 'match-card';
    this._root.innerHTML = `
      <div class="match-card__contents">
        <div class="match-card__contents__caption">
          ${caption}
        </div>
        <div class="match-card__contents__cards">
          <img class="match-card__contents__cards__enemy" data-id="${enemyId}">
          <div class="match-card__contents__cards__vs">vs</div>
          <img class="match-card__contents__cards__player"  data-id="${playerId}"">
        </div>
      </div>
    `;

    const playerElement = this._root.querySelector(`[data-id="${playerId}"]`);
    const playerImage: HTMLImageElement = (playerElement instanceof HTMLImageElement)
      ? playerElement
      : new Image();
    this._isPlayerLoaded = new Promise(resolve => {
      playerImage.addEventListener('load', () => {
        resolve();
      });
    });
    playerImage.src = getArmdozerIconURL(resourcePath, player);

    const enemyElement = this._root.querySelector(`[data-id="${enemyId}"]`);
    const enemyImage = (enemyElement instanceof HTMLImageElement)
      ? enemyElement
      : new Image();
    this._isEnemyLoaded = new Promise(resolve => {
      enemyImage.addEventListener('load', () => {
        resolve();
      });
    });
    enemyImage.src = getArmdozerIconURL(resourcePath, enemy);
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
   * 各種リソースの読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    try {
      await Promise.all([
        this._isPlayerLoaded,
        this._isEnemyLoaded,
      ]);
    } catch(e) {
      throw e;
    }
  }
}
