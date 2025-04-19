import { Resources } from "./index";
import { TextureId, type TextureResource } from "./texture/resource";

/**
 * ID指定でテクスチャを探す、見つからない場合はエラーを投げる
 * @param resources リソース管理オブジェクト
 * @param id テクスチャID
 * @returns テクスチャリソース
 */
export function findTextureOrThrow(
  resources: Resources,
  id: TextureId,
): TextureResource {
  const texture = resources.textures.find((texture) => texture.id === id);
  if (!texture) {
    throw Error(`Texture not found: ${id}`);
  }

  return texture;
}
