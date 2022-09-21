// @flow

import * as THREE from 'three';
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {TEXTURE_IDS} from "../../../resource/texture";
import type {Stream, Unsubscriber} from "../../../stream/stream";
import type {GameObjectAction} from "../../action/game-object-action";
import {ButtonOverlap} from "../../button-overlap/button-overlap";
import {circleButtonOverlap} from "../../button-overlap/circle-button-overlap";
import type {BatterySelectorModel} from "../model";

/** バッテリー現在値 最大フレーム数 */
const BATTERY_VALUE_MAX_ANIMATION = 8;

/** コンストラクタのパラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>,
  /** 
   * ボタンを押した時に呼ばれるコールバック関数
   * @param event イベント
   */
  onPush: (event: Event) => void
};

/** バッテリーボタン */
export class BatteryButton {
  #group: typeof THREE.Group;
  #button: SimpleImageMesh;
  #overlap: ButtonOverlap;
  #attackLabel: SimpleImageMesh;
  #defenseLabel: SimpleImageMesh;
  #batteryValue: HorizontalAnimationMesh;
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.#group = new THREE.Group();

    const button = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_BUTTON)?.image ?? new Image();
    this.#button = new SimpleImageMesh({canvasSize: 512, meshSize: 512, image: button, imageWidth: 414});
    this.#button.getObject3D().position.set(0, 0, -1);
    this.#group.add(this.#button.getObject3D());

    this.#overlap = circleButtonOverlap({radius: 200, segments: 32, gameObjectAction: param.gameObjectAction});
    this.#group.add(this.#overlap.getObject3D());

    const attackLabel = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_LABEL_ATTACK)?.image ?? new Image();
    this.#attackLabel = new SimpleImageMesh({canvasSize: 512, meshSize: 512, image: attackLabel, imageWidth: 264});
    this.#attackLabel.getObject3D().position.set(28, -96, 0);
    this.#group.add(this.#attackLabel.getObject3D());

    const defenseLabel = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_LABEL_DEFENSE)?.image ?? new Image();
    this.#defenseLabel = new SimpleImageMesh({canvasSize: 512, meshSize: 512, image: defenseLabel, imageWidth: 266});
    this.#defenseLabel.getObject3D().position.set(32, -96, 0);
    this.#group.add(this.#defenseLabel.getObject3D());

    const currentBattery = param.resources.textures
      .find(v => v.id === TEXTURE_IDS.BATTERY_CURRENT_VALUE)?.texture ?? new THREE.Texture();
    this.#batteryValue = new HorizontalAnimationMesh({texture: currentBattery, maxAnimation: BATTERY_VALUE_MAX_ANIMATION, width: 80, height: 80});
    this.#batteryValue.getObject3D().position.set(-130, -82, 0);
    this.#group.add(this.#batteryValue.getObject3D());

    this.#unsubscribers = [
      this.#overlap.pushNotifier().subscribe(param.onPush)
    ];
  }

  /** デストラクタ */
  destructor(): void {
    this.#button.destructor();
    this.#overlap.destructor();
    this.#attackLabel.destructor();
    this.#defenseLabel.destructor();
    this.#batteryValue.destructor();
    this.#unsubscribers.forEach(unsubscriber => {
      unsubscriber.unsubscribe();
    });
  }

  /** モデルをビューに反映させる */
  update(model: BatterySelectorModel): void {
    this.#group.scale.set(model.batteryButtonScale, model.batteryButtonScale, 1);
    const attackOpacity = model.label === 'Attack' ? model.opacity : 0;
    this.#attackLabel.setOpacity(attackOpacity);
    const defenseOpacity = model.label === 'Defense' ? model.opacity : 0;
    this.#defenseLabel.setOpacity(defenseOpacity);
    this.#button.setOpacity(model.opacity);
    this.#batteryValue.animate(model.battery / BATTERY_VALUE_MAX_ANIMATION);
    this.#batteryValue.setOpacity(model.opacity);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D {
    return this.#group;
  }
}
