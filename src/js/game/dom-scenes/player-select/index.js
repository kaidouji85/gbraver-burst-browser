// @flow

import {Howl} from 'howler';
import {PlayerSelectView} from "./view/player-select-view";
import type {PlayerSelectState} from "./state/player-select-state";
import {createInitialState} from "./state/initial-state";
import type {DOMScene} from "../dom-scene";
import {Observable, Subject, Subscription} from "rxjs";
import type {SelectionComplete} from "../../../action/game/selection-complete";
import {ArmDozerIdList} from "gbraver-burst-core";
import type {SelectArmdozer} from "../../../action/player-select/select-armdozer";
import {waitTime} from "../../../wait/wait-time";
import type {Resources} from "../../../resource";
import {SOUND_IDS} from "../../../resource/sound";

/**
 * イベント通知
 */
export type Notifier = {
  selectionComplete: Observable<SelectionComplete>
};

/**
 * プレイヤーセレクト
 */
export class PlayerSelect implements DOMScene {
  _state: PlayerSelectState;
  _view: PlayerSelectView;
  _pushButtonSound: typeof Howl;
  _selectionComplete: Subject<SelectionComplete>;
  _subscription: Subscription;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {

    this._selectionComplete = new Subject();
    this._state = createInitialState();
    
    const pushButtonResource = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON);
    this._pushButtonSound = pushButtonResource
      ? pushButtonResource.sound
      : new Howl();

    const armDozerIds = [
      ArmDozerIdList.NEO_LANDOZER,
      ArmDozerIdList.SHIN_BRAVER,
      ArmDozerIdList.WING_DOZER,
      ArmDozerIdList.LIGHTNING_DOZER,
    ];
    this._view = new PlayerSelectView(resources, armDozerIds);

    this._subscription = this._view.notifier().select.subscribe(icon => {
      this._onArmdozerIconPush(icon);
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._subscription.unsubscribe();
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
   * @return 取得結果
   */
  notifier(): Notifier {
    return {
      selectionComplete: this._selectionComplete
    };
  }

  /**
   * リソース読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  waitUntilLoaded(): Promise<void> {
    return this._view.waitUntilLoaded();
  }

  /**
   * アームドーザアイコンが選択された際の処理
   *
   * @param action アクション
   */
  async _onArmdozerIconPush(action: SelectArmdozer): Promise<void> {
    if (!this._state.canOperation) {
      return;
    }

    this._state.canOperation = false;

    this._pushButtonSound.play();
    const selected = this._view.armdozerIcons
      .find(icon => icon.armDozerId === action.armDozerId);
    if (!selected) {
      return;
    }

    await  selected.selected();
    await waitTime(1000);

    this._selectionComplete.next({
      type: 'SelectionComplete',
      armdozerId: action.armDozerId,
    });
  }
}
