// @flow

import type {LoadingModel} from "./loading-model";

/**
 * サービスワーカー更新検知に応じて、ローディング画面の状態を更新する
 *
 * @param model 更新前kousinnmae
 * @return 更新結果
 */
export function serviceWorkerWillUpdate(model: LoadingModel): LoadingModel {
  return {
    ...model,
    caption: {
      isVisible: true,
      value: 'サービスワーカーが更新されました。ゲームを開いているタブを全て閉じてから、再度ページを開いてください。'
    }
  };
}