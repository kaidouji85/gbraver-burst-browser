import { Observable } from "rxjs";

import { Resources } from "../../resource";
import { GameObjectAction } from "../action/game-object-action";
import { ActiveArmdozerPointer } from "./active-armdozer-pointer";
import { PlayerArmdozerPointerView } from "./view/player-armdozer-pointer-view";

/**
 * プレイヤー側のアクティブアームドーザポインターを作成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function playerActiveArmdozerPointer(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): ActiveArmdozerPointer {
  const view = new PlayerArmdozerPointerView(resources);
  return new ActiveArmdozerPointer(view, gameObjectAction);
}
