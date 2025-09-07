import { ResourcesContainer } from "../../../resource";
import { SEPlayerContainer } from "../../../se/se-player";
import { GameObjectActionContainer } from "../../action/game-object-action-container";
import { createInitialModel } from "../model/create-initial-model";
import { createStatusIconSounds } from "../sounds/create-status-icon-sounds";
import { StatusIconView } from "../view/status-icon-view";
import { StatusIconProps } from "./status-icon-props";

/** プロパティ生成オプション */
export type StatusIconPropsCreatorOptions = ResourcesContainer &
  GameObjectActionContainer &
  SEPlayerContainer;

/**
 * ステータスアイコンのプロパティを生成する
 * @param options プロパティ生成オプション
 * @returns ステータスアイコンのプロパティ
 */
export function createStatusIconProps(
  options: StatusIconPropsCreatorOptions,
): StatusIconProps {
  const model = createInitialModel();
  const view = new StatusIconView(options);
  const sounds = createStatusIconSounds(options.resources);
  return { ...options, model, view, sounds };
}
