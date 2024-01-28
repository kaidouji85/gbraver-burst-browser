import { Resources } from "../../resource";
import { ActiveArmdozerPointer } from "./active-armdozer-pointer";
import { PlayerArmdozerPointerView } from "./view/player-armdozer-pointer-view";

/**
 * プレイヤー側のアクティブアームドーザポインターを作成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function playerActiveArmdozerPointer(
  resources: Resources,
): ActiveArmdozerPointer {
  const view = new PlayerArmdozerPointerView(resources);
  return new ActiveArmdozerPointer(view);
}
