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
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return バーストボタン
 */
export function shinBraverBurstButton(resources: Resources, gameObjectAction: Stream<GameObjectAction>): BurstButton {
  const armdozerIcon = new ShinBraverIcon(resources);
  return new BurstButton(resources, gameObjectAction, armdozerIcon);
}

/**
 * ネオランドーザ バーストボタンを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return バーストボタン
 */
export function neoLandozerBurstButton(resources: Resources, gameObjectAction: Stream<GameObjectAction>): BurstButton {
  const armdozerIcon = new NeoLandozerIcon(resources)
  return new BurstButton(resources, gameObjectAction, armdozerIcon,);
}

/**
 * ライトニングドーザ バーストボタンを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return バーストボタン
 */
export function lightningDozerBurstButton(resources: Resources, gameObjectAction: Stream<GameObjectAction>): BurstButton {
  const armdozerIcon = new LightningDozerIcon(resources);
  return new BurstButton(resources, gameObjectAction, armdozerIcon);
}

/**
 * ウィングドーザ バーストボタンを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return バーストボタン
 */
export function wingDozerBurstButton(resources: Resources, gameObjectAction: Stream<GameObjectAction>): BurstButton {
  const armdozerIcon = new WingDozerIcon(resources);
  return new BurstButton(resources, gameObjectAction, armdozerIcon);
}