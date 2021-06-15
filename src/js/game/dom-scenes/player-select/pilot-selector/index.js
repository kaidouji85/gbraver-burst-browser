// @flow

import type {Resources} from "../../../../resource";
import type {PilotId} from "gbraver-burst-core";
import {PilotIcon} from "./pilot-icon";
import {domUuid} from "../../../../uuid/dom-uuid";
import {PilotStatus} from "./pilot-status";
import {replaceDOM} from "../../../../dom/replace/replace-dom";
import {Howl} from "howler";
import {SOUND_IDS} from "../../../../resource/sound";
import {Exclusive} from "../../../../exclusive/exclusive";
import {pushDOMStream} from "../../../../dom/push/push-dom";
import {pop} from "../../../../dom/animation/pop";
import {createPilotIcon} from "./create-pilot-icon";
import type {Stream, StreamSource, Unsubscriber} from "../../../../stream/core";
import {RxjsStreamSource} from "../../../../stream/rxjs";

/**ルート要素のclass名 */
export const ROOT_CLASS_NAME = 'player-select__pilot-selector';

/** data-idを集めたもの*/
type DataIDs = {
  dummyStatus: string,
  icons: string,
  okButton: string,
  prevButton: string
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs): string {
  return `
    <div data-id="${ids.dummyStatus}"></div>
    <div class="${ROOT_CLASS_NAME}__icons" data-id="${ids.icons}"></div>
    <div class="${ROOT_CLASS_NAME}__controllers">
    <button class="${ROOT_CLASS_NAME}__controllers__prev-button" data-id="${ids.prevButton}">戻る</button>
    <button class="${ROOT_CLASS_NAME}__controllers__ok-button" data-id="${ids.okButton}">これを載せる</button>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  dummyStatus: HTMLElement,
  icons: HTMLElement,
  okButton: HTMLElement,
  prevButton: HTMLElement,
};

/**
 *  ルート要素の子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const dummyStatus = root.querySelector(`[data-id="${ids.dummyStatus}"]`)
    ?? document.createElement('div');
  const icons = root.querySelector(`[data-id="${ids.icons}"]`)
    ?? document.createElement('div');
  const okButton = root.querySelector(`[data-id="${ids.okButton}"]`)
    ?? document.createElement('button');
  const prevButton = root.querySelector(`[data-id="${ids.prevButton}"]`)
    ?? document.createElement('button');
  return {dummyStatus, icons, okButton, prevButton};
}

/**パイロットセレクタ */
export class PilotSelector {
  _pilotId: PilotId;
  _exclusive: Exclusive;
  _root: HTMLElement;
  _pilotStatus: PilotStatus;
  _pilotIcons: Array<{pilotId: PilotId, icon: PilotIcon}>;
  _okButton: HTMLElement;
  _prevButton: HTMLElement;
  _changeValueSound: typeof Howl;
  _decideSound: typeof Howl;
  _change: StreamSource<PilotId>;
  _decide: StreamSource<PilotId>;
  _prev: StreamSource<void>;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param pilotIds 選択可能なパイロットIDリスト
   * @param initialPilotId パイロットIDの初期値
   */
  constructor(resources: Resources, pilotIds: PilotId[], initialPilotId: PilotId) {
    this._pilotId = initialPilotId;
    this._exclusive = new Exclusive();
    this._change = new RxjsStreamSource();
    this._decide = new RxjsStreamSource();
    this._prev = new RxjsStreamSource();

    this._changeValueSound = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)
      ?.sound ?? new Howl();
    this._decideSound = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)
      ?.sound ?? new Howl();

    const dataIDs = {dummyStatus: domUuid(), icons: domUuid(), okButton: domUuid(), prevButton: domUuid()};
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = rootInnerHTML(dataIDs);
    const elements = extractElements(this._root, dataIDs);

    this._pilotStatus = new PilotStatus();
    this._pilotStatus.switch(this._pilotId);
    replaceDOM(elements.dummyStatus, this._pilotStatus.getRootHTMLElement());

    this._pilotIcons = pilotIds.map(v => ({pilotId: v, icon: createPilotIcon(resources, v)}));
    this._pilotIcons.forEach(v => {
      v.icon.selected(v.pilotId === initialPilotId);
      elements.icons.appendChild(v.icon.getRootHTMLElement());
    });

    this._okButton = elements.okButton;
    this._prevButton = elements.prevButton;

    this._unsubscribers = [
      ...this._pilotIcons.map(v =>
        v.icon.selectedNotifier().subscribe(() =>{
          this._onPilotChange(v.pilotId);
        })),
      pushDOMStream(this._okButton)
        .subscribe(this._onOkButtonPush.bind(this)),
      pushDOMStream(this._prevButton)
        .subscribe(this._onPrevButtonPush.bind(this)),
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._unsubscribers.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * 本コンポネントを表示する
   *
   * @@aram pilotId 選択するパイロットID
   */
  show(pilotId?: PilotId): void {
    this._root.className = ROOT_CLASS_NAME;

    const selected = this._pilotIcons.find(v => v.pilotId === pilotId);
    if (!pilotId || !selected) {
      return;
    }

    this._pilotId = pilotId;
    selected.icon.selected(true);
    this._pilotStatus.switch(pilotId);
    this._pilotIcons.filter(v => v.pilotId !== pilotId)
      .forEach(v => {
        v.icon.selected(false);
      });
  }

  /**
   * 本コンポネントを非表示にする
   */
  hidden(): void {
    this._root.className = `${ROOT_CLASS_NAME}--hidden`;
  }

  /**
   * リソース読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all(
      this._pilotIcons.map(v => v.icon.waitUntilLoaded())
    );
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
   * パイロット変更通知
   *
   * @return 通知ストリーム
   */
  changeNotifier(): Stream<PilotId> {
    return this._change;
  }

  /**
   * パイロット選択通知
   *
   * @return 通知ストリーム
   */
  decideNotifier(): Stream<PilotId> {
    return this._decide;
  }

  /**
   * 戻る 通知
   * @return 通知ストリーム
   */
  prevNotifier(): Stream<void> {
    return this._prev;
  }

  /**
   * パイロットが変更された時の処理
   *
   * @param pilotId 変更したパイロットのID
   */
  _onPilotChange(pilotId: PilotId): void {
    this._exclusive.execute(async (): Promise<void> => {
      const selected = this._pilotIcons.find(v => v.pilotId === pilotId);
      if (!selected) {
        return;
      }

      if (this._pilotId !== pilotId) {
        this._change.next(pilotId);
      }

      this._pilotId =pilotId;
      this._pilotStatus.switch(pilotId);

      selected.icon.pop();
      this._changeValueSound.play();
      selected.icon.selected(true);

      this._pilotIcons.filter(v => v.pilotId !== pilotId)
        .forEach(v => {
          v.icon.selected(false);
        });
    });
  }

  /**
   * OKボタンを押した時の処理
   */
  _onOkButtonPush(): void {
    this._exclusive.execute(async (): Promise<void> => {
      this._decideSound.play();
      await pop(this._okButton);
      this._decide.next(this._pilotId);
    });
  }

  /**
   * 戻るボタンを押した時の処理
   */
  _onPrevButtonPush(): void {
    this._exclusive.execute(async (): Promise<void> => {
      this._changeValueSound.play();
      await pop(this._prevButton);
      this._prev.next();
    });
  }
}