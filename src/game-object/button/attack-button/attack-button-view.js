// @flow

import * as THREE from "three";
import type {Resources} from "../../../resource";
import {SPRITE_RENDER_ORDER} from "../../../mesh/render-order";
import type {TextureResource} from "../../../resource/texture";
import {TEXTURE_IDS} from "../../../resource/texture";
import type {ButtonModel} from "./model/button-model";
import {TouchTarget} from "../../../operation/touch/touch-target";

export const BUTTON_WIDTH = 100;
export const BUTTON_HEIGHT = 100;
export const PADDING_BOTTOM = 64;

/** コウゲキボタンのビュー */
export class AttackButtonView implements TouchTarget {
  _mesh: THREE.Mesh;

  constructor(resources: Resources) {
    const geometry = new THREE.PlaneGeometry(BUTTON_WIDTH, BUTTON_HEIGHT, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true
    });
    this._mesh = new THREE.Mesh(geometry, material);
    this._mesh.renderOrder = SPRITE_RENDER_ORDER;

    const textureResource: ?TextureResource = resources.textures.find(v => v.id === TEXTURE_IDS.ATTACK_BUTTON);
    const texture: THREE.Texture = textureResource ? textureResource.texture : new THREE.Texture();
    this._mesh.material.map = texture;
  }
  /** モデルをビューに反映させる */
  gameLoop(model: ButtonModel) {
    const scale = model.scale;
    this._mesh.scale.set(scale, scale, scale);
    this._mesh.position.y = -window.innerHeight / 2 + PADDING_BOTTOM;
  }

  /** シーンに追加するthree.jsオブジェクトを取得する */
  getThreeJsObjectList(): THREE.Mesh[] {
    return [this._mesh];
  }

  /** マウス、指とボタンが重なっているかを判定する */
  isOverlap(raycaster: THREE.Raycaster): boolean {
    const intersects = raycaster.intersectObjects([this._mesh]);
    return intersects.length > 0;
  }

}