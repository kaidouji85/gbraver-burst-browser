import { ResourceRoot } from "../resource-root";

/** パス ID */
export type PathId = string;

/** パス設定 */
export type PathConfig = {
  /** パスID */
  id: PathId;
  /**
   * パス生成関数
   * @param basePath リソースフォルダのルート
   * @returns 生成したパス
   */
  path: (basePath: ResourceRoot) => string;
};

/** パス */
export type Path = {
  /** パスID */
  id: PathId;
  /** リソースのパス */
  path: string;
};
