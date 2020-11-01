// @flow

import type {Resources} from "../../../../resource";
import type {PilotId} from "gbraver-burst-core";
import {PilotIcon} from "./pilot-icon";
import {Observable, Subject, Subscription} from "rxjs";
import {domUuid} from "../../../../uuid/dom-uuid";
import {PilotStatus} from "./pilot-status";
import {replaceDOM} from "../../../../dom/replace/replace-dom";
import {Howl} from "howler";
import {SOUND_IDS} from "../../../../resource/sound";
import {Exclusive} from "../../../../exclusive/exclusive";
import {pushDOMStream} from "../../../../action/push/push-dom";
import {pop} from "../../../../dom/animation/pop";

/**
 * ルート要素のclass名
 */
export const ROOT_CLASS_NAME = 'player-select__pilot-selector';

/**
 * パイロットセレクタ
 */
export class PilotSelector {
  _pilotId: PilotId;
  _exclusive: Exclusive;
  _root: HTMLElement;
  _pilotStatus: PilotStatus;
  _pilotIcons: PilotIcon[];
  _okButton: HTMLElement;
  _prevButton: HTMLElement;
  _changeValueSound: typeof Howl;
  _decideSound: typeof Howl;
  _change: Subject<PilotId>;
  _decide: Subject<PilotId>;
  _prev: Subject<void>;
  _subscriptions: Subscription[];

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

    this._change = new Subject();
    this._decide = new Subject();
    this._prev = new Subject();

    this._changeValueSound = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)
      ?.sound ?? new Howl();
    this._decideSound = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)
      ?.sound ?? new Howl();

    const dummyStatusId = domUuid();
    const iconsId = domUuid();
    const okButtonId = domUuid();
    const prevButtonId = domUuid();

    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = `
      <div data-id="${dummyStatusId}"></div>
      <div class="${ROOT_CLASS_NAME}__icons" data-id="${iconsId}"></div>
      <div class="${ROOT_CLASS_NAME}__controllers">
      <button class="${ROOT_CLASS_NAME}__controllers__prev-button" data-id="${prevButtonId}">戻る</button>
      <button class="${ROOT_CLASS_NAME}__controllers__ok-button" data-id="${okButtonId}">これを載せる</button>
      </div>
    `;

    this._pilotStatus = new PilotStatus();
    this._pilotStatus.switch(this._pilotId);
    const dummyStatus = this._root.querySelector(`[data-id="${dummyStatusId}"]`)
      ?? document.createElement('div');
    replaceDOM(dummyStatus, this._pilotStatus.getRootHTMLElement());

    const icons = this._root.querySelector(`[data-id="${iconsId}"]`)
      ?? document.createElement('div');
    this._pilotIcons = pilotIds.map(v => new PilotIcon(resources, v));
    this._pilotIcons.forEach(v => {
      icons.appendChild(v.getRootHTMLElement());
    });

    this._okButton = this._root.querySelector(`[data-id="${okButtonId}"]`)
      ?? document.createElement('button');

    this._prevButton = this._root.querySelector(`[data-id="${prevButtonId}"]`)
      ?? document.createElement('button');

    this._subscriptions = [
      ...this._pilotIcons.map(icon =>
        icon.selectedNotifier().subscribe(() =>{
          this._onPilotChange(icon.pilotId);
        })),
      pushDOMStream(this._okButton).subscribe(() => {
        this._onOkButtonPush();
      }),
      pushDOMStream(this._prevButton).subscribe(() => {
        this._onPrevButtonPush();
      }),
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
   * 本コンポネントを表示する
   */
  show(): void {
    this._root.className = ROOT_CLASS_NAME;
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
      this._pilotIcons.map(icon => icon.waitUntilLoaded())
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
  changeNotifier(): Observable<PilotId> {
    return this._change;
  }

  /**
   * パイロット選択通知
   *
   * @return 通知ストリーム
   */
  decideNotifier(): Observable<PilotId> {
    return this._decide;
  }

  /**
   * 戻る 通知
   * @return 通知ストリーム
   */
  prevNotifier(): Observable<void> {
    return this._prev;
  }

  /**
   * パイロットが変更された時の処理
   *
   * @param pilotId 変更したパイロットのID
   */
  _onPilotChange(pilotId: PilotId): void {
    this._exclusive.execute(async (): Promise<void> => {
      if (this._pilotId !== pilotId) {
        this._pilotId =pilotId;
        this._pilotStatus.switch(pilotId);
        this._change.next(pilotId);
      }

      const target = this._pilotIcons.find(v => v.pilotId === pilotId);
      if (target) {
        target.pop();
        this._changeValueSound.play();
      }
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