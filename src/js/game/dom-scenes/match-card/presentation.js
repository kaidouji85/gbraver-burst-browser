// @flow

import type {ArmDozerId} from "gbraver-burst-core";
import {domUuid} from "../../../uuid/dom-uuid";
import type {Resources} from "../../../resource";
import {getArmdozerIconPathId} from "../../../path/armdozer-icon-path";
import {waitElementLoaded} from "../../../wait/wait-element-loaded";

/**
 * 対戦カードシーン プレゼンテーション
 */
export class MatchCardPresentation {
  _root: HTMLElement;
  _isPlayerLoaded: Promise<void>;
  _isEnemyLoaded: Promise<void>;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param player プレイヤー側 アームドーザID
   * @param enemy 敵側 アームドーザID
   * @param caption ステージ名
   */
  constructor(resources: Resources, player: ArmDozerId, enemy: ArmDozerId, caption: string) {
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
    this._isPlayerLoaded = waitElementLoaded(playerImage)
    const playerIconPath = getArmdozerIconPathId(player);
    const playerIconResource = resources.paths.find(v => v.id === playerIconPath);
    playerImage.src = playerIconResource
      ? playerIconResource.path
      : '';

    const enemyElement = this._root.querySelector(`[data-id="${enemyId}"]`);
    const enemyImage = (enemyElement instanceof HTMLImageElement)
      ? enemyElement
      : new Image();
    this._isEnemyLoaded = waitElementLoaded(enemyImage);
    const enemyIconPath = getArmdozerIconPathId(enemy);
    const enemyIconResource = resources.paths.find(v => v.id === enemyIconPath);
    enemyImage.src = enemyIconResource
      ? enemyIconResource.path
      : '';
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
    await Promise.all([
      this._isPlayerLoaded,
      this._isEnemyLoaded,
    ]);
  }
}
