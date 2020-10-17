// @flow

import type {Resources} from "../../../resource";
import {ArmdozerSelector} from "./armdozer/armdozer-selector";
import type {ArmDozerId, PilotId} from "gbraver-burst-core";
import {Observable, Subject, Subscription} from "rxjs";
import {PilotSelector} from "./pilot-selector";
import {domUuid} from "../../../uuid/dom-uuid";
import {ArmdozerBustShotContainer} from "./armdozer/armdozer-bust-shot-container";
import {PilotBustShot} from "./pilot-bust-shot";
import {ArmDozerIdList} from "gbraver-burst-core/lib/master/armdozers";

// TODO js-docを書く
/**
 * プレイヤーセレクト プレゼンテーション
 */
export class PlayerSelectPresentation {
  _root: HTMLElement;
  _armdozerBustShot: ArmdozerBustShotContainer;
  _pilotBustShot: PilotBustShot;
  _armdozerSelector: ArmdozerSelector;
  _pilotSelector: PilotSelector;
  _armdozerDecided: Subject<ArmDozerId>;
  _subscriptions: Subscription[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param armDozerIds 選択できるアームドーザのID
   * @param pilotIds 選択できるパイロットのID
   */
  constructor(resources: Resources, armDozerIds: ArmDozerId[], pilotIds: PilotId[]) {
    const selectorId = domUuid();
    const workingId = domUuid();

    this._armdozerDecided = new Subject();

    this._root = document.createElement('div');
    this._root.className = 'player-select';
    this._root.innerHTML = `
      <div class="player-select__working" data-id="${workingId}"></div>
      <div class="player-select__selector" data-id="${selectorId}"></div>
    `;

    const working = this._root.querySelector(`[data-id="${workingId}"]`)
      ?? document.createElement('div');

    this._armdozerBustShot = new ArmdozerBustShotContainer(resources, armDozerIds);
    working.appendChild(this._armdozerBustShot.getRootHTMLElement());

    this._pilotBustShot = new PilotBustShot(resources);
    working.appendChild(this._pilotBustShot.getRootHTMLElement());

    const selector = this._root.querySelector(`[data-id="${selectorId}"]`)
      ?? document.createElement('div');

    this._armdozerSelector = new ArmdozerSelector(resources,armDozerIds);
    selector.appendChild(this._armdozerSelector.getRootHTMLElement());

    this._pilotSelector = new PilotSelector(resources, pilotIds);
    selector.appendChild(this._pilotSelector.getRootHTMLElement());

    this._subscriptions = [
      this._armdozerSelector.changeNotifier().subscribe(v => {
        this._onArmdozerIconPush(v);
      }),
      this._armdozerSelector.decideNotifier().subscribe(v => {
        this._onArmdozerDecided(v);
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._armdozerSelector.destructor();
    this._pilotSelector.destructor();
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
    return this._root;
  }

  /**
   * アームドーザセレクタを表示する
   */
  showArmdozerSelector(): void {
    this._armdozerSelector.show();
    this._pilotSelector.hidden();
  }

  /**
   * パイロットセレクタを表示する
   */
  showPilotSelector(): void {
    this._pilotSelector.show();
    this._armdozerSelector.hidden();
  }

  /**
   * リソース読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all([
      this._armdozerSelector.waitUntilLoaded(),
      this._pilotSelector.waitUntilLoaded()
    ]);
  }

  /**
   * アームドーザ選択の通知
   *
   * @return イベント通知ストリーム
   */
  armdozerDecidedNotifier(): Observable<ArmDozerId> {
    return this._armdozerDecided;
  }

  /**
   * パイロット選択の通知
   *
   * @return イベント通知ストリーム
   */
  pilotSelectedNotifier(): Observable<PilotId> {
    return this._pilotSelector.pilotSelectedNotifier();
  }

  _onArmdozerIconPush(armdozerId: ArmDozerId): void {
    this._armdozerBustShot.switch(armdozerId);
  }

  _onArmdozerDecided(armdozerId: ArmDozerId): void {
    this._armdozerDecided.next(armdozerId);
  }
}