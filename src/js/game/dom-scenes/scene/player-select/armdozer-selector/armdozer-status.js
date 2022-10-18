// @flow

import type {ArmDozerId} from "gbraver-burst-core";
import {ArmDozers} from "gbraver-burst-core";
import {domUuid} from "../../../../../uuid/dom-uuid";
import {burstTemplate} from "./status-template";

/**ルート要素のクラス名 */
const ROOT_CLASS_NAME = 'armdozer-status';

/** data-idを集めたもの */
type DataIDs = {
  name: string,
  hp: string,
  power: string,
  speed: string,
  burst: string
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs): string {
  return `
    <div class="${ROOT_CLASS_NAME}__name" data-id="${ids.name}"></div>
    <div class="${ROOT_CLASS_NAME}__basic-status">
      <span class="${ROOT_CLASS_NAME}__hp-label">HP</span>
      <span class="${ROOT_CLASS_NAME}__hp-value" data-id="${ids.hp}"></span>
      <span class="${ROOT_CLASS_NAME}__power-label">攻撃</span>
      <span class="${ROOT_CLASS_NAME}__power-value" data-id="${ids.power}" ></span>
      <span class="${ROOT_CLASS_NAME}__power-label">機動</span>
      <span class="${ROOT_CLASS_NAME}__power-value" data-id="${ids.speed}" ></span>
    </div>
    <div class="${ROOT_CLASS_NAME}__burst">
      <span class="${ROOT_CLASS_NAME}__burst-label">バースト</span>
      <span class="${ROOT_CLASS_NAME}__burst-description" data-id="${ids.burst}"></span>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  name: HTMLElement,
  hp: HTMLElement,
  power: HTMLElement,
  speed: HTMLElement,
  burst: HTMLElement
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const name = root.querySelector(`[data-id="${ids.name}"]`)
    ?? document.createElement('div');
  const hp= root.querySelector(`[data-id="${ids.hp}"]`)
    ?? document.createElement('div');
  const power= root.querySelector(`[data-id="${ids.power}"]`)
    ?? document.createElement('div');
  const speed= root.querySelector(`[data-id="${ids.speed}"]`)
    ?? document.createElement('div');
  const burst = root.querySelector(`[data-id="${ids.burst}"]`)
    ?? document.createElement('div');
  return {name, hp, power, speed, burst};
}

/** アームドーザステータス */
export class ArmdozerStatus {
  #root: HTMLElement;
  #name: HTMLElement;
  #hp: HTMLElement;
  #power: HTMLElement;
  #speed: HTMLElement;
  #burst: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    const dataIDs = {name: domUuid(), hp: domUuid(), power: domUuid(), speed: domUuid(), burst: domUuid()};
    this.#root = document.createElement('div');
    this.#root.className = ROOT_CLASS_NAME;
    this.#root.innerHTML = rootInnerHTML(dataIDs);
    const elements = extractElements(this.#root, dataIDs);

    this.#name = elements.name
    this.#hp= elements.hp;
    this.#power = elements.power;
    this.#speed= elements.speed;
    this.#burst = elements.burst;
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * 表示内容を切り替える
   *
   * @param armdozerId 表示するアームドーザID
   */
  switch(armdozerId: ArmDozerId) {
    const target = ArmDozers.find(v => v.id === armdozerId);
    if (!target) {
      return;
    }

    this.#name.innerText = target.name;
    this.#hp.innerText = `${target.maxHp}`;
    this.#power.innerText = `${target.power}`;
    this.#speed.innerText = `${target.speed}`;
    this.#burst.innerHTML = burstTemplate(target.burst)
      .map(v => `<span class="${ROOT_CLASS_NAME}__burst__content__line">${v}</span>`)
      .reduce((a, b) => a + b);
  }
}