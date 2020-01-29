// @flow

import {Observable, Subject} from "rxjs";
import type {Render} from "../../../action/game-loop/render";
import type {GameLoop} from "../../../action/game-loop/game-loop";
import {gameLoopStream} from "../../../action/game-loop/game-loop-stream";
import type {EndBattle} from "../../../action/game/end-battle";

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
   * 戦闘終了アクションのストリーム
   * シーンは動的に入れ替わるので、本プロパティが以下のように緩衝材となる
   *
   * Battle -> ThreeJSCanvasStream::endBattle -> Game
   */
  endBattle: Subject<EndBattle>;

  /**
   * ゲームループのストリーム
   */
  gameLoop: Observable<GameLoop>;

  constructor() {
    this.render = new Subject();
    this.endBattle = new Subject();
    this.gameLoop = gameLoopStream();
  }
}