// @flow
import type {ArmDozerId, PilotId} from "gbraver-burst-core";
import {ArmDozerIds, PilotIds} from "gbraver-burst-core";
import type {Resources} from "../../../resource";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/stream";
import {createStreamSource} from "../../../stream/stream";
import {domUuid} from "../../../uuid/dom-uuid";
import type {DOMScene} from "../dom-scene";
import {ArmdozerBustShotContainer} from "./armdozer-bust-shot";
import {ArmdozerSelector} from "./armdozer-selector";
import {getDedicatedPilot} from "./dedicated-pilot";
import {PilotBustShotContainer} from "./pilot-bust-shot";
import {PilotSelector} from "./pilot-selector";

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
  #root: HTMLElement;
  #armdozerBustShot: ArmdozerBustShotContainer;
  #pilotBustShot: PilotBustShotContainer;
  #armdozerSelector: ArmdozerSelector;
  #pilotSelector: PilotSelector;
  #armdozerId: ArmDozerId;
  #pilotId: PilotId;
  #playerDecide: StreamSource<PlayerDecide>;
  #prev: StreamSource<void>;
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const armDozerIds = [
      ArmDozerIds.SHIN_BRAVER,
      ArmDozerIds.WING_DOZER,
      ArmDozerIds.NEO_LANDOZER,
      ArmDozerIds.LIGHTNING_DOZER,
    ];
    const pilotIds = [
      PilotIds.SHINYA,
      PilotIds.TSUBASA,
      PilotIds.GAI,
      PilotIds.RAITO,
    ];
    this.#armdozerId = ArmDozerIds.SHIN_BRAVER
    this.#pilotId = PilotIds.SHINYA;

    this.#playerDecide = createStreamSource();
    this.#prev = createStreamSource();

    const dataIDs = {selector: domUuid(), working: domUuid()};
    this.#root = document.createElement('div');
    this.#root.className = 'player-select';
    this.#root.innerHTML = rootInnerHTML(dataIDs);
    const elements = extractElements(this.#root, dataIDs);

    this.#armdozerBustShot = new ArmdozerBustShotContainer(resources, armDozerIds, this.#armdozerId);
    elements.working.appendChild(this.#armdozerBustShot.getRootHTMLElement());

    this.#pilotBustShot = new PilotBustShotContainer(resources, pilotIds, this.#pilotId);
    this.#pilotBustShot.hidden();
    elements.working.appendChild(this.#pilotBustShot.getRootHTMLElement());

    this.#armdozerSelector = new ArmdozerSelector(resources,armDozerIds, this.#armdozerId);
    elements.selector.appendChild(this.#armdozerSelector.getRootHTMLElement());

    this.#pilotSelector = new PilotSelector(resources, pilotIds, this.#pilotId);
    this.#pilotSelector.hidden();
    elements.selector.appendChild(this.#pilotSelector.getRootHTMLElement());

    this.#unsubscribers = [
      this.#armdozerSelector.changeNotifier().subscribe(v => {
        this.#onArmdozerChange(v);
      }),
      this.#armdozerSelector.decideNotifier().subscribe(v => {
        this.#onArmdozerDecided(v);
      }),
      this.#armdozerSelector.prevNotifier().subscribe(() => {
        this.#onArmdozerSelectorPrev();
      }),
      this.#pilotSelector.changeNotifier().subscribe(v => {
        this.#onPilotChange(v);
      }),
      this.#pilotSelector.decideNotifier().subscribe(v => {
        this.#onPilotDecided(v);
      }),
      this.#pilotSelector.prevNotifier().subscribe(() => {
        this.#onPilotSelectorPrev();
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#armdozerSelector.destructor();
    this.#pilotSelector.destructor();
    this.#unsubscribers.forEach(v => {
      v.unsubscribe();
    })
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * リソース読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all([
      this.#armdozerBustShot.waitUntilLoaded(),
      this.#armdozerSelector.waitUntilLoaded(),
      this.#pilotBustShot.waitUnlillLoaded(),
      this.#pilotSelector.waitUntilLoaded()
    ]);
  }

  /**
   * 選択完了通知
   *
   * @return 通知ストリーム
   */
  decideNotifier(): Stream<PlayerDecide> {
    return this.#playerDecide;
  }

  /**
   * 戻る通知
   * @return 通知ストリーム
   */
  prevNotifier(): Stream<void> {
    return this.#prev;
  }
  
  /**
   * アームドーザを変更した時の処理
   *
   * @param armdozerId 変更したアームドーザID
   */
  #onArmdozerChange(armdozerId: ArmDozerId): void {
    this.#armdozerBustShot.switch(armdozerId);
  }

  /**
   * アームドーザを決定した時の処理
   *
   * @param armdozerId 決定したアームドーザID
   */
  #onArmdozerDecided(armdozerId: ArmDozerId): void {
    this.#armdozerId = armdozerId;
    this.#pilotId = getDedicatedPilot(this.#armdozerId)
    this.#pilotBustShot.switch(this.#pilotId);
    this.#pilotSelector.show(this.#pilotId);

    this.#armdozerSelector.hidden();
  }

  /**
   * アームドーザセレクタの戻るボタンを押した時の処理
   */
  #onArmdozerSelectorPrev(): void {
    this.#prev.next();
  }

  /**
   * パイロットが変更された時の処理
   *
   * @param pilotId 変更したパイロットID
   */
  #onPilotChange(pilotId: PilotId): void {
    this.#pilotId = pilotId;
    this.#pilotBustShot.switch(pilotId);
  }

  /**
   * パイロットを決定した時の処理
   *
   * @param pilotId 決定したパイロットID
   */
  #onPilotDecided(pilotId: PilotId): void {
    this.#pilotId = pilotId;
    this.#playerDecide.next({
      armdozerId: this.#armdozerId,
      pilotId: this.#pilotId
    });
  }

  /**
   * パイロットセレクタの戻るボタンを押した時の処理
   */
  async #onPilotSelectorPrev(): Promise<void> {
    await this.#pilotBustShot.exit();
    this.#pilotBustShot.hidden();
    this.#pilotSelector.hidden();

    this.#armdozerSelector.show();
  }
}