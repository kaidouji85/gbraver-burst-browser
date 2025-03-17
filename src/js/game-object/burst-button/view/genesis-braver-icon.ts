import { Resources } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { ArmdozerIcon } from "./armdozer-icon";
import { SimpleArmdozerIcon } from "./simple-armdozer-icon";

/**
 * ジェネシスブレイバーアイコンを生成する
 * @param resources リソース管理オブジェクト
 * @returns ジェネシスブレイバーアイコン
 */
export const createGenesisBraverIcon = (resources: Resources): ArmdozerIcon =>
  new SimpleArmdozerIcon({
    resources,
    size: 350,
    x: 0,
    y: 160,
    textureId: TEXTURE_IDS.GENESIS_BRAVER_BURST_ICON,
  });
