// @flow

import type {PilotId} from "gbraver-burst-core";
import {domUuid} from "../../../../uuid/dom-uuid";
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
    const nameId = domUuid();
    const skillId = domUuid();

    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = `
      <div class="${ROOT_CLASS_NAME}__name" data-id="${nameId}"></div>
      <div class="${ROOT_CLASS_NAME}__skill">
        <span class="${ROOT_CLASS_NAME}__skill__label">スキル</span>
        <span class="${ROOT_CLASS_NAME}__skill__content" data-id="${skillId}"></span>
      </div>
    `;

    this._name = this._root.querySelector(`[data-id="${nameId}"]`)
      ?? document.createElement('div');
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