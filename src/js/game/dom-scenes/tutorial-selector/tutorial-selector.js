// @flow
import {domUuid} from "../../../uuid/dom-uuid";
import type {TutorialStageID} from "../../tutorial";
import type {DOMScene} from "../dom-scene";

/** ROOT要素class属性*/
const ROOT_CLASS = 'tutorial-selector';

/** data-idをあつめたもの */
type DataIDs = {stages: string};

/**
 * ルート要素のinnerHTML
 * @return innerHTML
 */
export function rootInnerHTML(ids: DataIDs): string {
  return `
    <div class="${ROOT_CLASS}__title">チュートリアル</div>
    <ol class="${ROOT_CLASS}__stages" data-id="${ids.stages}">
    </ol>
    <button class="${ROOT_CLASS}__prev">戻る</button> 
  `;
}

/** ルート要素の子孫要素 */
type Elements = {stages: HTMLElement};

function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const stages = root.querySelector(`[data-id="${ids.stages}"]`) ?? document.createElement('div');
  return {stages};
}

/** チュートリアルステージ情報 */
type TutorialStage = {
  /** チュートリアルステージID */
  id: TutorialStageID,
  /** チュートリアルステージタイトル */
  title: string
};

/** チュートリアルステージセレクト画面 */
export class TutorialSelector implements DOMScene {
  root: HTMLElement;
  stages: HTMLElement;

  /**
   * コンストラクタ
   *
   * @param stages チュートリアルステージ情報
   */
  constructor(stages: TutorialStage[]) {
    const ids = {stages: domUuid()};
    this.root = document.createElement('div');
    this.root.className = ROOT_CLASS;
    this.root.innerHTML = rootInnerHTML(ids);
    const elements = extractElements(this.root, ids);
    this.stages = elements.stages;
    stages.map(stage => {
      const li = document.createElement('li');
      li.className = `${ROOT_CLASS}__stage`;
      li.innerHTML = `
        <span class="${ROOT_CLASS}__stage-title">${stage.title}</span>
        <button class="${ROOT_CLASS}__stage-select">選択</button>
      `;
      return li;
    }).forEach(li => {
      this.stages.appendChild(li);
    });
  }

  /** @override */
  destructor(): void {
    // NOP
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.root;
  }
}