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
import {getVerticalDividedNum} from "../../../util/tiled-map/texture-off-set-pos";
import {getMapPosition} from "../../../util/tiled-map/map-position";
import {getHorizonDividedNum, getTextureOffsetPos} from "../../../util/tiled-map/texture-off-set-pos";

/** グラウンドを生成する */
export function createGround(resources: Resources): THREE.Mesh {
  const originTexture: ?Texture = resources.textures.find(v => v.path === TEXTURE_PATHS.TILE_MAP_SCHOOL_GROUND);
  const originTileMap: ?TileMap = resources.tileMap.find(v => v.id === TILE_MAP_IDS.SCHOOL_GROUND);
  const texture: THREE.Texture = originTexture ? originTexture.texture : new THREE.Texture();
  const tileMapData: TileMapData = originTileMap ? originTileMap.tileMap : EMPTY_TILE_MAP;
  const tileSet: TileSet = originTileMap ? originTileMap.tileSet : EMPTY_TILE_SET;
  const horizonDividedNum = getHorizonDividedNum(tileSet);
  const verticalDividedNum = getVerticalDividedNum(tileSet);
  const meshWith = 100;
  const meshHeight = 100;

  const meshes: THREE.Mesh[] = tileMapData.layers[0].data.map((v, index) => {
    const tileTexture: THREE.Texture = createAnimatedTexture(texture, horizonDividedNum, verticalDividedNum);
    const geometry: THREE.Geometry = new THREE.PlaneGeometry(meshWith, meshHeight, 1, 1);
    const material: THREE.Material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      map: tileTexture
    });
    const mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = - Math.PI / 2;

    const {x, y, z} = getMapPosition(index, tileMapData.layers[0], meshWith, meshHeight);
    mesh.position.set(x, y, z);

    const offset = getTextureOffsetPos(v, tileSet);
    mesh.material.map.offset.x = offset.x;
    mesh.material.map.offset.y = offset.y;

    return mesh;
  });

  const group: THREE.Group = new THREE.Group();
  meshes.forEach(v => group.add(v));

  return group;
}