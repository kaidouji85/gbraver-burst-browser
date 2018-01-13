// @flow

import * as THREE from 'three';
import type {Resources} from "../../../resource/resource-manager";
import {TILE_MAP_IDS} from "../../../resource/loader/tile-map-loader";
import {createTileMap} from "../tile-map";
import {TEXTURE_IDS} from "../../../resource/texture-manager";

/** グラウンドを生成する */
export function createGround(resources: Resources): THREE.Group {
  return createTileMap({
    resources,
    textureId: TEXTURE_IDS.TILE_MAP_SCHOOL_GROUND,
    tileMapId: TILE_MAP_IDS.SCHOOL_GROUND,
    meshWith: 100,
    meshHeight: 100
  });
}