import type { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import type { ArmdozerIcon } from "./armdozer-icon";
import { SimpleArmdozerIcon } from "./simple-armdozer-icon";

/**
 * ネオランドーザアイコンを生成する
 * @param resources リソース管理オブジェクト
 * @returns ネオランドーザアイコン
 */
export const createNeoLandozerIcon = (resources: Resources): ArmdozerIcon =>
  new SimpleArmdozerIcon({
    resources,
    size: 350,
    x: 0,
    y: 160,
    textureId: TEXTURE_IDS.NEO_LANDOZER_BURST_BUTTON_ICON,
  });
