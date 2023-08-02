import { Path, PathConfig } from "../path";
import { ResourceRoot } from "../resource-root";

/**
 * パス設定をパスに変換する
 * @param config 設定
 * @param resourceRoot リソースルート
 * @return パス
 */
export function toPath(config: PathConfig, resourceRoot: ResourceRoot): Path {
  return {
    id: config.id,
    path: config.path(resourceRoot),
  };
}
