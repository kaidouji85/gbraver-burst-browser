// @flow

import {ArmdozerIcon} from "./armdozer-icon";
import {Observable, Subject, Subscription} from "rxjs";
import type {ArmDozerId} from "gbraver-burst-core";
import type {Resources} from "../../../../resource";
import {domUuid} from "../../../../uuid/dom-uuid";
import {pushDOMStream} from "../../../../action/push/push-dom";

/** ルートHTML要素 class */
export const ROOT_CLASS_NAME = 'player-select__armdozer-selector';

/**
 * プレイヤーセレクト ビュー
 */
export class ArmdozerSelector {
  _canOperate: boolean;
  _root: HTMLElement;
  _armdozerIcons: ArmdozerIcon[];
  _currentValue: ArmDozerId;
  _change: Subject<ArmDozerId>;
  _decide: Subject<ArmDozerId>;
  _subscriptions: Subscription[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param armDozerIds アームドーザIDリスト
   */
  constructor(resources: Resources, armDozerIds: ArmDozerId[]) {
    const okButtonId = domUuid();
    const iconsId = domUuid();

    this._change = new Subject<ArmDozerId>();
    this._decide = new Subject<ArmDozerId>();
    this._currentValue = armDozerIds[0];

    this._canOperate = true;
    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = `
      <div class="${ROOT_CLASS_NAME}__buttons">
        <button class="${ROOT_CLASS_NAME}__ok-button" data-id="${okButtonId}">これで出撃</button>
      </div>
      <div class="${ROOT_CLASS_NAME}__icons" data-id="${iconsId}"></div>
    `;
    const icons = this._root.querySelector(`[data-id="${iconsId}"]`)
      ?? document.createElement('div');
    this._armdozerIcons = armDozerIds.map(v => new ArmdozerIcon(resources, v));
    this._armdozerIcons
      .map(icon => icon.getRootHTMLElement())
      .forEach(element => {
        icons.appendChild(element);
      });

    const okButton = this._root.querySelector(`[data-id="${okButtonId}"]`)
      ?? document.createElement('button');

    this._subscriptions = this._armdozerIcons.map(v =>
      v.selectedNotifier().subscribe(() => {
        this._onArmdozerSelect(v);
      }),
      pushDOMStream(okButton).subscribe(() => {
        this._onOkButtonPush();
      })
    );
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
   * 本コンポネントを表示する
   */
  show(): void {
    this._root.className = ROOT_CLASS_NAME;
  }

  /**
   * 本コンポネントを非表示にする
   */
  hidden(): void {
    this._root.className = `${ROOT_CLASS_NAME}--hidden`;
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
  changeNotifier(): Observable<ArmDozerId> {
    return this._change;
  }

  /**
   * アームドーザ決定通知ストリームを取得する
   *
   * @return アームドーザ決定通知ストリーム
   */
  decideNotifier(): Observable<ArmDozerId> {
    return this._decide;
  }

  /**
   * アームドーザアイコンが選択された際の処理
   *
   * @param icon 選択されたアイコン
   * @return 処理結果
   */
  _onArmdozerSelect(icon: ArmdozerIcon): void {
    if (this._currentValue === icon.armDozerId) {
      return;
    }

    this._currentValue = icon.armDozerId;
    this._change.next(this._currentValue);
  }

  /**
   * 決定ボタンが押された時の処理
   */
  _onOkButtonPush(): void {
    this._decide.next(this._currentValue);
  }
}