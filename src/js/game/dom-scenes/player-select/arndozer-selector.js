// @flow

import {domUuid} from "../../../uuid/dom-uuid";
import {ArmdozerIcon} from "./armdozer-icon";
import {merge, Observable} from "rxjs";
import type {ArmDozerId} from "gbraver-burst-core";
import {map} from "rxjs/operators";
import type {Resources} from "../../../resource";

/** ルートHTML要素 class */
export const ROOT_CLASS_NAME = 'player-select__armdozer-selector';
/**
 * イベント通知
 */
export type Notifier = {
  /**
   * アームドーザを選択した
   */
  armdozerSelect: Observable<ArmdozerIcon>;
};

/**
 * プレイヤーセレクト ビュー
 */
export class ArmdozerSelector {
  _root: HTMLElement;
  _armdozerIcons: ArmdozerIcon[];
  _select: Observable<ArmdozerIcon>;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param armDozerIds アームドーザIDリスト
   */
  constructor(resources: Resources, armDozerIds: ArmDozerId[]) {
    const armdozersId = domUuid();
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = `
      <div class="${ROOT_CLASS_NAME}__contents">
        <span class="${ROOT_CLASS_NAME}__contents__caption">搭乗機を選択してください</span>
        <div class="${ROOT_CLASS_NAME}__contents__armdozers" id-data="${armdozersId}">
        </div>
      </div>
    `;

    const armdozers = this._root.querySelector(`[id-data="${armdozersId}"]`) ?? document.createElement('div');
    this._armdozerIcons = armDozerIds
      .map(armDozerId => new ArmdozerIcon(resources, armDozerId));
    this._armdozerIcons
      .map(icon => icon.getRootHTMLElement())
      .forEach(element => {
        armdozers.appendChild(element);
      });

    const selects: Observable<ArmdozerIcon>[] = this._armdozerIcons.map(icon => {
      const select = icon.notifier().select;
      return select.pipe(map(() => icon));
    });
    this._select = merge(...selects);
  }

  /**
   * リソース読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all(
      this._armdozerIcons.map(icon => icon.waitUntilLoaded())
    );
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
      armdozerSelect: this._select
    };
  }
}