// @flow
import type {Resources} from '../common/resource-manager';
import ThreeLib from 'three-js';
import {TEXTURE_PATHS} from '../common/resource-manager';
import {getTexture} from '../common/resource-manager';

const THREE = ThreeLib();
const WIDTH = 320;
const HEIGHT = 320;

/** ネオランドーザの基本となるメッシュ */
function BasicMesh(): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(HEIGHT, WIDTH, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, HEIGHT/2 - 30, 400);
  return mesh;
}
/**
 * ネオランドーザ
 */
export default class ShinBraver {
  /** メッシュ */
  mesh: THREE.Mesh;

  constructor(resources: Resources) {
    this.mesh = BasicMesh();
    this.mesh.material.map = getTexture(TEXTURE_PATHS.NEO_RANDOZER_STAND, resources);
    this.mesh.scale.set(-1.0, 1.0, 1.0);
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