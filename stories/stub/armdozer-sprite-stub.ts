import { Observable } from "rxjs";
import { StoryFn } from "@storybook/react";

import { GameObjectAction } from "../../src/js/game-object/action/game-object-action";
import { ArmdozerSprite } from "../../src/js/game-object/armdozer/armdozer-sprite";
import { ResourcesContainer } from "../../src/js/resource";
import { SEPlayerContainer } from "../../src/js/se/se-player";
import { tdGameObjectStory } from "./td-game-object-stub";

/** アームドーザスプライト ジェネレータ パラメータ */
type GeneratorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ゲームオブジェクトアクション */
    gameObjectAction: Observable<GameObjectAction>;
  };

/**
 * アームドーザスプライト ジェネレータ
 * @template X スプライトのデータ型
 * @param params ジェネレータパラメータ
 * @returns アームドーザスプライト
 */
type SpriteGenerator<X extends ArmdozerSprite> = (params: GeneratorParams) => X;

/**
 * アームドーザスプライト スタブ
 * @template X スプライトのデータ型
 * @param generator スプライトジェネレータ
 * @param fn スプライト操作関数
 * @returns ルートHTML要素
 */
export const armdozerSpriteStub = <X extends ArmdozerSprite>(
  generator: SpriteGenerator<X>,
  fn: (sprite: X) => void,
): StoryFn =>
  tdGameObjectStory((params) => {
    const sprite = generator(params);
    fn(sprite);
    return {
      objects: [sprite.getObject3D()],
    };
  });
