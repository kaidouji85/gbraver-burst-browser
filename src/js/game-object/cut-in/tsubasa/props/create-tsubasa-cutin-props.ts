import { Resources } from "../../../../resource";
import { createInitialValue } from "../model/initial-value";
import { TsubasaSounds } from "../sounds/tsubasa-sounds";
import { TsubasaView } from "../view/tsubasa-view";
import { TsubasaCutInProps } from "./tsubasa-cutin-props";

/** ツバサ カットイン プロパティ生成パラメータ */
export type GenerateTsubasaCutInPropsParams = {
  /** ビュー */
  view: TsubasaView;
  /** リソース管理オブジェクト */
  resources: Resources;
};

/**
 * TsubasaCutInPropsを生成する
 * @param params パラメータ
 * @return 生成されたTsubasaCutInProps
 */
export function createTsubasaCutInProps(
  params: GenerateTsubasaCutInPropsParams,
): TsubasaCutInProps {
  const { resources, view } = params;
  return {
    model: createInitialValue(),
    view,
    sounds: new TsubasaSounds(resources),
  };
}
