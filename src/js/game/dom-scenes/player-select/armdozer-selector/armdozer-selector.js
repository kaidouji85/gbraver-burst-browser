// @flow

import {ArmdozerIcon} from "./armdozer-icon";
import {Observable, Subject, Subscription} from "rxjs";
import type {ArmDozerId} from "gbraver-burst-core";
import type {Resources} from "../../../../resource";
import {domUuid} from "../../../../uuid/dom-uuid";
import {pushDOMStream} from "../../../../action/push/push-dom";
import {SOUND_IDS} from "../../../../resource/sound";
import {Howl} from 'howler';
import {ArmdozerStatus} from "./armdozer-status";
import {replaceDOM} from "../../../../dom/replace-dom";
import {OkButton} from "../controllers/ok-button";

/** ルートHTML要素 class */
export const ROOT_CLASS_NAME = 'player-select__armdozer-selector';

/**
 * アームドーザセレクタ
 */
export class ArmdozerSelector {
  _canOperate: boolean;
  _armdozerId: ArmDozerId;
  _root: HTMLElement;
  _armdozerStatus: ArmdozerStatus;
  _armdozerIcons: ArmdozerIcon[];
  _okButton: OkButton;
  _changeValueSound: typeof Howl;
  _decideSound: typeof Howl;
  _change: Subject<ArmDozerId>;
  _decide: Subject<ArmDozerId>;
  _prev: Subject<void>;
  _subscriptions: Subscription[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param armDozerIds アームドーザIDリスト
   * @param initialArmdozerId アームドーザID初期値
   */
  constructor(resources: Resources, armDozerIds: ArmDozerId[], initialArmdozerId: ArmDozerId) {
    this._change = new Subject<ArmDozerId>();
    this._decide = new Subject<ArmDozerId>();
    this._prev = new Subject();

    this._armdozerId = initialArmdozerId;
    this._canOperate = true;

    this._changeValueSound = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)
      ?.sound ?? new Howl();
    this._decideSound = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)
      ?.sound ?? new Howl();

    const dummyStatusId = domUuid();
    const dummyOkButtonId = domUuid();
    const prevButtonId = domUuid();
    const iconsId = domUuid();
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = `
      <div data-id="${dummyStatusId}"></div>
      <div class="${ROOT_CLASS_NAME}__icons" data-id="${iconsId}"></div>
      <div class="${ROOT_CLASS_NAME}__controllers">
        <button class="${ROOT_CLASS_NAME}__controllers__prev-button" data-id="${prevButtonId}">戻る</button>
        <button data-id="${dummyOkButtonId}"></button>
      </div>
      
    `;
    const dummyStatus = this._root.querySelector(`[data-id="${dummyStatusId}"]`)
      ?? document.createElement('div');
    this._armdozerStatus = new ArmdozerStatus();
    this._armdozerStatus.switch(this._armdozerId);
    replaceDOM(dummyStatus, this._armdozerStatus.getRootHTMLElement());

    const icons = this._root.querySelector(`[data-id="${iconsId}"]`)
      ?? document.createElement('div');
    this._armdozerIcons = armDozerIds.map(v => new ArmdozerIcon(resources, v));
    this._armdozerIcons
      .map(icon => icon.getRootHTMLElement())
      .forEach(element => {
        icons.appendChild(element);
      });

    const dummyOkButton = this._root.querySelector(`[data-id="${dummyOkButtonId}"]`)
      ?? document.createElement('button');
    this._okButton = new OkButton('これで出撃');
    replaceDOM(dummyOkButton, this._okButton.getRootHTMLElement());

    const prevButton = this._root.querySelector(`[data-id="${prevButtonId}"]`)
      ?? document.createElement('button');

    this._subscriptions = [
      ...this._armdozerIcons.map(v =>
        v.selectedNotifier().subscribe(() => {
          this._onArmdozerSelect(v);
        })),
      this._okButton.pushedNotifier().subscribe(() => {
        this._onOkButtonPush();
      }),
      pushDOMStream(prevButton).subscribe(() => {
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
      this._armdozerIcons.map(icon => icon.waitUntilLoaded())
    );
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * アームドーザ選択の通知
   *
   * @return イベント通知ストリーム
   */
  changeNotifier(): Observable<ArmDozerId> {
    return this._change;
  }

  /**
   * アームドーザ決定通知ストリームを取得する
   *
   * @return アームドーザ決定通知ストリーム
   */
  decideNotifier(): Observable<ArmDozerId> {
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
   * アームドーザアイコンが選択された際の処理
   *
   * @param icon 選択されたアイコン
   * @return 処理結果
   */
  _onArmdozerSelect(icon: ArmdozerIcon): void {
    if (!this._canOperate) {
      return;
    }

    if (this._armdozerId === icon.armDozerId) {
      return;
    }

    this._changeValueSound.play();
    this._armdozerStatus.switch(icon.armDozerId);
    this._armdozerId = icon.armDozerId;
    this._change.next(this._armdozerId);
  }

  /**
   * 決定ボタンが押された時の処理
   */
  async _onOkButtonPush(): Promise<void> {
    if (!this._canOperate) {
      return;
    }
    this._canOperate = false;

    this._decideSound.play();
    this._decide.next(this._armdozerId);

    this._canOperate = true;
  }

  /**
   * 戻るボタンが押された時の処理
   */
  _onPrevButtonPush(): void {
    this._changeValueSound.play();
    this._prev.next();
  }
}