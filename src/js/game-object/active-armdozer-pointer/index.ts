import { Observable } from "rxjs";

import { Resources } from "../../resource";
import { GameObjectAction } from "../action/game-object-action";
import { ActiveArmdozerPointer } from "./active-armdozer-pointer";
import { SimpleArmdozerPointerView } from "./view/simple-armdozer-pointer-view";

/**
 * アクティブアームドーザポインターを作成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function activeArmdozerPointer(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): ActiveArmdozerPointer {
  const view = new SimpleArmdozerPointerView(resources);
  return new ActiveArmdozerPointer(view, gameObjectAction);
}