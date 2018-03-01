// @flow
import * as THREE from 'three';
import {getRaycaster} from "../raycaster";
import {getTouchPosition} from "./touch-position";

/** タッチイベントから作成したレイキャスト */
export type TouchEventRaycaster = {
  changedTouches: TouchRaycaster[],
  targetTouches: TouchRaycaster[],
  touches: TouchRaycaster[],
};

/** 単位タッチのレイキャスト */
export type TouchRaycaster = {
  identifier: number,
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
export function createTouchEventRaycaster(event: TouchEvent, renderer: THREE.WebGLRenderer, camera: THREE.Camera): TouchEventRaycaster {
  const createRaycaster = (touchList: TouchList): TouchRaycaster[] =>
    Object.values(touchList)
      .map(v => {
        const touch: Touch = v instanceof Touch ? v : new Touch();
        const position = getTouchPosition(touch, renderer);
        return {
          identifier: touch.identifier,
          raycaster: getRaycaster(position, camera)
        };
      });

  return {
    changedTouches: createRaycaster(event.changedTouches),
    targetTouches: createRaycaster(event.targetTouches),
    touches: createRaycaster(event.touches),
  };
}