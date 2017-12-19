// @flow
import type {Resources} from '../../resource/resource-manager';
import {TEXTURE_PATHS} from '../../resource/resource-manager';
import * as THREE from 'three';
import {flip} from '../../util/mesh/flip-horizon';
import type {DepricatedArmDozerSprite} from "./depuricated-armdozer-sprite";

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
export class PlayerNeoLandozer implements DepricatedArmDozerSprite {
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
  gameLoop(camera: THREE.Camera): void {
    this.mesh.quaternion.copy(camera.quaternion)
  }

  getThreeJsObjects(): THREE.Object3D[] {
    return [this.mesh];
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