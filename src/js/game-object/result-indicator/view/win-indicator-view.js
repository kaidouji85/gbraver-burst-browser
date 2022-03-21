// @flow
import type {Resources} from "../../../resource";
import {TEXTURE_IDS} from "../../../resource/texture";
import * as THREE from "three";
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import type {ResultIndicatorView} from "./result-indicator-view";
import type {ResultIndicatorModel} from "../model/result-indicator-model";
import type {PreRender} from "../../../game-loop/pre-render";
import {HUDCutInScale} from "../../../hud-scale/hud-scale";

/** メッシュの大きさ */
const MESH_SIZE = 300;

/** WIN ビュー */
export class WinIndicatorView implements ResultIndicatorView {
  _mesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const texture = resources.textures.find(v => v.id === TEXTURE_IDS.WIN)?.texture ?? new THREE.Texture();
    this._mesh = new HorizontalAnimationMesh({texture, maxAnimation: 1, width: MESH_SIZE, height: MESH_SIZE});
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
    const paddingX = 100;
    target.position.x = model.localCoordinate.x * devicePerScale
      + model.worldCoordinate.x * (preRender.rendererDOM.clientWidth/2 -safeAreaX -paddingX);
    const safeAreaY = (0 < model.worldCoordinate.y) ? preRender.safeAreaInset.top : preRender.safeAreaInset.bottom;
    const paddingY = 50;
    target.position.y = model.localCoordinate.y * devicePerScale
      + model.worldCoordinate.y * (preRender.rendererDOM.clientHeight/2 -safeAreaY - paddingY);
    target.position.z = 0;
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