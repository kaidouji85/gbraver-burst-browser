import { Observable } from "rxjs";

import type { Resources } from "../../resource";
import type { GameObjectAction } from "../action/game-object-action";
import { BurstButton } from "./burst-button";
import { GenesisBraverIcon } from "./view/genesis-braver-icon";
import { LightningDozerIcon } from "./view/lightning-dozer-icon";
import { NeoLandozerIcon } from "./view/neo-landozer-icon";
import { ShinBraverIcon } from "./view/shin-braver-icon";
import { WingDozerIcon } from "./view/wing-dozer-icon";

/**
 * シンブレイバー バーストボタンを生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return バーストボタン
 */
export function shinBraverBurstButton(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): BurstButton {
  const armdozerIcon = new ShinBraverIcon(resources);
  return new BurstButton(resources, gameObjectAction, armdozerIcon);
}

/**
 * ネオランドーザ バーストボタンを生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return バーストボタン
 */
export function neoLandozerBurstButton(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): BurstButton {
  const armdozerIcon = new NeoLandozerIcon(resources);
  return new BurstButton(resources, gameObjectAction, armdozerIcon);
}

/**
 * ライトニングドーザ バーストボタンを生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return バーストボタン
 */
export function lightningDozerBurstButton(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): BurstButton {
  const armdozerIcon = new LightningDozerIcon(resources);
  return new BurstButton(resources, gameObjectAction, armdozerIcon);
}

/**
 * ウィングドーザ バーストボタンを生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return バーストボタン
 */
export function wingDozerBurstButton(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): BurstButton {
  const armdozerIcon = new WingDozerIcon(resources);
  return new BurstButton(resources, gameObjectAction, armdozerIcon);
}

/**
 * ジェネシスブレイバー バーストボタンを生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return バーストボタン
 */
export function genesisBraverBurstButton(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): BurstButton {
  const armdozerIcon = new GenesisBraverIcon(resources);
  return new BurstButton(resources, gameObjectAction, armdozerIcon);
}
