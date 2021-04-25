// @flow

import * as THREE from 'three';
import type {ArmdozerIcon} from "./armdozer-icon";
import type {Resources} from "../../../resource";
import {TEXTURE_IDS} from "../../../resource/texture";
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";

/**
 * ウィングドーザアイコン
 */
export class WingDozerIcon implements ArmdozerIcon {
  _mesh: HorizontalAnimationMesh;
  _group: typeof THREE.Group;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const neoLandozer = resources.textures.find(v => v.id === TEXTURE_IDS.WING_DOZER_BURST_BUTTON_ICON)
      ?.texture ?? new THREE.Texture();
    this._mesh = new HorizontalAnimationMesh({
      texture: neoLandozer,
      maxAnimation: 1,
      width: 280,
      height: 280,
    });
    this._mesh.animate(1);
    this._mesh.getObject3D().position.x = -20;
    this._mesh.getObject3D().position.y = 120;
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