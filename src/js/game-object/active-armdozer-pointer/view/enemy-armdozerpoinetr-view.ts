import { Resources } from "../../../resource";
import { ActiveArmdozerPointerModel } from "../model/active-armdozer-pointer-model";
import { PlayerArmdozerPointerView } from "./player-armdozer-pointer-view";

/** 敵側 アクティブアームドーザポインター ビュー */
export class EnemyArmdozerPointerView extends PlayerArmdozerPointerView {
  /**
   * コンストラクタ
   * @param resources
   */
  constructor(resources: Resources) {
    super(resources);
  }

  /** @override */
  engage(model: ActiveArmdozerPointerModel): void {
    super.engage(model);
  }
}
