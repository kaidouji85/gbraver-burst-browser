// @flow
import type {Resources} from "../../../resource";
import {PlayerSparkView} from "./view/player-spark-view";
import {Spark} from "./spark";
import {EnemySparkView} from "./view/enemy-spark-view";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";

export function playerSpark(resources: Resources, listener: Observable<GameObjectAction>): Spark {
  const view = new PlayerSparkView(resources);
  return new Spark(view, listener);
}

export function enemySpark(resources: Resources, listener: Observable<GameObjectAction>): Spark {
  const view = new EnemySparkView(resources, );
  return new Spark(view, listener);
}