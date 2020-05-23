// @flow

import type {DOMScene} from "../dom-scene";
import type {ResourcePath} from "../../../resource/path/resource-path";
import {Observable, Subject, Subscription} from "rxjs";
import type {EndNPCEnding} from "../../../action/game/npc-ending";
import {NPCEndingView} from "./view/npc-ending-view";

/** イベント通知 */
type Notifier  = {
  endNpcEnding: Observable<EndNPCEnding>
};

/**
 * NPCルート エンディング
 */
export class NPCEnding implements DOMScene {
  _view: NPCEndingView;
  _endNPCEnding: Subject<EndNPCEnding>;
  _subsctiptoons: Subscription[];

  /**
   * コンストラクタ
   *
   * @param resourcePath リソースパス
   */
  constructor(resourcePath: ResourcePath) {
    this._endNPCEnding = new Subject();
    this._view = new NPCEndingView(resourcePath);
    this._subsctiptoons = [
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
    this._endNPCEnding.next();
  }
}