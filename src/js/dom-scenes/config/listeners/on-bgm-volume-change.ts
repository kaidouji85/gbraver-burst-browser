import type { InputDOM } from "../../../dom/event-stream";
import { parseSoundVolume } from "../../../game/config/schema/sound-volume";
import { soundVolumeLabel } from "../dom/sound-volume-label";
import type { ConfigProps } from "../props";

/**
 * BGM音量を変更した際の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onBGMVolumeChange(
  props: ConfigProps,
  action: Readonly<InputDOM>
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    const value = parseSoundVolume(props.bgmVolumeSelector.value) ?? 1;
    props.bgmVolumeValue.innerText = soundVolumeLabel(value);
  });
}
