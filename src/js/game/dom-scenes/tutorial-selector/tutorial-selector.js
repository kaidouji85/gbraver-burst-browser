// @flow
import {pop} from "../../../dom/animation";
import type {PushDOM} from "../../../dom/event-stream";
import {pushDOMStream} from "../../../dom/event-stream";
import {Exclusive} from "../../../exclusive/exclusive";
import type {Resources} from "../../../resource";
import {createEmptySoundResource, SOUND_IDS} from "../../../resource/sound";
import type {SoundResource} from "../../../resource/sound";
import {map} from "../../../stream/operator";
import {createStreamSource} from "../../../stream/stream";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/stream";
import {domUuid} from "../../../uuid/dom-uuid";
import type {TutorialStageID} from "../../tutorial";
import type {DOMScene} from "../dom-scene";

/** ROOT要素class属性*/
const ROOT_CLASS = 'tutorial-selector';
/** data-idをあつめたもの */
type DataIDs = {stages: string, prevButton: string};

/**
 * ルート要素のinnerHTML
 * @return innerHTML
 */
export function rootInnerHTML(ids: DataIDs): string {
  return `
    <div class="${ROOT_CLASS}__title">チュートリアル</div>
    <ol class="${ROOT_CLASS}__stages" data-id="${ids.stages}">
    </ol>
    <button class="${ROOT_CLASS}__prev" data-id="${ids.prevButton}">戻る</button> 
  `;
}

/** ルート要素の子孫要素 */
type Elements = {stages: HTMLElement, prevButton: HTMLElement};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const stages = root.querySelector(`[data-id="${ids.stages}"]`) ?? document.createElement('div');
  const prevButton = root.querySelector(`[data-id="${ids.prevButton}"]`) ?? document.createElement('div');
  return {stages, prevButton};
}

/** チュートリアルステージ情報 */
type TutorialStage = {
  /** チュートリアルステージID */
  id: TutorialStageID,
  /** チュートリアルステージタイトル */
  title: string
};

/** チュートリアルステージ選択情報 */
type TutorialStageSelect = {
  /** チュートリアルステージID */
  id: TutorialStageID,
  /** ステージレベル */
  level: number,
};

/** チュートリアルステージセレクト画面 */
export class TutorialSelector implements DOMScene {
  #root: HTMLElement;
  #stages: HTMLElement;
  #prevButton: HTMLElement;
  #exclusive: Exclusive;
  #prev: StreamSource<void>;
  #stageSelect: StreamSource<TutorialStageSelect>;
  #changeValue: SoundResource;
  #pushButton: SoundResource;
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param stages チュートリアルステージ情報
   */
  constructor(resources: Resources, stages: TutorialStage[]) {
    const ids = {stages: domUuid(), prevButton: domUuid()};
    this.#root = document.createElement('div');
    this.#root.className = ROOT_CLASS;
    this.#root.innerHTML = rootInnerHTML(ids);

    const elements = extractElements(this.#root, ids);
    this.#stages = elements.stages;
    this.#prevButton = elements.prevButton;
    this.#exclusive = new Exclusive();
    this.#prev = createStreamSource();
    this.#stageSelect = createStreamSource();
    this.#changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE) ?? createEmptySoundResource();
    this.#pushButton = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON) ?? createEmptySoundResource();

    const stageElements = stages.map((stage, index) => {
      const li = document.createElement('li');
      li.className = `${ROOT_CLASS}__stage`;
      li.innerHTML = `
        <span class="${ROOT_CLASS}__stage-title">${stage.title}</span>
        <button class="${ROOT_CLASS}__stage-select">選択</button>
      `;
      const button = li.querySelector('button') ?? document.createElement('button');
      const selectNotifier = pushDOMStream(button).chain(map(action => {
        action.event.stopPropagation();
        action.event.preventDefault();
        return {id: stage.id, level: index + 1};
      }));
      return {li, button, selectNotifier};
    });
    stageElements.forEach(({li}) => {
      this.#stages.appendChild(li);
    });
    this.#unsubscribers = [
      pushDOMStream(this.#prevButton).subscribe(action => {
        this.#onPrevPush(action);
      }),
      ...stageElements.map(({selectNotifier, button}) =>
        selectNotifier.subscribe(stageSelect => {
          this.#onTutorialStageSelect(button, stageSelect);
        })
      )
    ];
  }

  /** @override */
  destructor(): void {
    // NOP
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * 戻る通知
   *
   * @return 通知ストリーム
   */
  prevNotifier(): Stream<void> {
    return this.#prev;
  }

  /**
   * 戻るボタンを押した時の処理
   *
   * @param action アクション
   */
  #onPrevPush(action: PushDOM): void {
    action.event.stopPropagation();
    action.event.preventDefault();
    this.#exclusive.execute(async () => {
      this.#changeValue.sound.play();
      await pop(this.#prevButton);
      this.#prev.next();
    });
  }

  #onTutorialStageSelect(button: HTMLElement, stageSelect: TutorialStageSelect): void {
    this.#exclusive.execute(async () => {
      this.#pushButton.sound.play();
      await pop(button);
    });
  }
}