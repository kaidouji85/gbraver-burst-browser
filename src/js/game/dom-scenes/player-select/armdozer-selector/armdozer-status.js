// @flow

import type {ArmDozerId} from "gbraver-burst-core";
import {ArmDozers} from "gbraver-burst-core";
import {burstTemplate, statusTemplate} from "./status-template";

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
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;

    this._name = document.createElement('div');
    this._name.className = `${ROOT_CLASS_NAME}__name`;
    this._root.appendChild(this._name);

    this._status = document.createElement('div');
    this._status.className = `${ROOT_CLASS_NAME}__status`;
    this._root.appendChild(this._status);

    this._burst = document.createElement('div');
    this._burst.className = `${ROOT_CLASS_NAME}__status`;
    this._root.appendChild(this._burst);
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
