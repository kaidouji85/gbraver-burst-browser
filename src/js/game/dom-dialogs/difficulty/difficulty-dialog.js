// @flow
import {Howl} from 'howler';
import type {Resources} from "../../../resource";
import type {DOMDialog} from '../dialog';
import {PathIds} from "../../../resource/path";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/stream";
import {createStreamSource} from "../../../stream/stream";
import {domUuid} from "../../../uuid/dom-uuid";
import {Exclusive} from "../../../exclusive/exclusive";
import type {PushDOM} from "../../../dom/push/push-dom";
import {pushDOMStream} from "../../../dom/push/push-dom";
import {pop} from "../../../dom/animation/pop";
import {SOUND_IDS} from "../../../resource/sound";
import type {NPCBattleCourseDifficulty} from "../../npc-battle-courses";

/** ルート要素 class属性 */
const ROOT_CLASS = 'difficulty';

/** data-idを集めたもの */
type DataIDs = {
  backGround: string,
  closer: string,
  easy: string,
  normal: string,
  hard: string,
  veryHard: string,
};

/**
 * ルート要素のinnerHTML
 * 
 * @param resources リソース管理オブジェクト
 * @param ids data-idを集めたもの
 * @return innerHTML
 */
function rootInnerHTML(resources: Resources, ids: DataIDs): string {
  const closerPath = resources.paths.find(v => v.id === PathIds.CLOSER)?.path ?? '';
  const easyIconPath = resources.paths.find(v => v.id === PathIds.NPC_COURSE_EASY_ICON)?.path ?? '';
  const normalIconPath = resources.paths.find(v => v.id === PathIds.NPC_COURSE_NORMAL_ICON)?.path ?? '';
  const hardIconPath = resources.paths.find(v => v.id === PathIds.NPC_COURSE_HARD_ICON)?.path ?? '';
  const veryHardIconPath = resources.paths.find(v => v.id === PathIds.NPC_COURSE_VERY_HARD_ICON)?.path ?? '';
  return `
    <div class="${ROOT_CLASS}__background" data-id="${ids.backGround}"></div>
    <div class="${ROOT_CLASS}__dialog">
      <img class="${ROOT_CLASS}__dialog__closer" alt="閉じる" src="${closerPath}" data-id="${ids.closer}">
      <div class="${ROOT_CLASS}__dialog__caption">難易度を選択してください</div>
      <div class="${ROOT_CLASS}__dialog__controllers">
        <div class="${ROOT_CLASS}__dialog__controllers__easy">
          <img class="${ROOT_CLASS}__dialog__controllers__easy__icon" alt="易" src="${easyIconPath}">
          <button class="${ROOT_CLASS}__dialog__controllers__easy__button" alt="easy-course" data-id="${ids.easy}">かんたん</button>
        </div>
        <div class="${ROOT_CLASS}__dialog__controllers__normal">
          <img class="${ROOT_CLASS}__dialog__controllers__normal__icon" alt="普" src="${normalIconPath}">
          <button class="${ROOT_CLASS}__dialog__controllers__normal__button" alt="normal-course" data-id="${ids.normal}">ふつう</button>
        </div>
        <div class="${ROOT_CLASS}__dialog__controllers__hard">
          <img class="${ROOT_CLASS}__dialog__controllers__hard__icon" alt="難" src="${hardIconPath}">
          <button class="${ROOT_CLASS}__dialog__controllers__hard__button" alt="hard-course" data-id="${ids.hard}">むずい</button>
        </div>
        <div class="${ROOT_CLASS}__dialog__controllers__very-hard">
          <img class="${ROOT_CLASS}__dialog__controllers__very-hard__icon" alt="檄" src="${veryHardIconPath}">
          <button class="${ROOT_CLASS}__dialog__controllers__very-hard__button" alt="very-hard-course" data-id="${ids.veryHard}">げきむず</button>
        </div>
      </div>
    </div>  
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  backGround: HTMLElement,
  closer: HTMLElement,
  easy: HTMLElement,
  normal: HTMLElement,
  hard: HTMLElement,
  veryHard: HTMLElement,
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const backGround = root.querySelector(`[data-id="${ids.backGround}"]`) ?? document.createElement('div');
  const closer = root.querySelector(`[data-id="${ids.closer}"]`) ?? document.createElement('div');
  const easy = root.querySelector(`[data-id="${ids.easy}"]`) ?? document.createElement('div');
  const normal = root.querySelector(`[data-id="${ids.normal}"]`) ?? document.createElement('div');
  const hard = root.querySelector(`[data-id="${ids.hard}"]`) ?? document.createElement('div');
  const veryHard = root.querySelector(`[data-id="${ids.veryHard}"]`) ?? document.createElement('div');
  return {backGround, closer, easy, normal, hard, veryHard};
}

/** 難易度選択ダイアログ */
export class DifficultyDialog implements DOMDialog {
  _root: HTMLElement;
  _closer: HTMLElement;
  _easy: HTMLElement;
  _normal: HTMLElement;
  _hard: HTMLElement;
  _veryHard: HTMLElement;
  _exclusive: Exclusive;
  _selectionComplete: StreamSource<NPCBattleCourseDifficulty>;
  _closeDialog: StreamSource<void>;
  _unsubscribers: Unsubscriber[];
  _changeValue: typeof Howl;
  _pushButton: typeof Howl;

  /**
   * コンストラクタ
   * 
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const ids = {backGround: domUuid(), closer: domUuid(), easy: domUuid(), normal: domUuid(), hard: domUuid(), veryHard: domUuid()};
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS;
    this._root.innerHTML = rootInnerHTML(resources, ids);

    const elements = extractElements(this._root, ids);
    this._closer = elements.closer;
    this._easy = elements.easy;
    this._normal = elements.normal;
    this._hard = elements.hard;
    this._veryHard = elements.veryHard;
    this._unsubscribers = [
      pushDOMStream(elements.backGround).subscribe(action => {
        this._onBackGroundPush(action);
      }),
      pushDOMStream(this._closer).subscribe(action => {
        this._onCloserPush(action);
      }),
      pushDOMStream(this._easy).subscribe(action => {
        this._onEasyPush(action);
      }),
      pushDOMStream(this._normal).subscribe(action => {
        this._onNormalPush(action);
      }),
      pushDOMStream(this._hard).subscribe(action => {
        this._onHardPush(action);
      }),
      pushDOMStream(this._veryHard).subscribe(action => {
        this._onVeryHardPush(action);
      })
    ];

    this._selectionComplete = createStreamSource();
    this._closeDialog = createStreamSource();
    this._exclusive = new Exclusive();
    this._changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ?? new Howl();
    this._pushButton = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ?? new Howl();
  }

  /** @override */
  destructor(): void {
    this._unsubscribers.forEach(v => {
      v.unsubscribe();
    });
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * 難易度選択完了通知
   * 
   * @return 通知ストリーム 
   */
  selectionCompleteNotifier(): Stream<NPCBattleCourseDifficulty> {
    return this._selectionComplete;
  }

  /**
   * ダイアログを閉じる通知
   * 
   * @return 通知ストリーム
   */
  closeDialogNotifier(): Stream<void> {
    return this._closeDialog;
  }

  /**
   * Easyが押された際の処理
   * 
   * @param action アクション 
   */
  _onEasyPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this._exclusive.execute(async () => {
      this._pushButton.play();
      await pop(this._easy);
      this._selectionComplete.next('Easy');
    });
  }

  /**
   * Normalが押された際の処理
   * 
   * @param action アクション 
   */
  _onNormalPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this._exclusive.execute(async () => {
      this._pushButton.play();
      await pop(this._normal);
      this._selectionComplete.next('Normal');
    });
  }

  /**
   * Hardが押された際の処理
   * 
   * @param action アクション 
   */
  _onHardPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this._exclusive.execute(async () => {
      this._pushButton.play()
      await pop(this._hard);
      this._selectionComplete.next('Hard');
    });
  }

  /**
   * VeryHardが押された際の処理
   *
   * @param action アクション
   */
  _onVeryHardPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this._exclusive.execute(async () => {
      this._pushButton.play();
      await pop(this._veryHard);
      this._selectionComplete.next('VeryHard');
    });
  }

  /**
   * 閉じるボタンが押された際の処理
   * 
   * @param action アクション 
   */
  _onCloserPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this._exclusive.execute(async () => {
      this._changeValue.play();
      await pop(this._closer, 1.3);
      this._closeDialog.next();
    });
  }

  /**
   * バックグラウンドが押された際の処理
   * 
   * @param action アクション 
   */
  _onBackGroundPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this._exclusive.execute(async () => {
      await this._changeValue.play()
      this._closeDialog.next();
    });
  }
}