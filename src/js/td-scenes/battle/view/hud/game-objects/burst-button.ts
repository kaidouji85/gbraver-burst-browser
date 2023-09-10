import { ArmdozerId, ArmdozerIds } from "gbraver-burst-core";
import { Observable } from "rxjs";

import type { GameObjectAction } from "../../../../../game-object/action/game-object-action";
import {
  genesisBraverBurstButton,
  lightningDozerBurstButton,
  neoLandozerBurstButton,
  shinBraverBurstButton,
  wingDozerBurstButton,
} from "../../../../../game-object/burst-button";
import { BurstButton } from "../../../../../game-object/burst-button/burst-button";
import type { Resources } from "../../../../../resource";

/**
 * アームドーザIDに対応したバーストボタンを生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param armdozerId アームドーザID
 * @return バーストボタン
 */
export function createBurstButton(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
  armdozerId: ArmdozerId,
): BurstButton {
  switch (armdozerId) {
    case ArmdozerIds.SHIN_BRAVER:
      return shinBraverBurstButton(resources, gameObjectAction);
    case ArmdozerIds.NEO_LANDOZER:
      return neoLandozerBurstButton(resources, gameObjectAction);
    case ArmdozerIds.LIGHTNING_DOZER:
      return lightningDozerBurstButton(resources, gameObjectAction);
    case ArmdozerIds.WING_DOZER:
      return wingDozerBurstButton(resources, gameObjectAction);
    case ArmdozerIds.GENESIS_BRAVER:
      return genesisBraverBurstButton(resources, gameObjectAction);
    default:
      return shinBraverBurstButton(resources, gameObjectAction);
  }
}
