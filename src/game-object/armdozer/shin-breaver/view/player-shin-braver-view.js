// @flow

import {ShinBraverView} from './shin-braver-view';
import * as THREE from "three";
import type {Resources} from "../../../../resource/index";
import type {ShinBraverModel} from "../model/shin-braver-model";
import type {ArmdozerMesh} from "../../mesh/armdozer-mesh";
import {shinBraverStand} from "../mesh/stand";
import type {AnimationType} from "../model/animation-type";
import {shinBraverStraightPunch} from "../mesh/straight-punch";

/** プレイヤー側シンブレイバーのビュー */
export class PlayerShinBraverView implements ShinBraverView {
  _group: THREE.Group;
  _stand: ArmdozerMesh;
  _straightPunch: ArmdozerMesh;

  constructor(resources: Resources) {
    this._group = new THREE.Group();
    this._stand = shinBraverStand(resources);
    this._straightPunch = shinBraverStraightPunch(resources);

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
    return [this._stand, this._straightPunch];
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
      case 'STRAIGHT_PUNCH':
        return this._straightPunch;
      default:
        return this._stand;
    }
  }
}