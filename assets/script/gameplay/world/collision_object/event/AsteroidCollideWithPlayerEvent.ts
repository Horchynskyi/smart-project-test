import { Collider2D, Event, IPhysics2DContact } from 'cc';

export class AsteroidCollideWithPlayerEvent extends Event {
	static readonly type = 'asteroid-collide-with-player';

	constructor(
		readonly details: {
			selfCollider: Collider2D;
			otherCollider: Collider2D;
			contact: IPhysics2DContact | null;
		}
	) {
		super(AsteroidCollideWithPlayerEvent.type, true);
	}
}
