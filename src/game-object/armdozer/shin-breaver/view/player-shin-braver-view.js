// @flow

import {ShinBraverView} from './shin-braver-view';
import * as THREE from "three";
import type {Resources} from "../../../../resource/index";
import type {ShinBraverModel} from "../model/shin-braver-model";
import type {SpriteAnimation} from "../../../../mesh/animation/sprite-animation";
import {shinBraverStand} from "../mesh/stand";
import type {AnimationType} from "../model/animation-type";
import {shinBraverSPAttack,} from "../mesh/sp-attack";
import {shinBraverSPCharge} from "../mesh/sp-charge";
import {shinBraverSPToStand} from "../mesh/sp-to-stand";
import {shinBraverKnockBack} from "../mesh/knock-back";
import {shinBraverGuard} from "../mesh/guard";

/** プレイヤー側シンブレイバーのビュー */
export class PlayerShinBraverView implements ShinBraverView {
  _group: THREE.Group;
  _stand: SpriteAnimation;
  _spCharge: SpriteAnimation;
  _spAttack: SpriteAnimation;
  _spToStand: SpriteAnimation;
  _knockBack: SpriteAnimation;
  _guard: SpriteAnimation;

  constructor(resources: Resources) {
    this._group = new THREE.Group();
    this._stand = shinBraverStand(resources);
    this._spCharge = shinBraverSPCharge(resources);
    this._spAttack = shinBraverSPAttack(resources);
    this._spToStand = shinBraverSPToStand(resources);
    this._knockBack = shinBraverKnockBack(resources);
    this._guard = shinBraverGuard(resources);

    this._getAllMeshes().forEach(v => {
      this._group.add(v.getObject3D());
    });
  }


  /** モデルをビューに反映させる */
  engage(model: ShinBraverModel): void {
    this._refreshPos(model);

    const activeMesh = this._getActiveMesh(model.animation.type);
    this._getAllMeshes()
      .filter(v => v !== activeMesh)
      .forEach(v => {
        v.visible(false);
      });

    activeMesh.visible(true);
    activeMesh.animate(model.animation.frame);
  }

  /** カメラの真正面を向く */
  lookAt(camera: THREE.Camera): void {
    this._group.quaternion.copy(camera.quaternion);
  }

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this._group;
  }

  /** 本クラスが持つ全メッシュを返す */
  _getAllMeshes(): SpriteAnimation[] {
    return [
      this._stand,
      this._spCharge,
      this._spAttack,
      this._spToStand,
      this._knockBack,
      this._guard
    ];
  }

  /** 座標を更新する */
  _refreshPos(model: ShinBraverModel): void {
    this._group.position.set(
      model.position.x,
      model.position.y,
      model.position.z
    );
  }

  /** アクティブなメッシュを取得 */
  _getActiveMesh(animationType: AnimationType): SpriteAnimation {
    switch(animationType) {
      case 'STAND':
        return this._stand;
      case 'SP_CHARGE':
        return this._spCharge;
      case 'SP_ATTACK':
        return this._spAttack;
      case 'SP_TO_STAND':
        return this._spToStand;
      case 'KNOCK_BACK':
        return this._knockBack;
      case 'GUARD':
        return this._guard;
      default:
        return this._stand;
    }
  }
}