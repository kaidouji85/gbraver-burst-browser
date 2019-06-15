// @flow

import * as THREE from 'three';
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import type {BurstButtonModel} from "../model/burst-button-model";
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {PreRender} from "../../../action/game-loop/pre-render";
import {ButtonOverlap} from "../../../overlap/button/button-overlap";
import {circleButtonOverlap} from "../../../overlap/button/circle-button-overlap";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";

/** キャンバスサイズ */
const CANVAS_SIZE = 512;

/** 全体のスケール */
const SCALE = 0.3;

/** 左パディング */
const PADDING_LEFT = 80;

/** 下パディング */
const PADDING_BOTTOM = 80;

type Param = {
  resources: Resources,
  listener: Observable<GameObjectAction>,
  onPush: () => void,
};

/** バーストボタンのビュー */
export class BurstButtonView {
  _mesh: SimpleImageMesh;
  _overlap: ButtonOverlap;
  _group: THREE.Group;

  constructor(param: Param) {
    const imageResource = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BURST_BUTTON);
    const image = imageResource
      ? imageResource.image
      : new Image();
    this._mesh = new SimpleImageMesh({
      canvasSize: CANVAS_SIZE,
      image: image
    });
    
    this._overlap = circleButtonOverlap({
      radius: 200,
      segments: 32,
      listener: param.listener,
      onButtonPush: ()=> {
        param.onPush();
      }
    });

    this._group = new THREE.Group();
    this._group.add(this._mesh.getObject3D());
    this._group.add(this._overlap.getObject3D());
    this._group.scale.set(SCALE, SCALE, SCALE);
  }

  /** モデルをビューに反映させる */
  engage(model: BurstButtonModel): void {
    this._mesh.setOpacity(model.opacity);
  }

  /** プリレンダー */
  preRender(action: PreRender): void {
    this._setPos(action.rendererDOM);
    this._lookAt(action.camera);
  }

  /** 本ビューで使うthree.jsオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }

  /** 表示位置を更新する */
  _setPos(rendererDOM: HTMLElement): void {
    this._group.position.x = -rendererDOM.clientWidth / 2 + PADDING_LEFT;
    this._group.position.y = -rendererDOM.clientHeight / 2 + PADDING_BOTTOM;
  }

  /** カメラの真正面を向く */
  _lookAt(camera: THREE.Camera): void {
    this._group.quaternion.copy(camera.quaternion);
  }
}