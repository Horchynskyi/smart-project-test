import {
	_decorator,
	Collider2D,
	Component,
	Contact2DType,
	IPhysics2DContact,
	Node,
} from 'cc';
import { BasicCollisionObject } from './BasicCollisionObject';
import { AsteroidCollideWithPlayerEvent } from './event/AsteroidCollideWithPlayerEvent';
import { PHYSICS_GROUPS } from '../../constants';
const { ccclass, property } = _decorator;

@ccclass('AsteroidCollisionObject')
export class AsteroidCollisionObject extends BasicCollisionObject {
	protected onBeginContact(
		selfCollider: Collider2D,
		otherCollider: Collider2D,
		contact: IPhysics2DContact | null
	) {
		const { node } = this;

		if (otherCollider.group === PHYSICS_GROUPS.PLAYER_SHIP) {
			this.collider.off(
				Contact2DType.BEGIN_CONTACT,
				this.onBeginContact,
				this
			);

			node.dispatchEvent(
				new AsteroidCollideWithPlayerEvent({
					selfCollider,
					otherCollider,
					contact,
				})
			);
		}
	}
}
