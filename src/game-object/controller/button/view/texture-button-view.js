// @flow
import * as THREE from "three";
import {SPRITE_RENDER_ORDER} from "../../../../mesh/render-order";
import type {ButtonModel} from "../model/button-model";
import type {ButtonView} from "./button-view";

type Param = {
  texture: THREE.Texture,
  width: number,
  height: number
};

/** テクスチャをそのままボタンとして表示する */
export class TextureButtonView implements ButtonView {
  _mesh: THREE.Mesh;

  constructor(param: Param) {
    const geometry = new THREE.PlaneGeometry(param.width, param.height, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true
    });
    this._mesh = new THREE.Mesh(geometry, material);
    this._mesh.renderOrder = SPRITE_RENDER_ORDER;
    this._mesh.material.map = param.texture;
  }

  /** モデルをビューに反映させる */
  gameLoop(model: ButtonModel) {
    const scale = 1 - 0.1 * model.depth;
    this._mesh.scale.set(scale, scale, scale);
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
