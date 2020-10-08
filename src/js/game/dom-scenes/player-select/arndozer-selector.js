// @flow

import {domUuid} from "../../../uuid/dom-uuid";
import {ArmdozerIcon} from "./armdozer-icon";
import {Observable, Subject, Subscription} from "rxjs";
import type {ArmDozerId} from "gbraver-burst-core";
import type {Resources} from "../../../resource";
import {waitTime} from "../../../wait/wait-time";

/** ルートHTML要素 class */
export const ROOT_CLASS_NAME = 'player-select__armdozer-selector';

/**
 * プレイヤーセレクト ビュー
 */
export class ArmdozerSelector {
  _canOperate: boolean;
  _root: HTMLElement;
  _armdozerIcons: ArmdozerIcon[];
  _armdozerSelected: Subject<ArmDozerId>;
  _subscriptions: Subscription[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param armDozerIds アームドーザIDリスト
   */
  constructor(resources: Resources, armDozerIds: ArmDozerId[]) {
    this._canOperate = true;
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
    this._armdozerIcons = armDozerIds.map(v => new ArmdozerIcon(resources, v));
    this._armdozerIcons
      .map(icon => icon.getRootHTMLElement())
      .forEach(element => {
        armdozers.appendChild(element);
      });
    this._subscriptions = this._armdozerIcons.map(v =>
      v.notifier().select.subscribe(() => {
        this._onArmdozerSelect(v);
      })
    );
    this._armdozerSelected = new Subject<ArmDozerId>();
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._subscriptions.forEach(v => {
      v.unsubscribe();
    });
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
   * アームドーザ選択の通知
   *
   * @return イベント通知ストリーム
   */
  armdozerSelectedNotifier(): Observable<ArmDozerId> {
    return this._armdozerSelected;
  }

  /**
   * アームドーザアイコンが選択された際の処理
   *
   * @param icon 選択されたアイコン
   * @return 処理結果
   */
  async _onArmdozerSelect(icon: ArmdozerIcon): Promise<void> {
    if (!this._canOperate) {
      return;
    }
    this._canOperate = false;

    await icon.selected();
    await waitTime(1000);
    this._armdozerSelected.next(icon.armDozerId);

    this._canOperate = true;
  }
}