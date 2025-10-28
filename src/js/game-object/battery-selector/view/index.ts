import { ArmdozerId } from "gbraver-burst-core";
import { Observable } from "rxjs";
import * as THREE from "three";

import { PreRender } from "../../../game-loop/pre-render";
import { ResourcesContainer } from "../../../resource";
import { GameObjectActionContainer } from "../../action/game-object-action-container";
import { hudUIScale } from "../../scale";
import { BatterySelectorModel } from "../model";
import { BatteryButton } from "./battery-button";
import { BatteryMeter } from "./battery-merter";
import { BatteryMinus } from "./battery-minus";
import { BatteryPlus } from "./battery-plus";

/** コンストラクタのオプション */
export type BatterySelectorViewOptions = ResourcesContainer &
  GameObjectActionContainer & {
    /** アームドーザID */
    armdozerId: ArmdozerId;
  };

/** バッテリーセレクタのビュー */
export class BatterySelectorView {
  /** 決定ボタン */
  #button: BatteryButton;
  /** メーター */
  #meter: BatteryMeter;
  /** +ボタン */
  #plus: BatteryPlus;
  /** -ボタン */
  #minus: BatteryMinus;
  /** グループ */
  #group: THREE.Group;

  /**
   * コンストラクタ
   * @params options オプション
   */
  constructor(options: BatterySelectorViewOptions) {
    this.#group = new THREE.Group();
    this.#meter = new BatteryMeter(options);
    this.#meter.getObject3D().position.set(0, 288, 0);
    this.#group.add(this.#meter.getObject3D());

    this.#button = new BatteryButton(options);
    this.#button.getObject3D().position.set(0, 0, 1);
    this.#group.add(this.#button.getObject3D());

    this.#plus = new BatteryPlus({
      resources: options.resources,
      gameObjectAction: options.gameObjectAction,
    });
    this.#plus.getObject3D().position.set(256, 176, 2);
    this.#group.add(this.#plus.getObject3D());

    this.#minus = new BatteryMinus({
      resources: options.resources,
      gameObjectAction: options.gameObjectAction,
    });
    this.#minus.getObject3D().position.set(-256, 176, 2);
    this.#group.add(this.#minus.getObject3D());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#button.destructor();
    this.#meter.destructor();
    this.#plus.destructor();
    this.#minus.destructor();
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /**
   * モデルをビューに反映させる
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: BatterySelectorModel, preRender: PreRender): void {
    this.#meter.update(model);
    this.#button.update(model);
    this.#plus.update(model);
    this.#minus.update(model);
    const devicePerScale = hudUIScale(
      preRender.rendererDOM,
      preRender.safeAreaInset,
    );

    const frontScale = devicePerScale * 0.3;
    this.#group.scale.set(frontScale, frontScale, 0.3);
    const paddingRight = 105;
    const marginRight = 10;
    this.#group.position.x =
      preRender.rendererDOM.clientWidth / 2 -
      paddingRight * devicePerScale -
      Math.max(marginRight, preRender.safeAreaInset.right);
    const paddingBottom = 65;
    const marginBottom = 10;
    this.#group.position.y =
      -preRender.rendererDOM.clientHeight / 2 +
      paddingBottom * devicePerScale +
      Math.max(marginBottom, preRender.safeAreaInset.bottom);
    this.#group.quaternion.copy(preRender.camera.quaternion);
  }

  /**
   * OKボタン押下通知
   * @returns 通知ストリーム
   */
  okButtonPushNotifier(): Observable<Event> {
    return this.#button.pushNotifier();
  }

  /**
   * +ボタン押下通知
   * @returns 通知のObservable
   */
  notifyPlusButtonPushed(): Observable<unknown> {
    return this.#plus.pushNotifier();
  }

  /**
   * -ボタン押下通知
   * @returns 通知のObservable
   */
  notifyMinusButtonPushed(): Observable<unknown> {
    return this.#minus.pushNotifier();
  }

  /**
   * 数字が押されたことを通知する
   * @returns 通知のObservable
   */
  notifyNumberPushed(): Observable<number> {
    return this.#meter.notifyNumberPushed();
  }
}
