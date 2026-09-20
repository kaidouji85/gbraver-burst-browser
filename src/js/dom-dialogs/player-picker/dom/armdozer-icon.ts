import { ArmdozerId } from "gbraver-burst-core";

import { getArmdozerIconPathId } from "../../../path/armdozer-icon-path";
import { ResourcesContainer } from "../../../resource";
import { ARMDOZER_ICON } from "./class-name";

/**
 * アームドーザアイコンを生成する
 * @param options オプション
 * @param options.armdozerId アームドーザID
 * @returns アームドーザアイコン
 */
export const armdozerIcon = (
  options: ResourcesContainer & { armdozerId: ArmdozerId },
): HTMLImageElement => {
  const { resources, armdozerId } = options;
  const armdozerIconPathId = getArmdozerIconPathId(armdozerId);
  const path =
    resources.paths.find((p) => p.id === armdozerIconPathId)?.path ?? "";

  const dom = document.createElement("img");
  dom.className = ARMDOZER_ICON;
  dom.src = path;
  return dom;
};
