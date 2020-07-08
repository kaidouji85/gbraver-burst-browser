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
};

/**
 * パス設定を集めたもの
 */
export const PathConfigs: PathConfig[] = [
  {
    id: PathIds.TITLE_BACK,
    path: resourcePath => `${resourcePath.get()}/title-back.png`
  },
  {
    id: PathIds.LOGO,
    path: resourcePath => `${resourcePath.get()}/logo.png`
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
