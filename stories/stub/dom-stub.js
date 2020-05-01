// @flow

import type {ResourcePath} from "../../src/js/resource/path/resource-path";
import {StorybookResourcePath} from "../../src/js/resource/path/storybook-resource-path";
import '../../src/css/style.css';

/**
 * HTML要素生成コールバック関数
 *
 * @param parent 親要素
 * @param resourcePath リソースパス
 */
export type DOMCreator = (parent: HTMLElement, resourcePath: ResourcePath) => void;

/**
 * HTML要素系コンポネントのスタブ
 */
export class DOMStub {
  _resourcePath: ResourcePath;
  _parent: HTMLElement;

  constructor(creator: DOMCreator) {
    this._resourcePath = new StorybookResourcePath();
    this._parent = document.createElement('div');
    creator(this._parent, this._resourcePath);
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