// @flow

/**
 * webpackのビルドモード
 */
export const MODE = process.env.NODE_ENV;

/**
 * webpackがdevelopmentモードでビルドされたか否かを判定する
 *
 * @return 判定結果、trueでdevelopmentモードでビルドされた
 */
export function isDevelopment (): boolean {
  return MODE === 'development';
}