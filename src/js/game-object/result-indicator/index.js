// @flow
import {ResultIndicator} from "./result-indicator";
import type {Resources} from "../../resource";
import {WinIndicatorView} from "./view/win-indicator-view";
import {LoseIndicatorView} from "./view/lose-indicator-view";
import type {Stream} from "../../stream/core";
import type {GameObjectAction} from "../action/game-object-action";

/**
 * WINインジケータを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function winIndicator(resources: Resources, gameObjectAction: Stream<GameObjectAction>): ResultIndicator {
  const view = new WinIndicatorView(resources);
  return new ResultIndicator(view, gameObjectAction);
}

/**
 * LOSEインジケータを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function loseIndicator(resources: Resources, gameObjectAction: Stream<GameObjectAction>): ResultIndicator {
  const view = new LoseIndicatorView(resources);
  return new ResultIndicator(view, gameObjectAction);
}