import { Resources } from "../../../../resource";
import { GranDozerModel } from "../model/gran-dozer-model";
import { PlayerGranDozerView } from "./player-gran-dozer-view";

/** 敵グランドーザビュー */
export class EnemyGranDozerView extends PlayerGranDozerView {
  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    super(resources);
  }

  /** @override */
  engage(model: GranDozerModel): void {
    super.engage(model);
    this.getObject3D().position.x *= -1;
    this.getObject3D().scale.x = -1;
  }
}
