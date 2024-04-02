import type { PilotId } from "gbraver-burst-core";
import { Pilots } from "gbraver-burst-core";

import { pilotSkillDetail } from "../../../game-description/pilot-skill-detail";
import { pilotSkillOverview } from "../../../game-description/pilot-skill-overview";
import { domUuid } from "../../../uuid/dom-uuid";

/** ルート要素のクラス名 */
const ROOT_CLASS_NAME = "pilot-status";

/** data-idを集めたもの */
type DataIDs = {
  name: string;
  skillOverview: string;
  skillDetail: string;
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs): string {
  return `
    <div class="${ROOT_CLASS_NAME}__basic-status">
      <div class="${ROOT_CLASS_NAME}__name" data-id="${ids.name}"></div>
    </div>
    <div class="${ROOT_CLASS_NAME}__skill-overview">
      <span class="${ROOT_CLASS_NAME}__skill-overview-label">スキル</span>
      <span class="${ROOT_CLASS_NAME}__skill-overview-contents" data-id="${ids.skillOverview}"></span>
    </div>
    <div class="${ROOT_CLASS_NAME}__skill-detail">
      <span class="${ROOT_CLASS_NAME}__skill-detail-label">スキル詳細</span>
      <span class="${ROOT_CLASS_NAME}__skill-detail-contents" data-id="${ids.skillDetail}"></span>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  name: HTMLElement;
  skillOverview: HTMLElement;
  skillDetail: HTMLElement;
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const name: HTMLElement =
    root.querySelector(`[data-id="${ids.name}"]`) ??
    document.createElement("div");
  const skillOverview: HTMLElement =
    root.querySelector(`[data-id="${ids.skillOverview}"]`) ??
    document.createElement("div");
  const skillDetail: HTMLElement =
    root.querySelector(`[data-id="${ids.skillDetail}"]`) ??
    document.createElement("div");
  return {
    name,
    skillOverview,
    skillDetail,
  };
}

/** パイロットステータス */
export class PilotStatus {
  #root: HTMLElement;
  #name: HTMLElement;
  #skillOverview: HTMLElement;
  #skillDetail: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    const dataIDs = {
      name: domUuid(),
      skillOverview: domUuid(),
      skillDetail: domUuid(),
    };
    this.#root = document.createElement("div");
    this.#root.className = ROOT_CLASS_NAME;
    this.#root.innerHTML = rootInnerHTML(dataIDs);
    const elements = extractElements(this.#root, dataIDs);
    this.#name = elements.name;
    this.#skillOverview = elements.skillOverview;
    this.#skillDetail = elements.skillDetail;
  }

  /**
   * ルートHTML要素を取得する
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * パイロットステータスの表示内容を切り替える
   *
   * @param pilotId 切り替えるパイロットのID
   */
  switch(pilotId: PilotId): void {
    const target = Pilots.find((v) => v.id === pilotId);

    if (!target) {
      return;
    }

    this.#name.innerText = target.name;
    this.#skillOverview.innerText = pilotSkillOverview(target.skill);
    this.#skillDetail.innerHTML = pilotSkillDetail(target.skill)
      .map(
        (v) =>
          `<span class="${ROOT_CLASS_NAME}__skill__content__line">${v}</span>`,
      )
      .reduce((a, b) => a + b);
  }
}
