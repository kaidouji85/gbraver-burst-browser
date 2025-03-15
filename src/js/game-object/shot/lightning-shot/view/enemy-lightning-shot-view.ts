import { ResourcesContainer } from "../../../../resource";
import { LightningShotModel } from "../model/lightning-shot-model";
import { PlayerLightningShotView } from "./player-lightning-shot-view";

/** 敵の電撃ショットビュー */
export class EnemyLightningShotView extends PlayerLightningShotView {
  /**
   * コンストラクタ
   * @param options オプション
   */
  constructor(options: ResourcesContainer) {
    super(options);
  }

  /** @override */
  engage(model: LightningShotModel): void {
    super.engage(model);
    this.getObject3D().position.x *= -1;
    this.getObject3D().scale.x = -1;
  }
}
