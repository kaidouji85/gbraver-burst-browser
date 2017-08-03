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

  frame: {num :number}

  constructor(resources: Resources) {
    const origin = resources.textures.find(item => item.path === TEXTURE_PATHS.SHIN_BRAVER_PUNCH);
    this.texture = origin ? createAnimatedTexture(origin.texture, 10, 1) : new THREE.Texture();

    this.mesh = BasicMesh();
    this.mesh.material.map = this.texture;

    this.frame = {num : 0};

    const basicTween = (): Tween => new Tween(this.frame)
      .onStop(() => this.frame.num = 0);
    const tween1 = basicTween()
      .to({num: MAX_ANIME_FRAME - 1}, 300);
    const tween2 = basicTween()
      .delay(1000)
      .onComplete(() => {
        this.frame.num = 0;
      })
    tween1.chain(tween2);
    this.tween = tween1;
  }

  /**
   * ゲームループ
   *
   * @param camera カメラ
   */
  animate(camera: THREE.Camera): void {
    const frame = Math.floor(this.frame.num);

    this.texture.offset.x = frame/MAX_ANIME_FRAME;
    this.mesh.quaternion.copy(camera.quaternion);
  }
}