// @flow

import type { PreRender } from "../../../../game-loop/pre-render";
import type { Resources } from "../../../../resource";
import type { ShinyaModel } from "../model/shinya-model";
import { PlayerShinyaView } from "./player-shinya-view";

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
   * @param preRender プリレンダー情報
   */
  engage(model: ShinyaModel, preRender: PreRender) {
    super.engage(model, preRender);
    const target = this.getObject3D();
    target.scale.x *= -1;
    target.position.x *= -1;
  }
}
