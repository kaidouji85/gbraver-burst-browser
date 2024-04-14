import { Resources } from "../../../../resource";
import { createInitialValue } from "../model/initial-value";
import { ShinyaSounds } from "../sounds/shinya-sounds";
import { ShinyaView } from "../view/shinya-view";
import { ShinyaCutInProps } from "./shinya-cutin-props";

/** 生成パラメータ */
export type GenerateShinyaCutInPropsParams = {
  /** ビュー */
  view: ShinyaView;
  /** リソース管理オブジェクト */
  resources: Resources;
};

/**
 * シンヤ カットイン プロパティを生成する
 * @param params 生成パラメータ
 * @return 生成されたプロパティ
 */
export function createShinyaCutInProps(
  params: GenerateShinyaCutInPropsParams,
): ShinyaCutInProps {
  const { view, resources } = params;
  return {
    model: createInitialValue(),
    view,
    sounds: new ShinyaSounds(resources),
  };
}
