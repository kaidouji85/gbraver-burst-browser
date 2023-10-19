import { domUuid } from "../../../uuid/dom-uuid";

/** data-idをまとめたもの */
export type DataIDs = {
  /** キャプション */
  caption: string;
  /** アームドーザアイコン */
  armdozerIcon: string;
};

/**
 * DataIDsを生成する
 * @return 生成結果
 */
export function createDataIDs(): DataIDs {
  return {
    caption: domUuid(),
    armdozerIcon: domUuid(),
  };
}
