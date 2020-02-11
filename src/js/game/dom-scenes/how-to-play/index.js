// @flow

import {HowToPlayView} from "./view/how-to-play-view";
import type {HowToPlayState} from "./state/how-to-play-state";
import {createInitialState} from "./state/initial-state";
import {show} from "./state/show";
import {Observable, Subscription} from "rxjs";
import type {EndHowToPlay} from "../../../action/game/end-how-to-play";
import {filter, map} from "rxjs/operators";
import {hidden} from "./state/hidden";
import {pageChange} from "./state/page-change";

/** イベント通知 */
type Notifier = {
  endHowToPlay: Observable<EndHowToPlay>
};

/** 遊び方シーン */
export class HowToPlay {
  _state: HowToPlayState;
  _view: HowToPlayView;
  _endHowToPlay: Observable<EndHowToPlay>;
  _subscriptions: Subscription[];

  constructor(dom: HTMLElement) {
    this._state = createInitialState();
    this._view = new HowToPlayView(dom);
    this._view.engage(this._state);

    this._endHowToPlay = this._view.notifier().prev.pipe(
      filter(() => this._state.canOperation),
      map(() => ({
        type: 'EndHowToPlay'
      }))
    );

    this._subscriptions = [
      this._view.notifier().paging.subscribe((value: number) => {
        this._onPageChange(value);
      })
    ];
  }

  /**
   * シーンを表示する
   */
  show(): void {
    this._state = show(this._state);
    this._view.engage(this._state);
  }

  /**
   * シーンを非表示にする
   */
  hidden(): void {
    this._state = hidden(this._state);
    this._view.engage(this._state);
  }

  /**
   * イベント通利ストリームを取得する
   *
   * @return イベント通利ストリーム
   */
  notifier(): Notifier {
    return {
      endHowToPlay: this._endHowToPlay
    };
  }

  /**
   * ページングが変更された際のイベント
   *
   * @param difference ページ変化量
   */
  _onPageChange(difference: number): void {
    this._state = pageChange(this._state, difference);
    this._view.engage(this._state);
  }
}