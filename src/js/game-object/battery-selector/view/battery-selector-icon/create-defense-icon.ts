import { ArmdozerId, ArmdozerIds } from "gbraver-burst-core";

import { ResourcesContainer } from "../../../../resource";
import { BatterySelectorIcon } from "./battery-selector-icon";
import { genesisBraverDefenseIcon } from "./genesis-braver-defense-icon";
import { shinBraverDefenseIcon } from "./shin-braver-defense-icon";

/**
 * アームドーザに応じた防御アイコンを生成する
 * @param options オプション
 * @returns 生成結果、生成できない場合はnull
 */
export const createDefenseIcon = (
  options: ResourcesContainer & {
    armdozerId: ArmdozerId;
  },
): BatterySelectorIcon | null => {
  const { armdozerId, resources } = options;
  switch (armdozerId) {
    case ArmdozerIds.SHIN_BRAVER:
      return shinBraverDefenseIcon(resources);
    case ArmdozerIds.GENESIS_BRAVER:
      return genesisBraverDefenseIcon(resources);
    default:
      return null;
  }
};
