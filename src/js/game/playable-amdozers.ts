import { ArmDozerId, ArmDozerIds } from "gbraver-burst-core";

import { GameProps } from "./game-props";

/** プレイアブルアームドーザ */
export const PlayableArmdozers: ArmDozerId[] = [
  ArmDozerIds.SHIN_BRAVER,
  ArmDozerIds.WING_DOZER,
  ArmDozerIds.NEO_LANDOZER,
  ArmDozerIds.LIGHTNING_DOZER,
  ArmDozerIds.GENESIS_BRAVER,
];

/** 開発中も含めたプレイアブルアームドーザ */
export const DevelopingPlayableArmdozers: ArmDozerId[] = [...PlayableArmdozers];

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