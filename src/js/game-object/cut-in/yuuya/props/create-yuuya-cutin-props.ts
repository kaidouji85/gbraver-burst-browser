import { Resources } from "../../../../resource";
import { createInitialValue } from "../model/initial-value";
import { YuuyaSounds } from "../sounds/yuuya-sounds";
import { YuuyaView } from "../view/yuuya-view";
import { YuuyaCutInProps } from "./yuuya-cutin-props";

/** ユウヤ カットイン プロパティ生成パラメータ */
export type GenerateYuuyaCutInPropsParams = {
  /** ビュー */
  view: YuuyaView;
  /** リソース管理オブジェクト */
  resources: Resources;
};

/**
 * ユウヤ カットイン プロパティを生成する
 * @param params パラメータ
 * @return 生成結果
 */
export function createYuuyaCutInProps(
  params: GenerateYuuyaCutInPropsParams,
): YuuyaCutInProps {
  const { resources, view } = params;
  return {
    model: createInitialValue(),
    view,
    sounds: new YuuyaSounds(resources),
  };
}
