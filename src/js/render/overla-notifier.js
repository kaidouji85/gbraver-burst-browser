// @flow

import * as THREE from "three";
import type {OverlapEvent} from "./overlap-event/overlap-event";
import type {Stream} from "../stream/core";

/**
 * オーバーラップイベントを通知する
 */
export interface OverlapNotifier {
  /**
   * オーバーラップイベント通知を生成する
   *
   * @param camera カメラ
   * @return 生成結果
   */
  createOverlapNotifier(camera: typeof THREE.Camera): Stream<OverlapEvent>;
}