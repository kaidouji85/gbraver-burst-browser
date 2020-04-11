// @flow

import type {NeoLandozerCutInView} from "./neo-landozer-cutin-view";
import {HorizontalAnimationMesh} from "../../../../mesh/horizontal-animation";
import type {Resources} from "../../../../resource";
import {TEXTURE_IDS} from "../../../../resource/texture";
import * as THREE from "three";
import type {AnimationType, NeoLandozerCutInModel} from "../model/neo-landozer-cutin-model";
import {HUD_CUT_IN_ZNIDEX} from "../../../../zindex/hud-zindex";
import type {PreRender} from "../../../../action/game-loop/pre-render";
import {devicePerScaleForHUD} from "../../../../device-per-scale/hud";

export const MAX_ANIMATION = 4;
export const WIDTH = 800;
export const HEIGHT = 800;

/**
 * プレイヤー側　ネオランドーザ カットイン ビュー
 */
export class PlayerNeoLandozerCutInView implements NeoLandozerCutInView {
  _group: THREE.Group;
  _cutInUp: HorizontalAnimationMesh;
  _cutInDown: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    this._group = new THREE.Group();
    this._group.position.z = HUD_CUT_IN_ZNIDEX;

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

    const cutInDownResource = resources.textures.find(v => v.id === TEXTURE_IDS.NEO_LANDOZER_CUTIN_DOWN);
    const cutInDown = cutInDownResource
      ? cutInDownResource.texture
      : new THREE.Texture();
    this._cutInDown = new HorizontalAnimationMesh({
      texture: cutInDown,
      maxAnimation: MAX_ANIMATION,
      width: WIDTH,
      height: HEIGHT,
    });

    this._getAllMeshes().forEach(v => {
      this._group.add(v.getObject3D());
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._getAllMeshes().forEach(v => {
      v.destructor();
    });
  }

  /**
   * モデルをビューに反映する
   *
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: NeoLandozerCutInModel, preRender: PreRender): void {
    const activeMesh = this._getActiveMesh(model.animation.type);
    activeMesh.setOpacity(1);
    activeMesh.animate(model.animation.frame);

    this._getAllMeshes()
      .filter(v => v !== activeMesh)
      .forEach(v => {
        v.setOpacity(0);
      });

    const scale = devicePerScaleForHUD(preRender.rendererDOM, preRender.safeAreaInset);
    this._group.scale.set(scale, scale, scale);
    this._group.position.x = model.tracking.x;
    this._group.position.y = model.tracking.y;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._group;
  }

  /**
   * 本クラスの全メッシュを取得する
   *
   * @return 本クラスの全メッシュ
   */
  _getAllMeshes(): HorizontalAnimationMesh[] {
    return [
      this._cutInUp,
      this._cutInDown,
    ];
  }

  /**
   * アニメーションタイプに対応したメッシュを返す
   *
   * @param type アニメーションタイプ
   * @return 対応するメッシュ
   */
  _getActiveMesh(type: AnimationType): HorizontalAnimationMesh {
    switch (type) {
      case 'CUT_IN_DOWN':
        return this._cutInDown;
      case 'CUT_IN_UP':
      default:
        return this._cutInUp;
    }
  }
}