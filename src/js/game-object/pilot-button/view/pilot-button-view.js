// @flow

import * as THREE from 'three';
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import type {PilotButtonModel} from "../model/pilot-button-model";
import type {PreRender} from "../../../action/game-loop/pre-render";
import {HUDUIScale} from "../../../hud-scale/hud-scale";

/** キャンバスサイズ */
const CANVAS_SIZE = 512;

/** 全体のスケール */
const GROUP_SCALE = 0.3;

/** 左パディング */
const PADDING_LEFT = 220;

/** 下パディング */
const PADDING_BOTTOM = 80;

/**
 * パイロットボタン ビュー
 */
export class PilotButtonView {
  _group: THREE.Group;
  _button: SimpleImageMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const pilotButtonResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.PILOT_BUTTON);
    const pilotButton: Image = pilotButtonResource
      ? pilotButtonResource.image
      : new Image();
    this._button = new SimpleImageMesh({
      canvasSize: CANVAS_SIZE,
      meshSize: CANVAS_SIZE,
      image: pilotButton,
    });
    this._group.add(this._button.getObject3D());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._button.destructor();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: PilotButtonModel, preRender: PreRender): void {
    const devicePerScale = HUDUIScale(preRender.rendererDOM, preRender.safeAreaInset);
    this._group.scale.set(
      GROUP_SCALE * devicePerScale,
      GROUP_SCALE * devicePerScale,
      GROUP_SCALE * devicePerScale
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
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._group;
  }
}