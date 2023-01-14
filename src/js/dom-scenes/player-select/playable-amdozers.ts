import {ArmDozerId, ArmDozerIds} from "gbraver-burst-core";

/** プレイアブルアームドーザ */
export const PlayableArmdozers: ArmDozerId[] = [
  ArmDozerIds.SHIN_BRAVER,
  ArmDozerIds.WING_DOZER,
  ArmDozerIds.NEO_LANDOZER,
  ArmDozerIds.LIGHTNING_DOZER,
];

/** 開発中も含めたプレイアブルアームドーザ */
export const DevelopingPlayableArmdozers: ArmDozerId[] = [
  ...PlayableArmdozers,
  ArmDozerIds.GENESIS_BRAVER,
]