// @flow

import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import * as THREE from "three";
import {ButtonOverlap} from "../../button-overlap/button-overlap";
import {circleButtonOverlap} from "../../button-overlap/circle-button-overlap";
import type {BatterySelectorModel} from "../model";
import {canBatteryPlus} from "../model/can-battery-plus";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream} from "../../../stream/core";

/** コンストラクタのパラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>,
  /** ボタンが押された時に呼ばれるコールバック関数 */
  onPush: () => void
};

/** バッテリープラスボタン */
export class BatteryPlus {
  _group: typeof THREE.Group;
  _activeButton: SimpleImageMesh;
  _buttonDisabled: SimpleImageMesh;
  _overlap: ButtonOverlap;

  /**
   * コンストラクタ
   * 
   * @param param パラメータ
   */
  constructor(param: Param) {
    const active = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_PLUS)?.image ?? new Image();
    this._activeButton = new SimpleImageMesh({canvasSize: 256, meshSize: 256, image: active, imageWidth: 172});

    const buttonDisabled = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.SMALL_BUTTON_DISABLED)?.image ?? new Image();
    this._buttonDisabled = new SimpleImageMesh({canvasSize: 256, meshSize: 256, image: buttonDisabled, imageWidth: 176});

    this._overlap = circleButtonOverlap({
      radius: 80,
      segments: 32,
      gameObjectAction: param.gameObjectAction,
      onButtonPush: () => {
        param.onPush();
      }
    });

    this._group = new THREE.Group();
    this._group.add(this._activeButton.getObject3D());
    this._group.add(this._buttonDisabled.getObject3D());
    this._group.add(this._overlap.getObject3D());
  }

  /** デストラクタ */
  destructor(): void {
    this._activeButton.destructor();
    this._buttonDisabled.destructor();
    this._overlap.destructor();
  }

  /** モデルをビューに反映させる */
  update(model: BatterySelectorModel): void {
    this._activeButton.setOpacity(model.opacity);
    this._activeButton.getObject3D().scale.set(
      model.plusButtonScale,
      model.plusButtonScale,
      model.plusButtonScale
    );

    const isDisabledVisible = !canBatteryPlus(model);
    const disabledOpacity = isDisabledVisible ? model.opacity : 0;
    this._buttonDisabled.setOpacity(disabledOpacity);
    this._buttonDisabled.getObject3D().scale.set(
      model.plusButtonScale,
      model.plusButtonScale,
      model.plusButtonScale
    );
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D {
    return this._group;
  }
}