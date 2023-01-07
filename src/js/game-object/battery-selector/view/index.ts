import * as THREE from "three";
import type { PreRender } from "../../../game-loop/pre-render";
import type { Resources } from "../../../resource";
import type { Stream } from "../../../stream/stream";
import type { GameObjectAction } from "../../action/game-object-action";
import { HUDUIScale } from "../../scale";
import type { BatterySelectorModel } from "../model";
import { BatteryButton } from "./battery-button";
import { BatteryMeter } from "./battery-merter";
import { BatteryMinus } from "./battery-minus";
import { BatteryPlus } from "./battery-plus";

/** パラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources;

  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>;

  /**
   * OKボタンが押された時に呼ばれるコールバック関数
   * @param event イベント
   */
  onOkPush: (event: Event) => void;

  /** +ボタンが押された時に呼ばれるコールバック関数 */
  onPlusPush: () => void;

  /** -ボタンが押された時に呼ばれるコールバック関数 */
  onMinusPush: () => void;
};

/** バッテリーセレクタのビュー */
export class BatterySelectorView {
  #button: BatteryButton;
  #meter: BatteryMeter;
  #plus: BatteryPlus;
  #minus: BatteryMinus;
  #group: typeof THREE.Group;

  constructor(param: Param) {
    this.#group = new THREE.Group();
    this.#meter = new BatteryMeter(param.resources);
    this.#meter.getObject3D().position.set(0, 288, 0);
    this.#group.add(this.#meter.getObject3D());
    this.#button = new BatteryButton({
      resources: param.resources,
      gameObjectAction: param.gameObjectAction,
      onPush: event => {
        param.onOkPush(event);
      }
    });
    this.#button.getObject3D().position.set(0, 0, 1);
    this.#group.add(this.#button.getObject3D());
    this.#plus = new BatteryPlus({
      resources: param.resources,
      gameObjectAction: param.gameObjectAction,
      onPush: () => {
        param.onPlusPush();
      }
    });
    this.#plus.getObject3D().position.set(256, 176, 2);
    this.#group.add(this.#plus.getObject3D());
    this.#minus = new BatteryMinus({
      resources: param.resources,
      gameObjectAction: param.gameObjectAction,
      onPush: () => {
        param.onMinusPush();
      }
    });
    this.#minus.getObject3D().position.set(-256, 176, 2);
    this.#group.add(this.#minus.getObject3D());
  }

  /** デストラクタ */
  destructor(): void {
    this.#button.destructor();
    this.#meter.destructor();
    this.#plus.destructor();
    this.#minus.destructor();
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D {
    return this.#group;
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: BatterySelectorModel, preRender: PreRender): void {
    this.#meter.update(model);
    this.#button.update(model);
    this.#plus.update(model);
    this.#minus.update(model);
    const devicePerScale = HUDUIScale(preRender.rendererDOM, preRender.safeAreaInset);
    const frontScale = devicePerScale * 0.3;
    this.#group.scale.set(frontScale, frontScale, 0.3);
    const paddingRight = 105;
    const marginRight = 10;
    this.#group.position.x = preRender.rendererDOM.clientWidth / 2 - paddingRight * devicePerScale - Math.max(marginRight, preRender.safeAreaInset.right);
    const paddingBottom = 65;
    const marginBottom = 10;
    this.#group.position.y = -preRender.rendererDOM.clientHeight / 2 + paddingBottom * devicePerScale + Math.max(marginBottom, preRender.safeAreaInset.bottom);
    this.#group.quaternion.copy(preRender.camera.quaternion);
  }

}