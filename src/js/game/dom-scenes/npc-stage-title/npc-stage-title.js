// @flow

import type {ArmDozerId} from "gbraver-burst-core";
import {getArmdozerIconPathId} from "../../../path/armdozer-icon-path";
import type {Resources} from "../../../resource";
import {domUuid} from "../../../uuid/dom-uuid";
import {waitElementLoaded} from "../../../wait/wait-element-loaded";
import type {DOMScene} from "../dom-scene";

/** ルート要素 class属性 */
const ROOT_CLASS = 'npc-stage-title';

/** data-idをまとめたもの */
type DataIDs = {
  caption: string,
  armDozerIcon: string,
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idをまとめたもの
 * @param level ステージレベル
 * @return ルート要素のinnerHTML
 */
function rootInnerHTML(ids: DataIDs, level: number): string {
  return `
    <div class="${ROOT_CLASS}__title">
      <div class="${ROOT_CLASS}__title__stage">
        <div class="${ROOT_CLASS}__title__stage__prefix--capitalized">S</div>      
        <div class="${ROOT_CLASS}__title__stage__prefix">TAGE</div>
        <div class="${ROOT_CLASS}__title__stage__level">${level}</div>
      </div>
      <div class="${ROOT_CLASS}__title__caption" data-id="${ids.caption}"></div>
    </div>
    <img class="${ROOT_CLASS}__armdozer-icon" data-id="${ids.armDozerIcon}">
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  caption: HTMLElement,
  armDozerIcon: HTMLImageElement,
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const caption = root.querySelector(`[data-id="${ids.caption}"]`) ?? document.createElement('div');
  const armDozerIconElement = root.querySelector(`[data-id="${ids.armDozerIcon}"]`);
  const armDozerIcon = (armDozerIconElement instanceof HTMLImageElement) ? armDozerIconElement : document.createElement('img');
  return {caption, armDozerIcon};
}

/** NPCステージタイトル */
export class NPCStageTitle implements DOMScene {
  #root: HTMLElement;
  #isArmDozerIconLoaded: Promise<void>;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param level ステージレベル
   * @param caption ステージ名
   * @param armDozerId 対戦するアームドーザのID
   */
  constructor(resources: Resources, level: number, caption: string[], armDozerId: ArmDozerId) {
    const ids = {caption: domUuid(), armDozerIcon: domUuid()};
    this.#root = document.createElement('div');
    this.#root.className = ROOT_CLASS;
    this.#root.innerHTML = rootInnerHTML(ids, level);

    const elements = extractElements(this.#root, ids);

    this.#isArmDozerIconLoaded = waitElementLoaded(elements.armDozerIcon);
    const armDozerIconPathID = getArmdozerIconPathId(armDozerId);
    elements.armDozerIcon.src = resources.paths.find(v => v.id === armDozerIconPathID)?.path ?? '';

    elements.caption.innerHTML = caption
      .map(v => `
        <div class="${ROOT_CLASS}__title__caption__clause--capitalized">${v.slice(0,1)}</div>
        <div class="${ROOT_CLASS}__title__caption__clause">${v.slice(1)}</div>
      `).reduce((a, b) => a + b);
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
   * 各種リソースの読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await this.#isArmDozerIconLoaded;
  }
}