// @flow

import * as THREE from 'three';
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {ButtonOverlap} from "../../button-overlap/button-overlap";
import {circleButtonOverlap} from "../../button-overlap/circle-button-overlap";
import type {BatterySelectorModel} from "../model";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream} from "../../../stream/core";
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import {TEXTURE_IDS} from "../../../resource/texture";

/** バッテリー現在値 最大フレーム数 */
const BATTERY_VALUE_MAX_ANIMATION = 8;

/** コンストラクタのパラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>,
  /** ボタンを押した時に呼ばれるコールバック関数 */
  onPush: () => void
};

/** バッテリーボタン */
export class BatteryButton {
  _group: typeof THREE.Group;
  _button: SimpleImageMesh;
  _overlap: ButtonOverlap;
  _attackLabel: SimpleImageMesh;
  _defenseLabel: SimpleImageMesh;
  _batteryValue: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    this._group = new THREE.Group();

    const button = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_BUTTON)?.image ?? new Image();
    this._button = new SimpleImageMesh({canvasSize: 512, meshSize: 512, image: button, imageWidth: 414});
    this._button.getObject3D().position.set(0, 0, -1);
    this._group.add(this._button.getObject3D());

    this._overlap = circleButtonOverlap({
      radius: 200,
      segments: 32,
      gameObjectAction: param.gameObjectAction,
      onButtonPush: ()=> {
        param.onPush();
      }
    });
    this._group.add(this._overlap.getObject3D());

    const attackLabel = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_LABEL_ATTACK)?.image ?? new Image();
    this._attackLabel = new SimpleImageMesh({canvasSize: 512, meshSize: 512, image: attackLabel, imageWidth: 264});
    this._attackLabel.getObject3D().position.set(28, -96, 0);
    this._group.add(this._attackLabel.getObject3D());

    const defenseLabel = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_LABEL_DEFENSE)?.image ?? new Image();
    this._defenseLabel = new SimpleImageMesh({canvasSize: 512, meshSize: 512, image: defenseLabel, imageWidth: 266});
    this._defenseLabel.getObject3D().position.set(32, -96, 0);
    this._group.add(this._defenseLabel.getObject3D());

    const currentBattery = param.resources.textures
      .find(v => v.id === TEXTURE_IDS.BATTERY_CURRENT_VALUE)?.texture ?? new THREE.Texture();
    this._batteryValue = new HorizontalAnimationMesh({texture: currentBattery, maxAnimation: BATTERY_VALUE_MAX_ANIMATION, width: 80, height: 80});
    this._batteryValue.getObject3D().position.set(-130, -82, 0);
    this._group.add(this._batteryValue.getObject3D());
  }

  /** デストラクタ */
  destructor(): void {
    this._button.destructor();
    this._overlap.destructor();
    this._attackLabel.destructor();
    this._defenseLabel.destructor();
    this._batteryValue.destructor();
  }

  /** モデルをビューに反映させる */
  update(model: BatterySelectorModel): void {
    this._group.scale.set(model.batteryButtonScale, model.batteryButtonScale, 1);
    const attackOpacity = model.label === 'Attack' ? model.opacity : 0;
    this._attackLabel.setOpacity(attackOpacity);
    const defenseOpacity = model.label === 'Defense' ? model.opacity : 0;
    this._defenseLabel.setOpacity(defenseOpacity);
    this._button.setOpacity(model.opacity);
    this._batteryValue.animate(model.battery / BATTERY_VALUE_MAX_ANIMATION);
    this._batteryValue.setOpacity(model.opacity);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D {
    return this._group;
  }
}
