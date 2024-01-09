import { ArmdozerId, ArmdozerIds } from "gbraver-burst-core";

import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT_CLASS } from "./class-name";

/** アームドーザ画像設定 */
export type ArmdozerPictureConfig = {
  /** 立ち絵 */
  standPath: {
    /** 画像パス */
    path: string;
    /** class属性 */
    className: string;
  };
  /** バストショット */
  bustShotPath: {
    /** 画像パス */
    path: string;
    /** class属性 */
    className: string;
  };
};

/**
 * シンブレイバー画像設定を生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
const shinBraver = (resources: Resources): ArmdozerPictureConfig => ({
  standPath: {
    path:
      resources.paths.find((v) => v.id === PathIds.SHIN_BRAVER_STAND)?.path ??
      "",
    className: `${ROOT_CLASS}__shin-braver-stand`,
  },
  bustShotPath: {
    path:
      resources.paths.find((v) => v.id === PathIds.SHIN_BRAVER_BUST_SHOT)
        ?.path ?? "",
    className: `${ROOT_CLASS}__shin-braver-bust-shot`,
  },
});

/**
 * ジェネシスブレイバー画像設定を生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
const genesisBraver = (resources: Resources): ArmdozerPictureConfig => ({
  standPath: {
    path:
      resources.paths.find((v) => v.id === PathIds.GENESIS_BRAVER_STAND)
        ?.path ?? "",
    className: `${ROOT_CLASS}__genesis-braver-stand`,
  },
  bustShotPath: {
    path:
      resources.paths.find((v) => v.id === PathIds.GENESIS_BRAVER_BUST_SHOT)
        ?.path ?? "",
    className: `${ROOT_CLASS}__genesis-braver-bust-shot`,
  },
});

/**
 * アームドーザIDに応じた画像設定を生成する
 * @param resources リソース管理オブジェクト
 * @param armdozerId アームドーザID
 * @return 生成結果
 */
export function createArmdozerPictureConfig(
  resources: Resources,
  armdozerId: ArmdozerId,
): ArmdozerPictureConfig {
  switch (armdozerId) {
    case ArmdozerIds.SHIN_BRAVER:
      return shinBraver(resources);
    case ArmdozerIds.GENESIS_BRAVER:
      return genesisBraver(resources);
    default:
      return shinBraver(resources);
  }
}
