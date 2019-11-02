// @flow

import React from 'react';
import {resourceBasePath} from "../../../resource/resource-base-path";

export function PlayInLandscapePresentation() {
  return (
    <div className="play-in-landscape">
      <img src={`${resourceBasePath()}/waring/play-in-landscape.png`} />
    </div>
  );
}