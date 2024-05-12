import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import { HUDCoordinate } from "../../tracking/coordinate";
import type { HUDTracking } from "../../tracking/hud-tracking";
import type { GameObjectAction } from "../action/game-object-action";
import { battery } from "./animation/battery";
import { hp } from "./animation/hp";
import { maxBattery } from "./animation/max-battery";
import type { GaugeModel } from "./model/gauge-model";
import { initialValue } from "./model/initial-value";
import type { GaugeView } from "./view/gauge-view";

/** コンストラクタのパラメータ */
type Param = {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
  /** ビュー */
  view: GaugeView;
  /** 最大HP */
  hp: number;
  /** 最大バッテリー */
  battery: number;
};

/** ゲージ */
export class Gauge implements HUDTracking {
  #model: GaugeModel;
  #view: GaugeView;
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.#view = param.view;
    this.#model = initialValue(param.hp, param.battery);
    this.#unsubscriber = param.gameObjectAction.subscribe((action) => {
      if (action.type === "PreRender") {
        this.#preRender(action);
      }
    });
  }

  /**
   * デストラクタ
   */
  destructor(): void {
    this.#view.destructor();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * HP変更
   * @param value 変更値
   * @returns アニメーション
   */
  hp(value: number): Animate {
    return hp(this.#model, value);
  }

  /**
   * バッテリー変更
   * @param value 変更値
   * @returns アニメーション
   */
  battery(value: number): Animate {
    return battery(this.#model, value);
  }

  /**
   * 最大バッテリー変更
   * @param value 変更値
   * @returns アニメーション
   */
  maxBattery(value: number): Animate {
    return maxBattery(this.#model, value);
  }

  /** @override */
  tracking(coordinate: HUDCoordinate): void {
    const { x, y } = coordinate;
    this.#model.tracking.x = x;
    this.#model.tracking.y = y;
  }

  /**
   * ゲージで使われているthree.jsオブジェクトを取得する
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * ゲージ配下にオブジェクトを追加する
   * @param object 追加対象のオブジェクト
   */
  addObject3D(object: THREE.Object3D): void {
    this.#view.addObject3D(object);
  }

  /**
   * プリレンダー時の処理
   * @param action アクション
   */
  #preRender(action: PreRender): void {
    this.#view.engage(this.#model, action);
  }
}
