import type { PlayerId } from "gbraver-burst-core";
import { v4 as uuidV4 } from "uuid";

/**
 * ユニークなプレイヤーIDを生成する
 *
 * @returns 生成したプレイヤーID
 */
export function playerUuid(): PlayerId {
  return uuidV4();
}
