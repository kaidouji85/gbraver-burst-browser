// @flow

import type {Resources} from "../../../../resource";
import type {ArmDozerId} from "gbraver-burst-core/lib/player/armdozer";
import {
  ArmdozerBustShot,
  lightningDozerBustShot,
  neoLandozerBustShot,
  shinBraverBustShot,
  wingDozerBustShot
} from "./amrodzer-bust-shot";
import {ArmDozerIdList} from "gbraver-burst-core/lib/master/armdozers";

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
   */
  constructor(resources: Resources, armDozerIds: ArmDozerId[]) {
    this._resources = resources;
    this._root = document.createElement('div');
    this._root.className = 'player-select__armdozer-bust-shot-container';

    this._bustShots = armDozerIds.map(v => ({
      armdozerId: v,
      bustShot: createBustShot(v, resources)
    }));
    this._bustShots.forEach(v => {
      v.bustShot.hidden();
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
    this._bustShots.forEach(v => {
      if (v.armdozerId === armdozerId) {
        v.bustShot.show();
      } else {
        v.bustShot.hidden();
      }
    });
  }
}

/**
 * アームドーザIDに対応したバストショットを生成する
 *
 * @param armdozerId アームドーザID
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function createBustShot(armdozerId: ArmDozerId, resources: Resources): ArmdozerBustShot {
  switch(armdozerId) {
    case ArmDozerIdList.SHIN_BRAVER:
      return shinBraverBustShot(resources);
    case ArmDozerIdList.NEO_LANDOZER:
      return neoLandozerBustShot(resources);
    case ArmDozerIdList.LIGHTNING_DOZER:
      return lightningDozerBustShot(resources);
    case ArmDozerIdList.WING_DOZER:
      return wingDozerBustShot(resources);
    default:
      return shinBraverBustShot(resources);
  }
}