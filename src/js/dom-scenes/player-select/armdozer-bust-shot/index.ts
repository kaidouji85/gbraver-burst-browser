import type { ArmDozerId } from "gbraver-burst-core";

import type { Resources } from "../../../resource";
import { ArmdozerBustShot } from "./amrodzer-bust-shot";
import { createBustShot } from "./create-bust-shot";

/**
 * バストショット情報
 */
type BustShot = {
  armdozerId: ArmDozerId;
  bustShot: ArmdozerBustShot;
};

/**
 * アームドーザバストショット
 */
export class ArmdozerBustShotContainer {
  #resources: Resources;
  #root: HTMLElement;
  #bustShots: BustShot[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param armDozerIds アームドーザIDリスト
   * @param initialArmdozerId アームドーザIDの初期値
   */
  constructor(resources: Resources, armDozerIds: ArmDozerId[], initialArmdozerId: ArmDozerId) {
    this.#resources = resources;
    this.#root = document.createElement("div");
    this.#root.className = "player-select__armdozer-bust-shot-container";
    this.#bustShots = armDozerIds.map(v => ({
      armdozerId: v,
      bustShot: createBustShot(v, resources)
    }));
    this.#bustShots.forEach(v => {
      this.#root.appendChild(v.bustShot.getRootHTMLElement());
    });
    this.#bustShots.filter(v => v.armdozerId !== initialArmdozerId).forEach(v => {
      v.bustShot.hidden();
    });
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
   * リソースの読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all(this.#bustShots.map(v => v.bustShot.waitUntilLoaded()));
  }

  /**
   * アームドーザバストショットを切り替える
   *
   * @param armdozerId アームドーザID
   */
  switch(armdozerId: ArmDozerId): void {
    this.#bustShots.filter(v => v.armdozerId === armdozerId).forEach(v => {
      v.bustShot.show();
      v.bustShot.move();
    });
    this.#bustShots.filter(v => v.armdozerId !== armdozerId).forEach(v => {
      v.bustShot.hidden();
    });
  }

}