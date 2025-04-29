import { ArmdozerId } from "gbraver-burst-core";

import { ResourceType } from "../resource-type";

/**
 * リソース管理オブジェクトからアームドーザIDを抽出する
 * @param resourceTypes リソース管理オブジェクトから抽出したリソース種別一覧
 * @returns 抽出したアームドーザID
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
