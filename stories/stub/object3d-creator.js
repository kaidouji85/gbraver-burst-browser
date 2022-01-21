// @flow

import type {Resources} from "../../src/js/resource";
import * as THREE from "three";
import type {GameObjectAction} from "../../src/js/game-object/action/game-object-action";
import {Stream} from '../../src/js/stream/core';
import {TDCamera} from "../../src/js/game-object/camera/td";

/**
 * Object3D生成コールバック関数
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param scene シーン
 * @return シーンに追加するObject3D
 */
export type Object3dCreator = (resources: Resources, gameObjectAction: Stream<GameObjectAction>, scene: typeof THREE.Scene, camera: TDCamera) => typeof THREE.Object3D[];