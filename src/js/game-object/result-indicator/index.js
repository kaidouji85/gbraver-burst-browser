// @flow
import {ResultIndicator} from "./result-indicator";
import type {Resources} from "../../resource";
import {WinIndicatorView} from "./view/win-indicator-view";
import {LoseIndicatorView} from "./view/lose-indicator-view";

/**
 * WINインジケータを生成する
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function winIndicator(resources: Resources): ResultIndicator {
  const view = new WinIndicatorView(resources);
  return new ResultIndicator(view);
}

/**
 * LOSEインジケータを生成する
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function loseIndicator(resources: Resources): ResultIndicator {
  const view = new LoseIndicatorView(resources);
  return new ResultIndicator(view);
}