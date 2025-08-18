import { GameplayConfigT } from './types';

export const gameplsyConfig: GameplayConfigT = {
	startLifes: 3,
	asteroidsSystemConfig: {
		ratio: {
			from: 3,
			to: 0.5,
		},
		speed: {
			from: -2,
			to: -13,
		},
	},
	starsSystemConfig: {
		ratio: 2,
		maxAmount: 20,
	},
	surviveSeconds: 120,
	playerShip: {
		speed: 3,
		acceleration: 5,
	},
};
