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

/** チュートリアルステージ選択アクション */
type TutorialStageSelectAction = TutorialStageSelect & {
  /**
   * ステージ選択アニメーション
   * @return アニメーションが完了したら発火するPromise
   */
  animation: () => Promise<void>;
}

/**
 * チュートリアルステージ HTML要素
 *
 * @param resources リソース管理オブジェクト
 * @param stage チュートリアルステージ情報
 * @param level ステージレベル
 * @return チュートリアルステージ
 */
const tutorialStageElement = (resources: Resources, stage: TutorialStage, level: number) => {
  const li = document.createElement('li');
  li.className = `${ROOT_CLASS}__stage`;
  li.innerHTML = `
    <span class="${ROOT_CLASS}__stage-title">${stage.title}</span>
    <button class="${ROOT_CLASS}__stage-select">選択</button>
  `;
  const button = li.querySelector('button') ?? document.createElement('button');
  const pushButton = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON) ?? createEmptySoundResource();
  const selectNotifier: Stream<TutorialStageSelectAction> = pushDOMStream(button).chain(map(action => {
    action.event.stopPropagation();
    action.event.preventDefault();
    const animation = async () => {
      pushButton.sound.play();
      await pop(button);
    };
    return {id: stage.id, level, animation};
  }));
  return {li, selectNotifier};
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

    const stageElements = stages.map((stage, index) => tutorialStageElement(resources, stage, index + 1));
    stageElements.forEach(({li}) => {
      this.#stages.appendChild(li);
    });
    this.#unsubscribers = [
      pushDOMStream(this.#prevButton).subscribe(action => {
        this.#onPrevPush(action);
      }),
      ...stageElements.map(({selectNotifier}) =>
        selectNotifier.subscribe(action => {
          this.#onTutorialStageSelect(action);
        })
      )
    ];
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach(unsubscriber => {
      unsubscriber.unsubscribe();
    });
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * 戻るボタン押下通知
   *
   * @return 通知ストリーム
   */
  prevNotifier(): Stream<void> {
    return this.#prev;
  }

  /**
   * チュートリアルステージ選択通知
   *
   * @return 通知ストリーム
   */
  stageSelectNotifier(): Stream<TutorialStageSelect> {
    return this.#stageSelect;
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

  /**
   * チュートリアルステージ選択
   *
   * @param action アクション
   */
  #onTutorialStageSelect(action: TutorialStageSelectAction): void {
    this.#exclusive.execute(async () => {
      await action.animation();
      this.#stageSelect.next(action);
    });
  }
}