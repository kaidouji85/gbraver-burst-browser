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
  _bustShots: BustShot[];
  _root: HTMLElement;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources, pilotIds: PilotId[]) {
    this._root = document.createElement('div');
    this._bustShots = pilotIds.map(v => ({
      pilotId: v,
      bustShot: createPilotBustShot(resources, v)
    }));
    this._bustShots.forEach(v => {
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

    const others = this._bustShots.filter(v => v !== target);
    others.forEach(v => {
      v.bustShot.hidden();
    });
    target.bustShot.show();
    target.bustShot.move();
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