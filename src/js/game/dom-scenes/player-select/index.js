// @flow

import type {Resources} from "../../../resource";
import {ArmdozerSelector} from "./armdozer-selector";
import type {ArmDozerId, PilotId} from "gbraver-burst-core";
import {PilotSelector} from "./pilot-selector";
import {domUuid} from "../../../uuid/dom-uuid";
import {ArmdozerBustShotContainer} from "./armdozer-bust-shot";
import {PilotBustShotContainer} from "./pilot-bust-shot";
import {ArmDozerIdList, PilotIds} from "gbraver-burst-core";
import type {DOMScene} from "../dom-scene";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/core";
import {RxjsStreamSource} from "../../../stream/rxjs";
import {getDedicatedPilot} from "./dedicated-pilot";

/** data-idを集めたもの */
type DataIDs = {
  selector: string,
  working: string
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs): string {
  return `
    <div class="player-select__working" data-id="${ids.working}"></div>
    <div class="player-select__selector" data-id="${ids.selector}"></div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  selector: HTMLElement,
  working: HTMLElement,
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const working = root.querySelector(`[data-id="${ids.working}"]`)
    ?? document.createElement('div');
  const selector = root.querySelector(`[data-id="${ids.selector}"]`)
    ?? document.createElement('div');
  return {working, selector};
}

/** プレイヤーの選択内容 */
type PlayerDecide = {
  armdozerId: ArmDozerId,
  pilotId: PilotId
};

/** プレイヤーセレクト */
export class PlayerSelect implements DOMScene {
  _root: HTMLElement;
  _armdozerBustShot: ArmdozerBustShotContainer;
  _pilotBustShot: PilotBustShotContainer;
  _armdozerSelector: ArmdozerSelector;
  _pilotSelector: PilotSelector;
  _armdozerId: ArmDozerId;
  _pilotId: PilotId;
  _playerDecide: StreamSource<PlayerDecide>;
  _prev: StreamSource<void>;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const armDozerIds = [
      ArmDozerIdList.SHIN_BRAVER,
      ArmDozerIdList.NEO_LANDOZER,
      ArmDozerIdList.LIGHTNING_DOZER,
      ArmDozerIdList.WING_DOZER,
    ];
    const pilotIds = [
      PilotIds.SHINYA,
      PilotIds.GAI,
      PilotIds.RAITO,
      PilotIds.TSUBASA,
    ];
    this._armdozerId = ArmDozerIdList.SHIN_BRAVER
    this._pilotId = PilotIds.SHINYA;

    this._playerDecide = new RxjsStreamSource();
    this._prev = new RxjsStreamSource();
    
    const dataIDs = {selector: domUuid(), working: domUuid()};
    this._root = document.createElement('div');
    this._root.className = 'player-select';
    this._root.innerHTML = rootInnerHTML(dataIDs);
    const elements = extractElements(this._root, dataIDs);

    this._armdozerBustShot = new ArmdozerBustShotContainer(resources, armDozerIds, this._armdozerId);
    elements.working.appendChild(this._armdozerBustShot.getRootHTMLElement());

    this._pilotBustShot = new PilotBustShotContainer(resources, pilotIds, this._pilotId);
    this._pilotBustShot.hidden();
    elements.working.appendChild(this._pilotBustShot.getRootHTMLElement());

    this._armdozerSelector = new ArmdozerSelector(resources,armDozerIds, this._armdozerId);
    elements.selector.appendChild(this._armdozerSelector.getRootHTMLElement());

    this._pilotSelector = new PilotSelector(resources, pilotIds, this._pilotId);
    this._pilotSelector.hidden();
    elements.selector.appendChild(this._pilotSelector.getRootHTMLElement());

    this._unsubscribers = [
      this._armdozerSelector.changeNotifier().subscribe(v => {
        this._onArmdozerChange(v);
      }),
      this._armdozerSelector.decideNotifier().subscribe(v => {
        this._onArmdozerDecided(v);
      }),
      this._armdozerSelector.prevNotifier().subscribe(() => {
        this._onArmdozerSelectorPrev();
      }),
      this._pilotSelector.changeNotifier().subscribe(v => {
        this._onPilotChange(v);
      }),
      this._pilotSelector.decideNotifier().subscribe(v => {
        this._onPilotDecided(v);
      }),
      this._pilotSelector.prevNotifier().subscribe(() => {
        this._onPilotSelectorPrev();
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._armdozerSelector.destructor();
    this._pilotSelector.destructor();
    this._unsubscribers.forEach(v => {
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
   * リソース読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all([
      this._armdozerBustShot.waitUntilLoaded(),
      this._armdozerSelector.waitUntilLoaded(),
      this._pilotBustShot.waitUnlillLoaded(),
      this._pilotSelector.waitUntilLoaded()
    ]);
  }

  /**
   * 選択完了通知
   *
   * @return 通知ストリーム
   */
  decideNotifier(): Stream<PlayerDecide> {
    return this._playerDecide;
  }

  /**
   * 戻る通知
   * @return 通知ストリーム
   */
  prevNotifier(): Stream<void> {
    return this._prev;
  }
  
  /**
   * アームドーザを変更した時の処理
   *
   * @param armdozerId 変更したアームドーザID
   */
  _onArmdozerChange(armdozerId: ArmDozerId): void {
    this._armdozerBustShot.switch(armdozerId);
  }

  /**
   * アームドーザを決定した時の処理
   *
   * @param armdozerId 決定したアームドーザID
   */
  _onArmdozerDecided(armdozerId: ArmDozerId): void {
    this._armdozerId = armdozerId;
    this._pilotId = getDedicatedPilot(this._armdozerId)
    this._pilotBustShot.switch(this._pilotId);
    this._pilotSelector.show(this._pilotId);

    this._armdozerSelector.hidden();
  }

  /**
   * アームドーザセレクタの戻るボタンを押した時の処理
   */
  _onArmdozerSelectorPrev(): void {
    this._prev.next();
  }

  /**
   * パイロットが変更された時の処理
   *
   * @param pilotId 変更したパイロットID
   */
  _onPilotChange(pilotId: PilotId): void {
    this._pilotId = pilotId;
    this._pilotBustShot.switch(pilotId);
  }

  /**
   * パイロットを決定した時の処理
   *
   * @param pilotId 決定したパイロットID
   */
  _onPilotDecided(pilotId: PilotId): void {
    this._pilotId = pilotId;
    this._playerDecide.next({
      armdozerId: this._armdozerId,
      pilotId: this._pilotId
    });
  }

  /**
   * パイロットセレクタの戻るボタンを押した時の処理
   */
  async _onPilotSelectorPrev(): Promise<void> {
    await this._pilotBustShot.exit();
    this._pilotBustShot.hidden();
    this._pilotSelector.hidden();

    this._armdozerSelector.show();
  }
}