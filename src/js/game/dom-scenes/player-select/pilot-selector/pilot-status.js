// @flow

import type {PilotId} from "gbraver-burst-core";
import {domUuid} from "../../../../uuid/dom-uuid";
import {Pilots} from "gbraver-burst-core";
import {pilotSkillTemplate} from "./status-template";

/** ルート要素のクラス名 */
const ROOT_CLASS_NAME = 'player-select__pilot-status';

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
    <div class="${ROOT_CLASS_NAME}__name" data-id="${ids.name}"></div>
    <div class="${ROOT_CLASS_NAME}__skill">
      <span class="${ROOT_CLASS_NAME}__skill__label">スキル</span>
      <span class="${ROOT_CLASS_NAME}__skill__content" data-id="${ids.skill}"></span>
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
  const name = root.querySelector(`[data-id="${ids.name}"]`)
    ?? document.createElement('div');
  const skill = root.querySelector(`[data-id="${ids.skill}"]`)
    ?? document.createElement('div');
  return {name, skill};
}

/** パイロットステータス */
export class PilotStatus {
  _root: HTMLElement;
  _name: HTMLElement;
  _skill: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    const dataIDs = {name: domUuid(), skill: domUuid()};
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = rootInnerHTML(dataIDs);

    const elements = extractElements(this._root, dataIDs);
    this._name = elements.name;
    this._skill = elements.skill;
  }

  /**
   * ルートHTML要素を取得する
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * パイロットステータスの表示内容を切り替える
   *
   * @param pilotId 切り替えるパイロットのID
   */
  switch(pilotId: PilotId): void {
    const target = Pilots.find(v => v.id === pilotId);
    if (!target) {
      return;
    }

    this._name.innerText = target.name;
    this._skill.innerHTML = pilotSkillTemplate(target.skill)
      .map(v => `<span class="${ROOT_CLASS_NAME}__skill__content__line">${v}</span>`)
      .reduce((a, b) => a + b);
  }
}