// @flow

import type {Scene} from "./scene";
import {Subscription} from "rxjs";
import {emptyScene} from "./scene";

/** Gameに関連付けされたシーン */
export type BoundScene = {
  /** シーン */
  scene: Scene,

  /**
   * シーンイベント通知 -> ゲームサブジェクト をチェインした結果生成されたサブスクリプション
   * アクティブシーン変更時にサブスクリプションを破棄する必要があるため、
   * 本プロパティにキャッシュをする
   */
  subscription: Subscription[]
};

/**
 * 空のBoundSceneを生成する
 *
 * @return 生成結果
 */
export function emptyBoundScene(): BoundScene {
  return {
    scene: new emptyScene(),
    subscription: []
  };
}

export function disposeBoundScene(boundScene: BoundScene): void {
  boundScene.scene.destructor();
  boundScene.subscription.forEach(v => {
    v.unsubscribe();
  });
}