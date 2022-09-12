// @flow
import {pop} from "../../../dom/animation";
import {pushDOMStream} from "../../../dom/event-stream";
import type {Resources} from "../../../resource";
import type {SoundResource} from "../../../resource/sound";
import {createEmptySoundResource, SOUND_IDS} from "../../../resource/sound";
import {map} from "../../../stream/operator";
import type {Stream} from "../../../stream/stream";
import {domUuid} from "../../../uuid/dom-uuid";
import type {TutorialStageID} from "../../tutorial";

/** ルートHTML class属性 */
const ROOT_CLASS = 'tutorial-selector';

/** data-idを集めたもの */
type DataIDs = {selectButton: string};

function rootInnerHTML(ids: DataIDs, title: string): string {
  return `
    <span class="${ROOT_CLASS}__stage-title">${title}</span>
    <button class="${ROOT_CLASS}__stage-select" data-id="${ids.selectButton}">選択</button>
  `;
}

type Elements = {selectButton: HTMLElement};

function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const selectButton = root.querySelector(`[data-id="${ids.selectButton}"]`) ?? document.createElement('div');
  return {selectButton};
}

/** チュートリアルステージ情報 */
export type TutorialStage = {
  /** チュートリアルステージID */
  id: TutorialStageID,
  /** チュートリアルステージタイトル */
  title: string
};

/** チュートリアルステージ選択情報 */
export type TutorialStageSelect = {
  /** チュートリアルステージID */
  id: TutorialStageID,
  /** ステージレベル */
  level: number,
};

export class TutorialStageElement {
  +id: TutorialStageID;
  +level: number;
  #root: HTMLElement;
  #selectButton: HTMLElement;
  #pushButton: SoundResource;
  #select: Stream<void>;

  constructor(resources: Resources, rootClass: string, stage: TutorialStage, level: number) {
    const ids = {selectButton: domUuid()};
    this.id = stage.id;
    this.level = level;
    this.#pushButton = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON) ?? createEmptySoundResource();

    this.#root = document.createElement('li');
    this.#root.className = `${ROOT_CLASS}__stage`;
    this.#root.innerHTML = rootInnerHTML(ids, stage.title);
    const elements = extractElements(this.#root, ids);
    this.#selectButton = elements.selectButton;

    this.#select = pushDOMStream(this.#selectButton).chain(map(action => {
      action.event.preventDefault();
      action.event.stopPropagation();
    }));
  }

  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  selectNotifier(): Stream<void> {
    return this.#select;
  }

  async selected(): Promise<void> {
    this.#pushButton.sound.play();
    await pop(this.#selectButton);
  }
}