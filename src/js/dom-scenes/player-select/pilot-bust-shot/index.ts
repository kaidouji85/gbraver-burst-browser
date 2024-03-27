import type { PilotId } from "gbraver-burst-core";

import type { Resources } from "../../../resource";
import { PilotBustShot } from "./pilot-bust-shot";

/**
 * バストショットとパイロットIDの紐づけ
 */
type BustShot = {
  pilotId: PilotId;
  bustShot: PilotBustShot;
};

/**
 * パイロット バストショット
 */
export class PilotBustShotContainer {
  #pilotId: PilotId;
  #bustShots: BustShot[];
  #root: HTMLElement;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param pilotIds パイロットIDリスト
   * @param initialPilotId パイロットID初期値
   */
  constructor(
    resources: Resources,
    pilotIds: PilotId[],
    initialPilotId: PilotId,
  ) {
    this.#pilotId = initialPilotId;
    this.#root = document.createElement("div");
    this.#bustShots = pilotIds.map((id) => ({
      pilotId: id,
      bustShot: new PilotBustShot(resources, id),
    }));
    this.#bustShots.forEach((v) => {
      v.pilotId === this.#pilotId ? v.bustShot.show() : v.bustShot.hidden();
      this.#root.appendChild(v.bustShot.getRootHTMLElement());
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
   * パイロットカットインを切り替える
   *
   * @param pilotId 切り替えるパイロットID
   */
  switch(pilotId: PilotId): void {
    const target = this.#bustShots.find((v) => v.pilotId === pilotId);
    if (!target) {
      return;
    }

    this.#pilotId = pilotId;
    const others = this.#bustShots.filter((v) => v !== target);
    others.forEach((v) => {
      v.bustShot.hidden();
    });
    target.bustShot.show();
    target.bustShot.enter();
  }

  /**
   * 退場
   *
   * @return アニメーション
   */
  async exit(): Promise<void> {
    const target = this.#bustShots.find((v) => v.pilotId === this.#pilotId);

    if (!target) {
      return;
    }

    await target.bustShot.exit();
  }

  /**
   * 非表示にする
   */
  hidden(): void {
    this.#bustShots.forEach((v) => {
      v.bustShot.hidden();
    });
  }

  /**
   * リソース読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUnlillLoaded(): Promise<void> {
    await Promise.all(this.#bustShots.map((v) => v.bustShot.waitUntilLoaded()));
  }
}
