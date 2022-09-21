// @flow
import * as THREE from 'three';
import {isMeshOverlap} from "../../overlap/mesh-overlap";
import type {MouseDownRaycaster} from "../../render/overlap-event/mouse-down-raycaster";
import type {TouchStartRaycaster} from "../../render/overlap-event/touch-start-raycaster";
import type {Stream, StreamSource, Unsubscriber} from "../../stream/stream";
import {createStreamSource} from "../../stream/stream";
import type {GameObjectAction} from "../action/game-object-action";

/** パラメータ */
type Param = {
  /** 当たり判定のジオメトリー */
  geometry: typeof THREE.Geometry,
  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>,
  /** 
   * デバッグ用途で当たり判定を表示・非表示するフラグ
   * trueで当たり判定を表示する
   */
  visible?: boolean,
};

/** ボタン押下判定オブジェクト */
export class ButtonOverlap {
  #mesh: typeof THREE.Mesh;
  #pushStart: StreamSource<Event>;
  #pushCancel: StreamSource<Event>;
  #pushEnd: StreamSource<Event>;
  #longPush: StreamSource<Event>;
  #unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color('rgb(0, 255, 0)'),
      visible: param.visible ?? false,
    });
    this.#mesh = new THREE.Mesh(param.geometry, material);

    this.#pushStart = createStreamSource();
    this.#pushCancel = createStreamSource();
    this.#pushEnd = createStreamSource();
    this.#longPush = createStreamSource();
    this.#unsubscriber = param.gameObjectAction.subscribe(action => {
      if (action.type === 'mouseDownRaycaster') {
        this.#mouseDownRaycaster(action);
      } else if (action.type === 'touchStartRaycaster') {
        this.#touchStartRaycaster(action);
      }
    });
  }

  /** 
   * デストラクタ
   */
  destructor(): void {
    this.#mesh.geometry.dispose();
    this.#mesh.material.dispose();
    this.#unsubscriber.unsubscribe();
  }

  /**
   * デバッグ用に当たり判定を表示する
   *
   * @param visible trueで当たり判定を表示する
   */
  setVisible(visible: boolean): void {
    this.#mesh.material.visible = visible;
  }

  /** 
   * シーンに追加するオブジェクトを取得する
   * 
   * @return 取得結果
   */
  getObject3D(): typeof THREE.Object3D {
    return this.#mesh;
  }

  /**
   * ボタン押下開始通知
   * 
   * @return 通知ストリーム
   */
  pushStartNotifier(): Stream<Event> {
    return this.#pushStart;
  }

  /**
   * ボタン押下キャンセル通知
   * 
   * @return 通知ストリーム
   */
  pushCancelNotifier(): Stream<Event> {
    return this.#pushCancel;
  }

  /**
   * ボタン押下終了通知
   * 
   * @return 通知ストリーム
   */
  pushEndNotifier(): Stream<Event> {
    return this.#pushEnd;
  }

  /**
   * ロングボタン押下通知
   * 
   * @return 通知ストリーム
   */
  longPushNotifier(): Stream<Event> {
    return this.#longPush;
  }

  /** 
   * マウスダウン時の処理
   * 
   * @param action アクション
   */
  #mouseDownRaycaster(action: MouseDownRaycaster): void {
    if (isMeshOverlap(action.mouse.raycaster, this.#mesh)) {
      this.#pushStart.next(action.event);
    }
  }

  /** 
   * タッチスタート時の処理
   * 
   * @param action アクション
   */
  #touchStartRaycaster(action: TouchStartRaycaster): void {
    const overlapTouches = action.touch.targetTouches
      .filter(v => isMeshOverlap(v.raycaster, this.#mesh));
    const isTouchOverlap = 0 < overlapTouches.length;
    if (isTouchOverlap) {
      this.#pushStart.next(action.event);
    }
  }
}