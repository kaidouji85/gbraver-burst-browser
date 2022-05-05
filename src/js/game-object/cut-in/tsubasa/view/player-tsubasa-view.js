// @flow

import * as THREE from 'three';
import type {Resources} from "../../../../resource";
import {TEXTURE_IDS} from "../../../../resource/texture";
import {HorizontalAnimationMesh} from "../../../../mesh/horizontal-animation";
import type {TsubasaModel} from "../model/tsubasa-model";
import type {TsubasaView} from "./tsubasa-view";
import type {PreRender} from "../../../../game-loop/pre-render";
import {HUDCutInScale} from "../../../scale";
import {HUD_CUT_IN_ZNIDEX} from "../../../../zindex/hud-zindex";

/** メッシュの大きさ */
export const MESH_SIZE = 550;

/** アニメーション数 */
export const MAX_ANIMATION = 1;

/** 右パディング */
export const PADDING_RIGHT = 200;

/**
 * プレイヤー側 ツバサ ビュー
 */
export class PlayerTsubasaView implements TsubasaView {
  _mesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const tsubasa = resources.textures.find(v => v.id === TEXTURE_IDS.TSUBASA_CUTIN)
      ?.texture ?? new THREE.Texture();
    this._mesh = new HorizontalAnimationMesh({
      texture: tsubasa,
      maxAnimation: MAX_ANIMATION,
      width: MESH_SIZE,
      height: MESH_SIZE,
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._mesh.destructor();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: TsubasaModel, preRender: PreRender): void {
    const scale = HUDCutInScale(preRender.rendererDOM, preRender.safeAreaInset) * model.scale;
    const x = preRender.rendererDOM.clientWidth / 2
      + (model.position.x - PADDING_RIGHT) * scale;
    this._mesh.getObject3D().scale.set(scale, scale, scale);
    this._mesh.getObject3D().position.set(x, 0, HUD_CUT_IN_ZNIDEX);
    this._mesh.setOpacity(model.opacity);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this._mesh.getObject3D();
  }
}