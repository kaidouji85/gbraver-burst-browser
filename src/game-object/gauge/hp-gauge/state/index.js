// @flow

import {ChangeGradually} from "./change-gradually";
import type {HpGaugeModel} from "../base";

/** 状態オブジェクトをまとめたもの */
export class HpGaugeStateContainer {
  _changeGradually: ChangeGradually;

  constructor() {
    this._changeGradually = new ChangeGradually();
  }

  /** 徐々にHPが変化する */
  changeGradually(model: HpGaugeModel, toHp: number): ChangeGradually {
    this._stopAllTween();
    this._changeGradually.start(model, toHp);
    return this._changeGradually;
  }

  _stopAllTween(): void {
    this._changeGradually.stop();
  }
}