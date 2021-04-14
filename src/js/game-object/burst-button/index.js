// @flow

import type {Resources} from "../../resource";
import type {Stream} from "../../stream/core";
import type {GameObjectAction} from "../action/game-object-action";
import {BurstButton} from "./burst-button";
import {ArmDozerIdList} from "gbraver-burst-core/lib/master/armdozers";

/**
 * シンブレイバー バーストボタンを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return バーストボタン
 */
export function shinBraverBurstButton(resources: Resources, listener: Stream<GameObjectAction>): BurstButton {
  return new BurstButton({
    resources: resources,
    listener: listener,
    armDozerId: ArmDozerIdList.SHIN_BRAVER,
  });
}

/**
 * ネオランドーザ バーストボタンを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return バーストボタン
 */
export function neoLandozerDozerBurstButton(resources: Resources, listener: Stream<GameObjectAction>): BurstButton {
  return new BurstButton({
    resources: resources,
    listener: listener,
    armDozerId: ArmDozerIdList.NEO_LANDOZER,
  });
}

/**
 * ライトニングドーザ バーストボタンを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return バーストボタン
 */
export function lightningDozerBurstButton(resources: Resources, listener: Stream<GameObjectAction>): BurstButton {
  return new BurstButton({
    resources: resources,
    listener: listener,
    armDozerId: ArmDozerIdList.LIGHTNING_DOZER,
  });
}

/**
 * ウィングドーザ バーストボタンを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return バーストボタン
 */
export function wingDozerBurstButton(resources: Resources, listener: Stream<GameObjectAction>): BurstButton {
  return new BurstButton({
    resources: resources,
    listener: listener,
    armDozerId: ArmDozerIdList.WING_DOZER,
  });
}