// @flow

import type {PilotId} from "gbraver-burst-core";
import {domUuid} from "../../../../uuid/dom-uuid";
import {replaceDOM} from "../../../../dom/replace-dom";
import {Pilots} from "gbraver-burst-core";
import {pilotSkillTemplate} from "./status-template";

/**
 * ルート要素のクラス名
 */
const ROOT_CLASS_NAME = 'player-select__pilot-status';

/**
 * パイロットステータス
 */
export class PilotStatus {
  _root: HTMLElement;
  _name: HTMLElement;
  _skill: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    const dummyNameId = domUuid();
    const skillId = domUuid();

    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = `
      <div data-id="${dummyNameId}"></div>
      <div class="${ROOT_CLASS_NAME}__skill">
        <span class="${ROOT_CLASS_NAME}__skill__label"></span>
        <span class"${ROOT_CLASS_NAME}__skill__content" data-id="${skillId}"></span>
      </div>
    `;

    const dummyName = this._root.querySelector(`[data-id="${dummyNameId}"]`)
      ?? document.createElement('div');
    this._name = document.createElement('div');
    replaceDOM(dummyName, this._name);

    this._skill = this._root.querySelector(`[data-id="${skillId}"]`)
      ?? document.createElement('div');
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
    this._skill.innerText = pilotSkillTemplate(target.skill);
  }
}