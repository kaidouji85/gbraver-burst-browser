import { ResourcesContainer } from "../../../../resource";
import { SEPlayer } from "../../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { TsubasaSounds } from "../sounds/tsubasa-sounds";
import { TsubasaView } from "../view/tsubasa-view";
import { TsubasaCutInProps } from "./tsubasa-cutin-props";

/** ツバサ カットイン プロパティ生成パラメータ */
export type PropsCreatorParams = ResourcesContainer & {
  /** ビュー */
  view: TsubasaView;
  /** SE再生オブジェクト */
  se: SEPlayer;
};

/**
 * TsubasaCutInPropsを生成する
 * @param params パラメータ
 * @return 生成されたTsubasaCutInProps
 */
export function createTsubasaCutInProps(
  params: PropsCreatorParams,
): TsubasaCutInProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new TsubasaSounds(resources),
  };
}
