// @flow
import type {PushDOM} from "../../../dom/event-stream";
import type {Stream} from "../../../stream/stream";

/** バトルシーンストリーム */
export type BattleSceneStreams = {
  /** レンダラーDOMを押下した */
  pushRendererDOM: Stream<PushDOM>
};