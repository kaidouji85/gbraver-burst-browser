import * as THREE from "three";

import { isMeshOverlap } from "../../overlap/mesh-overlap";
import type { MouseDownRaycaster } from "../../render/overlap-event/mouse-down-raycaster";
import type { TouchStartRaycaster } from "../../render/overlap-event/touch-start-raycaster";
import type { Stream, StreamSource, Unsubscriber } from "../../stream/stream";
import { createStreamSource } from "../../stream/stream";
import type { GameObjectAction } from "../action/game-object-action";

/** プッシュ検出 */
export interface PushDetector {
  /**
   * デストラクタ
   */
  destructor(): void;

  /**
   * デバッグ用に当たり判定を表示する
   * @param visible trueで当たり判定を表示する
   */
  setVisible(visible: boolean): void;

  /**
   * シーンに追加するオブジェクトを取得する
   * @return 取得結果
   */
  getObject3D(): THREE.Object3D;

  /**
   * 押されたことを通知する
   * @return 通知ストリーム
   */
  notifyPressed(): Stream<Event>;
}

/** SimplePushDetectorコンストラクタのパラメータ */
type SimplePushDetectorParam = {
  /** 当たり判定のジオメトリー */
  geometry: THREE.BufferGeometry;

  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>;

  /**
   * デバッグ用途で当たり判定を表示・非表示するフラグ
   * trueで当たり判定を表示する
   */
  visible?: boolean;
};

/** プッシュ検出のシンプルな実装 */

class SimplePushDetector implements PushDetector {
  #mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  #push: StreamSource<Event>;
  #unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   * @param param パラメータ
   */
  constructor(param: SimplePushDetectorParam) {
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color("rgb(0, 255, 0)"),
      visible: param.visible ?? false,
    });
    this.#mesh = new THREE.Mesh(param.geometry, material);
    this.#push = createStreamSource();
    this.#unsubscriber = param.gameObjectAction.subscribe((action) => {
      if (action.type === "mouseDownRaycaster") {
        this.#mouseDownRaycaster(action);
      } else if (action.type === "touchStartRaycaster") {
        this.#touchStartRaycaster(action);
      }
    });
  }

  /** @override */
  destructor(): void {
    this.#mesh.geometry.dispose();
    this.#mesh.material.dispose();
    this.#unsubscriber.unsubscribe();
  }

  /** @override */
  setVisible(visible: boolean): void {
    this.#mesh.material.visible = visible;
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#mesh;
  }

  /** @override */
  notifyPressed(): Stream<Event> {
    return this.#push;
  }

  /**
   * マウスダウン時の処理
   *
   * @param action アクション
   */
  #mouseDownRaycaster(action: MouseDownRaycaster): void {
    if (isMeshOverlap(action.mouse.raycaster, this.#mesh)) {
      this.#push.next(action.event);
    }
  }

  /**
   * タッチスタート時の処理
   *
   * @param action アクション
   */
  #touchStartRaycaster(action: TouchStartRaycaster): void {
    const overlapTouches = action.touch.targetTouches.filter((v) =>
      isMeshOverlap(v.raycaster, this.#mesh)
    );
    const isTouchOverlap = 0 < overlapTouches.length;

    if (isTouchOverlap) {
      this.#push.next(action.event);
    }
  }
}

/** 円形プッシュ検出生成のパラメータ */

type CirclePushDetectorParam = {
  /** 円半径 */
  radius: number;

  /** 円分割数 */
  segments: number;

  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>;

  /**
   * デバッグ用途で当たり判定を表示・非表示するフラグ
   * trueで当たり判定を表示する
   */
  visible?: boolean;
};

/**
 * 円形プッシュ検出を生成する
 *
 * @param param パラメータ
 * @return プッシュ検出
 */
export function circlePushDetector(
  param: CirclePushDetectorParam
): PushDetector {
  const geometry = new THREE.CircleGeometry(param.radius, param.segments);
  return new SimplePushDetector({
    geometry: geometry,
    gameObjectAction: param.gameObjectAction,
    visible: param.visible,
  });
}
