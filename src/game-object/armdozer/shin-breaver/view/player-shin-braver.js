// @flow

import {ShinBraverView} from '../base';
import * as THREE from "three";
import type {Resources} from "../../../../resource/resource-manager";
import {createAnimatedTexture} from "../../../../util/texture/texture-animation";
import {TEXTURE_PATHS} from "../../../../resource/resource-manager";
import type {ShinBraverModel} from "../base";

const MESH_WIDTH = 320;
const MESH_HEIGHT = 320;

/** プレイヤー側シンブレイバーのビュー */
export class PlayerShinBraverView implements ShinBraverView {
  _mesh: THREE.Mesh;
  _texture: THREE.Texture;

  constructor(resources: Resources) {
    this._texture = createTexture(resources);
    this._mesh = createBasicMesh();
    this._mesh.material.map = this._texture;
  }

  gameLoop(model: ShinBraverModel, camera: THREE.Camera): void {
    this._mesh.position.set(
      model.position.x,
      model.position.y + MESH_HEIGHT / 2 - 30,
      model.position.z
    );
    // TODO アニメフレームを設定する
    this._texture.offset.x = 0;
    this._mesh.quaternion.copy(camera.quaternion);
  }

  getThreeJsObjects(): THREE.Object3D[] {
    return [this._mesh];
  }
}

function createBasicMesh() {
  const geometry = new THREE.PlaneGeometry(MESH_HEIGHT, MESH_WIDTH, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true
  });
  return new THREE.Mesh(geometry, material);
}

function createTexture(resources: Resources) {
  const origin = resources.textures.find(item => item.path === TEXTURE_PATHS.SHIN_BRAVER_PUNCH);
  return origin ? createAnimatedTexture(origin.texture, 10, 1) : new THREE.Texture();
}