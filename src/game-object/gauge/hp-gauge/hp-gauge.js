// @flow

import * as THREE from "three";
import {Group, Tween} from '@tweenjs/tween.js'
import type {HpGaugeView} from "./view/hp-gauge-view";
import type {HpGaugeModel} from "./model/hp-gauge-model";
import {change} from "./model/change";

/** HPゲージゲームオブジェクト */
export class HpGauge {
  _model: HpGaugeModel;
  _view: HpGaugeView;
  _tweenGroup: Group;

  constructor(params: {view: HpGaugeView, hp: number, maxHp: number}) {
    this._model = {
      hp: params.hp,
      maxHp: params.maxHp
    };
    this._view = params.view;
    this._tweenGroup = new Group();
  };

  /** ゲームループ毎の処理 */
  gameLoop(time: DOMHighResTimeStamp) {
    this._tweenGroup.update(time);
    this._view.gameLoop(this._model);
  }

  /** シーンに追加するthree.jsオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._view.getThreeJsObjectList();
  }

  /** 指定したHPに徐々に近づいていく */
  change(toHp: number): Tween {
    return change(this._model, this._tweenGroup, toHp);
  }

  /** 本オブジェクトに関連するTweenを全削除する */
  removeTween() {
    this._tweenGroup.removeAll();
  }
}