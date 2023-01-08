import type { Resources } from "../../../../resource";
import type { ShockWaveModel } from "../model/shock-wave-model";
import { PlayerShockWaveView } from "./player-shock-wave-view";

/**
 * 敵の衝撃波ビュー
 */
export class EnemyShockWaveView extends PlayerShockWaveView {
  constructor(resources: Resources, initialModel: ShockWaveModel) {
    super(resources, initialModel);
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: ShockWaveModel): void {
    super.engage(model);
    this.getObject3D().scale.x *= -1;
    this.getObject3D().position.x *= -1;
  }
}
