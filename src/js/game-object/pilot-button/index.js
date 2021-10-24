// @flow

import {PilotButton} from "./pilot-button";
import type {Resources} from "../../resource";
import type {Stream} from "../../stream/core";
import type {GameObjectAction} from "../action/game-object-action";
import {ShinyaIcon} from "./view/shinya";
import {GaiIcon} from "./view/gai";
import {RaitoIcon} from "./view/raito";
import {TsubasaIcon} from "./view/tsubasa";

/**
 * シンヤ パイロットボタン を生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return パイロットボタン
 */
export function shinyaPilotButton(resources: Resources, gameObjectAction: Stream<GameObjectAction>): PilotButton {
  const icon = new ShinyaIcon(resources);
  return new PilotButton(resources, icon, gameObjectAction);
}

/**
 * ガイ パイロットボタン を生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return パイロットボタン
 */
export function gaiPilotButton(resources: Resources, gameObjectAction: Stream<GameObjectAction>): PilotButton {
  const icon = new GaiIcon(resources);
  return new PilotButton(resources, icon, gameObjectAction);
}

/**
 * ライト パイロットボタン を生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return パイロットボタン
 */
export function raitoPilotButton(resources: Resources, gameObjectAction: Stream<GameObjectAction>): PilotButton {
  const icon = new RaitoIcon(resources);
  return new PilotButton(resources, icon, gameObjectAction);
}

/**
 * ツバサ パイロットボタン を生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return パイロットボタン
 */
export function tsubasaPilotButton(resources: Resources, gameObjectAction: Stream<GameObjectAction>): PilotButton {
  const icon = new TsubasaIcon(resources);
  return new PilotButton(resources, icon, gameObjectAction);
}