// @flow

import {Observable, Subject} from "rxjs";
import type {Render} from "../action/game-loop/render";
import type {GameAction} from "../action/game/game-action";
import type {GameLoop} from "../action/game-loop/game-loop";
import {createGameLoopListener} from "../action/game-loop/create-listener";

/** three.jsキャンバスで使用するイベントストリーム */
export class ThreeJSCanvasStream {
  /**
   * レンダリングのストリーム
   * シーンからレンダラにレンダリングイベントを伝搬するために利用する
   * 状況によりシーンは動的に切り替わるので、本プロパティが以下のように緩衝材となる
   *
   * Scene -> ThreeJSCanvasStream::render -> Renderer
   */
  render: Subject<Render>;

  /**
   * ゲームアクションのストリーム
   * シーンからゲームにアクションを伝えるために利用する
   * シーンは動的に入れ替わるので、本プロパティが以下のように緩衝材となる
   *
   * Scene -> ThreeJSCanvasStream::gameAction -> Game
   */
  gameAction: Subject<GameAction>;

  /**
   * ゲームループのストリーム
   */
  gameLoop: Observable<GameLoop>;

  constructor() {
    this.render = new Subject();
    this.gameAction = new Subject();
    this.gameLoop = createGameLoopListener();
  }
}