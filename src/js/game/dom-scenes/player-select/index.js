// @flow

import type {DOMScene} from "../dom-scene";
import {Observable, Subject, Subscription} from "rxjs";
import {ArmDozerIdList} from "gbraver-burst-core";
import type {Resources} from "../../../resource";
import type {ArmDozerId} from "gbraver-burst-core/lib/player/armdozer";
import {PlayerSelectPresentation} from "./presentation";
import {PilotIds} from "gbraver-burst-core/lib/master/pilots";
import type {PilotId} from "gbraver-burst-core";

/**
 * プレイヤーの選択内容
 */
type PlayerSelected = {
  armdozerId: ArmDozerId,
  pilotId: PilotId
};

/**
 * プレイヤーセレクト
 */
export class PlayerSelect implements DOMScene {
  _presentation: PlayerSelectPresentation;
  _playerSelected: PlayerSelected;
  _selectionComplete: Subject<PlayerSelected>;
  _subscriptions: Subscription[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this._playerSelected = {
      armdozerId: ArmDozerIdList.SHIN_BRAVER,
      pilotId: PilotIds.SHINYA
    };
    this._selectionComplete = new Subject();

    const armDozerIds = [
      ArmDozerIdList.NEO_LANDOZER,
      ArmDozerIdList.SHIN_BRAVER,
      ArmDozerIdList.WING_DOZER,
      ArmDozerIdList.LIGHTNING_DOZER,
    ];
    const pilotIds = [
      PilotIds.SHINYA,
      PilotIds.GAI,
    ];
    this._presentation = new PlayerSelectPresentation(resources, armDozerIds, pilotIds);
    this._presentation.showArmdozerSelector();

    this._subscriptions = [
      this._presentation.armdozerSelectedNotifier().subscribe(v => {
        this._onArmdozerSelect(v);
      }),
      this._presentation.pilotSelectedNotifier().subscribe(v => {
        this._onPilotSelect(v);
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
   * 選択完了通知
   *
   * @return 選択内容
   */
  selectionCompleteNotifier(): Observable<PlayerSelected> {
    return this._selectionComplete;
  }

  /**
   * リソース読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  waitUntilLoaded(): Promise<void> {
    return this._presentation.waitUntilLoaded();
  }

  /**
   * アームドーザアイコンが選択された際の処理
   *
   * @param armdozerId 選択されたアームドーザID
   */
  _onArmdozerSelect(armdozerId: ArmDozerId): void {
    this._playerSelected.armdozerId = armdozerId;
    this._presentation.showPilotSelector();
  }

  /**
   * パイロットアイコンが選択された際の処理
   *
   * @param pilotId 選択されたパイロットID
   */
  _onPilotSelect(pilotId: PilotId): void {
    this._playerSelected.pilotId = pilotId;
    this._selectionComplete.next(this._playerSelected);
  }
}
