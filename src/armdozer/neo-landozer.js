// @flow
import type {Resources} from '../common/resource-manager';
import * as THREE from 'three';
import {TEXTURE_PATHS} from '../common/resource-manager';
import {flip} from '../common/flip-horizon';

const MESH_WIDTH = 320;
const MESH_HEIGHT = 320;

/** ネオランドーザの基本となるメッシュ */
function BasicMesh(): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(MESH_HEIGHT, MESH_WIDTH, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(150, MESH_HEIGHT/2 - 30, 400);
  return mesh;
}

/**
 * プレイヤーのネオランドーザ
 */
export class PlayerNeoLandozer {
  /** メッシュ */
  mesh: THREE.Mesh;

  constructor(resources: Resources) {
    const texture = resources.textures.find(item => item.path === TEXTURE_PATHS.NEO_RANDOZER_STAND);

    this.mesh = BasicMesh();
    this.mesh.material.map = texture ? texture.texture : new THREE.Texture();
  }

  /**
   * ゲームループ
   *
   * @param camera カメラ
   */
  animate(camera: THREE.Camera): void {
    this.mesh.quaternion.copy(camera.quaternion)
  }
}

/**
 * 敵のネオランドーザ
 * プレイヤー側のそれを左右反転したもの
 */
export class EnemyNeoLandozer extends PlayerNeoLandozer {
  constructor(resources: Resources) {
    super(resources);
    flip(this.mesh);
  }
}