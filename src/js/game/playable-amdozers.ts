import { ArmdozerId, ArmdozerIds } from "gbraver-burst-core";

import { GameProps } from "./game-props";

/** プレイアブルアームドーザ */
export const PlayableArmdozers: ArmdozerId[] = [
  ArmdozerIds.SHIN_BRAVER,
  ArmdozerIds.WING_DOZER,
  ArmdozerIds.NEO_LANDOZER,
  ArmdozerIds.LIGHTNING_DOZER,
  ArmdozerIds.GENESIS_BRAVER,
];

/** 開発中も含めたプレイアブルアームドーザ */
export const DevelopingPlayableArmdozers: ArmdozerId[] = [
  ...PlayableArmdozers,
  ArmdozerIds.GRAN_DOZER,
];

/**
 * プレイアブルアームドーザを取得するヘルパー関数
 * @param props ゲームプロパティ
 * @returns 取得結果
 */
export function getPlayableArmdozers(props: Readonly<GameProps>): ArmdozerId[] {
  return props.canPlayDevelopingArmdozer
    ? DevelopingPlayableArmdozers
    : PlayableArmdozers;
}
