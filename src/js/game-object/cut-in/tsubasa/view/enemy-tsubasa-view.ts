import type { PreRender } from "../../../../game-loop/pre-render";
import type { Resources } from "../../../../resource";
import type { TsubasaModel } from "../model/tsubasa-model";
import { PlayerTsubasaView } from "./player-tsubasa-view";

/**
 * 敵側 ツバサ ビュー
 */
export class EnemyTsubasaView extends PlayerTsubasaView {
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
  engage(model: TsubasaModel, preRender: PreRender) {
    super.engage(model, preRender);
    const target = this.getObject3D();
    target.scale.x *= -1;
    target.position.x *= -1;
  }
}
