import { Resources } from "../../../../resource";
import { PathIds } from "../../../../resource/path/ids";
import { ROOT_CLASS } from "../class-name";
import { ArmdozerPictureConfig } from "./armdozer-picture-config";

/**
 * ウィングドーザ画像設定を生成する
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export const wingDozer = (resources: Resources): ArmdozerPictureConfig => ({
  stand: {
    path:
      resources.paths.find((v) => v.id === PathIds.WING_DOZER_STAND)?.path ??
      "",
    className: `${ROOT_CLASS}__wing-dozer-stand`,
  },
  bustShot: {
    path:
      resources.paths.find((v) => v.id === PathIds.WING_DOZER_BUST_SHOT)
        ?.path ?? "",
    className: `${ROOT_CLASS}__wing-dozer-bust-shot`,
  },
});
