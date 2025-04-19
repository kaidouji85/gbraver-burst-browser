import { Resources } from "../index";
import { ResourceType } from "../resource-type";

/**
 * 指定したリソース管理オブジェクトのリソース種類を取得する
 * @param resources リソース管理オブジェクト
 * @returns 取得結果
 */
export const getResourceTypes = (resources: Resources): ResourceType[] => {
  const { textures, gltfs, sounds, canvasImages, cubeTextures } = resources;
  return [...textures, ...gltfs, ...sounds, ...canvasImages, ...cubeTextures];
};
