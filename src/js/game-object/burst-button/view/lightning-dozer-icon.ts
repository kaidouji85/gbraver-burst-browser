import { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { ArmdozerIcon } from "./armdozer-icon";
import { SimpleArmdozerIcon } from "./simple-armdozer-icon";

/**
 * ライトニングドーザアイコンを生成する
 * @param resources リソース管理オブジェクト
 * @returns ライトニングドーザアイコン
 */
export const createLightningDozerIcon = (resources: Resources): ArmdozerIcon =>
  new SimpleArmdozerIcon({
    resources,
    size: 420,
    x: -15,
    y: 200,
    textureId: TEXTURE_IDS.LIGHTNING_DOZER_BURST_BUTTON_ICON,
  });
