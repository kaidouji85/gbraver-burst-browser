import { Illumination } from "../../../../../../game-object/illumination/illumination";
import { SkyBrightness } from "../../../../../../game-object/sky-brightness/sky-brightness";
import ShoppingStreet from "../../../../../../game-object/stage/shopping-street/shopping-street";
import { TurnIndicator } from "../../../../../../game-object/turn-indicator/turn-indicator";
import { TDLayerObjectCreatorParams } from "../../creator-params";
import { TDGameObjectsProps } from "../props";

/**
 * TDGameObjectsPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createTDGameObjectProps(
  params: TDLayerObjectCreatorParams,
): TDGameObjectsProps {
  const { resources, gameObjectAction } = params;
  return {
    stage: new ShoppingStreet(resources),
    turnIndicator: new TurnIndicator(params),
    skyBrightness: new SkyBrightness(gameObjectAction),
    illumination: new Illumination(gameObjectAction),
  };
}
