// @flow
import type {InputDOM} from "../../../../../dom/event-stream";
import {parseSoundVolume} from "../../../../config/browser-config";
import {soundVolumeLabel} from "../dom/sound-volume-label";
import type {ConfigProps} from "../props";

/**
 * BGM音量を変更した際の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onBGMVolumeChange(props: ConfigProps, action: $ReadOnly<InputDOM>): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    const value = parseSoundVolume(props.bgmVolumeSelector.value) ?? 1;
    props.bgmVolumeValue.innerText = soundVolumeLabel(value);
  });
}