import type { PreRender } from "../../../../game-loop/pre-render";
import type { Resources } from "../../../../resource";
import type { YuuyaModel } from "../model/yuuya-model";
import { PlayerYuuyaView } from "./player-yuuya-view";

/** 敵側 ユウヤ ビュー */
export class EnemyYuuyaView extends PlayerYuuyaView {
  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    super(resources);
  }

  /** @override */
  engage(model: YuuyaModel, preRender: PreRender) {
    super.engage(model, preRender);
    const target = this.getObject3D();
    target.scale.x *= -1;
    target.position.x *= -1;
  }
}
