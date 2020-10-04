// @flow

import {Howl} from 'howler';
import type {DOMScene} from "../dom-scene";
import {Observable, Subject, Subscription} from "rxjs";
import {NPCEndingView} from "./view/npc-ending-view";
import type {NPCEndingState} from "./state/npc-ending-state";
import {createInitialState} from "./state/initial-state";
import type {Resources} from "../../../resource";
import {SOUND_IDS} from "../../../resource/sound";
import type {EndNPCEnding} from "../../actions/actions";

/** イベント通知 */
type Notifier  = {
  endNpcEnding: Observable<void>
};

/**
 * NPCルート エンディング
 */
export class NPCEnding implements DOMScene {
  _state: NPCEndingState;
  _view: NPCEndingView;
  _pushButtonSound: typeof Howl;
  _endNPCEnding: Subject<void>;
  _subscriptions: Subscription[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._state = createInitialState();
    this._endNPCEnding = new Subject();
    this._view = new NPCEndingView(resources);

    const pushButtonResource = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON);
    this._pushButtonSound = pushButtonResource
      ? pushButtonResource.sound
      : new Howl();

    this._subscriptions = [
      this._view.notifier().screenPush.subscribe(() => {
        this._onScreenPush();
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._view.destructor();
    this._subscriptions.forEach(v => {
      v.unsubscribe();
    })
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._view.getRootHTMLElement();
  }

  /**
   * イベント通知
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      endNpcEnding: this._endNPCEnding
    };
  }

  /**
   * 各種リソースの読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  waitUntilLoaded(): Promise<void> {
    return this._view.waitUntilLoaded();
  }

  /**
   * 画面がクリックされた際の処理
   */
  _onScreenPush(): void {
    if (!this._state.canOperate) {
      return;
    }
    
    this._state.canOperate = false;
    this._pushButtonSound.play();
    this._endNPCEnding.next();
  }
}