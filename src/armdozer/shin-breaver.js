// @flow
import type {Resources} from '../common/resource-manager';
import ThreeLib from 'three-js';
import {TEXTURE_PATHS} from '../common/resource-manager';
import {createAnimatedTexture} from '../common/texture-animation';
import {getTexture} from '../common/resource-manager';

const THREE = ThreeLib();
const WIDTH = 320;
const HEIGHT = 320;


/** シンブレイバーの基本となるメッシュ */
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
 * シンブレイバー
 */
export default class ShinBraver {
  /** メッシュ */
  mesh: THREE.Mesh;

  /** テクスチャ */
  texture: {
    /** 立ち */
    stand: THREE.Texture,

    /** パンチ */
    punch: THREE.Texture,
  };

  constructor(resources: Resources) {
    const stand = getTexture(TEXTURE_PATHS.SHIN_BRAVER_STAND, resources);
    const punch = getTexture(TEXTURE_PATHS.SHIN_BRAVER_PUNCH, resources);

    this.texture = {
      stand,
      punch: createAnimatedTexture(punch, 10, 1),
    };

    this.mesh = BasicMesh();
    this.mesh.material.map = this.texture.punch;
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