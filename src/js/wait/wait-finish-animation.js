// @flow

/**
 * アニメーションが完了するまで待機する
 *
 * @param animation アニメーション
 * @return アニメーションPromise
 */
export function waitFinishAnimation(animation: Animation): Promise<void> {
  return new Promise(resolve => {
    animation.onfinish = () => {
      resolve();
    }
  });
}