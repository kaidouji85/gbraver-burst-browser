// @flow
import {ResultIndicator} from "./result-indicator";
import type {Resources} from "../../resource";
import {winIndicatorView} from "./view/win-indicator-view";
import {loseIndicatorView} from "./view/lose-indicator-view";
import type {Stream} from "../../stream/core";
import type {GameObjectAction} from "../action/game-object-action";
import {drawIndicatorView} from "./view/draw-indicator-view";

/**
 * WINインジケータを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function winIndicator(resources: Resources, gameObjectAction: Stream<GameObjectAction>): ResultIndicator {
  const view = winIndicatorView(resources);
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
  const view = loseIndicatorView(resources);
  return new ResultIndicator(view, gameObjectAction);
}

/**
 * DRAWインジケータを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return 生成結果
 */
export function drawIndicator(resources: Resources, gameObjectAction: Stream<GameObjectAction>): ResultIndicator {
  const view = drawIndicatorView(resources);
  return new ResultIndicator(view, gameObjectAction);
}