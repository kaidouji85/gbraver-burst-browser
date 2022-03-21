// @flow
import * as THREE from "three";
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import type {ResultIndicatorView} from "./result-indicator-view";
import type {ResultIndicatorModel} from "../model/result-indicator-model";
import type {PreRender} from "../../../game-loop/pre-render";
import {HUDCutInScale} from "../../../hud-scale/hud-scale";

/** メッシュの大きさ */
const MESH_SIZE = 400;

/** シンプルなビュー実装 */
export class SimpleIndicatorView implements ResultIndicatorView {
  _mesh: HorizontalAnimationMesh;
  _paddingX: number;
  _paddingY: number;

  /**
   * コンストラクタ
   *
   * @param texture 文言テクスチャ
   * @param paddingX X方向のパディング
   * @param paddingY Y方向のパディング
   */
  constructor(texture: typeof THREE.Texture, paddingX: number, paddingY: number) {
    this._mesh = new HorizontalAnimationMesh({texture, maxAnimation: 1, width: MESH_SIZE, height: MESH_SIZE});
    this._paddingX = paddingX;
    this._paddingY = paddingY;
  }

  /** @override */
  destructor(): void {
    this._mesh.destructor();
  }

  /** @override */
  engage(model: ResultIndicatorModel, preRender: PreRender): void {
    const target = this._mesh.getObject3D();
    const devicePerScale = HUDCutInScale(preRender.rendererDOM, preRender.safeAreaInset);
    const safeAreaX = (0 < model.worldCoordinate.x) ? preRender.safeAreaInset.right : preRender.safeAreaInset.left;
    target.position.x = model.localCoordinate.x * devicePerScale
      + model.worldCoordinate.x * (preRender.rendererDOM.clientWidth/2 -safeAreaX -this._paddingX * devicePerScale);
    const safeAreaY = (0 < model.worldCoordinate.y) ? preRender.safeAreaInset.top : preRender.safeAreaInset.bottom;
    target.position.y = model.localCoordinate.y * devicePerScale
      + model.worldCoordinate.y * (preRender.rendererDOM.clientHeight/2 -safeAreaY -this._paddingY * devicePerScale);
    target.position.z = model.zIndex;
    target.scale.x = model.scale * devicePerScale;
    target.scale.y = model.scale * devicePerScale;
    target.quaternion.copy(preRender.camera.quaternion);
    this._mesh.setOpacity(model.opacity);
  }

  /** @override */
  getObject3D(): typeof THREE.Object3D {
    return this._mesh.getObject3D();
  }
}