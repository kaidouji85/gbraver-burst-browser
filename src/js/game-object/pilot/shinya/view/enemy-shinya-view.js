// @flow

import {PlayerShinyaView} from "./player-shinya-view";
import type {Resources} from "../../../../resource";
import type {ShinyaModel} from "../model/shinya-model";

/**
 * 敵側 シンヤ ビュー
 */
export class EnemyShinyaView extends PlayerShinyaView {

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: ShinyaModel) {
    super.engage(model);
    const target = this.getObject3D();
    target.scale.x *= -1;
  }
}