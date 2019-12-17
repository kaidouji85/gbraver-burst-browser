// @flow

import {ShinBraverView} from './shin-braver-view';
import * as THREE from "three";
import type {Resources} from "../../../../resource";
import type {ShinBraverModel} from "../model/shin-braver-model";
import type {ArmdozerAnimation} from "../../mesh/armdozer-animation";
import {shinBraverStand} from "../mesh/stand";
import type {AnimationType} from "../model/animation-type";
import {shinBraverSPAttack,} from "../mesh/sp-attack";
import {shinBraverSPCharge} from "../mesh/sp-charge";
import {shinBraverSPToStand} from "../mesh/sp-to-stand";
import {shinBraverKnockBack} from "../mesh/knock-back";
import {shinBraverGuard} from "../mesh/guard";
import {shinBraverDown} from "../mesh/down";
import {shinBraverGutsUp} from "../mesh/guts-up";
import {shinBraverGutsDown} from "../mesh/guts-down";

/** プレイヤー側シンブレイバーのビュー */
export class PlayerShinBraverView implements ShinBraverView {
  _group: THREE.Group;
  _stand: ArmdozerAnimation;
  _spCharge: ArmdozerAnimation;
  _spAttack: ArmdozerAnimation;
  _spToStand: ArmdozerAnimation;
  _knockBack: ArmdozerAnimation;
  _guard: ArmdozerAnimation;
  _down: ArmdozerAnimation;
  _gutsUp: ArmdozerAnimation;
  _gutsDown: ArmdozerAnimation;

  constructor(resources: Resources) {
    this._group = new THREE.Group();
    this._stand = shinBraverStand(resources);
    this._spCharge = shinBraverSPCharge(resources);
    this._spAttack = shinBraverSPAttack(resources);
    this._spToStand = shinBraverSPToStand(resources);
    this._knockBack = shinBraverKnockBack(resources);
    this._guard = shinBraverGuard(resources);
    this._down = shinBraverDown(resources);
    this._gutsUp = shinBraverGutsUp(resources);
    this._gutsDown = shinBraverGutsDown(resources);

    this._getAllMeshes().forEach(v => {
      this._group.add(v.getObject3D());
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._getAllMeshes().forEach(v => {
      v.destructor();
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
  _getAllMeshes(): ArmdozerAnimation[] {
    return [
      this._stand,
      this._spCharge,
      this._spAttack,
      this._spToStand,
      this._knockBack,
      this._guard,
      this._down,
      this._gutsUp,
      this._gutsDown,
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
  _getActiveMesh(animationType: AnimationType): ArmdozerAnimation {
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
      case 'DOWN':
        return this._down;
      case 'GUTS_UP':
        return this._gutsUp;
      case 'GUTS_DOWN':
        return this._gutsDown;
      default:
        return this._stand;
    }
  }
}