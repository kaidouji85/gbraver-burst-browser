// @flow
import type {Resources} from '../resource-manager';
import ThreeLib from 'three-js';
import {TEXTURE_PATHS} from '../resource-manager';
import Robo from './robo-anime';

const THREE = ThreeLib();

function createMesh(resources: Resources): THREE.Mesh {
  const mesh = Robo(resources, TEXTURE_PATHS.ANIME_TEST);
  mesh.position.z = 400;
  mesh.position.y -= 30;
  return mesh;
}

/**
 * シンブレイバー
 */
export default class ShinBraver {
  /** メッシュ */
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