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
 * @param listener イベントリスナ
 * @return パイロットボタン
 */
export function shinyaPilotButton(resources: Resources, listener: Stream<GameObjectAction>): PilotButton {
  const icon = new ShinyaIcon(resources);
  return new PilotButton(resources, icon, listener);
}

/**
 * ガイ パイロットボタン を生成する
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return パイロットボタン
 */
export function gaiPilotButton(resources: Resources, listener: Stream<GameObjectAction>): PilotButton {
  const icon = new GaiIcon(resources);
  return new PilotButton(resources, icon, listener);
}

/**
 * ライト パイロットボタン を生成する
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return パイロットボタン
 */
export function raitoPilotButton(resources: Resources, listener: Stream<GameObjectAction>): PilotButton {
  const icon = new RaitoIcon(resources);
  return new PilotButton(resources, icon, listener);
}

/**
 * ツバサ パイロットボタン を生成する
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return パイロットボタン
 */
export function tsubasaPilotButton(resources: Resources, listener: Stream<GameObjectAction>): PilotButton {
  const icon = new TsubasaIcon(resources);
  return new PilotButton(resources, icon, listener);
}