import { ResourcesContainer } from "../../../../resource";
import { SEPlayerContainer } from "../../../../se/se-player";
import { createInitialValue } from "../model/initial-value";
import { YuuyaSounds } from "../sounds/yuuya-sounds";
import { YuuyaView } from "../view/yuuya-view";
import { YuuyaCutInProps } from "./yuuya-cutin-props";

/** ユウヤ カットイン プロパティ生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ビュー */
    view: YuuyaView;
  };

/**
 * ユウヤ カットイン プロパティを生成する
 * @param params パラメータ
 * @returns 生成結果
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
