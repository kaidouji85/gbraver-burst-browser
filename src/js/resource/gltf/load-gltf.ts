import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { ResourceRoot } from "../resource-root";
import { GlTFConfig, GlTFResource } from "./resource";

/**
 * GLTFローダー
 * 同じページ内に複数GLTFが存在するとクラッシュすることがあるので、シングルトンにした
 * https://github.com/mrdoob/three.js/issues/22445
 */
const loader = new GLTFLoader();

/**
 * glTFファイルを読み込む
 * @param resourceRoot リソースルート
 * @param config 設定
 * @returns glTFリソース
 */
export function loadGlTF(
  resourceRoot: ResourceRoot,
  config: GlTFConfig,
): Promise<GlTFResource> {
  return new Promise((resolve, reject) => {
    const fullPath = `${resourceRoot.get()}/${config.path}`;

    const onLoad = (gltf: GLTF) => resolve({ ...config, object: gltf.scene });

    const onProgress = () => {
      //NOP
    };
    const onFail = (err: unknown) => reject(err);
    loader.load(fullPath, onLoad, onProgress, onFail);
  });
}
