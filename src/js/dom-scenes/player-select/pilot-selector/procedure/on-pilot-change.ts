import { PilotId } from "gbraver-burst-core";

import { PilotSelectorProps } from "../props";

/**
 * パイロットが変更された時の処理
 * @param props プロパティ
 * @param pilotId 選択されたパイロットID
 */
export function onPilotChange(
  props: PilotSelectorProps,
  pilotId: PilotId,
): void {
  props.exclusive.execute(async (): Promise<void> => {
    const selected = props.pilotIcons.find((v) => v.pilotId === pilotId);
    if (!selected) {
      return;
    }

    if (props.pilotId !== pilotId) {
      props.change.next(pilotId);
    }
    props.pilotId = pilotId;
    props.pilotStatus.switch(pilotId);
    selected.icon.pop();
    props.changeValueSound.play();
    selected.icon.selected(true);
    props.pilotIcons
      .filter((v) => v.pilotId !== pilotId)
      .forEach((v) => {
        v.icon.selected(false);
      });
  });
}
