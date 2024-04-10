import { Observable } from "rxjs";

import { GameObjectAction } from "../../src/js/game-object/action/game-object-action";
import { ArmdozerSprite } from "../../src/js/game-object/armdozer/armdozer-sprite";
import { Resources } from "../../src/js/resource";
import { TDGameObjectStub } from "./td-game-object-stub";

/** アームドーザスプライト ジェネレータ パラメータ */
type GeneratorParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * アームドーザスプライト ジェネレータ
 * @template X スプライトのデータ型
 * @param params ジェネレータパラメータ
 * @return アームドーザスプライト
 */
type SpriteGenerator<X extends ArmdozerSprite> = (params: GeneratorParams) => X;

/**
 * アームドーザスプライト スタブ
 * @template X スプライトのデータ型
 * @param generator スプライトジェネレータ
 * @param fn スプライト操作関数
 * @return ルートHTML要素
 */
export const armdozerSpriteStub = <X extends ArmdozerSprite>(
  generator: SpriteGenerator<X>,
  fn: (sprite: X) => void,
): HTMLElement => {
  const stub = new TDGameObjectStub(({ resources, gameObjectAction }) => {
    const sprite = generator({ resources, gameObjectAction });
    fn(sprite);
    return {
      objects: [sprite.getObject3D()],
    };
  });
  stub.start();
  return stub.domElement();
};
