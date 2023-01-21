import { ArmDozerId } from "gbraver-burst-core";

import {
  DevelopingPlayableArmdozers,
  PlayableArmdozers,
} from "../../dom-scenes/player-select/playable-amdozers";
import { GameProps } from "../game-props";

/**
 * プレイアブルアームドーザを取得するヘルパー関数
 * @param props ゲームプロパティ
 * @return 取得結果
 */
export function getPlayableArmdozers(props: Readonly<GameProps>): ArmDozerId[] {
  return props.canPlayDevelopingArmdozer
    ? DevelopingPlayableArmdozers
    : PlayableArmdozers;
}
