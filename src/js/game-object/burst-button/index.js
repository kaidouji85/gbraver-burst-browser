// @flow

import type {Resources} from "../../resource";
import type {Stream} from "../../stream/core";
import type {GameObjectAction} from "../action/game-object-action";
import {BurstButton} from "./burst-button";
import {ShinBraverIcon} from "./view/shin-braver-icon";
import {NeoLandozerIcon} from "./view/neo-landozer-icon";
import {LightningDozerIcon} from "./view/lightning-dozer-icon";
import {WingDozerIcon} from "./view/wing-dozer-icon";

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
    armdozerIcon: new ShinBraverIcon(resources),
  });
}

/**
 * ネオランドーザ バーストボタンを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return バーストボタン
 */
export function neoLandozerBurstButton(resources: Resources, listener: Stream<GameObjectAction>): BurstButton {
  return new BurstButton({
    resources: resources,
    listener: listener,
    armdozerIcon: new NeoLandozerIcon(resources),
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
    armdozerIcon: new LightningDozerIcon(resources),
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
    armdozerIcon: new WingDozerIcon(resources),
  });
}