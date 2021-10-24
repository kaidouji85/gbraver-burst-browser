// @flow

import type {Stream} from "../../../../../../stream/core";
import type {GameObjectAction} from "../../../../../../game-object/action/game-object-action";
import type {PilotId} from "gbraver-burst-core";
import type {Resources} from "../../../../../../resource";
import {PilotIds} from "gbraver-burst-core";
import {
  gaiPilotButton,
  raitoPilotButton,
  shinyaPilotButton,
  tsubasaPilotButton
} from "../../../../../../game-object/pilot-button";
import {PilotButton} from "../../../../../../game-object/pilot-button/pilot-button";

/**
 * パイロットIDに対応したパイロットボタンを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param pilotId パイロットID
 * @return パイロットボタン
 */
export function createPilotButton(resources: Resources, gameObjectAction: Stream<GameObjectAction>, pilotId: PilotId): PilotButton {
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