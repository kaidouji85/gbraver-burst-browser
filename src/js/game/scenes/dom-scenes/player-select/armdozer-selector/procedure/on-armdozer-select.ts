import { ArmdozerId } from "gbraver-burst-core";

import { ArmdozerSelectorProps } from "../props";

/**
 * アームドーザアイコンが選択された際の処理
 * @param props プロパティ
 * @param armdozerId 選択されたアームドーザID
 * @returns 処理結果
 */
export function onArmdozerSelect(
  props: ArmdozerSelectorProps,
  armdozerId: ArmdozerId,
) {
  props.exclusive.execute(async (): Promise<void> => {
    if (props.armdozerId !== armdozerId) {
      props.armdozerId = armdozerId;
      props.armdozerStatus.switch(armdozerId);
      props.change.next(props.armdozerId);
    }

    props.se.play(props.changeValueSound);
    props.armdozerIcons
      .filter((icon) => icon.armdozerId === armdozerId)
      .forEach((icon) => {
        icon.pop();
        icon.selected(true);
      });
    props.armdozerIcons
      .filter((icon) => icon.armdozerId !== armdozerId)
      .forEach((icon) => {
        icon.selected(false);
      });
  });
}
