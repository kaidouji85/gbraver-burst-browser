import { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { ArmdozerIcon } from "./armdozer-icon";
import { SimpleArmdozerIcon } from "./simple-armdozer-icon";

/**
 * ウィングドーザアイコンを生成する
 * @param resources リソース管理オブジェクト
 * @return ウィングドーザアイコン
 */
export const createWingDozerIcon = (resources: Resources): ArmdozerIcon =>
  new SimpleArmdozerIcon({
    resources,
    size: 280,
    x: -20,
    y: 120,
    textureId: TEXTURE_IDS.WING_DOZER_BURST_BUTTON_ICON,
  });
