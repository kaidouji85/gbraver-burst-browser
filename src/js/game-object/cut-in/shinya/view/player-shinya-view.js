// @flow

import * as THREE from 'three';
import type {Resources} from "../../../../resource";
import {TEXTURE_IDS} from "../../../../resource/texture";
import {HorizontalAnimationMesh} from "../../../../mesh/horizontal-animation";
import type {ShinyaModel} from "../model/shinya-model";
import type {ShinyaView} from "./shinya-view";
import type {PreRender} from "../../../../game-loop/pre-render";
import {HUDCutInScale} from "../../../../hud-scale/hud-scale";
import {HUD_CUT_IN_ZNIDEX} from "../../../../zindex/hud-zindex";

/** メッシュの大きさ */
export const MESH_SIZE = 500;

/** アニメーション数 */
export const MAX_ANIMATION = 1;

/** 右パディング */
export const PADDING_RIGHT = 150;

/**
 * プレイヤー側 シンヤ ビュー
 */
export class PlayerShinyaView implements ShinyaView {
  _mesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const shinyaResource = resources.textures.find(v => v.id === TEXTURE_IDS.SHINYA_CUTIN);
    const shinya = shinyaResource?.texture ?? new THREE.Texture();
    this._mesh = new HorizontalAnimationMesh({
      texture: shinya,
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
  engage(model: ShinyaModel, preRender: PreRender): void {
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