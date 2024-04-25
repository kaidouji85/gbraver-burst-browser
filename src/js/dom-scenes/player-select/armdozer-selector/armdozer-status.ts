import { ArmdozerId, Armdozers } from "gbraver-burst-core";

import { burstDetail } from "../../../game-description/burst-detail";
import { burstOverview } from "../../../game-description/burst-overview";
import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { domUuid } from "../../../uuid/dom-uuid";

/**ルート要素のクラス名 */
const ROOT_CLASS_NAME = "armdozer-status";

/** data-idを集めたもの */
type DataIDs = {
  name: string;
  battery: string;
  hp: string;
  power: string;
  speed: string;
  burstOverview: string;
  burstDetail: string;
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @param resources リソース管理オブジェクト
 * @returns innerHTML
 */
function rootInnerHTML(ids: DataIDs, resources: Resources): string {
  const batteryIconPath =
    resources.paths.find((v) => v.id === PathIds.BATTERY_ICON)?.path ?? "";
  return `
    <div class="${ROOT_CLASS_NAME}__basic-status">
      <div class="${ROOT_CLASS_NAME}__name" data-id="${ids.name}"></div>
      <div class="${ROOT_CLASS_NAME}__basic-params">
        <span class="${ROOT_CLASS_NAME}__battery-label">
          <img class="${ROOT_CLASS_NAME}__battery-icon" src="${batteryIconPath}" alt="バッテリーアイコン">
        </span>
        <span class="${ROOT_CLASS_NAME}__battery-value" data-id="${ids.battery}"></span>
        <span class="${ROOT_CLASS_NAME}__hp-label">HP</span>
        <span class="${ROOT_CLASS_NAME}__hp-value" data-id="${ids.hp}"></span>
        <span class="${ROOT_CLASS_NAME}__power-label">攻撃</span>
        <span class="${ROOT_CLASS_NAME}__power-value" data-id="${ids.power}" ></span>
        <span class="${ROOT_CLASS_NAME}__speed-label">機動</span>
        <span class="${ROOT_CLASS_NAME}__speed-value" data-id="${ids.speed}" ></span>
      </div>
    </div>
    <div class="${ROOT_CLASS_NAME}__burst-overview">
      <span class="${ROOT_CLASS_NAME}__burst-overview-label">バースト</span>
      <span class="${ROOT_CLASS_NAME}__burst-overview-contents" data-id="${ids.burstOverview}"></span>
    </div>
    <div class="${ROOT_CLASS_NAME}__burst-detail">
     <span class="${ROOT_CLASS_NAME}__burst-detail-label">バースト詳細</span>
     <span class="${ROOT_CLASS_NAME}__burst-detail-contents" data-id="${ids.burstDetail}"></span>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  name: HTMLElement;
  battery: HTMLElement;
  hp: HTMLElement;
  power: HTMLElement;
  speed: HTMLElement;
  burstOverview: HTMLElement;
  burstDetail: HTMLElement;
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @returns 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const name: HTMLElement =
    root.querySelector(`[data-id="${ids.name}"]`) ??
    document.createElement("div");
  const battery: HTMLElement =
    root.querySelector(`[data-id="${ids.battery}"]`) ??
    document.createElement("div");
  const hp: HTMLElement =
    root.querySelector(`[data-id="${ids.hp}"]`) ??
    document.createElement("div");
  const power: HTMLElement =
    root.querySelector(`[data-id="${ids.power}"]`) ??
    document.createElement("div");
  const speed: HTMLElement =
    root.querySelector(`[data-id="${ids.speed}"]`) ??
    document.createElement("div");
  const burstOverview: HTMLElement =
    root.querySelector(`[data-id="${ids.burstOverview}"]`) ??
    document.createElement("div");
  const burstDetail: HTMLElement =
    root.querySelector(`[data-id="${ids.burstDetail}"]`) ??
    document.createElement("div");
  return {
    name,
    battery,
    hp,
    power,
    speed,
    burstOverview,
    burstDetail,
  };
}

/** アームドーザステータス */
export class ArmdozerStatus {
  #root: HTMLElement;
  #name: HTMLElement;
  #battery: HTMLElement;
  #hp: HTMLElement;
  #power: HTMLElement;
  #speed: HTMLElement;
  #burstOverview: HTMLElement;
  #burstDetail: HTMLElement;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const dataIDs = {
      name: domUuid(),
      battery: domUuid(),
      hp: domUuid(),
      power: domUuid(),
      speed: domUuid(),
      burstOverview: domUuid(),
      burstDetail: domUuid(),
    };
    this.#root = document.createElement("div");
    this.#root.className = ROOT_CLASS_NAME;
    this.#root.innerHTML = rootInnerHTML(dataIDs, resources);
    const elements = extractElements(this.#root, dataIDs);
    this.#name = elements.name;
    this.#battery = elements.battery;
    this.#hp = elements.hp;
    this.#power = elements.power;
    this.#speed = elements.speed;
    this.#burstOverview = elements.burstOverview;
    this.#burstDetail = elements.burstDetail;
  }

  /**
   * ルートHTML要素を取得する
   *
   * @returns ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * 表示内容を切り替える
   *
   * @param armdozerId 表示するアームドーザID
   */
  switch(armdozerId: ArmdozerId) {
    const target = Armdozers.find((v) => v.id === armdozerId);

    if (!target) {
      return;
    }

    this.#name.innerText = target.name;
    this.#battery.innerText = `${target.maxBattery}`;
    this.#hp.innerText = `${target.maxHp}`;
    this.#power.innerText = `${target.power}`;
    this.#speed.innerText = `${target.speed}`;
    this.#burstOverview.innerText = burstOverview(target.burst);
    this.#burstDetail.innerHTML = burstDetail(target.burst)
      .map(
        (v) =>
          `<span class="${ROOT_CLASS_NAME}__burst__content__line">${v}</span>`,
      )
      .reduce((a, b) => a + b);
  }
}
