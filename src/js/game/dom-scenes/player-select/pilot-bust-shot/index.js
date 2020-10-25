// @flow

import type {Resources} from "../../../../resource";
import type {PilotId} from 'gbraver-burst-core';
import {PilotBustShot} from "./pilot-bust-shot";
import {createPilotBustShot} from "./create-bust-shot";

/**
 * バストショットとパイロットIDの紐づけ
 */
type BustShot = {
  pilotId: PilotId;
  bustShot: PilotBustShot;
};

/**
 * パイロット バストショット
 */
export class PilotBustShotContainer {
  _pilotId: PilotId;
  _bustShots: BustShot[];
  _root: HTMLElement;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param pilotIds パイロットIDリスト
   * @param initialPilotId パイロットID初期値
   */
  constructor(resources: Resources, pilotIds: PilotId[], initialPilotId: PilotId) {
    this._pilotId = initialPilotId;

    this._root = document.createElement('div');
    this._bustShots = pilotIds.map(v => ({
      pilotId: v,
      bustShot: createPilotBustShot(resources, v)
    }));
    this._bustShots.forEach(v => {
      (v.pilotId === this._pilotId)
        ? v.bustShot.show()
        : v.bustShot.hidden();
      this._root.appendChild(v.bustShot.getRootHTMLElement());
    });
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * パイロットカットインを切り替える
   * 
   * @param pilotId 切り替えるパイロットID
   */
  switch(pilotId: PilotId): void {
    const target = this._bustShots.find(v => v.pilotId === pilotId);
    if (!target) {
      return;
    }

    this._pilotId = pilotId;
    const others = this._bustShots.filter(v => v !== target);
    others.forEach(v => {
      v.bustShot.hidden();
    });
    target.bustShot.show();
    target.bustShot.enter();
  }

  /**
   * 退場
   *
   * @return アニメーション
   */
  async exit(): Promise<void> {
    const target = this._bustShots.find(v => v.pilotId === this._pilotId);
    if (!target) {
      return;
    }
    
    await target.bustShot.exit();
  }

  /**
   * 非表示にする
   */
  hidden(): void {
    this._bustShots.forEach(v => {
      v.bustShot.hidden();
    });
  }

  /**
   * リソース読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUnlillLoaded(): Promise<void> {
    await Promise.all(
      this._bustShots.map(v => v.bustShot.waitUntilLoaded())
    );
  }
}