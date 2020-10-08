// @flow

import {Howl} from 'howler';
import type {DOMScene} from "../dom-scene";
import {Observable, Subject, Subscription} from "rxjs";
import {ArmDozerIdList} from "gbraver-burst-core";
import {waitTime} from "../../../wait/wait-time";
import type {Resources} from "../../../resource";
import {SOUND_IDS} from "../../../resource/sound";
import type {ArmDozerId} from "gbraver-burst-core/lib/player/armdozer";
import {ArmdozerIcon} from "./armdozer-icon";
import {PlayerSelectPresentation} from "./presentation";

/**
 * プレイヤーの選択内容
 */
type Choices = {
  armdozerId: ArmDozerId
};

/**
 * イベント通知
 */
export type Notifier = {
  selectionComplete: Observable<Choices>
};

/**
 * プレイヤーセレクト
 */
export class PlayerSelect implements DOMScene {
  _canOperation: boolean;
  _presentation: PlayerSelectPresentation;
  _pushButtonSound: typeof Howl;
  _selectionComplete: Subject<Choices>;
  _subscriptions: Subscription[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._selectionComplete = new Subject();
    this._canOperation = true;

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
    this._presentation = new PlayerSelectPresentation(resources, armDozerIds);

    this._subscriptions = [
      this._presentation._armdozerSelector.notifier().armdozerSelect.subscribe(v => {
        this._onArmdozerSelect(v);
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
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this._presentation.getRootHTMLElement();
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
    return this._presentation._armdozerSelector.waitUntilLoaded();
  }

  /**
   * アームドーザアイコンが選択された際の処理
   *
   * @param icon 選択されたアイコン
   */
  async _onArmdozerSelect(icon: ArmdozerIcon): Promise<void> {
    if (!this._canOperation) {
      return;
    }
    this._canOperation = false;

    this._pushButtonSound.play();
    await icon.selected();
    await waitTime(1000);

    this._selectionComplete.next({
      armdozerId: icon.armDozerId,
    });
  }
}
