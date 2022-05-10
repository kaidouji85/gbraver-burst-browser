// @flow
import * as THREE from 'three';
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {TimeScaleButtonModel} from "../model/time-scale-button-model";
import type {PreRender} from "../../../game-loop/pre-render";
import {HUDUIScale} from "../../scale";

/** canvasサイズ */
const CANVAS_SIZE = 256;

/** メッシュサイズ */
const MESH_SIZE = 70;

/** アニメーションタイムスケールボタンビュー */
export class TimeScaleButtonView {
  _group: typeof THREE.Group;
  _button: SimpleImageMesh;
  _timeScale100: SimpleImageMesh;
  _timeScale050: SimpleImageMesh;
  _timeScale025: SimpleImageMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const buttonImage = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.TIME_SCALE_BUTTON)?.image ?? new Image();
    this._button = new SimpleImageMesh({canvasSize: CANVAS_SIZE, meshSize: MESH_SIZE, image: buttonImage, imageWidth: 256});
    this._group.add(this._button.getObject3D());

    const timeScale100 = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.TIME_SCALE_100)?.image ?? new Image();
    this._timeScale100 = new SimpleImageMesh({canvasSize: CANVAS_SIZE, meshSize: MESH_SIZE, image: timeScale100, imageWidth: 256});
    this._group.add(this._timeScale100.getObject3D());

    const timeScale050 = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.TIME_SCALE_050)?.image ?? new Image();
    this._timeScale050 = new SimpleImageMesh({canvasSize: CANVAS_SIZE, meshSize: MESH_SIZE, image: timeScale050, imageWidth: 256});
    this._group.add(this._timeScale050.getObject3D());

    const timeScale025 = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.TIME_SCALE_025)?.image ?? new Image();
    this._timeScale025 = new SimpleImageMesh({canvasSize: CANVAS_SIZE, meshSize: MESH_SIZE, image: timeScale025, imageWidth: 256});
    this._group.add(this._timeScale025.getObject3D());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._button.destructor();
    this._timeScale100.destructor();
    this._timeScale050.destructor();
    this._timeScale025.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this._group;
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: TimeScaleButtonModel, preRender: PreRender): void {
    const activeTimeScale = (() => {
      switch(model.timeScale) {
        case 1:
          return this._timeScale100;
        case 0.5:
          return this._timeScale050;
        case 0.25:
          return this._timeScale025;
        default:
          return this._timeScale100;
      }
    })();
    const timeScales = [this._timeScale100, this._timeScale050, this._timeScale025];
    timeScales.forEach(timeScale => {
      const opacity = timeScale === activeTimeScale ? 1 : 0;
      timeScale.setOpacity(opacity);
    });

    const devicePerScale = HUDUIScale(preRender.rendererDOM, preRender.safeAreaInset);
    const groupScale = devicePerScale;
    this._group.scale.set(groupScale, groupScale, groupScale);
    const paddingLeft = 25;
    const marginLeft = 15;
    this._group.position.x = -preRender.rendererDOM.clientWidth / 2 + paddingLeft * devicePerScale
      + Math.max(marginLeft, preRender.safeAreaInset.left);
    const paddingTop = 25;
    const marginTop = 10;
    this._group.position.y = preRender.rendererDOM.clientHeight / 2 - paddingTop * devicePerScale
      - Math.max(marginTop, preRender.safeAreaInset.top);
  }
}