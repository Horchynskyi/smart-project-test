import { Event } from 'cc';

export class PlayerControllerAccelerationIncreaseEvent extends Event {
	static readonly type = 'player-controller-acceleration-increase-event';

	constructor() {
		super(PlayerControllerAccelerationIncreaseEvent.type);
	}
}
