// @flow

import type {ArmDozerId} from "gbraver-burst-core";
import {ArmDozers} from "gbraver-burst-core";
import {burstTemplate} from "./status-template";
import {domUuid} from "../../../../uuid/dom-uuid";

/**ルート要素のクラス名 */
const ROOT_CLASS_NAME = 'player-select__armdozer-status';

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
    <div class="${ROOT_CLASS_NAME}__basic">
      <span class="${ROOT_CLASS_NAME}__basic__hp-label">HP</span>
      <span class="${ROOT_CLASS_NAME}__basic__hp-value" data-id="${ids.hp}"></span>
      <span class="${ROOT_CLASS_NAME}__basic__power-label">攻撃</span>
      <span class="${ROOT_CLASS_NAME}__basic__power-value" data-id="${ids.power}" ></span>
      <span class="${ROOT_CLASS_NAME}__basic__power-label">機動</span>
      <span class="${ROOT_CLASS_NAME}__basic__power-value" data-id="${ids.speed}" ></span>
    </div>
    <div class="${ROOT_CLASS_NAME}__burst">
      <span class="${ROOT_CLASS_NAME}__burst__label">バースト</span>
      <span class="${ROOT_CLASS_NAME}__burst__content" data-id="${ids.burst}"></span>
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
  _root: HTMLElement;
  _name: HTMLElement;
  _hp: HTMLElement;
  _power: HTMLElement;
  _speed: HTMLElement;
  _burst: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    const dataIDs = {name: domUuid(), hp: domUuid(), power: domUuid(), speed: domUuid(), burst: domUuid()};
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = rootInnerHTML(dataIDs);
    const elements = extractElements(this._root, dataIDs);

    this._name = elements.name
    this._hp= elements.hp;
    this._power = elements.power;
    this._speed= elements.speed;
    this._burst = elements.burst;
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
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

    this._name.innerText = target.name;
    this._hp.innerText = `${target.maxHp}`;
    this._power.innerText = `${target.power}`;
    this._speed.innerText = `${target.speed}`;
    this._burst.innerHTML = burstTemplate(target.burst)
      .map(v => `<span>${v}</span>`)
      .reduce((a, b) => a + b);
  }
}