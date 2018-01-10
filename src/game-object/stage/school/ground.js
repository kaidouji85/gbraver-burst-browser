// @flow

import * as THREE from 'three';
import type {Resources} from "../../../resource/resource-manager";
import {TEXTURE_PATHS} from "../../../resource/loader/texture-loader";
import {TILE_MAP_IDS} from "../../../resource/loader/tile-map-loader";
import {createTileMap} from "../tile-map";

/** グラウンドを生成する */
export function createGround(resources: Resources): THREE.Group {
  return createTileMap({
    resources,
    texturePath: TEXTURE_PATHS.TILE_MAP_SCHOOL_GROUND,
    tileMapId: TILE_MAP_IDS.SCHOOL_GROUND,
    meshWith: 100,
    meshHeight: 100
  });
}