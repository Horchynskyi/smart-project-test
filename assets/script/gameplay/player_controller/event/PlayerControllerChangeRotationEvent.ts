import { Event } from 'cc';

export class PlayerControllerChangeRotationEvent extends Event {
	static readonly type = 'player-controller-change-rotation-event';

	constructor(readonly details: { rotation: number }) {
		super(PlayerControllerChangeRotationEvent.type);
	}
}
