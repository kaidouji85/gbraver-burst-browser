// @flow

import type {ArmDozerId} from "gbraver-burst-core";
import {ArmDozers} from "gbraver-burst-core";
import {burstTemplate, statusTemplate} from "./status-template";
import {domUuid} from "../../../../uuid/dom-uuid";

/**
 * ルート要素のクラス名
 */
const ROOT_CLASS_NAME = 'player-select__armdozer-status';

/**
 * アームドーザステータス
 */
export class ArmdozerStatus {
  _root: HTMLElement;
  _name: HTMLElement;
  _status: HTMLElement;
  _burst: HTMLElement;

  /**
   * コンストラクタ
   */
  constructor() {
    const nameId = domUuid();
    const statusId = domUuid();
    const burstId = domUuid();
    
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = `
      <div class="${ROOT_CLASS_NAME}__name" data-id="${nameId}"></div>
      <div class="${ROOT_CLASS_NAME}__status" data-id="${statusId}"></div>
      <div class="${ROOT_CLASS_NAME}__burst" data-id="${burstId}"></div>
    `;

    this._name = this._root.querySelector(`[data-id="${nameId}"]`)
      ?? document.createElement('div');
    this._status = this._root.querySelector(`[data-id="${statusId}"]`)
      ?? document.createElement('div');
    this._burst = this._root.querySelector(`[data-id="${burstId}"]`)
      ?? document.createElement('div');
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
    this._status.innerText = statusTemplate(target);
    this._burst.innerText = burstTemplate(target.burst);
  }
}
