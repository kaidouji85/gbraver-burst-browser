// @flow

import type {InProgress} from "./in-progress";

/** 通信エラーの後処理 */
export type PostNetworkError = 'GotoTitle' | 'Close';

/**
 * 現在進行中のフローから通信エラー後処理を決める
 *
 * @param inProgress 現在進行中のフロー
 * @return 通信エラーの後処理
 */
export function toPostNetworkError(inProgress: InProgress): PostNetworkError {
  if (inProgress.type === 'CasualMatch' && inProgress.subFlow.type === 'LoginCheck') {
    return 'Close';
  } else if (inProgress.type === 'CasualMatch' && inProgress.subFlow.type === 'Login') {
    return 'Close';
  } else {
    return 'GotoTitle';
  }
}