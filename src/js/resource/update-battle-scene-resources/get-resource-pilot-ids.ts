import { PlayerId } from "gbraver-burst-core";

import { ResourceType } from "../resource-type";

/**
 * リソース管理オブジェクトからパイロットIDを抽出する
 * @param resourceTypes リソース管理オブジェクトから抽出したリソース種別一覧
 * @returns 抽出したパイロットID
 */
export const getResourcePilotIds = (
  resourceTypes: ResourceType[],
): PlayerId[] => [
  ...new Set(
    resourceTypes
      .filter((t) => t.type === "DynamicPilot")
      .map((v) => v.pilotId),
  ),
];
