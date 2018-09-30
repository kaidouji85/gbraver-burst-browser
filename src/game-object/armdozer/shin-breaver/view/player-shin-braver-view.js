// @flow

import {ShinBraverView} from './shin-braver-view';
import * as THREE from "three";
import type {Resources} from "../../../../resource/index";
import type {ShinBraverModel} from "../model/shin-braver-model";
import {createBasicMesh, MESH_HEIGHT} from "./mesh/basic-mesh";
import type {ArmdozerAnimationTexture} from "../../common/animation-texture";
import {StandAnimationTexture} from "./texture/stand";
import type {AnimationType} from "../model/animation-type";

export const PADDING_BOTTOM = -16;

/** プレイヤー側シンブレイバーのビュー */
export class PlayerShinBraverView implements ShinBraverView {
  _mesh: THREE.Mesh;
  _stand: ArmdozerAnimationTexture;

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

    const texture = this._getTexture(model.animation.type);
    this._mesh.material.map = texture.animate(model.animation.frame);

    this._mesh.quaternion.copy(camera.quaternion);
  }

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this._mesh;
  }

  /** アニメーションタイプに応じたテクスチャを返す */
  _getTexture(type: AnimationType): ArmdozerAnimationTexture {
    switch (type) {
      case 'STAND':
      default:
        return this._stand;
    }
  }
}