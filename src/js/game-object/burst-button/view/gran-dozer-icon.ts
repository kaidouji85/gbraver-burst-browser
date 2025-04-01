import { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { ArmdozerIcon } from "./armdozer-icon";
import { SimpleArmdozerIcon } from "./simple-armdozer-icon";

/**
 * グランドーザアイコンを生成する
 * @param resources リソース管理オブジェクト
 * @returns グランドーザアイコン
 */
export const createGranDozerIcon = (resources: Resources): ArmdozerIcon =>
  new SimpleArmdozerIcon({
    resources,
    size: 460,
    x: 0,
    y: 210,
    textureId: TEXTURE_IDS.GRAN_DOZER_BURST_BUTTON_ICON,
  });
