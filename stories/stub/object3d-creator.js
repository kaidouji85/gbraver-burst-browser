// @flow

import type {Resources} from "../../src/js/resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../src/js/action/game-object-action";
import * as THREE from "three";

/**
 * Object3D生成コールバック関数
 *
 * @param resources リソース管理オブジェクト
 * @param listener ゲームオブジェクトイベントリスナ
 * @return　シーンに追加するObject3D
 */
export type Object3dCreator = (resources: Resources, listener: Observable<GameObjectAction>) => typeof THREE.Object3D[];