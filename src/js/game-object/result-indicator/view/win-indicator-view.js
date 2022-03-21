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
    target.position.x = model.position.x * devicePerScale;
    target.position.y = model.position.y * devicePerScale;
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