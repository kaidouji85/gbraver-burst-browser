// @flow

import type {Resources} from "../../resource";
import {Renderer} from "../../game-object/renderer";
import {BoundSceneCache} from "./bound-scene-cache";
import {TitleScene} from "../scene/title";
import {GameStream} from "../stream";

/**
 * タイトルシーンをゲームに関連付けする
 *
 * @param resources リソース管理オブジェクト
 * @param renderer レンダラ
 * @param stream Game全体のストリーム
 * @return シーン関連付けキャッシュ
 */
export function bindTitleScene(resources: Resources, renderer: Renderer, stream: GameStream): BoundSceneCache {
  const scene = new TitleScene({
    resources: resources,
    rendererDOM: renderer.getRendererDOM(),
    listener: {
      domEvent: renderer.notifier().domEvent,
      gameLoop: stream.gameLoop,
    }
  });
  const subscription = [
    scene.notifier().render.subscribe(stream.render),
    scene.notifier().endTitle.subscribe(stream.gameAction),
  ];
  return new BoundSceneCache(scene, subscription);
}