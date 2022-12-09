// @flow

import type { PilotId } from "gbraver-burst-core";
import { Pilots } from "gbraver-burst-core";

import { domUuid } from "../../../uuid/dom-uuid";
import { pilotSkillTemplate } from "./status-template";

/** ルート要素のクラス名 */
const ROOT_CLASS_NAME = "pilot-status";

/** data-idを集めたもの */
type DataIDs = {
  name: string,
  skill: string,
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
      <span class="${ROOT_CLASS_NAME}__skill-overview-contents">ここにスキル概要を書く</span>
    </div>
    <div class="${ROOT_CLASS_NAME}__skill-detail">
      <span class="${ROOT_CLASS_NAME}__skill-detail-label">詳細</span>
      <span class="${ROOT_CLASS_NAME}__skill-detail-contents" data-id="${ids.skill}"></span>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  name: HTMLElement,
  skill: HTMLElement,
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const name =
    root.querySelector(`[data-id="${ids.name}"]`) ??
    document.createElement("div");
  const skill =
    root.querySelector(`[data-id="${ids.skill}"]`) ??
    document.createElement("div");
  return { name, skill };
}

/** パイロットステータス */
export class PilotStatus {
  #root: HTMLElement;
  #name: HTMLElement;
  #skill: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    const dataIDs = { name: domUuid(), skill: domUuid() };
    this.#root = document.createElement("div");
    this.#root.className = ROOT_CLASS_NAME;
    this.#root.innerHTML = rootInnerHTML(dataIDs);

    const elements = extractElements(this.#root, dataIDs);
    this.#name = elements.name;
    this.#skill = elements.skill;
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
    this.#skill.innerHTML = pilotSkillTemplate(target.skill)
      .map(
        (v) =>
          `<span class="${ROOT_CLASS_NAME}__skill__content__line">${v}</span>`
      )
      .reduce((a, b) => a + b);
  }
}
