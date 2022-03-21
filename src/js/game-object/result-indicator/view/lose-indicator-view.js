// @flow
import type {Resources} from "../../../resource";
import {TEXTURE_IDS} from "../../../resource/texture";
import * as THREE from "three";
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import type {ResultIndicatorView} from "./result-indicator-view";
import type {ResultIndicatorModel} from "../model/result-indicator-model";

/** LOSE ビュー */
export class LoseIndicatorView implements ResultIndicatorView {
  _mesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const texture = resources.textures.find(v => v.id === TEXTURE_IDS.LOSE)?.texture ?? new THREE.Texture();
    this._mesh = new HorizontalAnimationMesh({texture, maxAnimation: 1, width: 200, height: 200});
  }

  /** @override */
  destructor(): void {
    this._mesh.destructor();
  }

  /** @override */
  engage(model: ResultIndicatorModel): void {
    const target = this._mesh.getObject3D();
    target.position.x = model.position.x;
    target.position.y = model.position.y;
  }

  /** @override */
  getObject3D(): typeof THREE.Object3D {
    return this._mesh.getObject3D();
  }
}