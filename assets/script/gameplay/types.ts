export type AsteroidsSystemConfigT = {
	ratio: {
		from: number;
		to: number;
	};
	speed: {
		from: number;
		to: number;
	};
};

export type StarsSystemConfigT = {
	ratio: number;
	maxAmount: number;
};

export type PlayerShipConfigT = {
	speed: number;
	acceleration: number;
};

export type GameplayConfigT = {
	startLifes: number;
	asteroidsSystemConfig: AsteroidsSystemConfigT;
	starsSystemConfig: StarsSystemConfigT;
	surviveSeconds: number;
	playerShip: PlayerShipConfigT;
};
