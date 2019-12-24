// @flow

import {Subscription} from "rxjs";
import type {Scene} from "./scene";

/**
 * Gameに関連づけされたシーンのキャッシュ
 * シーンを変更する際には、各種リソースを解放する必要があるが、
 * 本クラスはそれらをまとめたものである
 * なお、本クラスはGame内部でのみ使用されることを想定している
 */
export class BoundSceneCache {
  scene: Scene;
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