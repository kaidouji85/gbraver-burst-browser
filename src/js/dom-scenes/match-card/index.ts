import type { ArmDozerId } from "gbraver-burst-core";

import { getArmdozerIconPathId } from "../../path/armdozer-icon-path";
import type { Resources } from "../../resource";
import { domUuid } from "../../uuid/dom-uuid";
import { waitElementLoaded } from "../../wait/wait-element-loaded";
import type { DOMScene } from "../dom-scene";

/** コンストラクタのパラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** プレイヤー情報 */
  player: ArmDozerId;
  /** 敵情報 */
  enemy: ArmDozerId;
  /** キャプション */
  caption: string;
};

/** 対戦カード画面 */
export class MatchCard implements DOMScene {
  /** ルートHTML要素 */
  #root: HTMLElement;
  /** プレイヤー画像の読み込みが完了したら発火するPromise */
  #isPlayerLoaded: Promise<void>;
  /** 敵画像の読み込みが完了したら発火するPromise */
  #isEnemyLoaded: Promise<void>;

  /**
   * コンストラクタ
   * @param param パラメータ
   */
  constructor(param: Param) {
    const playerId = domUuid();
    const enemyId = domUuid();
    this.#root = document.createElement("div");
    this.#root.className = "match-card";
    this.#root.innerHTML = `
      <div class="match-card__contents">
        <div class="match-card__caption">
          ${param.caption}
        </div>
        <div class="match-card__cards">
          <img class="match-card__enemy-card" data-id="${enemyId}">
          <div class="match-card__vs">vs</div>
          <img class="match-card__player-card"  data-id="${playerId}"">
        </div>
      </div>
    `;
    const playerElement = this.#root.querySelector(`[data-id="${playerId}"]`);
    const playerImage: HTMLImageElement =
      playerElement instanceof HTMLImageElement ? playerElement : new Image();
    this.#isPlayerLoaded = waitElementLoaded(playerImage);
    const playerIconPath = getArmdozerIconPathId(param.player);
    const playerIconResource = param.resources.paths.find(
      (v) => v.id === playerIconPath,
    );
    playerImage.src = playerIconResource ? playerIconResource.path : "";
    const enemyElement = this.#root.querySelector(`[data-id="${enemyId}"]`);
    const enemyImage =
      enemyElement instanceof HTMLImageElement ? enemyElement : new Image();
    this.#isEnemyLoaded = waitElementLoaded(enemyImage);
    const enemyIconPath = getArmdozerIconPathId(param.enemy);
    const enemyIconResource = param.resources.paths.find(
      (v) => v.id === enemyIconPath,
    );
    enemyImage.src = enemyIconResource ? enemyIconResource.path : "";
  }

  /** @override */
  destructor(): void {
    // NOP
  }

  /**
   * 各種リソースの読み込みが完了するまで待つ
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all([this.#isPlayerLoaded, this.#isEnemyLoaded]);
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }
}
