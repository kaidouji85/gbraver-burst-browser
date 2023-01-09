import type { ArmDozerId } from "gbraver-burst-core";
import { ArmDozerIds } from "gbraver-burst-core";

import type { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path";
import { ArmdozerBustShot, CLASS_NAME_PREFIX } from "./amrodzer-bust-shot";

/**
 * アームドーザIDに対応したバストショットを生成する
 *
 * @param armdozerId アームドーザID
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createBustShot(
  armdozerId: ArmDozerId,
  resources: Resources
): ArmdozerBustShot {
  switch (armdozerId) {
    case ArmDozerIds.SHIN_BRAVER:
      return shinBraverBustShot(resources);

    case ArmDozerIds.NEO_LANDOZER:
      return neoLandozerBustShot(resources);

    case ArmDozerIds.LIGHTNING_DOZER:
      return lightningDozerBustShot(resources);

    case ArmDozerIds.WING_DOZER:
      return wingDozerBustShot(resources);

    default:
      return shinBraverBustShot(resources);
  }
}

/**
 * シンブレイバー バストショット
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function shinBraverBustShot(resources: Resources): ArmdozerBustShot {
  const path =
    resources.paths.find((v) => v.id === PathIds.SHIN_BRAVER_BUST_SHOT)?.path ??
    "";
  const className = `${CLASS_NAME_PREFIX}__shin-braver`;
  return new ArmdozerBustShot(path, className);
}

/**
 * ネオランドーザ バストショット
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function neoLandozerBustShot(resources: Resources): ArmdozerBustShot {
  const path =
    resources.paths.find((v) => v.id === PathIds.NEO_LANDOZER_BUST_SHOT)
      ?.path ?? "";
  const className = `${CLASS_NAME_PREFIX}__neo-landozer`;
  return new ArmdozerBustShot(path, className);
}

/**
 * ライトニングドーザ バストショット
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function lightningDozerBustShot(resources: Resources): ArmdozerBustShot {
  const path =
    resources.paths.find((v) => v.id === PathIds.LIGHTNING_DOZER_BUST_SHOT)
      ?.path ?? "";
  const className = `${CLASS_NAME_PREFIX}__lightning-dozer`;
  return new ArmdozerBustShot(path, className);
}

/**
 * ウィングドーザ バストショット
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function wingDozerBustShot(resources: Resources): ArmdozerBustShot {
  const path =
    resources.paths.find((v) => v.id === PathIds.WING_DOZER_BUST_SHOT)?.path ??
    "";
  const className = `${CLASS_NAME_PREFIX}__wing-dozer`;
  return new ArmdozerBustShot(path, className);
}
