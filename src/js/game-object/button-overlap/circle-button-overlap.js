// @flow

import * as THREE from 'three';
import type {Stream} from "../../stream/stream";
import type {GameObjectAction} from "../action/game-object-action";
import {ButtonOverlap} from "./button-overlap";

/** パラメータ */
type Param = {
  /** 円半径 */
  radius: number,
  /** 円分割数 */
  segments: number,
  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>,
  /** 
   * デバッグ用途で当たり判定を表示・非表示するフラグ
   * trueで当たり判定を表示する
   */
  visible?: boolean,
};

/**
 * 円形ボタンの当たり判定
 *
 * @param param パラメータ
 * @return 当たり判定
 */
export function circleButtonOverlap(param: Param): ButtonOverlap {
  const geometry = new THREE.CircleGeometry(param.radius, param.segments);
  return new ButtonOverlap({
    geometry: geometry,
    gameObjectAction: param.gameObjectAction,
    visible: param.visible
  });
}