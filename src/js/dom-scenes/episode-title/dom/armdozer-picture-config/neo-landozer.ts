import { Resources } from "../../../../resource";
import { PathIds } from "../../../../resource/path/ids";
import { ROOT_CLASS } from "../class-name";
import { ArmdozerPictureConfig } from "./armdozer-picture-config";

/**
 * ネオランドーザ画像設定を生成する
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export const neoLandozer = (resources: Resources): ArmdozerPictureConfig => ({
  stand: {
    path:
      resources.paths.find((v) => v.id === PathIds.NEO_LANDOZER_STAND)?.path ??
      "",
    className: `${ROOT_CLASS}__neo-landozer-stand`,
  },
  bustShot: {
    path:
      resources.paths.find((v) => v.id === PathIds.NEO_LANDOZER_BUST_SHOT)
        ?.path ?? "",
    className: `${ROOT_CLASS}__neo-landozer-bust-shot`,
  },
});
