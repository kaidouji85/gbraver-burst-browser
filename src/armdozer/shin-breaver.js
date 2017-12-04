// @flow
import type {Resources} from '../resource/resource-manager';
import {TEXTURE_PATHS} from '../resource/resource-manager';
import * as THREE from 'three';
import {Tween} from 'tween.js';
import {createAnimatedTexture} from '../texture/texture-animation';
import {flip} from '../mesh/flip-horizon';
import type {ArmDozerSprite} from "./armdozer-sprite";

const MESH_WIDTH = 320;
const MESH_HEIGHT = 320;
const MAX_ANIME_FRAME = 10;

/** シンブレイバーの基本となるメッシュ */
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
 * プレイヤーのシンブレイバー
 */
export class PlayerShinBraver implements ArmDozerSprite {
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
      });
    tween1.chain(tween2);
    this.tween = tween1;
  }

  /**
   * ゲームループ
   *
   * @param camera カメラ
   */
  gameLoop(camera: THREE.Camera): void {
    const frame = Math.floor(this.frame.num);

    this.texture.offset.x = frame/MAX_ANIME_FRAME;
    this.mesh.quaternion.copy(camera.quaternion);
  }

  getThreeJsObjects(): THREE.Object3D {
    return [this.mesh];
  }
}

/**
 * 敵のシンブレイバー
 * プレイヤー側のそれを左右反転したもの
 */
export class EnemyShinBraver extends PlayerShinBraver {
  constructor(resources: Resources) {
    super(resources);
    flip(this.mesh);
  }
}