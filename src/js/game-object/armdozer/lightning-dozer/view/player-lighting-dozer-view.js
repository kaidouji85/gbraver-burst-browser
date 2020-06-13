// @flow

import type {LightningDozerView} from "./lightning-dozer-view";
import type {Resources} from "../../../../resource";
import type {ArmdozerAnimation} from "../../mesh/armdozer-animation";
import {lightningDozerStand} from "../mesh/stand";
import type {AnimationType, LightningDozerModel} from "../model/lightning-dozer-model";
import * as THREE from "three";
import {lightningDozerHmCharge} from "../mesh/hm-charge";
import {lightningDozerHmAttack} from "../mesh/hm-attack";
import {lightningDozerHmToStand} from "../mesh/hm-to-stand";
import {lightningDozerKnockBack} from "../mesh/knock-back";
import {lightningDozerDown} from "../mesh/down";
import {lightningDozerGutsUp} from "../mesh/guts-up";
import {lightningDozerGutsDown} from "../mesh/guts-down";
import {lightningDozerGutsToStand} from "../mesh/gut-to-stand";
import {lightningDozerGuard} from "../mesh/guard";
import {lightningDozerBackStep} from "../mesh/back-step";
import {lightningDozerFrontStep} from "../mesh/front-step";

/**
 * プレイヤー側のライトニングドーザビュー
 */
export class PlayerLightingDozerView implements LightningDozerView {
  _group: THREE.Group;
  _stand: ArmdozerAnimation;
  _hmCharge: ArmdozerAnimation;
  _hmAttack: ArmdozerAnimation;
  _hmToStand: ArmdozerAnimation;
  _knockBack: ArmdozerAnimation;
  _down: ArmdozerAnimation;
  _gutsUp: ArmdozerAnimation;
  _gutsDown: ArmdozerAnimation;
  _gutsToStand: ArmdozerAnimation;
  _guard: ArmdozerAnimation;
  _backStep: ArmdozerAnimation;
  _frontStep: ArmdozerAnimation;

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    this._stand = lightningDozerStand(resources);
    this._hmCharge = lightningDozerHmCharge(resources);
    this._hmAttack = lightningDozerHmAttack(resources);
    this._hmToStand = lightningDozerHmToStand(resources);
    this._knockBack = lightningDozerKnockBack(resources);
    this._down = lightningDozerDown(resources);
    this._gutsUp = lightningDozerGutsUp(resources);
    this._gutsDown = lightningDozerGutsDown(resources);
    this._gutsToStand = lightningDozerGutsToStand(resources);
    this._guard = lightningDozerGuard(resources);
    this._backStep = lightningDozerBackStep(resources);
    this._frontStep = lightningDozerFrontStep(resources);

    this._getAllMeshes().forEach(v => {
      this._group.add(v.getObject3D());
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this._getAllMeshes().forEach(v => {
      v.destructor();
    });
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: LightningDozerModel): void {
    this._group.position.set(
      model.position.x,
      model.position.y,
      model.position.z
    );

    const activeMesh = this._getActiveMesh(model.animation.type);
    activeMesh.visible(true);
    activeMesh.animate(model.animation.frame);

    const disActiveMeshes = this._getAllMeshes()
      .filter(v => v !== activeMesh);
    disActiveMeshes.forEach(v => {
      v.visible(false);
    });
  }

  /**
   * スプライト配下のオブジェクトを追加する
   *
   * @param object オブジェクト
   */
  addObject3D(object: THREE.Object3D): void {
    this._group.add(object);
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
   * カメラの真正面を向く
   *
   * @param camera カメラ
   */
  lookAt(camera: THREE.Camera): void {
    this._group.quaternion.copy(camera.quaternion);
  }

  /**
   * 本ビューの全メッシュを取得する
   *
   * @return 本ビューの全メッシュ
   */
  _getAllMeshes(): ArmdozerAnimation[] {
    return [
      this._stand,
      this._hmCharge,
      this._hmAttack,
      this._hmToStand,
      this._knockBack,
      this._down,
      this._gutsUp,
      this._gutsDown,
      this._gutsToStand,
      this._guard,
      this._backStep,
      this._frontStep,
    ];
  }

  /**
   * アニメ種別に対応するメッシュを返す
   *
   * @param animationType アニメ種別
   * @return アニメ種別に対応するメッシュ
   */
  _getActiveMesh(animationType: AnimationType): ArmdozerAnimation {
    switch(animationType) {
      case 'HM_CHARGE':
        return this._hmCharge;
      case 'HM_ATTACK':
        return this._hmAttack;
      case 'HM_TO_STAND':
        return this._hmToStand;
      case 'KNOCK_BACK':
        return this._knockBack;
      case 'DOWN':
        return this._down;
      case 'GUTS_UP':
        return this._gutsUp;
      case 'GUTS_DOWN':
        return this._gutsDown;
      case 'GUTS_TO_STAND':
        return this._gutsToStand;
      case 'GUARD':
        return this._guard;
      case 'BACK_STEP':
        return this._backStep;
      case 'FRONT_STEP':
        return this._frontStep;
      case 'STAND':
      default:
        return this._stand;
    }
  }
}