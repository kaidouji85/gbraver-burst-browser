// @flow

/**
 * webpackがproductionモードでビルドされたか否かを判定する
 *
 * @return 判定結果、trueでproductionモードでビルドされた
 */
export function mode(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * webpackがdevelopmentモードでビルドされたか否かを判定する
 *
 * @return 判定結果、trueでdevelopmentモードでビルドされた
 */
export function isDevelopment (): boolean {
  return process.env.NODE_ENV === 'development';
}