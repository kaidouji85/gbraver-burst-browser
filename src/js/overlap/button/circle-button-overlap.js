// @flow

import * as THREE from 'three';
import {ButtonOverlap} from "./button-overlap";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../game-object/action/game-object-action";

/** パラメータ */
type Param = {
  /** 円半径 */
  radius: number,
  /** 円分割数 */
  segments: number,
  /** イベントリスナー */
  listener: Observable<GameObjectAction>,
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
    listener: param.listener,
    onButtonPush: () => param.onButtonPush(),
  })
}