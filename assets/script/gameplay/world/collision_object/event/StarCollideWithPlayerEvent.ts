import { Collider2D, Event, IPhysics2DContact } from 'cc';

export class StarCollideWithPlayerEvent extends Event {
	static readonly type = 'star-collide-with-player';

	constructor(
		readonly details: {
			selfCollider: Collider2D;
			otherCollider: Collider2D;
			contact: IPhysics2DContact | null;
		}
	) {
		super(StarCollideWithPlayerEvent.type, true);
	}
}
