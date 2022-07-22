// @flow
import {Howl} from 'howler';
import {pop} from "../../../dom/animation";
import type {PushDOM} from "../../../dom/event-stream";
import {pushDOMStream} from "../../../dom/event-stream";
import {Exclusive} from "../../../exclusive/exclusive";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {SOUND_IDS} from "../../../resource/sound";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/stream";
import {createStreamSource} from "../../../stream/stream";
import {domUuid} from "../../../uuid/dom-uuid";
import type {NPCBattleCourseDifficulty} from "../../npc-battle-courses";
import type {DOMDialog} from '../dialog';

/** ルート要素 class属性 */
const ROOT_CLASS = 'difficulty';

/** data-idを集めたもの */
type DataIDs = {
  backGround: string,
  closer: string,
  easy: string,
  easyButton: string,
  normal: string,
  normalButton: string,
  hard: string,
  hardButton: string,
  veryHard: string,
  veryHardButton: string,
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
      <img class="${ROOT_CLASS}__closer" alt="閉じる" src="${closerPath}" data-id="${ids.closer}">
      <div class="${ROOT_CLASS}__caption">難易度を選択してください</div>
      <div class="${ROOT_CLASS}__controllers">
        <div class="${ROOT_CLASS}__easy" data-id="${ids.easy}">
          <img class="${ROOT_CLASS}__easy-icon" alt="易" src="${easyIconPath}">
          <button class="${ROOT_CLASS}__easy-button" alt="easy-course" data-id="${ids.easyButton}">かんたん</button>
        </div>
        <div class="${ROOT_CLASS}__normal" data-id="${ids.normal}">
          <img class="${ROOT_CLASS}__normal-icon" alt="普" src="${normalIconPath}">
          <button class="${ROOT_CLASS}__normal-button" alt="normal-course" data-id="${ids.normalButton}">ふつう</button>
        </div>
        <div class="${ROOT_CLASS}__hard" data-id="${ids.hard}">
          <img class="${ROOT_CLASS}__hard-icon" alt="難" src="${hardIconPath}">
          <button class="${ROOT_CLASS}__hard-button" alt="hard-course" data-id="${ids.hardButton}">むずい</button>
        </div>
        <div class="${ROOT_CLASS}__very-hard" data-id="${ids.veryHard}">
          <img class="${ROOT_CLASS}__very-hard-icon" alt="檄" src="${veryHardIconPath}">
          <button class="${ROOT_CLASS}__very-hard-button" alt="very-hard-course" data-id="${ids.veryHardButton}">げきむず</button>
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
  easyButton: HTMLElement,
  normal: HTMLElement,
  normalButton: HTMLElement,
  hard: HTMLElement,
  hardButton: HTMLElement;
  veryHard: HTMLElement,
  veryHardButton: HTMLElement,
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
  const easyButton = root.querySelector(`[data-id="${ids.easyButton}"]`) ?? document.createElement('div');
  const normal = root.querySelector(`[data-id="${ids.normal}"]`) ?? document.createElement('div');
  const normalButton = root.querySelector(`[data-id="${ids.normalButton}"]`) ?? document.createElement('div');
  const hard = root.querySelector(`[data-id="${ids.hard}"]`) ?? document.createElement('div');
  const hardButton = root.querySelector(`[data-id="${ids.hardButton}"]`) ?? document.createElement('div');
  const veryHard = root.querySelector(`[data-id="${ids.veryHard}"]`) ?? document.createElement('div');
  const veryHardButton = root.querySelector(`[data-id="${ids.veryHardButton}"]`) ?? document.createElement('div');
  return {backGround, closer, easy, easyButton, normal, normalButton, hard, hardButton, veryHard, veryHardButton};
}

/** 難易度選択ダイアログ */
export class DifficultyDialog implements DOMDialog {
  #root: HTMLElement;
  #closer: HTMLElement;
  #easy: HTMLElement;
  #easyButton: HTMLElement;
  #normal: HTMLElement;
  #normalButton: HTMLElement;
  #hard: HTMLElement;
  #hardButton: HTMLElement;
  #veryHard: HTMLElement;
  #veryHardButton: HTMLElement;
  #exclusive: Exclusive;
  #selectionComplete: StreamSource<NPCBattleCourseDifficulty>;
  #closeDialog: StreamSource<void>;
  #unsubscribers: Unsubscriber[];
  #changeValue: typeof Howl;
  #pushButton: typeof Howl;

