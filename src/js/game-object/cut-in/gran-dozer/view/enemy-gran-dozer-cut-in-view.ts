import { PreRender } from "../../../../game-loop/pre-render";
import { Resources } from "../../../../resource";
import { GranDozerCutInModel } from "../model/gran-dozer-cut-in-model";
import { PlayerGranDozerCutInView } from "./player-gran-dozer-cut-in-view";

/** 敵 グランドーザ カットイン ビュー */
export class EnemyGranDozerCutInView extends PlayerGranDozerCutInView {
  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    super(resources);
  }

  /** @override */
  engage(model: GranDozerCutInModel, preRender: PreRender): void {
    super.engage(model, preRender);
    const target = this.getObject3D();
    target.scale.x *= -1;
  }
}
