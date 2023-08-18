import { Collidable } from "../types/Collidable";
import { CollisionData } from "../types/CollisionData";
import { EntityCollidable } from "../types/EntityCollidable";
import { Layer, Level } from "../types/World";
import { getToken } from "./getToken";
import { state } from "../state";

export interface SpawnEntityOptions<CollisionLayer extends string> {
  readonly collidables?: Collidable<CollisionLayer>[];
  readonly collisionLayer?: CollisionLayer;
  readonly height: number;
  readonly layerID: string;
  readonly onCollision?: (data: CollisionData) => void;
  readonly position?: {
    readonly x: number;
    readonly y: number;
  };
  readonly spriteInstanceID?: string;
  readonly width: number;
  readonly zIndex: number;
}
export const spawnEntity = <CollisionLayer extends string>(
  spawnEntityOptions: SpawnEntityOptions<CollisionLayer>,
): string => {
  if (state.values.world === null) {
    throw new Error(
      "An attempt was made to spawn an entity before world was loaded.",
    );
  }
  if (state.values.levelID === null) {
    throw new Error(
      "An attempt was made to spawn an entity with no active level.",
    );
  }
  const level: Level | null =
    state.values.world.levels.get(state.values.levelID) ?? null;
  if (level === null) {
    throw new Error(
      "An attempt was made to spawn an entity with a nonexistant active level.",
    );
  }
  const layer: Layer | null =
    level.layers.find(
      (levelLayer: Layer): boolean =>
        levelLayer.id === spawnEntityOptions.layerID,
    ) ?? null;
  if (layer === null) {
    throw new Error(
      "An attempt was made to spawn an entity with a nonexistant layer.",
    );
  }
  const id: string = getToken();
  layer.entities.set(id, {
    collidables:
      spawnEntityOptions.collidables?.map(
        (collidable: Collidable<string>): EntityCollidable => ({
          collidable,
          entityID: id,
        }),
      ) ?? [],
    collisionLayer: spawnEntityOptions.collisionLayer ?? null,
    height: spawnEntityOptions.height,
    id,
    isCollidable: true,
    onCollision: spawnEntityOptions.onCollision ?? null,
    position:
      typeof spawnEntityOptions.position !== "undefined"
        ? {
            x: spawnEntityOptions.position.x,
            y: spawnEntityOptions.position.y,
          }
        : null,
    spriteInstanceID: spawnEntityOptions.spriteInstanceID ?? null,
    width: spawnEntityOptions.width,
    xVelocity: 0,
    yVelocity: 0,
    zIndex: spawnEntityOptions.zIndex,
  });
  return id;
};
