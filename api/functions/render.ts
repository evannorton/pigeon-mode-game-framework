import app from "pigeon-mode-game-library/api/app";
import config from "pigeon-mode-game-library/api/config";
import assetsAreLoaded from "pigeon-mode-game-library/api/functions/assetsAreLoaded";
import drawRectangle from "pigeon-mode-game-library/api/functions/draw/drawRectangle";
import drawText from "pigeon-mode-game-library/api/functions/draw/drawText";
import getTotalAssets from "pigeon-mode-game-library/api/functions/getTotalAssets";
import state from "pigeon-mode-game-library/api/state";

const render = (): void => {
  app.stage.removeChildren();
  drawRectangle("#000000", 1, 0, 0, config.width, config.height);
  if (!assetsAreLoaded()) {
    const current: number = state.loadedAssets;
    const total: number = getTotalAssets();
    const percent: number = current / total;
    const width: number = Math.floor(config.width * .625);
    const x: number = Math.floor((config.width - width) / 2);
    const height: number = 32;
    const y: number = Math.floor((config.height - height) / 2);
    drawRectangle("#343434", 1, x, y, width, height);
    drawRectangle("#7b7b7b", 1, x, y, Math.floor(width * percent), height);
  }
  else if (!state.hasInteracted) {
    drawText(
      "Click to focus",
      "#ffffff",
      Math.floor(config.width / 2),
      Math.floor(config.height / 2),
      1,
      config.width,
      1,
      "center",
      "middle"
    );
  }

  app.stage.sortChildren();
  app.render();
};

export default render;