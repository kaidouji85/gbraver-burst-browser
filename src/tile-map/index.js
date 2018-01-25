// @flow

import * as THREE from 'three';
import type {Resources} from "../resource/resource-manager";
import {
  getHorizonDividedNum, getTextureOffsetPos,
  getVerticalDividedNum
} from "./texture-off-set-pos";
import {EMPTY_TILE_SET} from "./empty-tile-set";
import type {TileMapJson, TileSetJson} from "../flow-typed/tiled";
import {getMapPosition} from "./map-position";
import {createAnimatedTexture} from "../texture/texture-animation";
import {EMPTY_TILE_MAP} from "./empty-map-data";
import type {TileMapResource, TileMapId} from "../resource/tile-map";
import type {TextureId, TextureResource} from "../resource/texture";

/** タイルマップ生成のパラメータ */
type Params = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** タイルマップテクスチャのID */
  textureId: TextureId,
  /** タイルマップID */
  tileMapId: TileMapId,
  /** タイルマップ単位メッシュの幅 */
  meshWith: number,
  /** タイルマップ単位メッシュの高さ */
  meshHeight: number
};

/** タイルマップを生成する */
export function createTileMap(params: Params): THREE.Group {
  const textureResource: ?TextureResource = params.resources.textures.find(v => v.id === params.textureId);
  const texture = textureResource ? textureResource.texture : new THREE.Texture();
  const tileMapResource: ?TileMapResource = params.resources.tileMap.find(v => v.id === params.tileMapId);
  const tileMapData: TileMapJson = tileMapResource ? tileMapResource.tileMap : EMPTY_TILE_MAP;
  const tileSet: TileSetJson = tileMapResource ? tileMapResource.tileSet : EMPTY_TILE_SET;
  const horizonDividedNum = getHorizonDividedNum(tileSet);
  const verticalDividedNum = getVerticalDividedNum(tileSet);
  const basePosX = (-tileMapData.width + 1) * params.meshWith / 2;
  const basePosZ = (-tileMapData.height + 1) * params.meshHeight / 2;

  const meshes: THREE.Mesh[] = tileMapData.layers[0].data.map((v, index) => {
    const tileTexture: THREE.Texture = createAnimatedTexture(texture, horizonDividedNum, verticalDividedNum);
    const geometry: THREE.Geometry = new THREE.PlaneGeometry(params.meshWith, params.meshHeight, 1, 1);
    const material: THREE.Material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      map: tileTexture
    });
    const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = - Math.PI / 2;

    const {x, y, z} = getMapPosition(index, tileMapData.layers[0], params.meshWith, params.meshHeight);
    mesh.position.set(x + basePosX, y, z + basePosZ);

    const offset = getTextureOffsetPos(v, tileSet, tileMapData);
    mesh.material.map.offset.x = offset.x;
    mesh.material.map.offset.y = offset.y;

    return mesh;
  });

  const group: THREE.Group = new THREE.Group();
  meshes.forEach(v => group.add(v));

  return group;
}