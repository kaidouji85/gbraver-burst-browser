// @flow
import * as THREE from 'three';
import {createRaycaster} from "../raycaster-creator";
import {getTouchPosition} from "./touch-position";

/** タッチのレイキャストを集めたもの */
export type TouchRaycastContainer = {
  /** 前回のタッチと今回のタッチで接触状況が変化したもの */
  changedTouches: TouchRaycaster[],
  /** 現在ゲーム画面に接触している全てのタッチ */
  targetTouches: TouchRaycaster[],
  /** 現在のウインドウに接触している全てのタッチ */
  touches: TouchRaycaster[],
};

/** タッチのレイキャスト */
export type TouchRaycaster = {
  /** タッチごとに割り当てられるユニークID */
  identifier: number,
  /** タッチのレイキャスト */
  raycaster: THREE.Raycaster
};

/**
 * タッチイベントからレイキャストを生成する
 *
 * @param event タッチベント
 * @param renderer three.jsのレンダー
 * @param camera カメラ
 * @return タッチイベントから作成したレイキャスト
 */
export function createTouchEventRaycaster(event: TouchEvent, renderer: THREE.WebGLRenderer, camera: THREE.Camera): TouchRaycastContainer {
  const touchToRaycaster = (touchList: TouchList): TouchRaycaster[] =>
    Object.values(touchList)
      .map(v => {
        const touch: Touch = v instanceof Touch ? v : new Touch();
        const position = getTouchPosition(touch, renderer);
        return {
          identifier: touch.identifier,
          raycaster: createRaycaster(position, camera)
        };
      });

  return {
    changedTouches: touchToRaycaster(event.changedTouches),
    targetTouches: touchToRaycaster(event.targetTouches),
    touches: touchToRaycaster(event.touches),
  };
}