import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { Animate } from "../../../animation/animate";
import { onResizePerspectiveCamera } from "../../../camera/resize";
import type { Update } from "../../../game-loop/update";
import {
  getViewPortHeight,
  getViewPortWidth,
} from "../../../view-port/view-port-size";
import type { Resize } from "../../../window/resize";
import { lookAt } from "./animation/look-at";
import { move } from "./animation/move";
import { engage } from "./engauge";
import { createInitialValue } from "./model/initial-value";
import type { Battle3DCameraModel } from "./model/model";
import type { Position } from "./position";
// TODO カメラ位置、カメラ視点をコンストラクタから渡す

/** 戦闘シーン3Dレイヤー用カメラ */
export class TDCamera {
  #model: Battle3DCameraModel;
  #camera: THREE.PerspectiveCamera;
  #unsubscriber: Unsubscribable[];

  /**
   * コンストラクタ
   *
   * @param update Updateストリーム
   * @param resize リサイズストリーム
   */
  constructor(update: Observable<Update>, resize: Observable<Resize>) {
    this.#model = createInitialValue();
    const aspect = getViewPortWidth() / getViewPortHeight();
    this.#camera = new THREE.PerspectiveCamera(75, aspect, 1, 10000);
    this.#unsubscriber = [
      update.subscribe(() => {
        this.#update();
      }),
      resize.subscribe((action) => {
        this.#resize(action);
      }),
    ];
  }

  /**
   * デストラクタ
   */
  destructor(): void {
    this.#unsubscriber.forEach((v) => {
      v.unsubscribe();
    });
  }

  /**
   * カメラ視点を移動する
   *
   * @param position 移動先座標
   * @param duration 移動時間
   * @returns アニメーション
   */
  lookAt(position: Position, duration: number): Animate {
    return lookAt(this.#model, position, duration);
  }

  /**
   *カメラを移動する
   *
   * @param position 移動先座標
   * @param duration 移動時間
   * @returns アニメーション
   */
  move(position: Position, duration: number): Animate {
    return move(this.#model, position, duration);
  }

  /**
   * カメラを取得する
   *
   * @returns カメラ
   */
  getCamera(): THREE.PerspectiveCamera {
    return this.#camera;
  }

  /**
   * リサイズ時の処理
   *
   * @param action アクション
   */
  #resize(action: Resize): void {
    onResizePerspectiveCamera(this.#camera, action.width, action.height);
  }

  /**
   * 状態更新
   */
  #update(): void {
    engage(this.#model, this.#camera);
  }
}
