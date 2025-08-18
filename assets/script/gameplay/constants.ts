import { math, screen, view } from 'cc';

export enum PHYSICS_GROUPS {
	DEFAULT = 1,
	PLAYER_SHIP = 2,
	ASTEROIDS = 4,
	ITEMS = 8,
}

export const SECONDS_IN_MINUTE = 60;

export const DESGIN_RESOLUTION_SIZE = view.getDesignResolutionSize();
export const HALF_DESGIN_RESOLUTION_SIZE = new math.Size(
	DESGIN_RESOLUTION_SIZE.x / 2,
	DESGIN_RESOLUTION_SIZE.y / 2
);

export const WINDOW_SIZE = screen.windowSize;
export const HALF_WINDOW_SIZE = new math.Size(
	WINDOW_SIZE.x / 2,
	WINDOW_SIZE.y / 2
);
