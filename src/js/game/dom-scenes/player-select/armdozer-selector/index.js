// @flow
import type {ArmDozerId} from "gbraver-burst-core";
import {Howl} from 'howler';
import {pop} from "../../../../dom/animation";
import type {PushDOM} from "../../../../dom/event-stream";
import {pushDOMStream} from "../../../../dom/event-stream";
import {replaceDOM} from "../../../../dom/replace-dom";
import {Exclusive} from "../../../../exclusive/exclusive";
import type {Resources} from "../../../../resource";
import {SOUND_IDS} from "../../../../resource/sound";
import type {Stream, StreamSource, Unsubscriber} from "../../../../stream/stream";
import {createStreamSource} from "../../../../stream/stream";
import {domUuid} from "../../../../uuid/dom-uuid";
import {ArmdozerIcon} from "./armdozer-icon";
import {ArmdozerStatus} from "./armdozer-status";
import {createArmdozerIcon} from "./create-armdozer-icon";

/** ルートHTML要素 class */
const ROOT_CLASS_NAME = 'player-select__armdozer-selector';

/** data-idを集めたもの */
type DataIDs = {
  dummyStatus: string,
  okButton: string,
  prevButton: string,
  icons: string
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs): string {
  return `
    <div data-id="${ids.dummyStatus}"></div>
    <div class="${ROOT_CLASS_NAME}__icons" data-id="${ids.icons}"></div>
    <div class="${ROOT_CLASS_NAME}__controllers">
      <button class="${ROOT_CLASS_NAME}__controllers__prev-button" data-id="${ids.prevButton}">戻る</button>
      <button class="${ROOT_CLASS_NAME}__controllers__ok-button" data-id="${ids.okButton}">これで出撃</button>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  dummyStatus: HTMLElement,
  okButton: HTMLElement,
  prevButton: HTMLElement,
  icons: HTMLElement
}

/**
 * ルート要素から子孫要素を抽出する
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

/** アームドーザアイコン関連オブジェクト */
type IconObjects = {
  armdozerId: ArmDozerId,
  icon: ArmdozerIcon,
};

/** アームドーザセレクタ */
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

    this._change = createStreamSource();
    this._decide = createStreamSource();
    this._prev = createStreamSource();

    this._changeValueSound = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)
      ?.sound ?? new Howl();
    this._decideSound = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)
      ?.sound ?? new Howl();

    const dataIDs = {dummyStatus: domUuid(), okButton: domUuid(), prevButton: domUuid(), icons: domUuid()};
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = rootInnerHTML(dataIDs);
    const elements = extractElements(this._root, dataIDs);

    this._armdozerStatus = new ArmdozerStatus();
    this._armdozerStatus.switch(this._armdozerId);
    replaceDOM(elements.dummyStatus, this._armdozerStatus.getRootHTMLElement());

    this._armdozerIcons = armDozerIds
      .map(v => ({armdozerId: v, icon: createArmdozerIcon(resources, v)}));
    this._armdozerIcons.forEach(v => {
        v.icon.selected(v.armdozerId === initialArmdozerId);
        elements.icons.appendChild(v.icon.getRootHTMLElement());
      });

    this._okButton = elements.okButton;
    this._prevButton = elements.prevButton;

    this._unsubscribers = [
      ...this._armdozerIcons.map(v =>
        v.icon.selectedNotifier().subscribe(() => {
          this._onArmdozerSelect(v.armdozerId);
        })),
      pushDOMStream(this._okButton).subscribe(action => {
        this._onOkButtonPush(action);
      }),
      pushDOMStream(this._prevButton).subscribe(action => {
        this._onPrevButtonPush(action);
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
   * 
   * @param action アクション
   */
  _onOkButtonPush(action: PushDOM): void {
    this._exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this._decideSound.play();
      await pop(this._okButton);
      this._decide.next(this._armdozerId);
    });
  }

  /**
   * 戻るボタンが押された時の処理
   * 
   * @param action アクション
   */
  _onPrevButtonPush(action: PushDOM): void {
    this._exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this._changeValueSound.play();
      await pop(this._prevButton);
      this._prev.next();
    });
  }
}