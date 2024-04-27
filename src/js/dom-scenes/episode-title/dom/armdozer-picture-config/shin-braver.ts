import { Resources } from "../../../../resource";
import { PathIds } from "../../../../resource/path/ids";
import { ROOT_CLASS } from "../class-name";
import { ArmdozerPictureConfig } from "./armdozer-picture-config";

/**
 * シンブレイバー画像設定を生成する
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export const shinBraver = (resources: Resources): ArmdozerPictureConfig => ({
  stand: {
    path:
      resources.paths.find((v) => v.id === PathIds.SHIN_BRAVER_STAND)?.path ??
      "",
    className: `${ROOT_CLASS}__shin-braver-stand`,
  },
  bustShot: {
    path:
      resources.paths.find((v) => v.id === PathIds.SHIN_BRAVER_BUST_SHOT)
        ?.path ?? "",
    className: `${ROOT_CLASS}__shin-braver-bust-shot`,
  },
});
