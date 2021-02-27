// @flow

import type {Resources} from "../../src/js/resource";
import {Observable} from "rxjs";
import * as THREE from "three";
import type {GameObjectAction} from "../../src/js/game-object/action/game-object-action";

/**
 * Object3D生成コールバック関数
 *
 * @param resources リソース管理オブジェクト
 * @param listener ゲームオブジェクトイベントリスナ
 * @return　シーンに追加するObject3D
 */
export type Object3dCreator = (resources: Resources, listener: Observable<GameObjectAction>) => typeof THREE.Object3D[];