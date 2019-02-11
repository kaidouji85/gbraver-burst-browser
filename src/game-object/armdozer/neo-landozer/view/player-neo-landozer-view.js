// @flow

import {NeoLandozerView} from './neo-landozer-view';
import * as THREE from "three";
import type {Resources} from "../../../../resource/index";
import type {NeoLandozerModel} from "../model/neo-landozer-model";
import type {AnimationType} from "../model/animation-type";
import type {ArmdozerAnimation} from "../../mesh/armdozer-animation";
import {neoLandozerStand} from "../mesh/stand";
import {neoLandozerKnockBack} from "../mesh/knock-back";
import {neoLandozerGuard} from "../mesh/guard";
import {neoLandozerHMCharge} from "../mesh/hm-charge";
import {neoLandozerHMAttack} from "../mesh/hm-attack";
import {neoLandozerHMToStand} from "../mesh/hm-to-stand";

/** プレイヤー側ネオランドーザのビュー */
export class PlayerNeoLandozerView implements NeoLandozerView {
  _group: THREE.Group;
  _stand: ArmdozerAnimation;
  _knockBack: ArmdozerAnimation;
  _guard: ArmdozerAnimation;
  _hmCharge: ArmdozerAnimation;
  _hmAttack: ArmdozerAnimation;
  _hmToStand: ArmdozerAnimation;

  constructor(resources: Resources) {
    this._group = new THREE.Group();
    this._stand = neoLandozerStand(resources);
    this._knockBack = neoLandozerKnockBack(resources);
    this._guard = neoLandozerGuard(resources);
    this._hmCharge = neoLandozerHMCharge(resources);
    this._hmAttack = neoLandozerHMAttack(resources);
    this._hmToStand = neoLandozerHMToStand(resources);

    this._getAllMeshes().forEach(v => {
      this._group.add(v.getObject3D());
    });
  }

  /** モデルをビューに反映させる */
  engage(model: NeoLandozerModel): void {
    const activeMesh = this._getActiveMesh(model.animation.type);
    this._getAllMeshes()
      .filter(v => v !== activeMesh)
      .forEach(v => {
        v.visible(false);
      });
    activeMesh.visible(true);
    activeMesh.animate(model.animation.frame);
    this._refreshPos(model);
  }

  /** カメラの真正面を向く */
  lookAt(camera: THREE.Camera): void {
    this._group.quaternion.copy(camera.quaternion);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }

  /** 本クラスが保持する全メッシュを返す */
  _getAllMeshes(): ArmdozerAnimation[] {
    return [
      this._stand,
      this._knockBack,
      this._guard,
      this._hmCharge,
      this._hmAttack,
      this._hmToStand
    ];
  }

  /** 座標を更新する */
  _refreshPos(model: NeoLandozerModel): void {
    this._group.position.set(
      model.position.x,
      model.position.y,
      model.position.z
    );
  }

  /** アニメーションタイプに応じたメッシュを返す */
  _getActiveMesh(type: AnimationType): ArmdozerAnimation {
    switch (type) {
      case 'STAND':
        return this._stand;
      case 'KNOCK_BACK':
        return this._knockBack;
      case 'GUARD':
        return this._guard;
      case 'HM_CHARGE':
        return this._hmCharge;
      case 'HM_ATTACK':
        return this._hmAttack;
      case 'HM_TO_STAND':
        return this._hmToStand;
      default:
        return this._stand;
    }
  }
}