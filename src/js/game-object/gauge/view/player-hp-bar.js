// @flow

import * as THREE from 'three';
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {animatedTexture} from "../../../texture/animation/texture-animation";
import {SPRITE_RENDER_ORDER} from "../../../render-order/td-render-order";

export const CANVAS_WIDTH = 1024;
export const CANVAS_HEIGHT = 512;
export const MESH_WIDTH = 512;
export const MESH_HEIGHT = 512;

/** プレイヤーのHPバー */
export class PlayerHpBar {
  _texture: THREE.Texture;
  _barImage: Image;
  _mesh: THREE.Mesh;
  _group: THREE.Group;

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const context = canvas.getContext('2d');

    const barResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.HP_BAR);
    this._barImage = barResource
      ? barResource.image
      : new Image();
    context.drawImage(this._barImage, 0, canvas.height / 2);

    this._texture = new THREE.Texture(canvas);
    animatedTexture(this._texture, 2, 1);
    this._texture.needsUpdate = true;

    const geometry = new THREE.PlaneGeometry(MESH_WIDTH, MESH_HEIGHT,1, 1);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      map: this._texture
    });
    this._mesh = new THREE.Mesh(geometry, material);
    this._mesh.position.set(MESH_HEIGHT / 2, 0, 0);
    this._mesh.renderOrder = SPRITE_RENDER_ORDER;
    this._group.add(this._mesh);
  }

  /**　デストラクタ相当の処理 */
  destructor(): void {
    this._mesh.material.dispose();
    this._mesh.geometry.dispose();
    this._texture.dispose();
  }

  /**
   * HPバーの値を設定する
   *
   * @param value 0〜1で指定するHPバーの値、1で100%
   */
  setValue(value: number): void {
    const baseOffsetX = 1 - this._correctValue(value);
    this._texture.offset.x = baseOffsetX * this._barImage.width / CANVAS_WIDTH;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._group;
  }

  /**
   * HPバーの入力値が0〜1になるように補正する
   *
   * @param value オリジナルの値
   * @return 補正結果
   */
  _correctValue(value: number): number {
    if (1 < value) {
      return 1;
    } else if (value < 0) {
      return 0;
    } else {
      return value;
    }
  }
}