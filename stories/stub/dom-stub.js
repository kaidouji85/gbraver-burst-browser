// @flow

import type {ResourcePath} from "../../src/js/resource/path/resource-path";
import {StorybookResourcePath} from "../../src/js/resource/path/storybook-resource-path";
import '../../src/css/style.css';

/**
 * HTML要素生成コールバック関数
 *
 * @param resourcePath リソースパス
 * @return 生成したHTML要素
 */
export type DOMCreator = (resourcePath: ResourcePath) => HTMLElement;

export const domStub = (creator: DOMCreator): HTMLElement => {
  const resourcePath = new StorybookResourcePath();
  return creator(resourcePath);
}


/**
 * HTML要素系コンポネントのスタブ
 */
export class DOMStub {
  _resourcePath: ResourcePath;
  _parent: HTMLElement;

  constructor(creator: DOMCreator) {
    this._resourcePath = new StorybookResourcePath();
    this._parent = creator(this._resourcePath);
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