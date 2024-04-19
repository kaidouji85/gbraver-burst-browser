import "../../src/css/style.css";

import * as TWEEN from "@tweenjs/tween.js";

import {
  BGMManagerContainer,
  createBGMManager,
} from "../../src/js/bgm/bgm-manager";
import { gameLoopStream } from "../../src/js/game-loop/game-loop";
import { ResourcesContainer } from "../../src/js/resource";
import { developingFullResourceLoading } from "../../src/js/resource/loading/full-resource-loading";
import { createSEPlayer, SEPlayerContainer } from "../../src/js/se/se-player";
import { StorybookResourceRoot } from "../storybook-resource-root";

/** 生成パラメータ */
type DOMCreatorParams = BGMManagerContainer &
  ResourcesContainer &
  SEPlayerContainer;

/**
 * HTML要素生成コールバック関数
 *
 * @param params 生成パラメータ
 * @return 生成したHTML要素
 */
export type DOMCreator = (params: DOMCreatorParams) => HTMLElement;

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
      const component = creator({
        resources,
        bgm: createBGMManager(),
        se: createSEPlayer(),
      });
      root.appendChild(component);
    });
    gameLoopStream().subscribe((action) => {
      TWEEN.update(action.time);
    });
    return root;
  };
