import { Observable, Subject, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { isMeshOverlap } from "../../overlap/mesh-overlap";
import { MouseDownRaycaster } from "../../render/overlap-event/mouse-down-raycaster";
import { TouchStartRaycaster } from "../../render/overlap-event/touch-start-raycaster";
import { GameObjectAction } from "../action/game-object-action";

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
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D;

  /**
   * 押されたことを通知する
   * @returns 通知ストリーム
   */
  notifyPressed(): Observable<Event>;
}

/** SimplePushDetectorコンストラクタのパラメータ */
type SimplePushDetectorParam = {
  /** 当たり判定のジオメトリー */
  geometry: THREE.BufferGeometry;

  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;

  /**
   * デバッグ用途で当たり判定を表示・非表示するフラグ
   * trueで当たり判定を表示する
   */
  visible?: boolean;
};

/** プッシュ検出のシンプルな実装 */
class SimplePushDetector implements PushDetector {
  #mesh: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
  #push: Subject<Event>;
  #unsubscriber: Unsubscribable;

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
    this.#push = new Subject();
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
  notifyPressed(): Observable<Event> {
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
   * @param action アクション
   */
  #touchStartRaycaster(action: TouchStartRaycaster): void {
    const overlapTouches = action.touch.targetTouches.filter((v) =>
      isMeshOverlap(v.raycaster, this.#mesh),
    );
    const isTouchOverlap = 0 < overlapTouches.length;

    if (isTouchOverlap) {
      this.#push.next(action.event);
    }
  }
}

/** プッシュ検出生成のパラメータ */
type PushDetectorCreatorParams = SimplePushDetectorParam;

/**
 * プッシュ検出を生成する
 * @param param パラメータ
 * @returns 生成結果
 */
export function createPushDetector(
  param: PushDetectorCreatorParams,
): PushDetector {
  return new SimplePushDetector(param);
}
