// @flow

import * as THREE from 'three';
import type {Resources} from "../../../resource/resource-manager";
import type {Texture} from "../../../resource/loader/texture-loader";
import {TEXTURE_PATHS} from "../../../resource/loader/texture-loader";
import {createAnimatedTexture} from "../../../util/texture/texture-animation";
import type {TileMap} from "../../../resource/loader/tile-map-loader";
import {TILE_MAP_IDS} from "../../../resource/loader/tile-map-loader";
import type {TileMapData, TileSet} from "../../../flow-typed/tiled";
import {EMPTY_TILE_SET} from "../../../util/tiled-map/empty-tile-set";
import {EMPTY_TILE_MAP} from "../../../util/tiled-map/empty-map-data";

/** グラウンドを生成する */
export function createGround(resources: Resources): THREE.Mesh {
  const originTexture: ?Texture = resources.textures.find(v => v.path === TEXTURE_PATHS.TILE_MAP_SCHOOL_GROUND);
  const originTileMap: ?TileMap = resources.tileMap.find(v => v.id === TILE_MAP_IDS.SCHOOL_GROUND);
  const texture: THREE.Texture = originTexture ? originTexture.texture : new THREE.Texture();
  const tileMapData: TileMapData = originTileMap ? originTileMap.tileMap : EMPTY_TILE_MAP;
  const tileSet: TileSet = originTileMap ? originTileMap.tileSet : EMPTY_TILE_SET;



  return new THREE.Mesh();
}