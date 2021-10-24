// @flow

import type {Resources} from "../../src/js/resource";
import * as THREE from "three";
import type {GameObjectAction} from "../../src/js/game-object/action/game-object-action";
import {Stream} from '../../src/js/stream/core';

/**
 * Object3D生成コールバック関数
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @return シーンに追加するObject3D
 */
export type Object3dCreator = (resources: Resources, gameObjectAction: Stream<GameObjectAction>) => typeof THREE.Object3D[];