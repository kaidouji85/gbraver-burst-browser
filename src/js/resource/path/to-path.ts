import { ResourceRoot } from "../resource-root";
import { Path, PathConfig } from "./resource";

/**
 * パス設定をパスに変換する
 * @param config 設定
 * @param resourceRoot リソースルート
 * @returns パス
 */
export function toPath(config: PathConfig, resourceRoot: ResourceRoot): Path {
  return {
    id: config.id,
    path: config.path(resourceRoot),
  };
}
