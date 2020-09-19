// @flow

import * as THREE from "three";
import type {Resources} from "../../../../resource";
import {HorizontalAnimationMesh} from "../../../../mesh/horizontal-animation";
import {TEXTURE_IDS} from "../../../../resource/texture";
import type {LightningDozerCutInView} from "./lightning-dozer-cutin-view";
import type {AnimationType, LightningDozerCutInModel} from "../model/lightning-dozer-cutin-model";
import type {PreRender} from "../../../../action/game-loop/pre-render";
import {HUD_CUT_IN_ZNIDEX} from "../../../../zindex/hud-zindex";
import {HUDCutInScale} from "../../../../hud-scale/hud-scale";

/** メッシュの大きさ */
export const MESH_SIZE = 900;

/** ベースとなるpadding top */
export const BASE_PADDING_TOP = 60;

/**
 * プレイヤー ライトニングドーザ カットイン
 */
export class PlayerLightningDozerCutInView implements LightningDozerCutInView {
  _group: typeof THREE.Group;
  _cutInUp: HorizontalAnimationMesh;
  _cutInDown: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const cutInUpResource = resources.textures
      .find(v => v.id === TEXTURE_IDS.LIGHTNING_DOZER_CUTIN_UP);
    const cutInUp = cutInUpResource
      ? cutInUpResource.texture
      : new THREE.Texture();
    this._cutInUp = new HorizontalAnimationMesh({
      texture: cutInUp,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: 4
    });

    const cutInDownResource = resources.textures
      .find(v => v.id === TEXTURE_IDS.LIGHTNING_DOZER_CUTIN_DOWN);
    const cutInDown = cutInDownResource
      ? cutInDownResource.texture
      : new THREE.Texture();
    this._cutInDown = new HorizontalAnimationMesh({
      texture: cutInDown,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: 4
    });
    
    this._getMeshes().forEach(mesh => {
      this._group.add(mesh.getObject3D());
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._getMeshes().forEach(mesh => {
      mesh.destructor();
    });
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender PreRender情報
   */
  engage(model: LightningDozerCutInModel, preRender: PreRender): void {
    const activeMesh = this._getActiveMesh(model.animation.type);
    activeMesh.animate(model.animation.frame);
    activeMesh.setOpacity(model.opacity);

    const disActiveMeshes = this._getMeshes()
      .filter(v => v !== activeMesh);
    disActiveMeshes.forEach(v => {
      v.setOpacity(0);
    });

    const scale = HUDCutInScale(preRender.rendererDOM, preRender.safeAreaInset) * model.scale;
    this._group.position.x = model.tracking.x;
    this._group.position.y = model.tracking.y - BASE_PADDING_TOP * scale;
    this._group.position.z = HUD_CUT_IN_ZNIDEX;

    this._group.scale.x = scale;
    this._group.scale.y = scale;
    this._group.scale.z = scale;
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
   * 本クラスに含まれる全メッシュを取得する
   *
   * @return 取得結果
   */
  _getMeshes(): HorizontalAnimationMesh[] {
    return [
      this._cutInUp,
      this._cutInDown,
    ];
  }

  /**
   * アニメーションタイプに対応したメッシュを返す
   *
   * @param type アニメーションタイプ
   * @return 対応したメッシュ
   */
  _getActiveMesh(type: AnimationType): HorizontalAnimationMesh {
    switch (type) {
      case "CUT_IN_UP":
        return this._cutInUp;
      case "CUT_IN_DOWN":
        return this._cutInDown;
      default:
        return this._cutInDown;
    }
  }
}