import { ResourceRoot } from "../resource-root";
import { PathConfigs } from "./configs";
import { Path } from "./resource";
import { toPath } from "./to-path";

/**
 * 全てのパスを取得する
 * @param resourceRoot リソースルート
 * @returns 全てのパス
 */
export function getAllPaths(resourceRoot: ResourceRoot): Path[] {
  return PathConfigs.map((config) => toPath(config, resourceRoot));
}
