// @flow

import type {ResourcePath} from "../../src/js/resource/path/resource-path";
import {StorybookResourcePath} from "../../src/js/resource/path/storybook-resource-path";
import '../../src/css/style.css';

/**
 * HTML要素生成コールバック関数
 *
 * @param resourcePath リソースパス
 * @return HTML要素
 */
export type DOMCreator = (resourcePath: ResourcePath) => HTMLElement[];

/**
 * HTML要素系コンポネントのスタブ
 */
export class DOMStub {
  _creator: DOMCreator;
  _resourcePath: ResourcePath;
  _parent: HTMLElement;

  constructor(creator: DOMCreator) {
    this._creator = creator;
    this._resourcePath = new StorybookResourcePath();
    this._parent = document.createElement('div');
  }

  /**
   * スタブを開始する
   */
  start(): void {
    const elements = this._creator(this._resourcePath);
    elements.forEach(element => {
      this._parent.appendChild(element);
    });
  }

  /**
   * コンポネントの親要素を取得する
   *
   * @return {HTMLElement}
   */
  domElement(): HTMLElement {
    return this._parent;
  }
}