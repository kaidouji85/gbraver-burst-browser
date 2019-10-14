// @flow

import type {Scene} from "../scene";
import type {Resources} from "../../../resource";
import {Observable, Subject, Subscription} from "rxjs";
import type {GameLoop} from "../../../action/game-loop/game-loop";
import type {DOMEvent} from "../../../action/dom-event";
import {TitleView} from "./view";
import type {Render} from "../../../action/game-loop/render";
import type {EndTitle} from "../../../action/game/end-title";
import type {ScreenTouch} from "../../../action/title-scene/title-scene-action";
import {process} from '../../../animation/process';

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  rendererDOM: HTMLElement,
  listener: {
    domEvent: Observable<DOMEvent>,
    gameLoop: Observable<GameLoop>
  }
};

/** イベント通知 */
type Notifier = {
  render: Observable<Render>,
  endTitle: Observable<EndTitle>,
};

/** タイトルシーン */
export class TitleScene implements Scene {
  _view: TitleView;
  _endTitle: Subject<EndTitle>;
  _subscription: Subscription[];

  constructor(param: Param) {
    this._endTitle = new Subject();
    this._view = new TitleView({
      resources: param.resources,
      rendererDOM: param.rendererDOM,
      listener: {
        gameLoop: param.listener.gameLoop,
        domEvent: param.listener.domEvent
      }
    });
    this._subscription = [
      this._view.notifier().titleAction.subscribe(action => {
        if (action.type === 'ScreenTouch') {
          this._onScreenTouch(action);
        }
      })
    ];
  }

  /** デストラクタ相当の処理 */
  destructor() {
    this._view.destructor();
    this._subscription.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      render: this._view.notifier().render,
      endTitle: this._endTitle,
    }
  }

  /**
   * 画面タッチの際のイベント
   *
   * @param action アクション
   */
  _onScreenTouch(action: ScreenTouch): void {
    const animation = this._view.hud.fader.fadeOut().chain(process(() => {
      this._endTitle.next({type: 'EndTitle'});
    }));
    animation.play();
  }
}