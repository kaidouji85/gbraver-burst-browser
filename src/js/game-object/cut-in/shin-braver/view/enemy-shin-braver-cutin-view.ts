import type { PreRender } from "../../../../game-loop/pre-render";
import type { Resources } from "../../../../resource";
import type { ShinBraverCutInModel } from "../model/shin-braver-cutin-model";
import { PlayerShinBraverCutInView } from "./player-shin-braver-cutin-view";

/**
 * 敵側 シンブレイバー カットインビュー
 */
export class EnemyShinBraverCutInView extends PlayerShinBraverCutInView {
  constructor(resources: Resources) {
    super(resources);
  }

  /**
   * モデルをビューに反映させる
   * 本メソッドはプリレンダー時に呼ばれることを想定している
   *
   * @param model モデル
   * @param preRender プリレンダーのアクション
   */
  engage(model: ShinBraverCutInModel, preRender: PreRender): void {
    super.engage(model, preRender);
    const target = this.getObject3D();
    target.scale.x *= -1;
  }

}