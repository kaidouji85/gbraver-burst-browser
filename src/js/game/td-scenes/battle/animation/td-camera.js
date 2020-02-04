// @flow

import {Animate} from "../../../../animation/animate";
import {TDCamera} from "../../../../game-object/camera/td";
import {all} from "../../../../animation/all";

/** カメラ初期位置 */
export const INITIAL_VIEW_POINT = {
  x: 0,
  y: 200,
  z: 0
};

/** カメラ視点初期位置 */
export const INITIAL_CAMERA_POSITION = {
  x: 0,
  y: 220,
  z: 300
};

/**
 * カメラを初期位置に戻す
 *
 * @param camera カメラ
 * @param duration アニメーション時間
 * @return アニメーション
 */
export function toInitial(camera: TDCamera, duration: number): Animate {
  return all(
    camera.moveCamera(INITIAL_CAMERA_POSITION, duration),
    camera.moveViewPoint(INITIAL_VIEW_POINT, duration)
  );
}

/**
 * ドリー
 *
 * @param camera カメラ
 * @param x 注視点のX座標
 * @param duration アニメーション時間
 * @return アニメーション
 */
export function dolly(camera: TDCamera, x: number, duration: number): Animate {
  return all(
    camera.moveCamera({
      x: x,
      z: '-60'
    }, duration),
    camera.moveViewPoint({x: x}, duration)
  );
}
