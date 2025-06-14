import type { Resources } from "../../../resource";
import type { EffectClearModel } from "../model/effect-clear-model";
import { PlayerEffectClearView } from "./player-effect-clear-view";

/** 敵 効果消去 ビュー */
export class EnemyEffectClearView extends PlayerEffectClearView {
  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    super(resources);
  }

  /** @override */
  engage(model: EffectClearModel): void {
    super.engage(model);
    const target = super.getObject3D();
    target.position.x *= -1;
  }
}
