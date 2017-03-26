// @flow
import type {Resources} from '../resource-manager';
import ThreeLib from 'three-js';
import {TEXTURE_PATHS} from '../resource-manager';
import Robo from '../meshes/robo';

const THREE = ThreeLib();

function createMesh(resources: Resources): THREE.Mesh {
  const mesh = Robo(resources, TEXTURE_PATHS.NEO_RANDOZER_STAND);
  mesh.position.z = 400;
  mesh.position.y -= 30;
  return mesh;
}

/**
 * ネオランドーザ
 */
export default class ShinBraver {
  mesh: THREE.Mesh;

  constructor(resources: Resources) {
    this.mesh = createMesh(resources);
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