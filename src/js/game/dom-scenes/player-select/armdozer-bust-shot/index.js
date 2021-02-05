// @flow

import type {Resources} from "../../../../resource";
import type {ArmDozerId} from "gbraver-burst-core";
import {ArmdozerBustShot} from "./amrodzer-bust-shot";
import {createBustShot} from "./create-bust-shot";

/**
 * バストショット情報
 */
type BustShot = {
  armdozerId: ArmDozerId,
  bustShot: ArmdozerBustShot
};

/**
 * アームドーザバストショット
 */
export class ArmdozerBustShotContainer {
  _resources: Resources;
  _root: HTMLElement;
  _bustShots: BustShot[];

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   * @param armDozerIds アームドーザIDリスト
   * @param initialArmdozerId アームドーザIDの初期値
   */
  constructor(resources: Resources, armDozerIds: ArmDozerId[], initialArmdozerId: ArmDozerId) {
    this._resources = resources;
    this._root = document.createElement('div');
    this._root.className = 'player-select__armdozer-bust-shot-container';

    this._bustShots = armDozerIds.map(v => ({
      armdozerId: v,
      bustShot: createBustShot(v, resources)
    }));
    this._bustShots.forEach(v => {
      this._root.appendChild(v.bustShot.getRootHTMLElement());
    });
    this._bustShots.filter(v => v.armdozerId !== initialArmdozerId)
      .forEach(v => {
        v.bustShot.hidden();
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
   * リソースの読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all(
      this._bustShots.map(v => v.bustShot.waitUntilLoaded())
    );
  }

  /**
   * アームドーザバストショットを切り替える
   *
   * @param armdozerId アームドーザID
   */
  switch(armdozerId: ArmDozerId): void {
    this._bustShots.filter(v => v.armdozerId === armdozerId)
      .forEach(v => {
        v.bustShot.show();
        v.bustShot.move();
      });

    this._bustShots.filter(v => v.armdozerId !== armdozerId)
      .forEach(v => {
        v.bustShot.hidden();
      });
  }
}

