// @flow

import * as THREE from 'three';
import type {PilotIcon} from "./pilot-icon";
import type {Resources} from "../../../resource";
import {TEXTURE_IDS} from "../../../resource/texture";
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";

/**
 * ツバサ パイロットアイコン
 */
export class TsubasaIcon implements PilotIcon {
  _group: typeof THREE.Group;
  _mesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const texture = resources.textures
      .find(v => v.id === TEXTURE_IDS.TSUBASA_CUTIN)
      ?.texture ?? new THREE.Texture();
    this._mesh = new HorizontalAnimationMesh({
      texture: texture,
      maxAnimation: 1,
      width: 400,
      height: 400,
    });
    this._mesh.getObject3D().position.x = -10;
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
   * @return 取得結果
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