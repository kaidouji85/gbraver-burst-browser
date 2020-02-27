// @flow

import * as THREE from "three";

/** 全体の大きさ */
export const SIZE = 5000;

/** 空の明るさ */
export class SkyBrightness {
  _mesh: THREE.Mesh;

  constructor() {
    const geometry = new THREE.BoxGeometry(SIZE, SIZE, SIZE);
    const material = new THREE.MeshBasicMaterial({
      color: 'rgb(0, 0, 0)',
      side: THREE.BackSide,
      transparent: true,
    });
    this._mesh = new THREE.Mesh(geometry, material);
    this._updateOpacity(0.8);
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._mesh.material.dispose();
    this._mesh.geometry.dispose();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._mesh;
  }

  /**
   * 不透明度を更新する
   *
   * @param opacity 0〜1で指定する不透明度、1で完全不透明
   */
  _updateOpacity(opacity: number):void {
    this._mesh.material.opacity = opacity;
  }
}