// @flow

import {Howl} from 'howler';
import type {DOMScene} from "../dom-scene";
import {Observable, Subject, Subscription} from "rxjs";
import {NPCEndingPresentation} from "./presentation";
import type {Resources} from "../../../resource";
import {SOUND_IDS} from "../../../resource/sound";

/** イベント通知 */
type Notifier  = {
  endNpcEnding: Observable<void>
};

/**
 * NPCルート エンディング
 */
export class NPCEnding implements DOMScene {
  _canOperate: boolean;
  _presentation: NPCEndingPresentation;
  _pushButtonSound: typeof Howl;
  _endNPCEnding: Subject<void>;
  _subscriptions: Subscription[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._canOperate = true;
    this._endNPCEnding = new Subject();
    this._presentation = new NPCEndingPresentation(resources);

    const pushButtonResource = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON);
    this._pushButtonSound = pushButtonResource
      ? pushButtonResource.sound
      : new Howl();

    this._subscriptions = [
      this._presentation.notifier().screenPush.subscribe(() => {
        this._onScreenPush();
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._presentation.destructor();
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
    return this._presentation.getRootHTMLElement();
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
    return this._presentation.waitUntilLoaded();
  }

  /**
   * 画面がクリックされた際の処理
   */
  _onScreenPush(): void {
    if (!this._canOperate) {
      return;
    }
    
    this._canOperate = false;
    this._pushButtonSound.play();
    this._endNPCEnding.next();
  }
}