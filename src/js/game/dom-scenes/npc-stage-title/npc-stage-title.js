// @flow

import type {DOMScene} from "../dom-scene";
import type {Resources} from "../../../resource";
import type {StageLevel} from "../../in-progress/npc-battle/npc-battle-course";
import type {ArmDozerId} from "gbraver-burst-core";
import {domUuid} from "../../../uuid/dom-uuid";
import {getArmdozerIconPathId} from "../../../path/armdozer-icon-path";

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
function rootInnerHTML(ids: DataIDs, level: StageLevel): string {
  return `
    <div class="${ROOT_CLASS}__title">
      <div class="${ROOT_CLASS}__title__stage">STAGE</div>
      <div class="${ROOT_CLASS}__title__stage-level">${level}</div>
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
export class NpcStageTitle implements DOMScene {
  _root: HTMLElement;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param level ステージレベル
   * @param caption ステージ名
   * @param armDozerId 対戦するアームドーザのID
   */
  constructor(resources: Resources, level: StageLevel, caption: string[], armDozerId: ArmDozerId) {
    const ids = {caption: domUuid(), armDozerIcon: domUuid()};
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS;
    this._root.innerHTML = rootInnerHTML(ids, level);

    const elements = extractElements(this._root, ids);
    const armDozerIconPathID = getArmdozerIconPathId(armDozerId);
    const armDozerIconPath = resources.paths.find(v => v.id === armDozerIconPathID)?.path ?? '';
    elements.armDozerIcon.src = armDozerIconPath;
    elements.caption.innerHTML = caption
      .map(v => `<div class="${ROOT_CLASS}__title__caption__clause">${v}</div>`)
      .reduce((a, b) => a + b);
  }

  /** @override */
  destructor(): void {
    // NOP
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }
}