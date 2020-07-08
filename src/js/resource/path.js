// @flow

import type {ResourceRoot} from "./root/resource-root";

/**
 * パス ID
 */
export type PathId = string;

/**
 * パス設定
 */
export type PathConfig = {
  id: PathId,
  path: (basePath: ResourceRoot) => string
}

/**
 * パス
 */
export type Path = {
  id: PathId,
  path: string
};

/**
 * パスIDを集めたもの
 */
export const PathIds = {
  TITLE_BACK: 'TITLE_BACK',
  LOGO: 'LOGO',
  SHIN_BRAVER_ICON: 'SHIN_BRAVER_ICON',
  NEO_LANDOZER_ICON: 'NEO_LANDOZER_ICON',
  LIGHTNING_DOZER_ICON: 'LIGHTNING_DOZER_ICON',
  WING_DOZER_ICON: 'WING_DOZER_ICON',
};

/**
 * パス設定を集めたもの
 */
export const PathConfigs: PathConfig[] = [
  {
    id: PathIds.TITLE_BACK,
    path: root => `${root.get()}/title-back.png`
  },
  {
    id: PathIds.LOGO,
    path: root => `${root.get()}/logo.png`
  },
  {
    id: PathIds.SHIN_BRAVER_ICON,
    path: root => `${root.get()}/armdozer/shin-braver/player-select.png`
  },
  {
    id: PathIds.NEO_LANDOZER_ICON,
    path: root => `${root.get()}/armdozer/neo-landozer/player-select.png`
  },
  {
    id: PathIds.LIGHTNING_DOZER_ICON,
    path: root => `${root.get()}/armdozer/lightning-dozer/player-select.png`
  },
  {
    id: PathIds.LIGHTNING_DOZER_ICON,
    path: root => `${root.get()}/armdozer/lightning-dozer/player-select.png`
  },
  {
    id: PathIds.WING_DOZER_ICON,
    path: root => `${root.get()}/armdozer/wing-dozer/player-select.png`
  },
];

/**
 * パス設定をパスに変換する
 *
 * @param config 設定
 * @param resourcePath リソースルート
 * @return パス
 */
export function toPath(config: PathConfig, resourcePath: ResourceRoot): Path {
  return {
    id: config.id,
    path: config.path(resourcePath)
  };
}

/**
 * 全てのパスを取得する
 *
 * @param resourcePath リソースルート
 * @return 全てのパス
 */
export function getAllPaths(resourcePath: ResourceRoot): Path[] {
  return PathConfigs.map(config => toPath(config, resourcePath));
}
