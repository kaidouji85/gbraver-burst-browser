import { ArmdozerId, ArmdozerIds } from "gbraver-burst-core";

/** class属性のプレフィックス */
const CLASS_NAME_PREFIX = "armdozer-bust-shot";

/** アームドーザIDとバストショットclass属性のマッピング */
const ArmdozerBustShotClassNames: Record<ArmdozerId, string> = {
  [ArmdozerIds.SHIN_BRAVER]: `${CLASS_NAME_PREFIX}__shin-braver`,
  [ArmdozerIds.WING_DOZER]: `${CLASS_NAME_PREFIX}__wing-dozer`,
  [ArmdozerIds.NEO_LANDOZER]: `${CLASS_NAME_PREFIX}__neo-landozer`,
  [ArmdozerIds.LIGHTNING_DOZER]: `${CLASS_NAME_PREFIX}__lightning-dozer`,
  [ArmdozerIds.GENESIS_BRAVER]: `${CLASS_NAME_PREFIX}__genesis-braver`,
};

/**
 * アームドーザIDに対応するバストショットのclass属性を取得する
 * @param armdozerId アームドーザID
 * @return class属性
 */
export const getArmdozerBustShotClassName = (armdozerId: ArmdozerId): string =>
  ArmdozerBustShotClassNames[armdozerId] ??
  ArmdozerBustShotClassNames[ArmdozerIds.SHIN_BRAVER];
