import {Observable, Subject, Unsubscribable} from "rxjs";

import {pop} from "../../dom/animation";
import {domPushStream, PushDOM} from "../../dom/push-dom";
import {Exclusive} from "../../exclusive/exclusive";
import type {Resources} from "../../resource";
import type {SoundResource} from "../../resource/sound";
import {createEmptySoundResource, SOUND_IDS} from "../../resource/sound";
import {domUuid} from "../../uuid/dom-uuid";
import {waitElementLoaded} from "../../wait/wait-element-loaded";
import type {DOMScene} from "../dom-scene";
import type {TutorialStage, TutorialStageSelect,} from "./tutoria-stage-element";
import {TutorialStageElement} from "./tutoria-stage-element";
import {ROOT_CLASS} from "./dom/class-name";
import {DataIDs} from "./dom/data-ids";
import {rootInnerHTML} from "./dom/root-inner-html";

/** ルート要素の子孫要素 */
type Elements = {
  stages: HTMLElement;
  imageCuts: HTMLElement;
  prevButton: HTMLElement;
};

/**
 * ルート要素から子孫要素を抽出する
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const stages: HTMLElement =
    root.querySelector(`[data-id="${ids.stages}"]`) ??
    document.createElement("div");
  const imageCuts: HTMLElement =
    root.querySelector(`[data-id="${ids.imageCuts}"]`) ??
    document.createElement("div");
  const prevButton: HTMLElement =
    root.querySelector(`[data-id="${ids.prevButton}"]`) ??
    document.createElement("div");
  return {
    stages,
    imageCuts,
    prevButton,
  };
}

/**
 * ステージセパレータを生成する
 * @return 生成結果
 */
function stageSeparator() {
  const separator = document.createElement("div");
  separator.className = `${ROOT_CLASS}__stage-separator`;
  return separator;
}

/** チュートリアルステージセレクト画面 */
export class TutorialSelector implements DOMScene {
  #root: HTMLElement;
  #stages: HTMLElement;
  #prevButton: HTMLElement;
  #exclusive: Exclusive;
  #prev: Subject<void>;
  #stageSelect: Subject<TutorialStageSelect>;
  #changeValue: SoundResource;
  #isImageCutsLoaded: Promise<unknown>;
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param stages チュートリアルステージ情報
   */
  constructor(resources: Resources, stages: TutorialStage[]) {
    const ids = {
      stages: domUuid(),
      imageCuts: domUuid(),
      prevButton: domUuid(),
    };
    this.#root = document.createElement("div");
    this.#root.className = ROOT_CLASS;
    this.#root.innerHTML = rootInnerHTML(ids, resources);
    const elements = extractElements(this.#root, ids);
    this.#stages = elements.stages;
    this.#prevButton = elements.prevButton;
    this.#exclusive = new Exclusive();
    this.#prev = new Subject();
    this.#stageSelect = new Subject();
    this.#changeValue =
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource();
    this.#isImageCutsLoaded = Promise.all(
      Array.from(elements.imageCuts.children).map((img) =>
        waitElementLoaded(img as HTMLElement)
      )
    );
    const stageElements = stages.map(
      (stage, index) => new TutorialStageElement(resources, stage, index + 1)
    );
    const stageElementsWithLastRemoved = stageElements.slice(0, -1);
    stageElementsWithLastRemoved.forEach((stage) => {
      this.#stages.appendChild(stage.getRootHTMLElement());
      this.#stages.appendChild(stageSeparator());
    });
    const lastStageElement = stageElements[stageElements.length - 1];
    if (lastStageElement) {
      this.#stages.appendChild(lastStageElement.getRootHTMLElement());
    }
    this.#unsubscribers = [
      domPushStream(this.#prevButton).subscribe((action) => {
        this.#onPrevPush(action);
      }),
      ...stageElements.map((stage) =>
        stage.notifyStageSelection().subscribe(() => {
          this.#onTutorialStageSelect(stage);
        })
      ),
    ];
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach((unsubscriber) => {
      unsubscriber.unsubscribe();
    });
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * 各種リソースの読み込みが完了するまで待つ
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await this.#isImageCutsLoaded;
  }

  /**
   * 戻るボタン押下通知
   * @return 通知ストリーム
   */
  notifyPrev(): Observable<void> {
    return this.#prev;
  }

  /**
   * チュートリアルステージ選択通知
   * @return 通知ストリーム
   */
  notifyStageSelection(): Observable<TutorialStageSelect> {
    return this.#stageSelect;
  }

  /**
   * 戻るボタンを押した時の処理
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
   * @param stage チュートリアルステージ HTML要素
   */
  #onTutorialStageSelect(stage: TutorialStageElement): void {
    this.#exclusive.execute(async () => {
      await stage.selected();
      this.#stageSelect.next({
        id: stage.id,
        level: stage.level,
      });
    });
  }
}
