// @flow

const ROOT_CLASS_NAME = 'player-select__armdozer-status';

export class ArmdozerStatus {
  _root: HTMLElement;

  constructor() {
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = `
      <div class="${ROOT_CLASS_NAME}__name">ネオランドーザ</div>
      <div class="${ROOT_CLASS_NAME}__status">HP:3200 攻撃:2100 機動:1800</div>
      <div class="${ROOT_CLASS_NAME}__burst">バースト バッテリー3回復、2ターンだけ攻撃+900</div>
    `;
  }

  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}