// @flow

import type {Resources} from "../../../../resource";
import * as THREE from "three";
import type {WingDozerView} from "./wing-dozer-view";
import type {WingDozerModel} from "../model/wing-dozer-model";
import {wingDozerStand} from "../mesh/stand";
import {Group} from "three";
import type {ArmdozerAnimation} from "../../mesh/armdozer-animation";

/**
 * プレイヤー側 ウィングドーザ ビュー
 */
export class PlayerWingDozerView implements WingDozerView{
  _stand: ArmdozerAnimation;
  _group: THREE.Group;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources): void {
    this._stand = wingDozerStand(resources);

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
  }

  _getAllMeshes(): ArmdozerAnimation [] {
    return [
      this._stand,
    ];
  }
}
