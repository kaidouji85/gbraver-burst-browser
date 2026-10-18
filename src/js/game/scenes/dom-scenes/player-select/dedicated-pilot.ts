import { ArmdozerId, ArmdozerIds, PilotId, PilotIds } from "gbraver-burst-core";

/**
 * アームドーザの専用パイロットを取得する
 * @param armdozerId アームドーザ
 * @returns 専用パイロット
 */
export function getDedicatedPilot(armdozerId: ArmdozerId): PilotId {
  switch (armdozerId) {
    case ArmdozerIds.SHIN_BRAVER:
      return PilotIds.SHINYA;
    case ArmdozerIds.NEO_LANDOZER:
      return PilotIds.GAI;
    case ArmdozerIds.LIGHTNING_DOZER:
      return PilotIds.RAITO;
    case ArmdozerIds.WING_DOZER:
      return PilotIds.TSUBASA;
    case ArmdozerIds.GENESIS_BRAVER:
      return PilotIds.YUUYA;
    case ArmdozerIds.GRAN_DOZER:
      return PilotIds.RAITO;
    default:
      return PilotIds.SHINYA;
  }
}
