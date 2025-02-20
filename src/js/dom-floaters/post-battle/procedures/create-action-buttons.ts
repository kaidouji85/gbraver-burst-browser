import { pop } from "../../../dom/pop";
import { domPushStream } from "../../../dom/push-dom";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { ActionButton } from "../action-button/action-button";
import { ROOT_CLASS } from "../class-name";
import { PostBattleFloaterProps } from "../props";
import { ShowParams } from "../show-params";

/**
 * 戦闘後アクションボタンを生成する
 * @param props プロパティ
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createActionButtons(
  props: PostBattleFloaterProps,
  params: ShowParams,
): ActionButton[] {
  const { resources, se, buttons } = params;
  const pushButton =
    resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
    createEmptySoundResource();
  const changeValue =
    resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
    createEmptySoundResource();

  const buttonStyles = {
    MainButton: {
      className: `${ROOT_CLASS}__main-action`,
      sound: pushButton,
    },
    SubButton: {
      className: `${ROOT_CLASS}__sub-action`,
      sound: changeValue,
    },
  };
  return buttons.map(({ style, action, label }) => {
    const button = document.createElement("button");
    button.innerText = label;
    const { className, sound } =
      buttonStyles[style] ?? buttonStyles["SubButton"];
    button.className = className;
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
  });
}
