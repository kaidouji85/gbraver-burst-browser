// @flow

import * as THREE from 'three';
import type {CutIn} from "../../cut-in";
import {HorizontalAnimationMesh} from "../../../../mesh/horizontal-animation";
import type {Resources} from "../../../../resource";
import {TEXTURE_IDS} from "../../../../resource/texture";
import type {AnimationType, ShinBraverCutInModel} from "../model/shin-braver-cutin-model";
import type {PreRender} from "../../../../action/game-loop/pre-render";
import {devicePerScaleForHUD} from "../../../../device-per-scale/hud";

/** メッシュの大きさ */
export const MESH_SIZE = 500;

/**
 * シンブレイバーカットインのビュー
 */
export class ShinBraverCutInView implements CutIn {
  _group: THREE.Group;
  _charge: HorizontalAnimationMesh;
  _release: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    const burstChargeResource = resources.textures
      .find(v => v.id === TEXTURE_IDS.SHIN_BRAVER_BURST_CHARGE);
    const burstCharge = burstChargeResource
      ? burstChargeResource.texture
      : new THREE.Texture();
    this._charge = new HorizontalAnimationMesh({
      texture: burstCharge,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: 4
    });

    const burstReleaseResource = resources.textures
      .find(v => v.id === TEXTURE_IDS.SHIN_BRAVER_BURST_RELEASE);
    const burstRelease = burstReleaseResource
      ? burstReleaseResource.texture
      : new THREE.Texture();
    this._release = new HorizontalAnimationMesh({
      texture: burstRelease,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: 4
    });

    this._getMeshes().forEach(v => {
      this._group.add(v.getObject3D());
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._getMeshes().forEach(v => {
      v.destructor();
    });
  }

  /**
   * モデルをビューに反映させる
   * 本メソッドはプリレンダー時に呼ばれることを想定している
   *
   * @param model モデル
   * @param preRender プリレンダーのアクション
   */
  engage(model: ShinBraverCutInModel, preRender: PreRender): void {
    const devicePerScale = devicePerScaleForHUD(preRender.rendererDOM, preRender.safeAreaInset);

    this._group.position.x = model.position.x * devicePerScale;
    this._group.position.y = model.position.y * devicePerScale;
    this._group.position.z = model.position.z * devicePerScale;

    this._group.scale.x = model.scale * devicePerScale;
    this._group.scale.y = model.scale * devicePerScale;
    this._group.scale.z = model.scale * devicePerScale;

    const activeMesh = this._getActiveMesh(model.animation.type);
    activeMesh.animate(model.animation.frame);
    activeMesh.setOpacity(model.opacity);

    const disActiveMeshes = this._getMeshes()
      .filter(v => v !== activeMesh);
    disActiveMeshes.forEach(v => {
      v.setOpacity(0);
    });
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
   * 本クラスが管理する全メッシュを取得する
   *
   * @return 管理する全メッシュ
   */
  _getMeshes(): HorizontalAnimationMesh[] {
    return [
      this._charge,
      this._release
    ];
  }

  /**
   * 指定したアニメーションタイプに対応したメッシュを返す
   *
   * @param type アニメーションタイプ
   * @return メッシュ
   */
  _getActiveMesh(type: AnimationType): HorizontalAnimationMesh {
    switch (type) {
      case 'BurstRelease':
        return this._release;
      case 'BurstCharge':
      default:
        return this._charge;
    }
  }
}