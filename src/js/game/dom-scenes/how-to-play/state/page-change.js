// @flow

import type {HowToPlayState} from "./how-to-play-state";

/**
 * 表示するページを変更する
 *
 * @param state 変更前のステート
 * @param difference ページの変化量
 * @return 変更後のステート
 */
export function pageChange(state: HowToPlayState, difference: number): HowToPlayState {
    return {
    ...state,
    page: updatePage(state.page, difference, state.maxPage)
  };
}

/**
 * 変更後のページ数を計算する
 *
 * @param origin 変更前のページ数
 * @param difference ページの変化量
 * @param maxPage 最大ページ数
 * @return 変更後のページ数
 */
export function updatePage(origin: number, difference: number, maxPage: number): number {
  const updated = origin + difference;
  if (updated < 1) {
    return 1;
  } else if (maxPage < updated) {
    return maxPage;
  }

  return updated;
}