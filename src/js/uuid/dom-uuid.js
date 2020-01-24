// @flow
const uuidV4 = require('uuid/v4');

/**
 * 動的HTML要素用のユニークIDを生成する
 *
 * @return ユニークID
 */
export function domUuid(): string {
  return uuidV4();
}