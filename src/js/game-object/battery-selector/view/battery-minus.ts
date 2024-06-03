import { Observable } from "rxjs";
import * as THREE from "three";

import { SimpleImageMesh } from "../../../mesh/simple-image-mesh";
import type { ResourcesContainer } from "../../../resource";
import { CANVAS_IMAGE_IDS } from "../../../resource/canvas-image";
import type { GameObjectAction } from "../../action/game-object-action";
import type { PushDetector } from "../../push-detector";
import { circlePushDetector } from "../../push-detector/circle-push-detector";
import type { BatterySelectorModel } from "../model";
import { canBatteryMinus } from "../model/can-battery-minus";

/** コンストラクタのパラメータ */
type Param = ResourcesContainer & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** バッテリーマイナスボタン */
export class BatteryMinus {
  #group: THREE.Group;
  #activeButton: SimpleImageMesh;
  #buttonDisabled: SimpleImageMesh;
  #pushDetector: PushDetector;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    const active =
      param.resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.BATTERY_MINUS,
      )?.image ?? new Image();
    this.#activeButton = new SimpleImageMesh({
      canvasSize: 256,
      meshSize: 256,
      image: active,
      imageWidth: 172,
    });
    const buttonDisabled =
      param.resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.SMALL_BUTTON_DISABLED,
      )?.image ?? new Image();
    this.#buttonDisabled = new SimpleImageMesh({
      canvasSize: 256,
      meshSize: 256,
      image: buttonDisabled,
      imageWidth: 176,
    });
    this.#pushDetector = circlePushDetector({
      radius: 80,
      segments: 32,
      gameObjectAction: param.gameObjectAction,
    });
    this.#group = new THREE.Group();
    this.#group.add(this.#activeButton.getObject3D());
    this.#group.add(this.#buttonDisabled.getObject3D());
    this.#group.add(this.#pushDetector.getObject3D());
  }

  /** デストラクタ */
  destructor(): void {
    this.#activeButton.destructor();
    this.#buttonDisabled.destructor();
    this.#pushDetector.destructor();
  }

  /** モデルをビューに反映させる */
  update(model: BatterySelectorModel): void {
    this.#activeButton.setOpacity(model.opacity);
    this.#activeButton
      .getObject3D()
      .scale.set(
        model.minusButtonScale,
        model.minusButtonScale,
        model.minusButtonScale,
      );
    const isDisabledVisible = !canBatteryMinus(model);
    const disabledOpacity = isDisabledVisible ? model.opacity : 0;
    this.#buttonDisabled.setOpacity(disabledOpacity);
    this.#buttonDisabled
      .getObject3D()
      .scale.set(
        model.minusButtonScale,
        model.minusButtonScale,
        model.minusButtonScale,
      );
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /**
   * ボタン押下通知
   * @returns 通知ストリーム
   */
  pushNotifier(): Observable<unknown> {
    return this.#pushDetector.notifyPressed();
  }
}
