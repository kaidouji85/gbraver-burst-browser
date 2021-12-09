// @flow
import type {Resources} from "../../../resource";
import type {DOMDialog} from '../dialog';
import {PathIds} from "../../../resource/path";
import type {NPCBattleCourseDifficulty} from "../../npc-battle/npc-battle-course";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/core";
import {RxjsStreamSource} from "../../../stream/rxjs";
import {domUuid} from "../../../uuid/dom-uuid";
import {Exclusive} from "../../../exclusive/exclusive";
import {pushDOMStream} from "../../../dom/push/push-dom";
import type {PushDOM} from "../../../dom/push/push-dom";
import {pop} from "../../../dom/animation/pop";

/** ルート要素 class属性 */
const ROOT_CLASS = 'degree-of-difficulty';

/** data-idを集めたもの */
type DataIDs = {
  backGround: string,
  closer: string,
  easy: string,
  normal: string,
  hard: string,
};

/**
 * ルート要素のinnerHTML
 * 
 * @param resources リソース管理オブジェクト
 * @return innerHTML
 */
function rootInnerHTML(resources: Resources, ids: DataIDs): string {
  const closerPath = resources.paths.find(v => v.id === PathIds.CLOSER)?.path ?? '';
  return `
    <div class="${ROOT_CLASS}__background" data-id="${ids.backGround}"></div>
    <img class="${ROOT_CLASS}__closer" alt="閉じる" src="${closerPath}" data-id="${ids.closer}">
    <div class="${ROOT_CLASS}__dialog">
      <div class="${ROOT_CLASS}__dialog__caption">難易度を選択してください</div>
      <div class="${ROOT_CLASS}__dialog__controllers">
        <button class="${ROOT_CLASS}__dialog__controllers__easy" data-id="${ids.easy}">Easy</button>
        <button class="${ROOT_CLASS}__dialog__controllers__normal" data-id="${ids.normal}">Normal</button>
        <button class="${ROOT_CLASS}__dialog__controllers__hard" data-id="${ids.hard}">Hard</button>
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
  return {backGround, closer, easy, normal, hard};
}

/** 難易度選択ダイアログ */
export class DegreeOfDifficultyDialog implements DOMDialog {
  _root: HTMLElement;
  _closer: HTMLElement;
  _easy: HTMLElement;
  _normal: HTMLElement;
  _hard: HTMLElement;
  _exclusive: Exclusive;
  _selectionComplete: StreamSource<NPCBattleCourseDifficulty>;
  _closeDialog: StreamSource<void>;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   * 
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const ids = {backGround: domUuid(), closer: domUuid(), easy: domUuid(), normal: domUuid(), hard: domUuid()};
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS;
    this._root.innerHTML = rootInnerHTML(resources, ids);

    const elements = extractElements(this._root, ids);
    this._closer = elements.closer;
    this._easy = elements.easy;
    this._normal = elements.normal;
    this._hard = elements.hard;
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
    ];

    this._selectionComplete = new RxjsStreamSource();
    this._closeDialog = new RxjsStreamSource();
    this._exclusive = new Exclusive();
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
    this._exclusive.execute(async () => {
      action.event.preventDefault();
      action.event.stopPropagation();
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
    this._exclusive.execute(async () => {
      action.event.preventDefault();
      action.event.stopPropagation();
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
    this._exclusive.execute(async () => {
      action.event.preventDefault();
      action.event.stopPropagation();
      await pop(this._hard);
      this._selectionComplete.next('Hard');
    });
  }

  /**
   * 閉じるボタンが押された際の処理
   * 
   * @param action アクション 
   */
  _onCloserPush(action: PushDOM): void {
    this._exclusive.execute(async () => {
      action.event.preventDefault();
      action.event.stopPropagation();
      await pop(this._closer);
      this._closeDialog.next();
    });
  }

  /**
   * バックグラウンドが押された際の処理
   * 
   * @param action アクション 
   */
  _onBackGroundPush(action: PushDOM): void {
    this._exclusive.execute(async () => {
      action.event.preventDefault();
      action.event.stopPropagation();
      this._closeDialog.next();
    });
  }
}