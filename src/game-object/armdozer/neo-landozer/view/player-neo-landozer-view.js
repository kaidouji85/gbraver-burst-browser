// @flow

import {NeoLandozerView} from './neo-landozer-view';
import * as THREE from "three";
import type {Resources} from "../../../../resource/index";
import type {NeoLandozerModel} from "../model/neo-landozer-model";
import {NeoLandozerTextureContainer} from "./texture";
import {SPRITE_RENDER_ORDER} from "../../../../mesh/render-order";

export const MESH_WIDTH = 320;
export const MESH_HEIGHT = 320;
export const PADDING_BOTTOM = -16;

/** プレイヤー側ネオランドーザのビュー */
export class PlayerNeoLandozerView implements NeoLandozerView {
  _mesh: THREE.Mesh;
  _textureContainer: NeoLandozerTextureContainer;

  constructor(resources: Resources) {
    this._textureContainer = new NeoLandozerTextureContainer(resources);
    this._mesh = createBasicMesh();
  }

  gameLoop(model: NeoLandozerModel, camera: THREE.Camera): void {
    this._mesh.position.set(
      model.position.x,
      model.position.y + MESH_HEIGHT / 2 + PADDING_BOTTOM,
      model.position.z
    );

    this._mesh.material.map = this._textureContainer._getTexture(model.animation.type);
    this._mesh.material.map.offset.x = model.animation.frame;

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
  const mesh = new THREE.Mesh(geometry, material);
  mesh.renderOrder = SPRITE_RENDER_ORDER;
  return mesh;
}