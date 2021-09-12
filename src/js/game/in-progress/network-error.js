// @flow

import type {InProgress} from "./in-progress";

/** 通信エラーの後処理 */
export type PostNetworkError = 'GotoTitle' | 'Close';

/**
 * 現在進行中の状態に対応した、通信エラー後処理を返す
 *
 * @param inProgress 現在進行中のフロー
 * @return 通信エラーの後処理
 */
export function getPostNetworkError(inProgress: InProgress): PostNetworkError {
  if (inProgress.type === 'CasualMatch' && inProgress.subFlow.type === 'LoginCheck') {
    return 'Close';
  } else {
    return 'GotoTitle';
  }
}

/**
 * 通信エラー後処理の文言を返す
 * 
 * @param postNetworkError 通信エラー後処理
 * @return 文言
 */
export function postNetworkErrorLabel(postNetworkError: PostNetworkError): string {
  switch(postNetworkError) {
    case 'Close':
      return '閉じる';
    case 'GotoTitle':
    default:
      return 'タイトルへ';    
  }
}