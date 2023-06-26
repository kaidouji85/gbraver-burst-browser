import { Observable, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { PreRender } from "../../game-loop/pre-render";
import { GameObjectAction } from "../action/game-object-action";

/** 座標 */
type Position = {
  /** x座標 */
  x: number;
  /** y座標 */
  y: number;
};

/** ベースとなる線の長さ */
const BaseLength = 100;

/** パラメータ */
type Params = {
  /** 線の色 */
  color: THREE.ColorRepresentation;
  /** 線の幅 */
  width: number,
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** 引き出し線 */
export class Leadline {
  /** メッシュ */
  #mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param color 線の色
   * @param width 線の太さ
   */
  constructor(params: Params) {
    const geometry = new THREE.PlaneGeometry(BaseLength, params.width);
    const material = new THREE.MeshBasicMaterial({
      color: params.color,
      side: THREE.DoubleSide,
    });
    this.#mesh = new THREE.Mesh(geometry, material);
    this.#unsubscribers = [
      params.gameObjectAction.subscribe((action) => {
        if (action.type === "PreRender") {
          this.#onPreRender(action);
        }
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#mesh.material.dispose();
    this.#mesh.geometry.dispose();
    this.#unsubscribers.forEach(unsubscriber => unsubscriber.unsubscribe());
  }

  /**
   * 引数の点A、点Bを結ぶ線を引き出し線とする
   * @param a 点A
   * @param b 点B
   */
  set(a: Position, b: Position): void {
    const length = Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    this.#mesh.scale.x = length / BaseLength;
    this.#mesh.position.x = a.x + (b.x - a.x) / 2;
    this.#mesh.position.y = a.y + (b.y - a.y) / 2;
    const radian = Math.atan2(b.y - a.y, b.x - a.x);
    this.#mesh.rotation.z = radian;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#mesh;
  }

  /**
   * プリレンダー時の処理
   * @param action アクション
   */
  #onPreRender(action: PreRender): void {
    this.#mesh.quaternion.copy(action.camera.quaternion);
  }
}
