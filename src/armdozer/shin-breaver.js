// @flow
import type {Resources} from '../common/resource-manager';
import ThreeLib from 'three-js';
import {Tween} from 'tween.js';
import {TEXTURE_PATHS} from '../common/resource-manager';
import {createAnimatedTexture} from '../common/texture-animation';

const THREE = ThreeLib();

const WIDTH = 320;
const HEIGHT = 320;
const MAX_ANIME_FRAME = 10;

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
  texture: THREE.Texture;

  /** アニメーション制御用Tweenオブジェクト */
  tween: Tween;

  /** アニメのフレーム管理オブジェクト */
  frame: {num: number};

  constructor(resources: Resources) {
    const origin = resources.textures.find(item => item.path === TEXTURE_PATHS.SHIN_BRAVER_PUNCH);
    this.texture = origin ? createAnimatedTexture(origin.texture, 10, 1) : new THREE.Texture();

    this.mesh = BasicMesh();
    this.mesh.material.map = this.texture;

    this.frame = {num: 0};

    this.tween = new Tween(this.frame)
      .to({num: 9}, 300)
      .delay(1000)
      .repeat(Infinity)
      .onUpdate(() => this.onUpdate())
      .start();
  }

  /**
   * アニメーションフレームの更新時の処理
   */
  onUpdate() {
    const frame = Math.floor(this.frame.num);
    this.texture.offset.x = frame/MAX_ANIME_FRAME;
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