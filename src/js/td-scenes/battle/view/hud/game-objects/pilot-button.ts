import type { PilotId } from "gbraver-burst-core";
import { PilotIds } from "gbraver-burst-core";
import { Observable } from "rxjs";

import type { GameObjectAction } from "../../../../../game-object/action/game-object-action";
import {
  gaiPilotButton,
  raitoPilotButton,
  shinyaPilotButton,
  tsubasaPilotButton,
} from "../../../../../game-object/pilot-button";
import { PilotButton } from "../../../../../game-object/pilot-button/pilot-button";
import type { Resources } from "../../../../../resource";

/**
 * パイロットIDに対応したパイロットボタンを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param pilotId パイロットID
 * @return パイロットボタン
 */
export function createPilotButton(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
  pilotId: PilotId
): PilotButton {
  switch (pilotId) {
    case PilotIds.SHINYA:
      return shinyaPilotButton(resources, gameObjectAction);

    case PilotIds.GAI:
      return gaiPilotButton(resources, gameObjectAction);

    case PilotIds.RAITO:
      return raitoPilotButton(resources, gameObjectAction);

    case PilotIds.TSUBASA:
      return tsubasaPilotButton(resources, gameObjectAction);

    default:
      return shinyaPilotButton(resources, gameObjectAction);
  }
}
