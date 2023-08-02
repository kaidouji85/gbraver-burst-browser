import { Path, PathConfigs, toPath } from "../path";
import { ResourceRoot } from "../resource-root";

/**
 * 全てのパスを取得する
 * @param resourceRoot リソースルート
 * @return 全てのパス
 */
export function getAllPaths(resourceRoot: ResourceRoot): Path[] {
  return PathConfigs.map((config) => toPath(config, resourceRoot));
}
