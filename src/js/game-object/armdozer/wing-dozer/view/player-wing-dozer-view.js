// @flow

import type {Resources} from "../../../../resource";
import * as THREE from "three";
import type {WingDozerView} from "./wing-dozer-view";
import type {AnimationType, WingDozerModel} from "../model/wing-dozer-model";
import {wingDozerStand} from "../mesh/stand";
import {Group} from "three";
import type {ArmdozerAnimation} from "../../mesh/armdozer-animation";
import {wingDozerUpperCharge} from "../mesh/upper-charge";
import {wingDozerUpperAttack} from "../mesh/upper-attack";
import {wingDozerUpperToStand} from "../mesh/upper-to-stand";
import {wingDozerDashUp} from "../mesh/dash-up";
import {wingDozerDashDown} from "../mesh/dash-down";
import {wingDozerDashToStand} from "../mesh/dash-to-stand";
import {wingDozerKnockBack} from "../mesh/knock-back";
import {wingDozerDown} from "../mesh/down";
import {wingDozerBackStep} from "../mesh/back-step";
import {wingDozerFrontStep} from "../mesh/front-step";

/**
 * プレイヤー側 ウィングドーザ ビュー
 */
export class PlayerWingDozerView implements WingDozerView{
  _stand: ArmdozerAnimation;
  _upperCharge: ArmdozerAnimation;
  _upperAttack: ArmdozerAnimation;
  _upperToStand: ArmdozerAnimation;
  _dashUp: ArmdozerAnimation;
  _dashDown: ArmdozerAnimation;
  _dashToStand: ArmdozerAnimation;
  _knockBack: ArmdozerAnimation;
  _down: ArmdozerAnimation;
  _backStep: ArmdozerAnimation;
  _frontStep: ArmdozerAnimation;
  _group: THREE.Group;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources): void {
    this._stand = wingDozerStand(resources);
    this._upperCharge = wingDozerUpperCharge(resources);
    this._upperAttack = wingDozerUpperAttack(resources);
    this._upperToStand = wingDozerUpperToStand(resources);
    this._dashUp = wingDozerDashUp(resources);
    this._dashDown = wingDozerDashDown(resources);
    this._dashToStand = wingDozerDashToStand(resources);
    this._knockBack = wingDozerKnockBack(resources);
    this._down = wingDozerDown(resources);
    this._backStep = wingDozerBackStep(resources);
    this._frontStep = wingDozerFrontStep(resources);

    this._group = new Group();
    this._getAllMeshes().forEach(mesh => {
      this._group.add(mesh.getObject3D());
    });
  }

  /**
   * デストラクタ
   */
  destructor(): void {
    this._getAllMeshes().forEach(mesh => {
      mesh.destructor();
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
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: WingDozerModel): void {
    this._group.position.x = model.position.x;
    this._group.position.y = model.position.y;
    this._group.position.z = model.position.z;

    this._group.scale.x = 1;
    this._group.scale.y = 1;
    this._group.scale.z = 1;
    
    const activeMesh = this._getActiveMesh(model.animation.type);
    activeMesh.animate(model.animation.frame);
    activeMesh.visible(true);

    const disActiveMesh = this._getAllMeshes()
      .filter(v => v !== activeMesh);
    disActiveMesh.forEach(v => v.visible(false));
  }

  /**
   * 本ビューに含まれる全メッシュを返す
   *
   * @return 全メッシュ
   */
  _getAllMeshes(): ArmdozerAnimation [] {
    return [
      this._stand,
      this._upperCharge,
      this._upperAttack,
      this._upperToStand,
      this._dashUp,
      this._dashDown,
      this._dashToStand,
      this._knockBack,
      this._down,
      this._backStep,
      this._frontStep,
    ];
  }

  /**
   * アニメーションタイプに応じたメッシュを返す
   *
   * @param type あアニメーションタイプ
   * @return メッシュ
   */
  _getActiveMesh(type: AnimationType): ArmdozerAnimation {
    switch(type) {
      case 'STAND':
        return this._stand;
      case 'UPPER_CHARGE':
        return this._upperCharge;
      case 'UPPER_ATTACK':
        return this._upperAttack;
      case 'UPPER_TO_STAND':
        return this._upperToStand;
      case 'DASH_UP':
        return this._dashUp;
      case 'DASH_DOWN':
        return this._dashDown;
      case 'DASH_TO_STAND':
        return this._dashToStand;
      case 'KNOCK_BACK':
        return this._knockBack;
      case 'DOWN':
        return this._down;
      case 'BACK_STEP':
        return this._backStep;
      case 'FRONT_STEP':
        return this._frontStep;
      default:
        return this._stand;
    }
  }
}
