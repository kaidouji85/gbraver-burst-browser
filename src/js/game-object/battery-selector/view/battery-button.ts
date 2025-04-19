import { Observable } from "rxjs";
import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { SimpleImageMesh } from "../../../mesh/simple-image-mesh";
import { ResourcesContainer } from "../../../resource";
import { CANVAS_IMAGE_IDS } from "../../../resource/canvas-image/ids";
import { findTextureOrThrow } from "../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { GameObjectAction } from "../../action/game-object-action";
import { PushDetector } from "../../push-detector";
import { circlePushDetector } from "../../push-detector/circle-push-detector";
import { BatterySelectorModel } from "../model";

/** バッテリー現在値 最大フレーム数 */
const BATTERY_VALUE_MAX_ANIMATION = 16;

/** コンストラクタのパラメータ */
type Param = ResourcesContainer & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** バッテリーボタン */
export class BatteryButton {
  #group: THREE.Group;
  #button: SimpleImageMesh;
  #pushDetector: PushDetector;
  #attackLabel: SimpleImageMesh;
  #defenseLabel: SimpleImageMesh;
  #batteryValue: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.#group = new THREE.Group();
    const button =
      param.resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.BATTERY_BUTTON,
      )?.image ?? new Image();
    this.#button = new SimpleImageMesh({
      canvasSize: 512,
      meshSize: 512,
      image: button,
      imageWidth: 414,
    });
    this.#button.getObject3D().position.set(0, 0, -1);
    this.#group.add(this.#button.getObject3D());
    this.#pushDetector = circlePushDetector({
      radius: 200,
      segments: 32,
      gameObjectAction: param.gameObjectAction,
    });
    this.#group.add(this.#pushDetector.getObject3D());
    const attackLabel =
      param.resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.BATTERY_LABEL_ATTACK,
      )?.image ?? new Image();
    this.#attackLabel = new SimpleImageMesh({
      canvasSize: 512,
      meshSize: 512,
      image: attackLabel,
      imageWidth: 264,
    });
    this.#attackLabel.getObject3D().position.set(28, -96, 0);
    this.#group.add(this.#attackLabel.getObject3D());
    const defenseLabel =
      param.resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.BATTERY_LABEL_DEFENSE,
      )?.image ?? new Image();
    this.#defenseLabel = new SimpleImageMesh({
      canvasSize: 512,
      meshSize: 512,
      image: defenseLabel,
      imageWidth: 266,
    });
    this.#defenseLabel.getObject3D().position.set(32, -96, 0);
    this.#group.add(this.#defenseLabel.getObject3D());
    const currentBattery = findTextureOrThrow(
      param.resources,
      TEXTURE_IDS.BATTERY_CURRENT_VALUE,
    ).texture;
    this.#batteryValue = new HorizontalAnimationMesh({
      texture: currentBattery,
      maxAnimation: BATTERY_VALUE_MAX_ANIMATION,
      width: 80,
      height: 80,
    });
    this.#batteryValue.getObject3D().position.set(-130, -82, 0);
    this.#group.add(this.#batteryValue.getObject3D());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#button.destructor();
    this.#pushDetector.destructor();
    this.#attackLabel.destructor();
    this.#defenseLabel.destructor();
    this.#batteryValue.destructor();
  }

  /**
   * モデルをビューに反映させる
   * @param model モデル
   */
  update(model: BatterySelectorModel): void {
    this.#group.scale.set(
      model.batteryButtonScale,
      model.batteryButtonScale,
      1,
    );
    const attackOpacity = model.label === "Attack" ? model.opacity : 0;
    this.#attackLabel.setOpacity(attackOpacity);
    const defenseOpacity = model.label === "Defense" ? model.opacity : 0;
    this.#defenseLabel.setOpacity(defenseOpacity);
    this.#button.setOpacity(model.opacity);
    this.#batteryValue.animate(model.battery / BATTERY_VALUE_MAX_ANIMATION);
    this.#batteryValue.opacity(model.opacity);
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
  pushNotifier(): Observable<Event> {
    return this.#pushDetector.notifyPressed();
  }
}
