// @flow

import type {ResourcePath} from "../../src/js/resource/path/resource-path";
import {StorybookResourcePath} from "../../src/js/resource/path/storybook-resource-path";
import '../../src/css/style.css';
import {createResizeStream} from "../../src/js/action/resize/resize";
import {CssVH} from "../../src/js/view-port/vh";
import type {Resources} from "../../src/js/resource";
import {loadAllResource} from "../../src/js/resource";

/**
 * HTML要素生成コールバック関数
 *
 * @param resourcePath リソースパス
 * @return 生成したHTML要素
 */
export type DOMCreator = (resources: Resources) => HTMLElement;

/**
 *HTML要素スタブ
 *
 * @param creator HTML要素生成コールバック関数
 * @return {function(): *} ストーリー
 */
export const domStub = (creator: DOMCreator) => (): HTMLElement => {
  const root = document.createElement('div');
  const resize = createResizeStream();
  const vh = new CssVH(resize);

  const resourcePath = new StorybookResourcePath();
  loadAllResource(resourcePath).then(resources => {
    const component = creator(resources);
    root.appendChild(component);
  });

  return root;
}
