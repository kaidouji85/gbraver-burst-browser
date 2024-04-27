import { v4 as uuidV4 } from "uuid";

/**
 * 動的HTML要素用のユニークIDを生成する
 *
 * @returns ユニークID
 */
export function domUuid(): string {
  return uuidV4();
}
