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

// TODO js-docを書く
/**
 * アームドーザバストショット
 */
export class ArmdozerBustShotContainer {
  _resources: Resources;
  _root: HTMLElement;
  _bustShots: Array<{armdozerId: ArmDozerId, bustShot: ArmdozerBustShot}>;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources, armDozerIds: ArmDozerId[]) {
    this._resources = resources;
    this._root = document.createElement('div');

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