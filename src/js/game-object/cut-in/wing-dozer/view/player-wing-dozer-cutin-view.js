// @flow

import type {WingDozerCutInView} from "./wing-dozer-cutin-view";
import type {Resources} from "../../../../resource";
import {HorizontalAnimationMesh} from "../../../../mesh/horizontal-animation";
import {TEXTURE_IDS} from "../../../../resource/texture";
import * as THREE from "three";
import type {WingDozerCutInModel} from "../model/wing-dozer-cutin-model";

/** メッシュの大きさ */
export const MESH_SIZE = 800;

/** ベースとなるpadding top */
export const BASE_PADDING_TOP = 100;

/**
 * プレイヤー側 ウィングドーザ　カットイン ビュー
 */
export class PlayerWingDozerCutInView implements WingDozerCutInView {
  _cutInDown: HorizontalAnimationMesh;
  _group: THREE.Group;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const cutInDownResource = resources.textures
      .find(v => v.id === TEXTURE_IDS.WING_DOZER_BURST_UP);
    const cutInDown = cutInDownResource
      ? cutInDownResource.texture
      : new THREE.Texture();
    this._cutInDown = new HorizontalAnimationMesh({
      texture: cutInDown,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: 4
    });

    this._group = new THREE.Group();
    this._getAllMeshes().forEach(mesh => {
      this._group.add(mesh.getObject3D());
    })
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._cutInDown.destructor();
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
  engage(model: WingDozerCutInModel): void {
    this._group.position.x = model.tracking.x;
    this._group.position.y = model.tracking.y;

    this._group.scale.set(1, 1, 1);
  }

  /**
   * 本クラスに含まれる全メッシュを取得する
   *
   * @return 取得結果
   */
  _getAllMeshes(): HorizontalAnimationMesh[] {
    return [
      this._cutInDown
    ];
  }
}