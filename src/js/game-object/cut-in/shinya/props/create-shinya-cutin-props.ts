import { ResourcesContainer } from "../../../../resource";
import { SEPlayerContainer } from "../../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { ShinyaSounds } from "../sounds/shinya-sounds";
import { ShinyaView } from "../view/shinya-view";
import { ShinyaCutInProps } from "./shinya-cutin-props";

/** 生成パラメータ */
export type PropsCreatorParams = ResourcesContainer & SEPlayerContainer & {
  /** ビュー */
  view: ShinyaView;
};

/**
 * シンヤ カットイン プロパティを生成する
 * @param params 生成パラメータ
 * @return 生成されたプロパティ
 */
export function createShinyaCutInProps(
  params: PropsCreatorParams,
): ShinyaCutInProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new ShinyaSounds(resources),
  };
}
