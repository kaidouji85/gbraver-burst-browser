import type { ArmdozerId } from "gbraver-burst-core";

import type { Resources } from "../../../resource";
import { ArmdozerBustShot } from "./amrodzer-bust-shot";

/**
 * @deprecated
 * バストショット情報
 */
type BustShot = {
  armdozerId: ArmdozerId;
  bustShot: ArmdozerBustShot;
};

/** アームドーザバストショット */
export class ArmdozerBustShotContainer {
  /** ルートHTML要素 */
  #root: HTMLElement;
  /** バストショットをあつめたもの */
  #bustShots: BustShot[];

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
    this.#bustShots = armdozerIds.map((id) => ({
      armdozerId: id,
      bustShot: new ArmdozerBustShot(resources, id),
    }));
    this.#bustShots.forEach((v) => {
      this.#root.appendChild(v.bustShot.getRootHTMLElement());
    });
    this.#bustShots
      .filter((v) => v.armdozerId !== initialArmdozerId)
      .forEach((v) => {
        v.bustShot.hidden();
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
    await Promise.all(this.#bustShots.map((v) => v.bustShot.waitUntilLoaded()));
  }

  /**
   * アームドーザバストショットを切り替える
   * @param armdozerId アームドーザID
   */
  switch(armdozerId: ArmdozerId): void {
    this.#bustShots
      .filter((v) => v.armdozerId === armdozerId)
      .forEach((v) => {
        v.bustShot.show();
        v.bustShot.move();
      });
    this.#bustShots
      .filter((v) => v.armdozerId !== armdozerId)
      .forEach((v) => {
        v.bustShot.hidden();
      });
  }
}
