import { ResourcesContainer } from "../../../../resource";
import { createEmptySoundResource } from "../../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../../sounds/se/se-player";
import { ROOT_CLASS_HIDDEN } from "../dom/class-name";
import { extractContent } from "../dom/extract-element";
import { rootInnerHTML } from "../dom/root-inner-html";
import { EasterEggProps } from "../props";

/** プロパティ生成オプション */
export type CreateEasterEggPropsOptions = ResourcesContainer &
  SEPlayerContainer;

/**
 * EasterEggPropsを生成する
 * @returns 生成されたEasterEggProps
 */
export const createEasterEggProps = (
  options: CreateEasterEggPropsOptions,
): EasterEggProps => {
  const { se, resources } = options;

  const root = document.createElement("div");
  root.className = ROOT_CLASS_HIDDEN;
  root.innerHTML = rootInnerHTML();

  const sound =
    resources.sounds.find((s) => s.id === SOUND_IDS.EASTER_EGG) ??
    createEmptySoundResource();

  const content = extractContent(root);
  return {
    root,
    content,

    se,
    sound,
  };
};
