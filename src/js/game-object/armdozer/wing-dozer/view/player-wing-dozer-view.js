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

/**
 * プレイヤー側 ウィングドーザ ビュー
 */
export class PlayerWingDozerView implements WingDozerView{
  _stand: ArmdozerAnimation;
  _upperCharge: ArmdozerAnimation;
  _upperAttack: ArmdozerAnimation;
  _upperToStand: ArmdozerAnimation;
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
      default:
        return this._stand;
    }
  }
}
