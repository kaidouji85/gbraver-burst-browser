import { ResourcesContainer } from "../../../../resource";
import { createModelInitialValue } from "../model/create-model-initial-value";
import { createLightningShotSounds } from "../sounds/create-lightning-shot-sounds";
import { LightningShotView } from "../view/lightning-shot-view";
import { LightningShotProps } from "./lightning-shot-props";

/** 電撃ショットプロパティ生成オプション */
export type lightningShotPropsOptions = ResourcesContainer & {
  view: LightningShotView;
};

/**
 * 電撃ショットのプロパティを生成する
 * @param options オプション
 * @returns 電撃ショットのプロパティ
 */
export function createLightningShotProps(
  options: lightningShotPropsOptions,
): LightningShotProps {
  const { view } = options;
  const model = createModelInitialValue();
  const sounds = createLightningShotSounds(options);
  return { model, sounds, view };
}
