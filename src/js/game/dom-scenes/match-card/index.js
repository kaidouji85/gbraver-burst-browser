// @flow

import type {DOMScene} from "../dom-scene";
import {MatchCardView} from "./view/match-card-view";
import type {ResourcePath} from "../../../resource/path/resource-path";
import type {ArmDozerId} from "gbraver-burst-core/lib/player/armdozer/armdozer";
import {Observable, Subject} from "rxjs";
import type {EndMatchCard} from "../../../action/game/end-match-card";
import {waitTime} from "../../../wait/wait-time";

/**
 * イベント通知
 */
type Notifier = {
  endMatchCard: Observable<EndMatchCard>
};

/**
 * コンストラクタのパラメータ
 */
type Param = {
  resourcePath: ResourcePath,
  player: ArmDozerId,
  enemy: ArmDozerId,
  caption: string,
};

/**
 * 対戦カード
 */
export class MatchCard implements DOMScene {
  _view: MatchCardView;
  _endMatchCard: Subject<EndMatchCard>;

  /**
   * コンストラクタ
   */
  constructor(param: Param): void {
    this._view = new MatchCardView(param.resourcePath, param.player, param.enemy, param.caption);
    this._endMatchCard = new Subject();
    this._onStart();
  }
  
  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    // NOP
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this._view.getRootHTMLElement();
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      endMatchCard: this._endMatchCard
    };
  }

  /**
   * シーン開始時の処理
   *
   * @private
   */
  async _onStart(): Promise<void> {
    try {
      await waitTime(3000);
      this._endMatchCard.next({
        type: 'EndMatchCard'
      });
    } catch(e) {
      throw e;
    }
  }
}