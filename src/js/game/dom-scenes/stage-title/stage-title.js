// @flow

import type {ArmDozerId} from "gbraver-burst-core";
import {getArmdozerIconPathId} from "../../../path/armdozer-icon-path";
import type {Resources} from "../../../resource";
import {domUuid} from "../../../uuid/dom-uuid";
import {waitElementLoaded} from "../../../wait/wait-element-loaded";
import type {DOMScene} from "../dom-scene";

/** ルート要素 class属性 */
const ROOT_CLASS = 'stage-title';

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
function rootInnerHTML(ids: DataIDs, stagePrefix: StagePrefixType, level: number): string {
  const npcStagePrefix = ['S', 'TAGE'];
  const tutorialStagePrefix = ['T', 'UTORIAL'];
  const prefix = stagePrefix === 'NPCBattle' ? npcStagePrefix : tutorialStagePrefix;
  return `
    <div class="${ROOT_CLASS}__title">
      <div class="${ROOT_CLASS}__stage">
        <div class="${ROOT_CLASS}__stage-prefix--capitalized">${prefix[0]}</div>      
        <div class="${ROOT_CLASS}__stage-prefix">${prefix[1]}</div>
        <div class="${ROOT_CLASS}__stage-level">${level}</div>
      </div>
      <div class="${ROOT_CLASS}__caption" data-id="${ids.caption}"></div>
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

/** ステージプレフィックスタイプ */
type StagePrefixType = 'NPCBattle' | 'Tutorial';

/** ステージタイトルのパラメータ */
export type StageTitleParam = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** ステージプレフィックスタイプ */
  stagePrefix: StagePrefixType,
  /** ステージレベル */
  level: number,
  /** ステージ名 */
  caption: string[],
  /** 対戦するアームドーザのID */
  armDozerId: ArmDozerId
};

/** ステージタイトル */
export class StageTitle implements DOMScene {
  #root: HTMLElement;
  #isArmDozerIconLoaded: Promise<void>;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: StageTitleParam) {
    const ids = {caption: domUuid(), armDozerIcon: domUuid()};
    this.#root = document.createElement('div');
    this.#root.className = ROOT_CLASS;
    this.#root.innerHTML = rootInnerHTML(ids, param.stagePrefix, param.level);

    const elements = extractElements(this.#root, ids);

    this.#isArmDozerIconLoaded = waitElementLoaded(elements.armDozerIcon);
    const armDozerIconPathID = getArmdozerIconPathId(param.armDozerId);
    elements.armDozerIcon.src = param.resources.paths.find(v => v.id === armDozerIconPathID)?.path ?? '';

    elements.caption.innerHTML = param.caption
      .map(v => `
        <div class="${ROOT_CLASS}__caption-clause--capitalized">${v.slice(0,1)}</div>
        <div class="${ROOT_CLASS}__caption-clause">${v.slice(1)}</div>
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