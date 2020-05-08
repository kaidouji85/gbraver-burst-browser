// @flow

import type {ResourcePath} from "../../../../resource/path/resource-path";
import {domUuid} from "../../../../uuid/dom-uuid";
import {ArmdozerIconView} from "./armdozer-icon-view";
import {merge, Observable} from "rxjs";
import type {ArmDozerId} from "gbraver-burst-core";
import {createArmdozerIcon} from "./armdozer-icon-creator";
import {map} from "rxjs/operators";
import type {SelectArmdozer} from "../../../../action/player-select/select-armdozer";

/** ルートHTML要素 class */
export const ROOT_CLASS_NAME = 'player-select';
/**
 * イベント通知
 */
export type Notifier = {
  select: Observable<SelectArmdozer>;
};

/**
 * プレイヤーセレクト ビュー
 */
export class PlayerSelectView {
  armdozerIcons: ArmdozerIconView[];
  _root: HTMLElement;
  _armdozers: HTMLElement;
  _select: Observable<SelectArmdozer>;

  /**
   * コンストラクタ
   *
   * @param resourcePath リソースパス
   * @param armDozerIds アームドーザIDリスト
   */
  constructor(resourcePath: ResourcePath, armDozerIds: ArmDozerId[]) {
    const armdozersId = domUuid();
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = `
      <div class="player-select__contents">
        <span class="player-select__contents__caption">搭乗機を選択してください</span>
        <div class="player-select__contents__armdozers" id-data="${armdozersId}">
        </div>
      </div>
    `;

    this._armdozers = this._root.querySelector(`[id-data="${armdozersId}"]`) ?? document.createElement('div');
    this.armdozerIcons = armDozerIds
      .map(armDozerId => createArmdozerIcon(armDozerId, resourcePath));
    this.armdozerIcons
      .map(icon => icon.getRootHTMLElement())
      .forEach(element => {
        this._armdozers.appendChild(element);
      });

    const selects: Observable<SelectArmdozer>[] = this.armdozerIcons
      .map(icon => icon.notifier().select.pipe(
        map(() => ({
          type: 'SelectArmdozer',
          armDozerId: icon.armDozerId
        }))
      ));
    this._select = merge(...selects);
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return ルートHTML要素
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * イベント通知を取得する
   *
   * @return 取得結果
   */
  notifier(): Notifier {
    return {
      select: this._select
    };
  }
}