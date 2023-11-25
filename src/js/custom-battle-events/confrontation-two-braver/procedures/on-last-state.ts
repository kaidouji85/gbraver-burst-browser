import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { ConfrontationTwoBraverProps } from "../props";

export async function onLastState(
  props: Readonly<LastState & ConfrontationTwoBraverProps>,
) {
  if (props.state.chapter.type === "ShinyaHasAdvantage") {
    props.view.dom.enemyCryMessageWindow.visible(false);
  }
}
