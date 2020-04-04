// @flow

import type {PlayerId} from "gbraver-burst-core/lib/player/player";
import {v4 as uuidV4} from "uuid";

/**
 * ユニークなプレイヤーIDを生成する
 *
 * @return 生成したプレイヤーID
 */
export function playerUuid(): PlayerId {
  return uuidV4();
}