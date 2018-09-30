// @flow

import {ShinBraverView} from './shin-braver-view';
import * as THREE from "three";
import type {Resources} from "../../../../resource/index";
import type {ShinBraverModel} from "../model/shin-braver-model";
import {Observable} from "rxjs";
import {createBasicMesh} from "./mesh/basic-mesh";
import type {ArmdozerAnimation} from "../../common/armdozer-animation";
import {StandAnimationTexture} from "./texture/stand";

export const MESH_WIDTH = 320;
export const MESH_HEIGHT = 320;
export const PADDING_BOTTOM = -16;

/** プレイヤー側シンブレイバーのビュー */
export class PlayerShinBraverView implements ShinBraverView {
  _mesh: THREE.Mesh;
  _stand: ArmdozerAnimation;

  constructor(resources: Resources) {
    this._mesh = createBasicMesh();
    this._stand = new StandAnimationTexture(resources);
  }

  /** モデルをビューに反映させる */
  engage(model: ShinBraverModel, camera: THREE.Camera): void {
    this._mesh.position.set(
      model.position.x,
      model.position.y + MESH_HEIGHT / 2 + PADDING_BOTTOM,
      model.position.z
    );
    this._mesh.material.map = this._stand.animate(1 / 10);
    this._mesh.quaternion.copy(camera.quaternion);
  }

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this._mesh;
  }
}