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
import {shinBraverBurstUp} from "../mesh/burst-up";
import {shinBraverBurstDown} from "../mesh/burst-down";
import {shinBraverBackStep} from "../mesh/back-step";
import {shinBraverFrontStep} from "../mesh/front-step";

/** プレイヤー側シンブレイバーのビュー */
export class PlayerShinBraverView implements ShinBraverView {
  _group: typeof THREE.Group;
  _stand: ArmdozerAnimation;
  _spCharge: ArmdozerAnimation;
  _spAttack: ArmdozerAnimation;
  _spToStand: ArmdozerAnimation;
  _knockBack: ArmdozerAnimation;
  _guard: ArmdozerAnimation;
  _down: ArmdozerAnimation;
  _gutsUp: ArmdozerAnimation;
  _gutsDown: ArmdozerAnimation;
  _burstUp: ArmdozerAnimation;
  _burstDown: ArmdozerAnimation;
  _backStep: ArmdozerAnimation;
  _frontStep: ArmdozerAnimation;

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
    this._burstUp = shinBraverBurstUp(resources);
    this._burstDown = shinBraverBurstDown(resources);
    this._backStep = shinBraverBackStep(resources);
    this._frontStep = shinBraverFrontStep(resources);

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

  /**
   * スプライト配下のオブジェクトを追加する
   *
   * @param object 追加するオブジェクト
   */
  addObject3D(object: typeof THREE.Object3D): void {
    this._group.add(object);
  }

  /** カメラの真正面を向く */
  lookAt(camera: typeof THREE.Camera): void {
    this._group.quaternion.copy(camera.quaternion);
  }

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): typeof THREE.Object3D {
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
      this._burstUp,
      this._burstDown,
      this._backStep,
      this._frontStep,
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
      case 'BURST_UP':
        return this._burstUp;
      case 'BURST_DOWN':
        return this._burstDown;
      case 'BACK_STEP':
        return this._backStep;
      case 'FRONT_STEP':
        return this._frontStep;
      default:
        return this._stand;
    }
  }
}