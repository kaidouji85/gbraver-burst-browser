// @flow

import type {Resources} from "../../../../../resource";
import {Renderer} from "../../../../../game-object/renderer";
import type {BattleRoom, InitialState} from "../../../../../battle-room/battle-room";
import {BoundSceneCache} from "../bound-scene-cache";
import {BattleScene} from "./battle-scene";
import {ThreeJSCanvasStream} from "../../stream";

/**
 * 戦闘シーンをゲームに関連付ける
 *
 * @param resources リソース管理オブジェクト
 * @param renderer レンダラ
 * @param stream Gameで使うストリーム
 * @param battleRoom 戦闘ルーム
 * @param initialState 初期状態
 * @return シーン関連付けキャッシュ
 */
export function bindBattleScene(resources: Resources, renderer: Renderer, stream: ThreeJSCanvasStream, battleRoom: BattleRoom, initialState: InitialState): BoundSceneCache {
  const scene = new BattleScene({
    resources: resources,
    rendererDOM: renderer.getRendererDOM(),
    battleRoom: battleRoom,
    initialState: initialState,
    listener: {
      domEvent: renderer.notifier().domEvent,
      gameLoop: stream.gameLoop,
    }
  });
  const subscription = [
    scene.notifier().render.subscribe(stream.render),
    scene.notifier().endBattle.subscribe(stream.endBattle)
  ];
  return new BoundSceneCache(scene, subscription);
}