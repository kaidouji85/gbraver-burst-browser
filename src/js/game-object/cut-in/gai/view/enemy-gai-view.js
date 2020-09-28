// @flow

import {PlayerGaiView} from "./player-gai-view";
import type {Resources} from "../../../../resource";
import type {GaiModel} from "../model/gai-model";
import type {PreRender} from "../../../../action/game-loop/pre-render";

/**
 * 敵側 ガイ ビュー
 */
export class EnemyGaiView extends PlayerGaiView {

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
  engage(model: GaiModel, preRender: PreRender) {
    super.engage(model, preRender);
    const target = this.getObject3D();
    target.scale.x *= -1;
  }
}