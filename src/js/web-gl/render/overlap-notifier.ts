import { Observable } from "rxjs";
import * as THREE from "three";

import type { OverlapEvent } from "./overlap-event/overlap-event";

/**
 * オーバーラップイベントを通知する
 */
export interface OverlapNotifier {
  /**
   * オーバーラップイベント通知を生成する
   *
   * @param camera カメラ
   * @returns 生成結果
   */
  createOverlapNotifier(camera: THREE.Camera): Observable<OverlapEvent>;
}
