/// @flow

import {createInitialState} from "./state/initial-state";
import type {TitleState} from "./state/title-state";
import {Observable, Subject, Subscription} from "rxjs";
import {TitlePresentation} from "./title-view";
import type {DOMScene} from "../dom-scene";
import type {Resources} from "../../../resource";
import {Howl} from 'howler';
import {SOUND_IDS} from "../../../resource/sound";

/** イベント通知 */
export type Notifier = {
  pushGameStart: Observable<void>,
  pushHowToPlay: Observable<void>,
};

/** タイトルシーン */
export class Title implements DOMScene {
  _state: TitleState;
  _presentation: TitlePresentation;
  _pushButton: typeof Howl;
  _pushGameStart: Subject<void>;
  _pushHowToPlay: Subject<void>;
  _subscriptions: Subscription[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._state = createInitialState();
    this._presentation = new TitlePresentation(resources);

    const pushButtonResource = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON);
    this._pushButton = pushButtonResource
      ? pushButtonResource.sound
      : new Howl();

    this._pushGameStart = new Subject();
    this._pushHowToPlay = new Subject();
    this._subscriptions = [
      this._presentation.notifier().gameStart.subscribe(() => {
        this._onPushGameStart();
      }),
      this._presentation.notifier().howToPlay.subscribe(() => {
        this._onPushHowToPlay();
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._subscriptions.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * 各種リソースの読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  waitUntilLoaded(): Promise<void> {
    return this._presentation.waitUntilLoaded();
  }

  /** イベント通知ストリーム */
  notifier(): Notifier {
    return {
      pushGameStart: this._pushGameStart,
      pushHowToPlay: this._pushHowToPlay,
    };
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return {HTMLElement}
   */
  getRootHTMLElement(): HTMLElement {
    return this._presentation.getRootHTMLElement();
  }

  /**
   * ゲームスタートが押された際の処理
   */
  async _onPushGameStart(): Promise<void> {
    if (!this._state.canOperation) {
      return;
    }

    this._state.canOperation = false;
    this._pushButton.play();
    await this._presentation.pushGameStartButton();
    this._pushGameStart.next();
  }

  /**
   * 遊び方が押された際の処理
   */
  async _onPushHowToPlay(): Promise<void> {
    if (!this._state.canOperation) {
      return;
    }

    this._state.canOperation = false;
    this._presentation.pushHowToPlayButton();
    this._pushHowToPlay.next();
    this._state.canOperation = true;
  }
}
