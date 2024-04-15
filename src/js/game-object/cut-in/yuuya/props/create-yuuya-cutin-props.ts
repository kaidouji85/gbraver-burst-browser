import { Resources } from "../../../../resource";
import { SEPlayer } from "../../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { YuuyaSounds } from "../sounds/yuuya-sounds";
import { YuuyaView } from "../view/yuuya-view";
import { YuuyaCutInProps } from "./yuuya-cutin-props";

/** ユウヤ カットイン プロパティ生成パラメータ */
export type PropsCreatorParams = {
  /** ビュー */
  view: YuuyaView;
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生オブジェクト */
  se: SEPlayer;
};

/**
 * ユウヤ カットイン プロパティを生成する
 * @param params パラメータ
 * @return 生成結果
 */
export function createYuuyaCutInProps(
  params: PropsCreatorParams,
): YuuyaCutInProps {
  const { resources } = params;
  return {
    ...params,
    model: createInitialValue(),
    sounds: new YuuyaSounds(resources),
  };
}
