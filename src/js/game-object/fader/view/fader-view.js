// @flow

import * as THREE from 'three';
import {HUD_FADER_ZINDEX} from "../../../zindex/hud-zindex";
import {FADE_RENDER_ORDER} from "../../../render-order/hud-render-order";
import type {FaderModel} from "../model/fader-model";
import {mode} from "../../../webpack/mode";

export const MESH_WIDTH = 100;
export const MESH_HEIGHT = 100;

/** 画面フェーダービュー */
export class FaderView {
  _mesh: THREE.Mesh;

  constructor() {
    const geometry = new THREE.PlaneGeometry(MESH_WIDTH, MESH_HEIGHT);
    const material = new THREE.MeshBasicMaterial({
      color: 'rgb(0, 255, 0)',
      transparent: true
    });
    this._mesh = new THREE.Mesh(geometry, material);
    this._mesh.position.z = HUD_FADER_ZINDEX;
    this._mesh.renderOrder = FADE_RENDER_ORDER;
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
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: FaderModel): void {
    this._mesh.material.opacity = model.opacity;
  }

  /**
   * 画面サイズを変更する
   *
   * @param width 横
   * @param height 縦
   */
  changeScreenSize(width: number, height: number): void {
    this._mesh.scale.x = width / MESH_WIDTH;
    this._mesh.scale.y = height / MESH_HEIGHT;
  }
}