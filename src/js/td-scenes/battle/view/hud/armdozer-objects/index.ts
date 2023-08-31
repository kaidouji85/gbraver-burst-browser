import { ArmdozerIds, Player } from "gbraver-burst-core";
import { Observable } from "rxjs";

import type { GameObjectAction } from "../../../../../game-object/action/game-object-action";
import type { Resources } from "../../../../../resource";
import { EmptyHUDArmdozer } from "./empty";
import {
  enemyGenesisBraverHUD,
  playerGenesisBraverHUD,
} from "./genesis-braver";
import type { HUDArmdozerObjects } from "./hud-armdozer-ibjects";
import {
  enemyLightningDozerHUD,
  playerLightningDozerHUD,
} from "./lightning-dozer";
import { enemyNeoLandozerHUD, playerNeoLandozerHUD } from "./neo-landozer";
import { enemyShinBraverHUD, playerShinBraverHUD } from "./shin-braver";
import { enemyWingDozerHUD, playerWingDozerHUD } from "./wing-dozer";

/**
 * プレイヤー側 HUDアームドーザ
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー状態
 * @return HUDアームドーザ
 */
export function playerArmdozerHUD(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
  state: Player,
): HUDArmdozerObjects {
  switch (state.armdozer.id) {
    case ArmdozerIds.SHIN_BRAVER:
      return playerShinBraverHUD(resources, gameObjectAction, state);
    case ArmdozerIds.NEO_LANDOZER:
      return playerNeoLandozerHUD(resources, gameObjectAction, state);
    case ArmdozerIds.LIGHTNING_DOZER:
      return playerLightningDozerHUD(resources, gameObjectAction, state);
    case ArmdozerIds.WING_DOZER:
      return playerWingDozerHUD(resources, gameObjectAction, state);
    case ArmdozerIds.GENESIS_BRAVER:
      return playerGenesisBraverHUD(resources, gameObjectAction, state);
    default:
      return new EmptyHUDArmdozer(state);
  }
}

/**
 * 敵側 HUDアームドーザ
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー状態
 * @return HUDアームドーザ
 */
export function enemyArmdozerHUD(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
  state: Player,
): HUDArmdozerObjects {
  switch (state.armdozer.id) {
    case ArmdozerIds.SHIN_BRAVER:
      return enemyShinBraverHUD(resources, gameObjectAction, state);
    case ArmdozerIds.NEO_LANDOZER:
      return enemyNeoLandozerHUD(resources, gameObjectAction, state);
    case ArmdozerIds.LIGHTNING_DOZER:
      return enemyLightningDozerHUD(resources, gameObjectAction, state);
    case ArmdozerIds.WING_DOZER:
      return enemyWingDozerHUD(resources, gameObjectAction, state);
    case ArmdozerIds.GENESIS_BRAVER:
      return enemyGenesisBraverHUD(resources, gameObjectAction, state);
    default:
      return new EmptyHUDArmdozer(state);
  }
}
