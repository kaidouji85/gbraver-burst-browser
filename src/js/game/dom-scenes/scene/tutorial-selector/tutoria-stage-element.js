// @flow
import { pop } from "../../../../dom/animation";
import { pushDOMStream } from "../../../../dom/event-stream";
import type { Resources } from "../../../../resource";
import type { SoundResource } from "../../../../resource/sound";
import {
  createEmptySoundResource,
  SOUND_IDS,
} from "../../../../resource/sound";
import { map } from "../../../../stream/operator";
import type { Stream } from "../../../../stream/stream";
import { domUuid } from "../../../../uuid/dom-uuid";
import type { TutorialStageID } from "../../../tutorial-stages";

/** ルートHTML class属性 */
const ROOT_CLASS = "tutorial-stage";

/** data-idを集めたもの */
type DataIDs = { selectButton: string };

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @param title ステージタイトル
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs, title: string): string {
  return `
    <span class="${ROOT_CLASS}__title">${title}</span>
    <button class="${ROOT_CLASS}__select" data-id="${ids.selectButton}">選択</button>
  `;
}

/** ルート要素の子孫要素 */
type Elements = { selectButton: HTMLElement };

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const selectButton =
    root.querySelector(`[data-id="${ids.selectButton}"]`) ??
    document.createElement("div");
  return { selectButton };
}

/** チュートリアルステージ情報 */
export type TutorialStage = {
  /** チュートリアルステージID */
  id: TutorialStageID,
  /** チュートリアルステージタイトル */
  title: string,
};

/** チュートリアルステージ選択情報 */
export type TutorialStageSelect = {
  /** チュートリアルステージID */
  id: TutorialStageID,
  /** ステージレベル */
  level: number,
};

/** チュートリアルステージ HTML要素 */
export class TutorialStageElement {
  /** ステージID */
  +id: TutorialStageID;
  /** ステージレベル */
  +level: number;
  #root: HTMLElement;
  #selectButton: HTMLElement;
  #pushButton: SoundResource;
  #select: Stream<void>;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param stage ステージ情報
   * @param level ステージレベル
   */
  constructor(resources: Resources, stage: TutorialStage, level: number) {
    const ids = { selectButton: domUuid() };
    this.id = stage.id;
    this.level = level;
    this.#pushButton =
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
      createEmptySoundResource();

    this.#root = document.createElement("li");
    this.#root.className = ROOT_CLASS;
    this.#root.innerHTML = rootInnerHTML(ids, stage.title);
    const elements = extractElements(this.#root, ids);
    this.#selectButton = elements.selectButton;

    this.#select = pushDOMStream(this.#selectButton).chain(
      map((action) => {
        action.event.preventDefault();
        action.event.stopPropagation();
      })
    );
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * ステージ選択通知
   *
   * @return 通知ストリーム
   */
  stageSelectNotifier(): Stream<void> {
    return this.#select;
  }

  /**
   * ステージ選択アニメーション
   *
   * @return アニメーションが完了したら発火するPromise
   */
  async selected(): Promise<void> {
    this.#pushButton.sound.play();
    await pop(this.#selectButton);
  }
}
