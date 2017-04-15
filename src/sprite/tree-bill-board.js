// @flow
import type {Resources} from '../resource-manager';
import ThreeLib from 'three-js';
import TreeMesh from '../meshes/tree';

const THREE = ThreeLib();

/**
 * 木（ビルボード）
 */
export default class TreeBillBoard {
  /** メッシュ */
  mesh: THREE.Mesh;

  constructor(resources: Resources): void {
    this.mesh = TreeMesh(resources);
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
