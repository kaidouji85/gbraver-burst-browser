// @flow

import type {Player} from "gbraver-burst-core";
import {ArmDozerIdList} from "gbraver-burst-core";
import type {Resources} from "../../../../../../resource";
import {enemyShinBraverHUD, playerShinBraverHUD} from "./shin-braver";
import {EmptyHUDArmdozer} from "./empty";
import {enemyNeoLandozerHUD, playerNeoLandozerHUD} from "./neo-landozer";
import {enemyLightningDozerHUD, playerLightningDozerHUD} from "./lightning-dozer";
import {enemyWingDozerHUD, playerWingDozerHUD} from "./wing-dozer";
import type {HUDArmdozerObjects} from "./hud-armdozer-ibjects";
import type {GameObjectAction} from "../../../../../../game-object/action/game-object-action";
import type {Stream} from "../../../../../../stream/core";

/**
 * プレイヤー側 HUDアームドーザ
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤー状態
 * @return HUDアームドーザ
 */
export function playerArmdozerHUD(resources: Resources, gameObjectAction: Stream<GameObjectAction>, state: Player): HUDArmdozerObjects {
  switch (state.armdozer.id) {
    case ArmDozerIdList.SHIN_BRAVER:
      return playerShinBraverHUD(resources, gameObjectAction, state);
    case ArmDozerIdList.NEO_LANDOZER:
      return playerNeoLandozerHUD(resources, gameObjectAction, state);
    case ArmDozerIdList.LIGHTNING_DOZER:
      return playerLightningDozerHUD(resources, gameObjectAction, state);
    case ArmDozerIdList.WING_DOZER:
      return playerWingDozerHUD(resources, gameObjectAction, state);
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
export function enemyArmdozerHUD(resources: Resources, gameObjectAction: Stream<GameObjectAction>, state: Player): HUDArmdozerObjects {
  switch (state.armdozer.id) {
    case ArmDozerIdList.SHIN_BRAVER:
      return enemyShinBraverHUD(resources, gameObjectAction, state);
    case ArmDozerIdList.NEO_LANDOZER:
      return enemyNeoLandozerHUD(resources, gameObjectAction, state);
    case ArmDozerIdList.LIGHTNING_DOZER:
      return enemyLightningDozerHUD(resources, gameObjectAction, state);
    case ArmDozerIdList.WING_DOZER:
      return enemyWingDozerHUD(resources, gameObjectAction, state);
    default:
      return new EmptyHUDArmdozer(state);
  }
}