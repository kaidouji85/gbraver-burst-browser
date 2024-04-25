import * as THREE from "three";

import { createRaycaster } from "./raycaster";
import { getScreenPosition } from "./screen-position";

/** タッチのレイキャストを集めたもの */
export type TouchRaycastContainer = {
  /** 前回のタッチと今回のタッチで接触状況が変化したもの */
  changedTouches: TouchRaycaster[];

  /** 現在ゲーム画面に接触している全てのタッチ */
  targetTouches: TouchRaycaster[];

  /** 現在のウインドウに接触している全てのタッチ */
  touches: TouchRaycaster[];
};

/** タッチのレイキャスト */
export type TouchRaycaster = {
  /** タッチごとに割り当てられるユニークID */
  identifier: number;

  /** タッチのレイキャスト */
  raycaster: THREE.Raycaster;
};

/**
 * タッチイベントからレイキャストを生成する
 *
 * @param event タッチベント
 * @param rendererDOM レンダラがバインドされているHTML要素
 * @param camera カメラ
 * @returns タッチイベントから作成したレイキャスト
 */
export function createTouchEventRaycaster(
  event: TouchEvent,
  rendererDOM: HTMLElement,
  camera: THREE.Camera,
): TouchRaycastContainer {
  const touchToRaycaster = (touchList: TouchList): TouchRaycaster[] =>
    Object.values(touchList).map((touch) => {
      const position = getTouchPosition(touch, rendererDOM);
      return {
        identifier: touch.identifier,
        raycaster: createRaycaster(position, camera),
      };
    });

  return {
    changedTouches: touchToRaycaster(event.changedTouches),
    targetTouches: touchToRaycaster(event.targetTouches),
    touches: touchToRaycaster(event.touches),
  };
}

/**
 * ゲーム画面上でのタッチ座標を取得する
 *
 * @param touch タッチ情報
 * @param rendererDOM レンダラがバインドされているHTML要素
 */
export function getTouchPosition(
  touch: Touch,
  rendererDOM: HTMLElement,
): THREE.Vector2 {
  return getScreenPosition(
    touch.clientX,
    touch.clientY,
    rendererDOM.clientWidth,
    rendererDOM.clientHeight,
  );
}
