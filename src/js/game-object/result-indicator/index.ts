import { Observable } from "rxjs";

import type { Resources } from "../../resource";
import type { GameObjectAction } from "../action/game-object-action";
import { ResultIndicator } from "./result-indicator";
import { drawIndicatorView } from "./view/draw-indicator-view";
import { loseIndicatorView } from "./view/lose-indicator-view";
import { winIndicatorView } from "./view/win-indicator-view";

/**
 * WINインジケータを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @returns 生成結果
 */
export function winIndicator(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): ResultIndicator {
  const view = winIndicatorView(resources);
  return new ResultIndicator(view, gameObjectAction);
}

/**
 * LOSEインジケータを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @returns 生成結果
 */
export function loseIndicator(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): ResultIndicator {
  const view = loseIndicatorView(resources);
  return new ResultIndicator(view, gameObjectAction);
}

/**
 * DRAWインジケータを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @returns 生成結果
 */
export function drawIndicator(
  resources: Resources,
  gameObjectAction: Observable<GameObjectAction>,
): ResultIndicator {
  const view = drawIndicatorView(resources);
  return new ResultIndicator(view, gameObjectAction);
}
