import type { InputDOM } from "../../../dom/event-stream";
import { parseSoundVolume } from "../../../game/config/browser-config";
import { soundVolumeLabel } from "../dom/sound-volume-label";
import type { ConfigProps } from "../props";

/**
 * SE音量を変更した際の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onSEVolumeChange(props: ConfigProps, action: Readonly<InputDOM>): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    const value = parseSoundVolume(props.seVolumeSelector.value) ?? 1;
    props.seVolumeValue.innerText = soundVolumeLabel(value);
  });
}