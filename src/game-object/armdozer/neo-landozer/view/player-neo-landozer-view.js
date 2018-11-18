// @flow

import {NeoLandozerView} from './neo-landozer-view';
import * as THREE from "three";
import type {Resources} from "../../../../resource/index";
import type {NeoLandozerModel} from "../model/neo-landozer-model";
import type {AnimationType} from "../model/animation-type";
import type {ArmdozerMesh} from "../../common/armdozer-mesh";
import {neoLandozerStand} from "../mesh/stand";
import {neoLandozerKnockBack} from "../mesh/knock-back";

/** プレイヤー側ネオランドーザのビュー */
export class PlayerNeoLandozerView implements NeoLandozerView {
  _group: THREE.Group;
  _stand: ArmdozerMesh;
  _knockBack: ArmdozerMesh;

  constructor(resources: Resources) {
    this._group = new THREE.Group();
    this._stand = neoLandozerStand(resources);
    this._knockBack = neoLandozerKnockBack(resources);

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
  _getAllMeshes(): ArmdozerMesh[] {
    return [this._stand, this._knockBack];
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
  _getActiveMesh(type: AnimationType): ArmdozerMesh {
    switch (type) {
      case 'STAND':
        return this._stand;
      case 'KNOCK_BACK':
        return this._knockBack;
      default:
        return this._stand;
    }
  }
}