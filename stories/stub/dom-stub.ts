import "../../src/css/style.css";

import * as TWEEN from "@tweenjs/tween.js";

import { gameLoopStream } from "../../src/js/game-loop/game-loop";
import type { Resources } from "../../src/js/resource";
import { developingFullResourceLoading } from "../../src/js/resource/loading/full-resource-loading";
import { StorybookResourceRoot } from "../storybook-resource-root";

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
export const domStub =
  (creator: DOMCreator): DOMStubStory =>
  () => {
    const root = document.createElement("div");
    const resourceRoot = new StorybookResourceRoot();
    const resourceLoading = developingFullResourceLoading(resourceRoot);
    resourceLoading.resources.then((resources) => {
      const component = creator(resources);
      root.appendChild(component);
    });
    gameLoopStream().subscribe((action) => {
      TWEEN.update(action.time);
    });
    return root;
  };
