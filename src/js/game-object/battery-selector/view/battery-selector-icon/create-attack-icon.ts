import { ArmdozerId, ArmdozerIds } from "gbraver-burst-core";

import { ResourcesContainer } from "../../../../resource";
import { BatterySelectorIcon } from "./battery-selector-icon";
import { genesisBraverAttackIcon } from "./genesis-braver-attack-icon";
import { neoLandozerAttackIcon } from "./neo-landozer-attack-icon";
import { shinBraverAttackIcon } from "./shin-braver-attack-icon";
import { wingDozerAttackIcon } from "./wing-dozer-attack-icon";

/**
 * アームドーザに応じた攻撃アイコンを生成する
 * @param options オプション
 * @returns 生成結果、生成できない場合はnull
 */
export const createAttackIcon = (
  options: ResourcesContainer & {
    armdozerId: ArmdozerId;
  },
): BatterySelectorIcon | null => {
  const { armdozerId, resources } = options;
  switch (armdozerId) {
    case ArmdozerIds.SHIN_BRAVER:
      return shinBraverAttackIcon(resources);
    case ArmdozerIds.WING_DOZER:
      return wingDozerAttackIcon(resources);
    case ArmdozerIds.NEO_LANDOZER:
      return neoLandozerAttackIcon(resources);  
    case ArmdozerIds.GENESIS_BRAVER:
      return genesisBraverAttackIcon(resources);  
    default:
      return null;
  }
};
