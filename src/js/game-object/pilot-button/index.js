// @flow

import {PilotButton} from "./pilot-button";
import type {Resources} from "../../resource";
import type {Stream} from "../../stream/core";
import type {GameObjectAction} from "../action/game-object-action";
import {PilotIds} from "gbraver-burst-core/lib/master/pilots";

/**
 * シンヤ パイロットボタン を生成する
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return パイロットボタン
 */
export function shinyaPilotButton(resources: Resources, listener: Stream<GameObjectAction>): PilotButton {
  return new PilotButton(resources, PilotIds.SHINYA, listener);
}

/**
 * ガイ パイロットボタン を生成する
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return パイロットボタン
 */
export function gaiPilotButton(resources: Resources, listener: Stream<GameObjectAction>): PilotButton {
  return new PilotButton(resources, PilotIds.GAI, listener);
}

/**
 * ライト パイロットボタン を生成する
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return パイロットボタン
 */
export function raitoPilotButton(resources: Resources, listener: Stream<GameObjectAction>): PilotButton {
  return new PilotButton(resources, PilotIds.RAITO, listener);
}

/**
 * ツバサ パイロットボタン を生成する
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @return パイロットボタン
 */
export function tsubasaPilotButton(resources: Resources, listener: Stream<GameObjectAction>): PilotButton {
  return new PilotButton(resources, PilotIds.TSUBASA, listener);
}