import type { PilotId } from "gbraver-burst-core";

import type { Resources } from "../../../resource";
import { PilotBustShot } from "./pilot-bust-shot";

/** パイロット バストショット */
export class PilotBustShotContainer {
  /** 現在選択中のパイロットID */
  #pilotId: PilotId;
  /** バストショットをあつめたもの */
  #bustShots: PilotBustShot[];
  /** ルートHTML要素 */
  #root: HTMLElement;

  /**
   * コンストラクタ
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

    this.#bustShots = pilotIds.map((id) => new PilotBustShot(resources, id));
    this.#bustShots.forEach((bustShot) => {
      if (bustShot.pilotId === this.#pilotId) {
        bustShot.show();
      } else {
        bustShot.hidden();
      }
      this.#root.appendChild(bustShot.getRootHTMLElement());
    });
  }

  /**
   * ルートHTML要素を取得する
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * パイロットカットインを切り替える
   * @param pilotId 切り替えるパイロットID
   */
  switch(pilotId: PilotId): void {
    const target = this.#bustShots.find(
      (bustShot) => bustShot.pilotId === pilotId,
    );
    if (!target) {
      return;
    }

    this.#pilotId = pilotId;
    const others = this.#bustShots.filter((bustShot) => bustShot !== target);
    others.forEach((bustShot) => {
      bustShot.hidden();
    });
    target.show();
    target.enter();
  }

  /**
   * 退場
   * @returns アニメーション
   */
  async exit(): Promise<void> {
    const target = this.#bustShots.find(
      (bustShot) => bustShot.pilotId === this.#pilotId,
    );
    if (!target) {
      return;
    }

    await target.exit();
  }

  /**
   * 非表示にする
   */
  hidden(): void {
    this.#bustShots.forEach((bustShot) => {
      bustShot.hidden();
    });
  }

  /**
   * リソース読み込みが完了するまで待つ
   * @returns 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all(
      this.#bustShots.map((bustShot) => bustShot.waitUntilLoaded()),
    );
  }
}
