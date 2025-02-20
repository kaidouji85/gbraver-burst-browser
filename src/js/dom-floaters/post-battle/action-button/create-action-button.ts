import { pop } from "../../../dom/pop";
import { domPushStream } from "../../../dom/push-dom";
import { ResourcesContainer } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { ActionButton } from "../action-button/action-button";
import { ROOT_CLASS } from "../class-name";
import { PostBattleButtonConfig } from "../post-battle-button-config";
import { PostBattleFloaterProps } from "../props";

/** ボタンスタイル */
const buttonStyles = {
  /** メインボタン */
  MainButton: {
    className: `${ROOT_CLASS}__main-action`,
    soundId: SOUND_IDS.PUSH_BUTTON,
  },
  /** サブボタン */
  SubButton: {
    className: `${ROOT_CLASS}__sub-action`,
    soundId: SOUND_IDS.CHANGE_VALUE,
  },
};

/** アクションボタン生成パラメータ */
type CreateActionButtonOptions = ResourcesContainer &
  SEPlayerContainer & {
    /** プロパティ */
    props: PostBattleFloaterProps;
    /** ボタン設定 */
    buttonConfig: PostBattleButtonConfig;
  };

/**
 * 戦闘後アクションボタンを生成する
 * @param options 生成パラメータ
 * @returns 生成結果
 */
export function createActionButton(
  options: CreateActionButtonOptions,
): ActionButton {
  const { resources, se, props, buttonConfig } = options;
  const { style, action, label } = buttonConfig;
  const button = document.createElement("button");
  button.innerText = label;
  const { className, soundId } = buttonStyles[style] ?? buttonStyles.SubButton;
  button.className = className;
  const sound =
    resources.sounds.find((v) => v.id === soundId) ??
    createEmptySoundResource();
  const unsubscriber = domPushStream(button).subscribe(({ event }) => {
    props.exclusive.execute(async () => {
      event.preventDefault();
      event.stopPropagation();
      se.play(sound);
      await pop(button);
      props.selectionComplete.next(action);
    });
  });
  return { button, unsubscriber };
}
