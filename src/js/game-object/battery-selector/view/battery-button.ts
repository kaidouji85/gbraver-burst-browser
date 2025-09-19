import { ArmdozerId } from "gbraver-burst-core";
import { Observable } from "rxjs";
import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { SimpleImageMesh } from "../../../mesh/simple-image-mesh";
import { ResourcesContainer } from "../../../resource";
import { CANVAS_IMAGE_IDS } from "../../../resource/canvas-image/ids";
import { findTextureOrThrow } from "../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { GameObjectActionContainer } from "../../action/game-object-action-container";
import { PushDetector } from "../../push-detector";
import { circlePushDetector } from "../../push-detector/circle-push-detector";
import { BatterySelectorModel } from "../model";
import { BatterySelectorIcon } from "./battery-selector-icon/battery-selector-icon";
import { createAttackIcon } from "./battery-selector-icon/create-attack-icon";
import { createDefenseIcon } from "./battery-selector-icon/create-defense-icon";

/** バッテリー現在値 最大フレーム数 */
const BATTERY_VALUE_MAX_ANIMATION = 16;

/** コンストラクタのオプション */
type Options = ResourcesContainer &
  GameObjectActionContainer & {
    /** アームドーザID */
    armdozerId: ArmdozerId;
  };

/** バッテリーボタン */
export class BatteryButton {
  /** グループ */
  #group: THREE.Group;
  /** ボタン */
  #button: SimpleImageMesh;
  /** 押下検出器 */
  #pushDetector: PushDetector;
  /** 攻撃ラベル */
  #attackLabel: SimpleImageMesh;
  /** 攻撃アイコン */
  #attackIcon: BatterySelectorIcon | null;
  /** 防御ラベル */
  #defenseLabel: SimpleImageMesh;
  /** 防御アイコン */
  #defenseIcon: BatterySelectorIcon | null;
  /** バッテリー値 */
  #batteryValue: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: Options) {
    this.#group = new THREE.Group();

    const button =
      options.resources.canvasImages.find(
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
      gameObjectAction: options.gameObjectAction,
    });
    this.#group.add(this.#pushDetector.getObject3D());

    this.#attackIcon = createAttackIcon(options);
    if (this.#attackIcon) {
      this.#attackIcon
        .getObject3D()
        .position.set(
          this.#attackIcon.position.x,
          this.#attackIcon.position.y,
          2,
        );
      this.#group.add(this.#attackIcon.getObject3D());
    }

    const attackLabel =
      options.resources.canvasImages.find(
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
      options.resources.canvasImages.find(
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

    this.#defenseIcon = createDefenseIcon(options);
    if (this.#defenseIcon) {
      this.#defenseIcon
        .getObject3D()
        .position.set(
          this.#defenseIcon.position.x,
          this.#defenseIcon.position.y,
          2,
        );
      this.#group.add(this.#defenseIcon.getObject3D());
    }

    const currentBattery = findTextureOrThrow(
      options.resources,
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
    this.#attackIcon?.destructor();
    this.#defenseLabel.destructor();
    this.#defenseIcon?.destructor();
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
    const attackLabelOpacity = model.label === "Attack" ? model.opacity : 0;
    this.#attackLabel.setOpacity(attackLabelOpacity);

    const attackerIconOpacity = model.label === "Attack" ? model.opacity : 0;
    this.#attackIcon?.opacity(attackerIconOpacity);

    const defenseLabelOpacity = model.label === "Defense" ? model.opacity : 0;
    this.#defenseLabel.setOpacity(defenseLabelOpacity);

    const defenderIconOpacity = model.label === "Defense" ? model.opacity : 0;
    this.#defenseIcon?.opacity(defenderIconOpacity);

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
