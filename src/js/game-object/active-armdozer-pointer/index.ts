import { Resources } from "../../resource";
import { ActiveArmdozerPointer } from "./active-armdozer-pointer";

/**
 * プレイヤー側のアクティブアームドーザポインターを作成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function playerActiveArmdozerPointer(
  resources: Resources,
): ActiveArmdozerPointer {
  return new ActiveArmdozerPointer(resources);
}
