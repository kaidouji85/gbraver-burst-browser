// @flow

import '../../src/css/style.css';
import type {Resources} from "../../src/js/resource";
import {fullResourceLoading} from "../../src/js/resource";
import {CssVH} from "../../src/js/view-port/vh";
import {resizeStream} from "../../src/js/window/resize";
import {StorybookResourceRoot} from "../storybook-resource-root";

/**
 * HTML要素生成コールバック関数
 *
 * @param resources リソース管理オブジェクト
 * @return 生成したHTML要素
 */
export type DOMCreator = (resources: Resources) => HTMLElement;

/**
 * HTML要素スタブのストーリー
 *
 * @return 表示するHTML要素
 */
export type DOMStubStory = () => HTMLElement;

/**
 *HTML要素スタブ
 *
 * @param creator HTML要素生成コールバック関数
 * @return ストーリー
 */
export const domStub = (creator: DOMCreator): DOMStubStory => () => {
  const root = document.createElement('div');
  const resize = resizeStream();
  new CssVH(resize);

  const resourceRoot = new StorybookResourceRoot();
  const resourceLoading = fullResourceLoading(resourceRoot);
  resourceLoading.resources.then(resources => {
    const component = creator(resources);
    root.appendChild(component);
  });

  return root;
}
