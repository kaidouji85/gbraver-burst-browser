// @flow

import {Animate} from "../../../../animation/animate";
import {TDCamera} from "../../../../game-object/camera/td";
import {all} from "../../../../animation/all";
import type {ArmDozerSprite} from "../../../../game-object/armdozer/armdozer-sprite";

/** カメラ初期位置 X */
export const INITIAL_CAMERA_POSITION_X: number = 0;
/** カメラ初期位置 Y */
export const INITIAL_CAMERA_POSITION_Y: number = 220;
/** カメラ初期位置 Z */
export const INITIAL_CAMERA_POSITION_Z: number = 300;

/** カメラ視点初期位置 X */
export const INITIAL_VIEW_POINT_X = 0;
/** カメラ視点初期位置 Y */
export const INITIAL_VIEW_POINT_Y = 200;
/** カメラ視点初期位置 Z */
export const INITIAL_VIEW_POINT_Z = 0;

/**
 * カメラを初期位置に戻す
 *
 * @param camera カメラ
 * @param duration アニメーション時間
 * @return アニメーション
 */
export function toInitial(camera: TDCamera, duration: number): Animate {
  return all(
    camera.moveCamera({
      x: INITIAL_CAMERA_POSITION_X,
      y: INITIAL_CAMERA_POSITION_Y,
      z: INITIAL_CAMERA_POSITION_Z
    }, duration),
    camera.moveViewPoint({
      x: INITIAL_VIEW_POINT_X,
      y: INITIAL_VIEW_POINT_Y,
      z: INITIAL_VIEW_POINT_Z,
    }, duration)
  );
}

/**
 * 指定したアームドーザに注目する
 *
 * @param camera カメラ
 * @param target 注目先のアムドーザ
 * @param duration アニメーション時間(ミリ秒)
 * @return アニメーション
 */
export function attentionArmDozer(camera: TDCamera, target: ArmDozerSprite, duration: number): Animate {
  const x = target.getObject3D().position.x;
  return all(
    camera.moveCamera({
      x: x,
      y: INITIAL_CAMERA_POSITION_Y,
      z: INITIAL_CAMERA_POSITION_Z - 60,
    }, duration),
    camera.moveViewPoint({
      x: x,
      y: INITIAL_VIEW_POINT_Y,
      z: INITIAL_VIEW_POINT_Z
    }, duration)
  );
}