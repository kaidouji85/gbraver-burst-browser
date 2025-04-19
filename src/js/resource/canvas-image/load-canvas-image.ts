import * as THREE from "three";

import { ResourceRoot } from "../resource-root";
import { CanvasImageConfig, CanvasImageResource } from "./resource";

/**
 * キャンバス用画像を読み込む
 *
 * @param resourceRoot リソースルート
 * @param config 読み込み設定
 * @returns 読み込み結果
 */
export function loadCanvasImage(
  resourceRoot: ResourceRoot,
  config: CanvasImageConfig,
): Promise<CanvasImageResource> {
  return new Promise((resolve, reject) => {
    const loader = new THREE.ImageLoader();
    loader.load(
      `${resourceRoot.get()}/${config.path}`,
      (image: HTMLImageElement) => {
        resolve({
          id: config.id,
          image: image,
        });
      },
      undefined,
      (error) => {
        reject(error);
      },
    );
  });
}
