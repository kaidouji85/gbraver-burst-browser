// @flow

import * as THREE from 'three';
import {ButtonOverlap} from "./button-overlap";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream} from "../../stream/core";

/** パラメータ */
type Param = {
  /** 円半径 */
  radius: number,
  /** 円分割数 */
  segments: number,
  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>,
  /** ボタン押下時のコールバック関数 */
  onButtonPush: () => void
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
    onButtonPush: () => param.onButtonPush(),
  })
}