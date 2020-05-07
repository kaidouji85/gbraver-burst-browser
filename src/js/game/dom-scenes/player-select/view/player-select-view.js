// @flow

import type {ArmdozerIcon, PlayerSelectState} from "../state/player-select-state";
import type {ResourcePath} from "../../../../resource/path/resource-path";
import {domUuid} from "../../../../uuid/dom-uuid";
import {ArmdozerIconView} from "./armdozer-icon-view";
import {merge, Observable, Subject, Subscription} from "rxjs";
import type {ArmDozerId} from "gbraver-burst-core";

/**
 * イベント通知
 */
export type Notifier = {
  select: Observable<ArmDozerId>;
};

/**
 * プレイヤーセレクト ビュー
 */
export class PlayerSelectView {
  _root: HTMLElement;
  _armdozers: HTMLElement;
  _armdozerIcons: ArmdozerIconView[];
  _select: Subject<ArmDozerId>;
  _subscriptions: Subscription[];

  /**
   * コンストラクタ
   *
   * @param resourcePath リソースパス
   * @param initialState 初期ステート
   */
  constructor(resourcePath: ResourcePath, initialState: PlayerSelectState) {
    this._select = new Subject();

    const armdozersId = domUuid();
    this._root = document.createElement('div');
    this._root.innerHTML = `
      <div class="player-select__contents">
        <span class="player-select__contents__caption">搭乗機を選択してください</span>
        <div class="player-select__contents__armdozers" id-data="${armdozersId}">
        </div>
      </div>
    `;

    this._armdozers = this._root.querySelector(`[id-data="${armdozersId}"]`) ?? document.createElement('div');
    this._armdozerIcons = initialState.armdozerIcons.map(icon => new ArmdozerIconView(icon));
    this._armdozerIcons
      .map(icon => icon.getRootHTMLElement())
      .forEach(element => {
        this._armdozers.appendChild(element);
      });

    this._subscriptions = this._armdozerIcons
      .map(icon => icon.notifier().select.subscribe(armdozerId => {
        this._onSelected(icon, armdozerId);
      }));

    this.engage(initialState);
  }

  destructor(): void {
    this._subscriptions.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * ステートをビューに反映させる
   *
   * @param state ステート
   */
  engage(state: PlayerSelectState): void {
    this._root.className = state.isVisible
      ? 'player-select'
      : 'player-select--invisible';
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

  async _onSelected(icon: ArmdozerIconView, armdozerId: ArmDozerId): Promise<void> {
    try {
      await Promise.all([
        ...this._armdozerIcons
          .filter(v => v !== icon)
          .map(v => v.noSelected()),
        icon.selected()
      ])

      this._select.next(armdozerId);
    } catch(e) {
      throw e;
    }
  }
}