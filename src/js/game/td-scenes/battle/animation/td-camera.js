// @flow

import {Animate} from "../../../../animation/animate";
import {TDCamera} from "../../../../game-object/camera/td";
import {all} from "../../../../animation/all";
import type {ArmDozerSprite} from "../../../../game-object/armdozer/armdozer-sprite";

/** カメラ初期位置 */
export const INITIAL_CAMERA_POSITION = {
  x: 0,
  y: 220,
  z: 300
};

/** カメラ視点初期位置 */
export const INITIAL_VIEW_POINT = {
  x: 0,
  y: 200,
  z: 0
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
      y: INITIAL_CAMERA_POSITION.y,
      z: INITIAL_CAMERA_POSITION.z - 60,
    }, duration),
    camera.moveViewPoint({
      x: x,
      y: INITIAL_VIEW_POINT.y,
      z: INITIAL_VIEW_POINT.z
    }, duration)
  );
}