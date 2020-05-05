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

/**
 *HTML要素スタブ
 *
 * @param creator HTML要素生成コールバック関数
 * @return {function(): *} ストーリー
 */
export const domStub = (creator: DOMCreator) => (): HTMLElement => {
  const resourcePath = new StorybookResourcePath();
  return creator(resourcePath);
}