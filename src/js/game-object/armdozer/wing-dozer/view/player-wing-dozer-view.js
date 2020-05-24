// @flow

import type {Resources} from "../../../../resource";
import {HorizontalArmdozerAnimation} from "../../mesh/horizontal-animation";
import {TEXTURE_IDS} from "../../../../resource/texture";
import * as THREE from "three";
import type {WingDozerView} from "./wing-dozer-view";

/**
 * プレイヤー側 ウィングドーザ ビュー
 */
export class PlayerWingDozerView implements WingDozerView{
  _mesh: HorizontalArmdozerAnimation;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources): void {
    this._mesh = new HorizontalArmdozerAnimation({
      id: TEXTURE_IDS.WING_DOZER_STAND,
      resources: resources,
      maxAnimation: 1,
      width: 600,
      height: 600,
    });
  }

  /**
   * デストラクタ
   */
  destructor(): void {
    this._mesh.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._mesh.getObject3D();
  }
}