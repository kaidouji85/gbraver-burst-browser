import { RematchRoom } from "@gbraver-burst-network/browser-sdk";

import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { Rematch } from "../../../post-battle";

/**
 * inProgress から再戦ルームを抽出する
 * @param inProgress 抽出対象
 * @returns 抽出された再戦ルーム、存在しない場合は null
 */
const extractRematchRoom = (
  inProgress: Readonly<InProgress>,
): RematchRoom | null => {
  if (
    inProgress.type === "CasualMatch" &&
    inProgress.casualMatch.type === "Rematch"
  ) {
    return inProgress.casualMatch.rematchRoom;
  } else if (
    inProgress.type === "PrivateMatchHost" &&
    inProgress.privateMatchHost.type === "Rematch"
  ) {
    return inProgress.privateMatchHost.rematchRoom;
  } else if (
    inProgress.type === "PrivateMatchGuest" &&
    inProgress.privateMatchGuest.type === "Rematch"
  ) {
    return inProgress.privateMatchGuest.rematchRoom;
  }

  return null;
};

/**
 * 再戦を行う
 * @param options オプション
 * @param options.props ゲームプロパティ
 * @param options.postAction 再戦アクション
 */
export const rematch = (options: {
  props: Readonly<GameProps>;
  postAction: Readonly<Rematch>;
}) => {
  const { props } = options;
  const { inProgress } = props;
  const rematchRoom = extractRematchRoom(inProgress);
  if (!rematchRoom) {
    return inProgress;
  }
};
