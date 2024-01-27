import { Resources } from "../../../../resource";
import { PathIds } from "../../../../resource/path/ids";
import { ROOT_CLASS } from "../class-name";
import { ArmdozerPictureConfig } from "./armdozer-picture-config";

/**
 * ジェネシスブレイバー画像設定を生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export const genesisBraver = (resources: Resources): ArmdozerPictureConfig => ({
  stand: {
    path:
      resources.paths.find((v) => v.id === PathIds.GENESIS_BRAVER_STAND)
        ?.path ?? "",
    className: `${ROOT_CLASS}__genesis-braver-stand`,
  },
  bustShot: {
    path:
      resources.paths.find((v) => v.id === PathIds.GENESIS_BRAVER_BUST_SHOT)
        ?.path ?? "",
    className: `${ROOT_CLASS}__genesis-braver-bust-shot`,
  },
});
