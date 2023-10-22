import { ArmdozerId } from "gbraver-burst-core";

import { ArmdozerSelectorProps } from "../props";

/**
 * アームドーザアイコンが選択された際の処理
 * @param props プロパティ
 * @param armdozerId 選択されたアームドーザID
 * @return 処理結果
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

    props.changeValueSound.play();
    props.armdozerIcons
      .filter((v) => v.armdozerId === armdozerId)
      .forEach((v) => {
        v.icon.pop();
        v.icon.selected(true);
      });
    props.armdozerIcons
      .filter((v) => v.armdozerId !== armdozerId)
      .forEach((v) => {
        v.icon.selected(false);
      });
  });
}
