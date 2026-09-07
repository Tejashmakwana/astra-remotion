import {Composition} from 'remotion';
import {Film} from './Film';

export const RemotionRoot = () => (
  <Composition
    id="AstraSwitch"
    component={Film}
    durationInFrames={1048}
    fps={25}
    width={1920}
    height={1080}
  />
);
