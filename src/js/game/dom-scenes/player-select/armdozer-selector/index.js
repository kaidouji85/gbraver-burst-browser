// @flow

import {ArmdozerIcon} from "./armdozer-icon";
import type {ArmDozerId} from "gbraver-burst-core";
import type {Resources} from "../../../../resource";
import {domUuid} from "../../../../uuid/dom-uuid";
import {SOUND_IDS} from "../../../../resource/sound";
import {Howl} from 'howler';
import {ArmdozerStatus} from "./armdozer-status";
import {replaceDOM} from "../../../../dom/replace/replace-dom";
import {Exclusive} from "../../../../exclusive/exclusive";
import {deprecated_pushDOMStream} from "../../../../dom/push/push-dom";
import {pop} from "../../../../dom/animation/pop";
import {createArmdozerIcon} from "./create-armdozer-icon";
import type {Stream, StreamSource, Unsubscriber} from "../../../../stream/core";
import {RxjsStreamSource} from "../../../../stream/rxjs";

/** ルートHTML要素 class */
export const ROOT_CLASS_NAME = 'player-select__armdozer-selector';

/**
 * アームドーザアイコン関連オブジェクト
 */
type IconObjects = {
  armdozerId: ArmDozerId,
  icon: ArmdozerIcon,
};

/**
 * アームドーザセレクタ
 */
export class ArmdozerSelector {
  _armdozerId: ArmDozerId;
  _exclusive: Exclusive;
  _root: HTMLElement;
  _armdozerStatus: ArmdozerStatus;
  _armdozerIcons: IconObjects[];
  _okButton: HTMLElement;
  _prevButton: HTMLElement;
  _changeValueSound: typeof Howl;
  _decideSound: typeof Howl;
  _change: StreamSource<ArmDozerId>;
  _decide: StreamSource<ArmDozerId>;
  _prev: StreamSource<void>;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param armDozerIds アームドーザIDリスト
   * @param initialArmdozerId アームドーザID初期値
   */
  constructor(resources: Resources, armDozerIds: ArmDozerId[], initialArmdozerId: ArmDozerId) {
    this._armdozerId = initialArmdozerId;

    this._exclusive = new Exclusive();

    this._change = new RxjsStreamSource();
    this._decide = new RxjsStreamSource();
    this._prev = new RxjsStreamSource();

    this._changeValueSound = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)
      ?.sound ?? new Howl();
    this._decideSound = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)
      ?.sound ?? new Howl();

    const dummyStatusId = domUuid();
    const okButtonId = domUuid();
    const prevButtonId = domUuid();
    const iconsId = domUuid();
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = `
      <div data-id="${dummyStatusId}"></div>
      <div class="${ROOT_CLASS_NAME}__icons" data-id="${iconsId}"></div>
      <div class="${ROOT_CLASS_NAME}__controllers">
        <button class="${ROOT_CLASS_NAME}__controllers__prev-button" data-id="${prevButtonId}">戻る</button>
        <button class="${ROOT_CLASS_NAME}__controllers__ok-button" data-id="${okButtonId}">これで出撃</button>
      </div>
      
    `;
    const dummyStatus = this._root.querySelector(`[data-id="${dummyStatusId}"]`)
      ?? document.createElement('div');
    this._armdozerStatus = new ArmdozerStatus();
    this._armdozerStatus.switch(this._armdozerId);
    replaceDOM(dummyStatus, this._armdozerStatus.getRootHTMLElement());

    const icons = this._root.querySelector(`[data-id="${iconsId}"]`)
      ?? document.createElement('div');
    this._armdozerIcons = armDozerIds.map(v => ({
      armdozerId: v,
      icon: createArmdozerIcon(resources, v)
    }));
    this._armdozerIcons.forEach(v => {
        const isSelected = v.armdozerId === initialArmdozerId;
        v.icon.selected(isSelected);
        icons.appendChild(v.icon.getRootHTMLElement());
      });

    this._okButton = this._root.querySelector(`[data-id="${okButtonId}"]`)
      ?? document.createElement('button');

    this._prevButton = this._root.querySelector(`[data-id="${prevButtonId}"]`)
      ?? document.createElement('button');

    this._unsubscribers = [
      ...this._armdozerIcons.map(v =>
        v.icon.selectedNotifier().subscribe(() => {
          this._onArmdozerSelect(v.armdozerId);
        })),
      deprecated_pushDOMStream(this._okButton).subscribe(() => {
        this._onOkButtonPush();
      }),
      deprecated_pushDOMStream(this._prevButton).subscribe(() => {
        this._onPrevButtonPush();
      }),
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
      this._armdozerIcons.map(v => v.icon.waitUntilLoaded())
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
  changeNotifier(): Stream<ArmDozerId> {
    return this._change;
  }

  /**
   * アームドーザ決定通知ストリームを取得する
   *
   * @return アームドーザ決定通知ストリーム
   */
  decideNotifier(): Stream<ArmDozerId> {
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
   * アームドーザアイコンが選択された際の処理
   *
   * @param armdozerId 選択されたアームドーザID
   * @return 処理結果
   */
  _onArmdozerSelect(armdozerId: ArmDozerId): void {
    this._exclusive.execute(async (): Promise<void> =>  {
      if (this._armdozerId !== armdozerId) {
        this._armdozerId = armdozerId;
        this._armdozerStatus.switch(armdozerId);
        this._change.next(this._armdozerId);
      }

      this._changeValueSound.play();
      this._armdozerIcons.filter(v => v.armdozerId === armdozerId)
        .forEach(v => {
          v.icon.pop();
          v.icon.selected(true);
        });
      this._armdozerIcons.filter(v => v.armdozerId !== armdozerId)
        .forEach(v => {
          v.icon.selected(false);
        });
    });
  }

  /**
   * 決定ボタンが押された時の処理
   */
  _onOkButtonPush(): void {
    this._exclusive.execute(async (): Promise<void> => {
      this._decideSound.play();
      await pop(this._okButton);
      this._decide.next(this._armdozerId);
    });
  }

  /**
   * 戻るボタンが押された時の処理
   */
  _onPrevButtonPush(): void {
    this._exclusive.execute(async (): Promise<void> => {
      this._changeValueSound.play();
      await pop(this._prevButton);
      this._prev.next();
    });
  }
}