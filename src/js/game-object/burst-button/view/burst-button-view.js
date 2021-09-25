// @flow

import * as THREE from 'three';
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import type {BurstButtonModel} from "../model/burst-button-model";
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {PreRender} from "../../../game-loop/pre-render";
import {ButtonOverlap} from "../../button-overlap/button-overlap";
import {circleButtonOverlap} from "../../button-overlap/circle-button-overlap";
import {HUDUIScale} from "../../../hud-scale/hud-scale";
import type {ArmdozerIcon} from "./armdozer-icon";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream} from "../../../stream/core";

/** 全体のスケール */
const GROUP_SCALE = 0.3;

/** 左パディング */
const PADDING_LEFT = 180;

/** 下パディング */
const PADDING_BOTTOM = 80;

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  listener: Stream<GameObjectAction>,
  armdozerIcon: ArmdozerIcon,
  onPush: () => void,
};

/** バーストボタンのビュー */
export class BurstButtonView {
  _burstButton: SimpleImageMesh;
  _armdozerIcon: ArmdozerIcon;
  _label: SimpleImageMesh;
  _buttonDisabled: SimpleImageMesh;
  _overlap: ButtonOverlap;
  _group: typeof THREE.Group;

  constructor(param: Param) {
    this._group = new THREE.Group();
    this._group.scale.set(GROUP_SCALE, GROUP_SCALE, GROUP_SCALE);

    const burstButton =param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BURST_BUTTON)?.image ?? new Image();
    this._burstButton = new SimpleImageMesh({canvasSize: 512, meshSize: 512, image: burstButton, imageWidth: 512});
    this._group.add(this._burstButton.getObject3D());

    this._armdozerIcon = param.armdozerIcon;
    this._armdozerIcon.getObject3D().position.z = this._burstButton.getObject3D().position.z + 1;
    this._group.add(this._armdozerIcon.getObject3D());

    const label = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BURST_BUTTON_LABEL)?.image ?? new Image();
    this._label = new SimpleImageMesh({canvasSize: 512, meshSize: 512, image: label, imageWidth: 264});
    this._group.add(this._label.getObject3D());

    const buttonDisabled = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BIG_BUTTON_DISABLED)?.image ?? new Image();
    this._buttonDisabled = new SimpleImageMesh({canvasSize: 512, meshSize: 512, image: buttonDisabled, imageWidth: 414});
    this._group.add(this._buttonDisabled.getObject3D());

    this._overlap = circleButtonOverlap({
      radius: 200,
      segments: 32,
      listener: param.listener,
      onButtonPush: ()=> {
        param.onPush();
      }
    });
    this._group.add(this._overlap.getObject3D());
  }

  /** デストラクタ */
  destructor(): void {
    this._burstButton.destructor();
    this._armdozerIcon.destructor();
    this._buttonDisabled.destructor();
    this._label.destructor();
    this._overlap.destructor();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: BurstButtonModel, preRender: PreRender): void {
    this._burstButton.setOpacity(model.opacity);

    const iconOpacity = !model.canBurst ? 0 : model.opacity;
    this._armdozerIcon.setOpacity(iconOpacity);

    const labelOpacity = !model.canBurst ? 0 : model.opacity;
    this._label.setOpacity(labelOpacity);
    this._label.getObject3D().position.y = -80;

    const disabledOpacity = model.canBurst ? 0 : model.opacity;
    this._buttonDisabled.setOpacity(disabledOpacity);

    const devicePerScale = HUDUIScale(preRender.rendererDOM, preRender.safeAreaInset);

    this._group.scale.set(
      GROUP_SCALE * devicePerScale * model.scale,
      GROUP_SCALE * devicePerScale * model.scale,
      GROUP_SCALE * devicePerScale * model.scale
    );
    this._group.position.x =
      -preRender.rendererDOM.clientWidth / 2
      +preRender.safeAreaInset.left
      +PADDING_LEFT * devicePerScale;
    this._group.position.y =
      -preRender.rendererDOM.clientHeight / 2
      +preRender.safeAreaInset.bottom
      +PADDING_BOTTOM * devicePerScale;
    this._group.quaternion.copy(preRender.camera.quaternion);
  }

  /** 
   * 本ビューで使うthree.jsオブジェクトを取得する
   *
   * @return
   */
  getObject3D(): typeof THREE.Object3D {
    return this._group;
  }
}