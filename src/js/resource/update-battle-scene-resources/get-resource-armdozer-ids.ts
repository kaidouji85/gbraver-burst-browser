import { ArmdozerId } from "gbraver-burst-core";

import { ResourceType } from "../resource-type";

/**
 * リソース管理オブジェクトからアームドーザIDを抽出する
 * @param resourceTypes
 */
export const getResourceArmdozerIds = (
  resourceTypes: ResourceType[],
): ArmdozerId[] => [
  ...new Set(
    resourceTypes
      .filter((t) => t.type === "DynamicArmdozer")
      .map((v) => v.armdozerId),
  ),
];
