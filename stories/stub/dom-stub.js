// @flow

import {StorybookResourceRoot} from "../../src/js/resource/root/storybook-resource-root";
import '../../src/css/style.css';
import {createResizeStream} from "../../src/js/action/resize/resize";
import {CssVH} from "../../src/js/view-port/vh";
import type {Resources} from "../../src/js/resource";
import {ResourceLoader} from "../../src/js/resource";

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
  const resize = createResizeStream();
  const vh = new CssVH(resize);

  const resourceRoot = new StorybookResourceRoot();
  const loader = new ResourceLoader(resourceRoot);
  loader.load().then(resources => {
    const component = creator(resources);
    root.appendChild(component);
  });

  return root;
}
