// @flow

import * as THREE from 'three';
import type {ArmdozerIcon} from "./armdozer-icon";
import type {Resources} from "../../../resource";
import {TEXTURE_IDS} from "../../../resource/texture";
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";

/**
 * シンブレイバーアイコン
 */
export class ShinBraverIcon implements ArmdozerIcon {
  _mesh: HorizontalAnimationMesh;
  _group: typeof THREE.Group;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const shinBraver = resources.textures.find(v => v.id === TEXTURE_IDS.SHIN_BRAVER_BURST_DOWN)
      ?.texture ?? new THREE.Texture();
    this._mesh = new HorizontalAnimationMesh({
      texture: shinBraver,
      maxAnimation: 4,
      width: 800,
      height: 800,
    });
    this._mesh.animate(1);
    this._mesh.getObject3D().position.y = 140;
    this._group.add(this._mesh.getObject3D());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._mesh.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this._group;
  }

  /**
   * 透明度を設定する
   *
   * @param opacity 透明度
   */
  setOpacity(opacity: number): void {
    this._mesh.setOpacity(opacity);
  }
}