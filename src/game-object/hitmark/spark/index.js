import type {Resources} from "../../../resource";
import {PlayerSparkView} from "./view/player-spark-view";
import {Spark} from "./spark";

export function playerSpark(resources: Resources): Spark {
  const view = new PlayerSparkView(resources);
  return new Spark(view);
}