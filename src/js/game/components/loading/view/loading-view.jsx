// @flow

import React from "react";
import type {LoadingState} from "../state/loading-state";

/** プロパティ */
type Props = {
  state: LoadingState
};

/**
 * ローディングビュー
 *
 * @param props プロパティ
 * @return ビュー
 */
export function loadingView(props: Props) {
  return (
    <div className="loading" style={{
      display: props.state.isVisible
        ? 'flex'
        : 'none'
    }}>
      <div className="loading__completed-rate">
        <div className="loading__completed-rate__text">
          {`LOADING... ${Math.floor(props.state.completedRate * 100)}%`}
        </div>
        <div className="loading__completed-rate__bar">
          <div className="loading__completed-rate__bar__completed" style={{
            width: `${props.state.completedRate * 100}%`
          }}></div>
        </div>
      </div>
    </div>
  );
}