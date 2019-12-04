// @flow

import * as THREE from 'three';
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {animatedTexture} from "../../../texture/animation/texture-animation";
import {SPRITE_RENDER_ORDER} from "../../../render-order/td-render-order";

export const CANVAS_SIZE = 512;
export const MESH_SIZE = 512;

/** HPバー */
export class HpBar {
  _texture: THREE.Texture;
  _group: THREE.Group;

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_SIZE * 2;
    canvas.height = CANVAS_SIZE;
    const context = canvas.getContext('2d');

    const barResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.HP_BAR);
    const bar = barResource
      ? barResource.image
      : new Image();
    context.drawImage(bar, 0, canvas.height / 2);

    this._texture = new THREE.Texture(canvas);
    animatedTexture(this._texture, 2, 1);
    this._texture.needsUpdate = true;
    this._texture.offset.x = 0.3; // TODO publicメソッドで設定できるようにする

    const geometry = new THREE.PlaneGeometry(MESH_SIZE, MESH_SIZE,1, 1);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      map: this._texture
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(MESH_SIZE / 2, 0, 0);
    mesh.renderOrder = SPRITE_RENDER_ORDER;
    this._group.add(mesh);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._group;
  }
}