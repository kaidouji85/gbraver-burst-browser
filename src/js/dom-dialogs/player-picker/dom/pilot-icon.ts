import { PilotId } from "gbraver-burst-core";

import { getPilotIconPathId } from "../../../path/pilot-icon-path";
import { ResourcesContainer } from "../../../resource";
import { PILOT_ICON } from "./class-name";

/**
 * パイロットアイコンを生成する
 * @param options オプション
 * @param options.resources リソース管理オブジェクト
 * @param options.pilotId パイロットID
 * @returns パイロットアイコン
 */
export const pilotIcon = (
  options: ResourcesContainer & { pilotId: PilotId },
): HTMLImageElement => {
  const { resources, pilotId } = options;
  const pilotIconPathId = getPilotIconPathId(pilotId);
  const path =
    resources.paths.find((p) => p.id === pilotIconPathId)?.path ?? "";

  const dom = document.createElement("img");
  dom.className = PILOT_ICON;
  dom.src = path;
  return dom;
};