  /**
   * コンストラクタ
   * 
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const ids = {backGround: domUuid(), closer: domUuid(), easy: domUuid(), easyButton: domUuid(),
      normal: domUuid(), normalButton: domUuid(), hard: domUuid(), hardButton: domUuid(),
      veryHard: domUuid(), veryHardButton: domUuid()};
    this.#root = document.createElement('div');
    this.#root.className = ROOT_CLASS;
    this.#root.innerHTML = rootInnerHTML(resources, ids);

    const elements = extractElements(this.#root, ids);
    this.#closer = elements.closer;
    this.#easy = elements.easy;
    this.#easyButton = elements.easyButton;
    this.#normal = elements.normal;
    this.#normalButton = elements.normalButton;
    this.#hard = elements.hard;
    this.#hardButton = elements.hardButton;
    this.#veryHard = elements.veryHard;
    this.#veryHardButton = elements.veryHardButton;
    this.#unsubscribers = [
      pushDOMStream(elements.backGround).subscribe(action => {
        this.#onBackGroundPush(action);
      }),
      pushDOMStream(this.#closer).subscribe(action => {
        this.#onCloserPush(action);
      }),
      pushDOMStream(this.#easy).subscribe(action => {
        this.#onEasyPush(action);
      }),
      pushDOMStream(this.#normal).subscribe(action => {
        this.#onNormalPush(action);
      }),
      pushDOMStream(this.#hard).subscribe(action => {
        this.#onHardPush(action);
      }),
      pushDOMStream(this.#veryHard).subscribe(action => {
        this.#onVeryHardPush(action);
      })
    ];

    this.#selectionComplete = createStreamSource();
    this.#closeDialog = createStreamSource();
    this.#exclusive = new Exclusive();
    this.#changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ?? new Howl();
    this.#pushButton = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ?? new Howl();
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach(v => {
      v.unsubscribe();
    });
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * 難易度選択完了通知
   * 
   * @return 通知ストリーム 
   */
  selectionCompleteNotifier(): Stream<NPCBattleCourseDifficulty> {
    return this.#selectionComplete;
  }

  /**
   * ダイアログを閉じる通知
   * 
   * @return 通知ストリーム
   */
  closeDialogNotifier(): Stream<void> {
    return this.#closeDialog;
  }

  /**
   * Easyが押された際の処理
   * 
   * @param action アクション 
   */
  #onEasyPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#exclusive.execute(async () => {
      this.#pushButton.play();
      await pop(this.#easyButton);
      this.#selectionComplete.next('Easy');
    });
  }

  /**
   * Normalが押された際の処理
   * 
   * @param action アクション 
   */
  #onNormalPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#exclusive.execute(async () => {
      this.#pushButton.play();
      await pop(this.#normalButton);
      this.#selectionComplete.next('Normal');
    });
  }

  /**
   * Hardが押された際の処理
   * 
   * @param action アクション 
   */
  #onHardPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#exclusive.execute(async () => {
      this.#pushButton.play()
      await pop(this.#hardButton);
      this.#selectionComplete.next('Hard');
    });
  }

  /**
   * VeryHardが押された際の処理
   *
   * @param action アクション
   */
  #onVeryHardPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#exclusive.execute(async () => {
      this.#pushButton.play();
      await pop(this.#veryHardButton);
      this.#selectionComplete.next('VeryHard');
    });
  }

  /**
   * 閉じるボタンが押された際の処理
   * 
   * @param action アクション 
   */
  #onCloserPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#exclusive.execute(async () => {
      this.#changeValue.play();
      await pop(this.#closer, 1.3);
      this.#closeDialog.next();
    });
  }

  /**
   * バックグラウンドが押された際の処理
   * 
   * @param action アクション 
   */
  #onBackGroundPush(action: PushDOM): void {
    action.event.preventDefault();
    action.event.stopPropagation();
    this.#exclusive.execute(async () => {
      await this.#changeValue.play()
      this.#closeDialog.next();
    });
  }
}