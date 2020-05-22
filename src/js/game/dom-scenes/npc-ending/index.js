// @flow

import type {DOMScene} from "../dom-scene";
import type {ResourcePath} from "../../../resource/path/resource-path";
import {Observable, Subject} from "rxjs";
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
  _end: Subject<EndNPCEnding>;

  /**
   * コンストラクタ
   *
   * @param resourcePath リソースパス
   */
  constructor(resourcePath: ResourcePath) {
    this._end = new Subject();
    setTimeout(() => {
      this._end.next({
        type: 'EndNPCEnding'
      });
    }, 5000);

    this._view = new NPCEndingView(resourcePath);
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
      endNpcEnding: this._end
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
}