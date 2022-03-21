// @flow
import type {Resources} from "../../resource";
import {HorizontalAnimationMesh} from "../../mesh/horizontal-animation";
import * as THREE from "three";
import {TEXTURE_IDS} from "../../resource/texture";

/** リザルトインジケータ */
export class ResultIndicator {
  _mesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const texture = resources.textures.find(v => v.id === TEXTURE_IDS.WIN)?.texture ?? new THREE.Texture();
    this._mesh = new HorizontalAnimationMesh({texture, maxAnimation: 1, width: 200, height: 200});
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
    return this._mesh.getObject3D();
  }
}