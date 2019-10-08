// @flow

import {Observable, Subject, Subscription} from "rxjs";
import type {DOMEvent} from "../../../../action/dom-event";
import {TitleHudLayer} from "./hud";
import type {GameLoop} from "../../../../action/game-loop/game-loop";
import type {Render} from "../../../../action/game-loop/render";
import type {Resources} from "../../../../resource";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  rendererDOM: HTMLElement,
  listener: {
    gameLoop: Observable<GameLoop>,
    domEvent: Observable<DOMEvent>
  }
};

/** イベント通知 */
type Notifier = {
  render: Observable<Render>
};

/** タイトルシーンビュー */
export class TitleView {
  hud: TitleHudLayer;

  _hudGameLoop: Subject<GameLoop>;
  _subscription: Subscription;

  constructor(param: Param) {
    this._hudGameLoop = new Subject();

    this.hud = new TitleHudLayer({
      resources: param.resources,
      rendererDOM: param.rendererDOM,
      listener: {
        gameLoop: this._hudGameLoop,
        domEvent: param.listener.domEvent
      }
    });

    this._subscription = param.listener.gameLoop.subscribe(action => {
      this._onGameLoop(action);
    });
  }

  /** デストラクタ相当処理 */
  destructor(): void {
    this.hud.destructor();
    this._subscription.unsubscribe();
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      render: this.hud.notifier().render
    }
  }

  /**
   * ゲームループの際の処理
   *
   * @param action アクション
   */
  _onGameLoop(action: GameLoop): void {
    this._hudGameLoop.next(action);
  }
}