// @flow

import type {NeoLandozerCutInView} from "./neo-landozer-cutin-view";
import {HorizontalAnimationMesh} from "../../../../mesh/horizontal-animation";
import type {Resources} from "../../../../resource";
import {TEXTURE_IDS} from "../../../../resource/texture";
import * as THREE from "three";
import type {NeoLandozerCutInModel} from "../model/neo-landozer-cutin-model";

export const MAX_ANIMATION = 4;
export const WIDTH = 500;
export const HEIGHT = 500;

/**
 * プレイヤー側　ネオランドーザ カットイン ビュー
 */
export class PlayerNeoLandozerCutInView implements NeoLandozerCutInView {
  _cutInUp: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    const cutInUpResource = resources.textures.find(v => v.id === TEXTURE_IDS.NEO_LANDOZER_CUTIN_UP);
    const cutInUp = cutInUpResource
      ? cutInUpResource.texture
      : new THREE.Texture();

    this._cutInUp = new HorizontalAnimationMesh({
      texture: cutInUp,
      maxAnimation: MAX_ANIMATION,
      width: WIDTH,
      height: HEIGHT,
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._cutInUp.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  engage(model: NeoLandozerCutInModel): void {
    // NOP
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._cutInUp.getObject3D();
  }
}