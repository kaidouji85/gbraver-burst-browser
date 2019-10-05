// @flow

import type {Scene} from "./scene/scene";
import {Subscription} from "rxjs";
import {emptyScene} from "./scene/scene";

/**
 * Gameに関連付けされたシーン
 * 本クラスはGame内部でのみ使用されることを想定している
 */
export class BoundScene {
  /** シーン */
  scene: Scene;

  /**
   * シーンイベント通知 -> ゲームサブジェクト をチェインした結果生成されたサブスクリプション
   * アクティブシーン変更時にサブスクリプションを破棄する必要があるため、
   * 本プロパティにキャッシュをする
   */
  subscription: Subscription[];
  
  constructor(scene: Scene, subscription: Subscription[]) {
    this.scene = scene;
    this.subscription = subscription;
  }

  /** デストラクタ相当処理 */
  destructor(): void {
    this.scene.destructor();
    this.subscription.forEach(v => {
      v.unsubscribe();
    });
  }
}

/**
 * 空のBoundSceneを生成する
 *
 * @return 生成結果
 */
export function emptyBoundScene(): BoundScene {
  return new BoundScene(new emptyScene(), []);
}

