import "../../src/css/style.css";

import { AbortManager } from "../../src/js/abort-controller/abort-manager";
import { AbortManagerContainer } from "../../src/js/abort-controller/abort-manager-container";
import {
  BGMManagerContainer,
  createBGMManager,
} from "../../src/js/bgm/bgm-manager";
import { createGameLoop } from "../../src/js/game-loop/game-loop";
import { GameLoopContainer } from "../../src/js/game-loop/game-loop-container";
import { ResourcesContainer } from "../../src/js/resource";
import { loadFullResources } from "../../src/js/resource/loading/load-full-resources";
import { createSEPlayer, SEPlayerContainer } from "../../src/js/se/se-player";
import { StorybookResourceRoot } from "../storybook-resource-root";

/** 生成パラメータ */
type DOMCreatorParams = Readonly<BGMManagerContainer> &
  Readonly<ResourcesContainer> &
  Readonly<SEPlayerContainer> &
  Readonly<GameLoopContainer> &
  Readonly<AbortManagerContainer>;

/**
 * HTML要素生成コールバック関数
 *
 * @param params 生成パラメータ
 * @returns 生成したHTML要素
 */
export type DOMCreator = (params: DOMCreatorParams) => HTMLElement;

/**
 * HTML要素スタブのストーリー
 *
 * @returns 表示するHTML要素
 */
export type DOMStubStory = () => HTMLElement;

/**
 *HTML要素スタブ
 *
 * @param creator HTML要素生成コールバック関数
 * @returns ストーリー
 */
export const domStub =
  (creator: DOMCreator): DOMStubStory =>
  () => {
    const root = document.createElement("div");
    const resourceRoot = new StorybookResourceRoot();
    const resourceLoading = loadFullResources(resourceRoot);
    resourceLoading.resources.then((resources) => {
      const component = creator({
        resources,
        bgm: createBGMManager(),
        se: createSEPlayer(),
        gameLoop: createGameLoop(),
        abort: new AbortManager(),
      });
      root.appendChild(component);
    });
    return root;
  };
