import type {Resources} from "../../../resource";
import {PlayerSparkView} from "./view/player-spark-view";
import {Spark} from "./spark";
import {EnemySparkView} from "./view/enemy-spark-view";

export function playerSpark(resources: Resources): Spark {
  const view = new PlayerSparkView(resources);
  return new Spark(view);
}

export function enemySpark(resources: Resources): Spark {
  const view = new EnemySparkView(resources);
  return new Spark(view);
}