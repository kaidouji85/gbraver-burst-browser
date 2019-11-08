// @flow

import {Animate} from "../../../../../../animation/animate";
import {TDCamera} from "../../../../../../game-object/camera/td";
import {all} from "../../../../../../animation/all";

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
 * ズームアップ
 *
 * @param camera カメラ
 * @param x ズーム対象のX座標
 * @param duration アニメーション時間
 * @return アニメーション
 */
export function zoomIn(camera: TDCamera, x: number, duration: number): Animate {
  return all(
    camera.moveCamera({
      x: x,
      z: '-100'
    }, duration),
    camera.moveViewPoint({x: x}, duration)
  );
}

/**
 * 操作しているプレイヤーにカメラを合わせる
 *
 * @param camera カメラ
 * @param x プレイヤーのX座標
 * @param duration アニメーション時間
 * @return アニメーション
 */
export function lookAtPlayer(camera: TDCamera, x: number, duration: number): Animate {
  return all(
    camera.moveCamera({
      x: x,
      z: INITIAL_CAMERA_POSITION.z
    }, duration),
    camera.moveViewPoint({
      x: x,
    }, duration)
  );
}
