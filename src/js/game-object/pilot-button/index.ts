import { Observable } from "rxjs";
import type { Resources } from "../../resource";
import type { GameObjectAction } from "../action/game-object-action";
import { PilotButton } from "./pilot-button";
import { GaiIcon } from "./view/gai";
import { RaitoIcon } from "./view/raito";
import { ShinyaIcon } from "./view/shinya";
import { TsubasaIcon } from "./view/tsubasa";

/**
 * シンヤ パイロットボタン を生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return パイロットボタン
 */
export function shinyaPilotButton(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>
): PilotButton {
  const icon = new ShinyaIcon(resources);
  return new PilotButton(resources, icon, gameObjectAction);
}

/**
 * ガイ パイロットボタン を生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return パイロットボタン
 */
export function gaiPilotButton(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>
): PilotButton {
  const icon = new GaiIcon(resources);
  return new PilotButton(resources, icon, gameObjectAction);
}

/**
 * ライト パイロットボタン を生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return パイロットボタン
 */
export function raitoPilotButton(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>
): PilotButton {
  const icon = new RaitoIcon(resources);
  return new PilotButton(resources, icon, gameObjectAction);
}

/**
 * ツバサ パイロットボタン を生成する
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return パイロットボタン
 */
export function tsubasaPilotButton(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>
): PilotButton {
  const icon = new TsubasaIcon(resources);
  return new PilotButton(resources, icon, gameObjectAction);
}
