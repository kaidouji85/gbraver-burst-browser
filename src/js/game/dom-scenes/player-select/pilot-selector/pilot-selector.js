// @flow

import type {Resources} from "../../../../resource";
import type {PilotId} from "gbraver-burst-core";
import {PilotIcon} from "./pilot-icon";
import {Observable, Subject, Subscription} from "rxjs";
import {domUuid} from "../../../../uuid/dom-uuid";
import {PilotStatus} from "./pilot-status";
import {replaceDOM} from "../../../../dom/replace-dom";

/**
 * ルート要素のclass名
 */
export const ROOT_CLASS_NAME = 'player-select__pilot-selector';

/**
 * パイロットセレクタ
 */
export class PilotSelector {
  _root: HTMLElement;
  _pilotStatus: PilotStatus;
  _pilotIcons: PilotIcon[];
  _pilotId: PilotId;
  _change: Subject<PilotId>;
  decide: Subject<PilotId>;
  _subscriptions: Subscription[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param pilotIds 選択可能なパイロットIDリスト
   * @param initialPilotId パイロットIDの初期値
   */
  constructor(resources: Resources, pilotIds: PilotId[], initialPilotId: PilotId) {
    this._pilotId = initialPilotId;
    this._change = new Subject();
    this.decide = new Subject();

    const dummyStatusId = domUuid();
    const iconsId = domUuid();

    this._root = document.createElement('div');
    this._root.className = ROOT_CLASS_NAME;
    this._root.innerHTML = `
      <div data-id="${dummyStatusId}"></div>
      <div class="${ROOT_CLASS_NAME}__icons" data-id="${iconsId}"></div>
      <div class="${ROOT_CLASS_NAME}__controllers">
      <button class="${ROOT_CLASS_NAME}__controllers__prev-button"">戻る</button>
      <button class="${ROOT_CLASS_NAME}__controllers__ok-button">これで出撃</button>
      </div>
    `;
    
    const dummyStatus = this._root.querySelector(`[data-id="${dummyStatusId}"]`)
      ?? document.createElement('div');
    this._pilotStatus = new PilotStatus();
    this._pilotStatus.switch(this._pilotId);
    replaceDOM(dummyStatus, this._pilotStatus.getRootHTMLElement());

    const icons = this._root.querySelector(`[data-id="${iconsId}"]`)
      ?? document.createElement('div');
    this._pilotIcons = pilotIds.map(v => new PilotIcon(resources, v));
    this._pilotIcons.forEach(v => {
      icons.appendChild(v.getRootHTMLElement());
    });
    
    this._subscriptions = this._pilotIcons.map(icon =>
      icon.selectedNotifier().subscribe(() =>{
          this._onPilotChange(icon.pilotId);
      }));
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
      this._pilotIcons.map(icon => icon.waitUntilLoaded())
    );
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
   * パイロット変更通知
   *
   * @return 通知ストリーム
   */
  changeNotifier(): Observable<PilotId> {
    return this._change;
  }

  /**
   * パイロット選択通知
   *
   * @return 通知ストリーム
   */
  decideNotifier(): Observable<PilotId> {
    return this.decide;
  }

  /**
   * パイロットが変更された時の処理
   *
   * @param pilotId 変更したパイロットのID
   */
  _onPilotChange(pilotId: PilotId): void {
    this._pilotStatus.switch(pilotId);
    this._change.next(pilotId);
  }
}