import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { TDCamera } from "../../../game-object/camera/td";

/** カメラ初期位置 X */
export const INITIAL_CAMERA_POSITION_X = 0;

/** カメラ初期位置 Y */
export const INITIAL_CAMERA_POSITION_Y = 220;

/** カメラ初期位置 Z */
export const INITIAL_CAMERA_POSITION_Z = 300;

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
 * @returns アニメーション
 */
export function toInitial(camera: TDCamera, duration: number): Animate {
  return all(
    camera.move(
      {
        x: INITIAL_CAMERA_POSITION_X,
        y: INITIAL_CAMERA_POSITION_Y,
        z: INITIAL_CAMERA_POSITION_Z,
      },
      duration,
    ),
    camera.lookAt(
      {
        x: INITIAL_VIEW_POINT_X,
        y: INITIAL_VIEW_POINT_Y,
        z: INITIAL_VIEW_POINT_Z,
      },
      duration,
    ),
  );
}
