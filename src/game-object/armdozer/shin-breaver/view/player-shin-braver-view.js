// @flow

import {ShinBraverView} from './shin-braver-view';
import * as THREE from "three";
import type {Resources} from "../../../../resource/index";
import type {ShinBraverModel} from "../model/shin-braver-model";
import type {ArmdozerMesh} from "../../common/armdozer-mesh";
import {ShinBraverStand} from "../mesh/stand";
import {ShinBraverMyTurn} from "../mesh/my-turn";
import type {AnimationType} from "../model/animation-type";

/** プレイヤー側シンブレイバーのビュー */
export class PlayerShinBraverView implements ShinBraverView {
  _group: THREE.Group;
  _stand: ArmdozerMesh;
  _myTurn: ArmdozerMesh;

  constructor(resources: Resources) {
    this._group = new THREE.Group();

    this._stand = new ShinBraverStand(resources);
    this._group.add(this._stand.getObject3D());

    this._myTurn = new ShinBraverMyTurn(resources);
    this._group.add(this._myTurn.getObject3D());
  }

  /** モデルをビューに反映させる */
  engage(model: ShinBraverModel): void {
    this._refreshPos(model);

    const activeMesh = this._getActiveMesh(model.animation.type);
    this._getAllMeshes()
      .filter(v => v !== activeMesh)
      .forEach(v => {
        v.getObject3D().visible = false;
      });

    activeMesh.getObject3D().visible = true;
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

  /** 座標を更新する */
  _refreshPos(model: ShinBraverModel): void {
    this._group.position.set(
      model.position.x,
      model.position.y,
      model.position.z
    );
  }

  _getAllMeshes(): ArmdozerMesh[] {
    return [this._stand, this._myTurn];
  }

  /** アクティブなメッシュを取得 */
  _getActiveMesh(animationType: AnimationType): ArmdozerMesh {
    switch(animationType) {
      case 'STAND':
        return this._stand;
      case 'MY_TURN':
        return this._myTurn;
      default:
        return this._stand;
    }
  }
}