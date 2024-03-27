import type { ArmdozerId } from "gbraver-burst-core";

import type { Resources } from "../../../resource";
import { ArmdozerBustShot } from "./amrodzer-bust-shot";

/** アームドーザバストショット */
export class ArmdozerBustShotContainer {
  /** ルートHTML要素 */
  #root: HTMLElement;
  /** バストショットをあつめたもの */
  #bustShots: ArmdozerBustShot[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param armdozerIds アームドーザIDリスト
   * @param initialArmdozerId アームドーザIDの初期値
   */
  constructor(
    resources: Resources,
    armdozerIds: ArmdozerId[],
    initialArmdozerId: ArmdozerId,
  ) {
    this.#root = document.createElement("div");
    this.#root.className = "player-select__armdozer-bust-shot-container";
    this.#bustShots = armdozerIds.map(
      (id) => new ArmdozerBustShot(resources, id),
    );
    this.#bustShots.forEach((bustShot) => {
      this.#root.appendChild(bustShot.getRootHTMLElement());
    });
    this.#bustShots
      .filter((bustShot) => bustShot.armdozerId !== initialArmdozerId)
      .forEach((bustShot) => {
        bustShot.hidden();
      });
  }

  /**
   * ルートHTML要素を取得する
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * リソースの読み込みが完了するまで待つ
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all(
      this.#bustShots.map((bustShot) => bustShot.waitUntilLoaded()),
    );
  }

  /**
   * アームドーザバストショットを切り替える
   * @param armdozerId アームドーザID
   */
  switch(armdozerId: ArmdozerId): void {
    this.#bustShots
      .filter((bustShot) => bustShot.armdozerId === armdozerId)
      .forEach((bustShot) => {
        bustShot.show();
        bustShot.move();
      });
    this.#bustShots
      .filter((bustShot) => bustShot.armdozerId !== armdozerId)
      .forEach((bustShot) => {
        bustShot.hidden();
      });
  }
}
