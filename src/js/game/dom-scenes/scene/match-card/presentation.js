// @flow

import type {ArmDozerId} from "gbraver-burst-core";
import {getArmdozerIconPathId} from "../../../../path/armdozer-icon-path";
import type {Resources} from "../../../../resource";
import {domUuid} from "../../../../uuid/dom-uuid";
import {waitElementLoaded} from "../../../../wait/wait-element-loaded";

/**
 * 対戦カードシーン プレゼンテーション
 */
export class MatchCardPresentation {
  #root: HTMLElement;
  #isPlayerLoaded: Promise<void>;
  #isEnemyLoaded: Promise<void>;

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
    this.#root = document.createElement('div');
    this.#root.className = 'match-card';
    this.#root.innerHTML = `
      <div class="match-card__contents">
        <div class="match-card__caption">
          ${caption}
        </div>
        <div class="match-card__cards">
          <img class="match-card__enemy-card" data-id="${enemyId}">
          <div class="match-card__vs">vs</div>
          <img class="match-card__player-card"  data-id="${playerId}"">
        </div>
      </div>
    `;

    const playerElement = this.#root.querySelector(`[data-id="${playerId}"]`);
    const playerImage: HTMLImageElement = (playerElement instanceof HTMLImageElement)
      ? playerElement
      : new Image();
    this.#isPlayerLoaded = waitElementLoaded(playerImage)
    const playerIconPath = getArmdozerIconPathId(player);
    const playerIconResource = resources.paths.find(v => v.id === playerIconPath);
    playerImage.src = playerIconResource
      ? playerIconResource.path
      : '';

    const enemyElement = this.#root.querySelector(`[data-id="${enemyId}"]`);
    const enemyImage = (enemyElement instanceof HTMLImageElement)
      ? enemyElement
      : new Image();
    this.#isEnemyLoaded = waitElementLoaded(enemyImage);
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
    return this.#root;
  }

  /**
   * 各種リソースの読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all([
      this.#isPlayerLoaded,
      this.#isEnemyLoaded,
    ]);
  }
}
