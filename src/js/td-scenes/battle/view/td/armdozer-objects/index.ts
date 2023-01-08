import type { Player } from "gbraver-burst-core";
import { ArmDozerIds } from "gbraver-burst-core";

import type { GameObjectAction } from "../../../../../game-object/action/game-object-action";
import type { Resources } from "../../../../../resource";
import type { Stream } from "../../../../../stream/stream";
import type { TDArmdozerObjects } from "./armdozer-objects";
import { enemyGenesisBraverTD, playerGenesisBraverTD } from "./genesis-braver";
import {
  enemyLightningDozerTD,
  playerLightningDozerTD,
} from "./lightning-dozer";
import { enemyNeoLandozerTD, playerNeoLandozerTD } from "./neo-landozer";
import { enemyShinBraverTD, playerShinBraverTD } from "./shin-braver";
import { enemyWingDozerTD, playerWingDozerTD } from "./wing-dozer";

/**
 * プレイヤー側  3Dレイヤー アームドーザ固有オブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤーの状態
 * @return 生成結果
 */
export function playerTDArmdozer(
  resources: Resources,
  gameObjectAction: Stream<GameObjectAction>,
  state: Player
): TDArmdozerObjects {
  switch (state.armdozer.id) {
    case ArmDozerIds.SHIN_BRAVER:
      return playerShinBraverTD(resources, gameObjectAction, state);

    case ArmDozerIds.LIGHTNING_DOZER:
      return playerLightningDozerTD(resources, gameObjectAction, state);

    case ArmDozerIds.WING_DOZER:
      return playerWingDozerTD(resources, gameObjectAction, state);

    case ArmDozerIds.NEO_LANDOZER:
      return playerNeoLandozerTD(resources, gameObjectAction, state);

    case ArmDozerIds.GENESIS_BRAVER:
      return playerGenesisBraverTD(resources, gameObjectAction, state);

    default:
      return playerShinBraverTD(resources, gameObjectAction, state);
  }
}

/**
 * 敵側  3Dレイヤー アームドーザ固有オブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤーの状態
 * @return 生成結果
 */
export function enemyTDArmdozer(
  resources: Resources,
  gameObjectAction: Stream<GameObjectAction>,
  state: Player
): TDArmdozerObjects {
  switch (state.armdozer.id) {
    case ArmDozerIds.SHIN_BRAVER:
      return enemyShinBraverTD(resources, gameObjectAction, state);

    case ArmDozerIds.LIGHTNING_DOZER:
      return enemyLightningDozerTD(resources, gameObjectAction, state);

    case ArmDozerIds.WING_DOZER:
      return enemyWingDozerTD(resources, gameObjectAction, state);

    case ArmDozerIds.NEO_LANDOZER:
      return enemyNeoLandozerTD(resources, gameObjectAction, state);

    case ArmDozerIds.GENESIS_BRAVER:
      return enemyGenesisBraverTD(resources, gameObjectAction, state);

    default:
      return enemyShinBraverTD(resources, gameObjectAction, state);
  }
}
