import * as THREE from "three";

import { Animate } from "../../animation/animate";
import type { PreRender } from "../../game-loop/pre-render";
import type { Stream, Unsubscriber } from "../../stream/stream";
import type { HUDTracking } from "../../tracking/hud-tracking";
import type { GameObjectAction } from "../action/game-object-action";
import { battery } from "./animation/battery";
import { hp } from "./animation/hp";
import type { GaugeModel } from "./model/gauge-model";
import { initialValue } from "./model/initial-value";
import type { GaugeView } from "./view/gauge-view";

/** コンストラクタのパラメータ */
type Param = {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>;
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
  #unsubscriber: Unsubscriber;

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
   * @return アニメーション
   */
  hp(value: number): Animate {
    return hp(this.#model, value);
  }

  /**
   * バッテリー変更
   * @param value 変更値
   * @return アニメーション
   */
  battery(value: number): Animate {
    return battery(this.#model, value);
  }

  /**
   * 3Dレイヤーのオブジェクをトラッキングする
   * 座標にはHUDレイヤー系座標に変換したものを指定する
   * @param x x座標
   * @param y y座標
   */
  tracking(x: number, y: number): void {
    this.#model.tracking.x = x;
    this.#model.tracking.y = y;
  }

  /**
   * ゲージで使われているthree.jsオブジェクトを取得する
   * @return 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#view.getObject3D();
  }

  /**
   * プリレンダー時の処理
   * @param action アクション
   */
  #preRender(action: PreRender): void {
    this.#view.engage(this.#model, action);
  }
}
