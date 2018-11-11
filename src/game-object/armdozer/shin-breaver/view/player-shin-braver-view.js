// @flow

import {ShinBraverView} from './shin-braver-view';
import * as THREE from "three";
import type {Resources} from "../../../../resource/index";
import type {ShinBraverModel} from "../model/shin-braver-model";
import type {ArmdozerMesh} from "../../common/armdozer-mesh";
import {ShinBraverStand} from "../mesh/stand";
import {shinBraverMyTurn} from "../mesh/my-turn";
import type {AnimationType} from "../model/animation-type";
import {shinBraverPunch} from "../mesh/punch";

/** プレイヤー側シンブレイバーのビュー */
export class PlayerShinBraverView implements ShinBraverView {
  _group: THREE.Group;
  _stand: ArmdozerMesh;
  _myTurn: ArmdozerMesh;
  _punch: ArmdozerMesh;

  constructor(resources: Resources) {
    this._group = new THREE.Group();
    this._stand = new ShinBraverStand(resources);
    this._myTurn = shinBraverMyTurn(resources);
    this._punch = shinBraverPunch(resources);

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
  _getAllMeshes(): ArmdozerMesh[] {
    return [this._stand, this._myTurn, this._punch];
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
  _getActiveMesh(animationType: AnimationType): ArmdozerMesh {
    switch(animationType) {
      case 'STAND':
        return this._stand;
      case 'MY_TURN':
        return this._myTurn;
      case 'PUNCH':
        return this._punch;
      default:
        return this._stand;
    }
  }
}