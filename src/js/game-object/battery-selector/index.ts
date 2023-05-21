import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { all } from "../../animation/all";
import { Animate } from "../../animation/animate";
import { empty } from "../../animation/delay";
import type { Resources } from "../../resource";
import type { GameObjectAction } from "../action/game-object-action";
import { close } from "./animation/close";
import { decide } from "./animation/decide";
import { open } from "./animation/open";
import type { ButtonLabel } from "./model/button-label";
import { canBatteryMinus } from "./model/can-battery-minus";
import { canBatteryPlus } from "./model/can-battery-plus";
import { getNeedleValue } from "./model/needle-value";
import { batteryChange } from "./procedure/battery-change";
import { batteryMinusPop } from "./procedure/battery-minus-pop";
import { batteryPlusPop } from "./procedure/battery-plus-pop";
import { bindEventListeners } from "./procedure/bind-event-listeners";
import { BatterySelectorProps, createBatterySelectorProps } from "./props";

/** コンストラクタのパラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** バッテリーセレクタ */
export class BatterySelector {
  /** プロパティ */
  #props: BatterySelectorProps;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.#props = createBatterySelectorProps(param);
    this.#unsubscribers = bindEventListeners(
      this.#props,
      param.gameObjectAction
    );
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#props.view.destructor();
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /**
   * バッテリーセレクターを開く
   * @param initialValue 初期値
   * @param maxBattery バッテリー最大値
   * @param enableMaxBattery 選択可能な最大値
   * @param label ボタンのラベル
   * @return アニメーション
   */
  open(
    initialValue: number,
    maxBattery: number,
    enableMaxBattery: number,
    label: ButtonLabel
  ): Animate {
    this.#props.model.battery = initialValue;
    this.#props.model.maxBattery = maxBattery;
    this.#props.model.needle = getNeedleValue(
      initialValue,
      this.#props.model.maxBattery
    );
    this.#props.model.enableMaxBattery = Math.min(
      enableMaxBattery,
      this.#props.model.maxBattery
    );
    this.#props.model.label = label;
    return open(this.#props.model);
  }

  /**
   * バッテリー決定アニメーション
   * @return アニメーション
   */
  decide(): Animate {
    this.#props.sounds.pushButtonSound.play();
    return decide(this.#props.model);
  }

  /**
   * バッテリーセレクタを閉じる
   * @return アニメーション
   */
  close(): Animate {
    return close(this.#props.model);
  }

  /**
   * バッテリープラス
   * メモリ最大値の場合は空のアニメーションを返す
   * @return アニメーション
   */
  batteryPlus(): Animate {
    if (!canBatteryPlus(this.#props.model)) {
      return empty();
    }

    return all(
      batteryPlusPop(this.#props),
      batteryChange(this.#props, this.#props.model.battery + 1)
    );
  }

  /**
   * バッテリーマイナス
   * メモリ最小値の場合は空のアニメーションを返す
   * @return アニメーション
   */
  batteryMinus(): Animate {
    if (!canBatteryMinus(this.#props.model)) {
      return empty();
    }

    return all(
      batteryMinusPop(this.#props),
      batteryChange(this.#props, this.#props.model.battery - 1)
    );
  }

  /**
   * 現在のバッテリー値を取得する
   * @return 取得結果
   */
  getBattery(): number {
    return this.#props.model.battery;
  }

  /**
   * シーンに追加するthree.jsオブジェクトを取得する
   * @return 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#props.view.getObject3D();
  }

  /**
   * 決定ボタン押下ストリーム
   * @return 通知ストリーム
   */
  notifyDecision(): Observable<Event> {
    return this.#props.decidePush;
  }

  /**
   * バッテリープラスボタン押下ストリーム
   * @return 通知ストリーム
   */
  notifyBatteryPlus(): Observable<void> {
    return this.#props.batteryPlusPush;
  }

  /**
   * バッテリーマイナスボタン押下ストリーム
   * @return 通知ストリーム
   */
  notifyBatteryMinus(): Observable<void> {
    return this.#props.batteryMinusPush;
  }
}
