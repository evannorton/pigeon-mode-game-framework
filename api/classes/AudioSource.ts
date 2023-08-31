import { Definable } from "./Definable";
import { Howl } from "howler";
import { getDefinable } from "pigeon-mode-game-framework/api/functions/getDefinable";
import { state } from "../state";

interface AudioSourceOptions {
  readonly audioPath: string;
}

export class AudioSource extends Definable {
  private readonly _howl: Howl;
  private readonly _options: AudioSourceOptions;

  public constructor(options: AudioSourceOptions) {
    super(options.audioPath);
    this._options = options;
    this._howl = new Howl({
      autoplay: false,
      loop: false,
      preload: true,
      src: [`audio/${this._options.audioPath}.mp3`],
      volume: 0.5,
    });
    this._howl.on("load", (): void => {
      this.onHowlLoad();
    });
  }

  public play(): void {
    this._howl.play();
  }

  public stop(): void {
    this._howl.stop();
  }

  private onHowlLoad(): void {
    state.setValues({
      loadedAssets: state.values.loadedAssets + 1,
    });
  }
}
export const playAudioSource = (audioSourceID: string): void => {
  getDefinable<AudioSource>(AudioSource, audioSourceID).play();
};
export const stopAudioSource = (audioSourceID: string): void => {
  getDefinable<AudioSource>(AudioSource, audioSourceID).stop();
};