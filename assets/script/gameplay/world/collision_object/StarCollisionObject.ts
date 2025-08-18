import {
	_decorator,
	Animation,
	Collider2D,
	Contact2DType,
	IPhysics2DContact,
} from 'cc';
import { BasicCollisionObject } from './BasicCollisionObject';
import { StarCollideWithPlayerEvent } from './event/StarCollideWithPlayerEvent';
const { ccclass, property } = _decorator;

@ccclass('StarCollisionObject')
export class StarCollisionObject extends BasicCollisionObject {
	protected animation: Animation;

	protected onLoad(): void {
		super.onLoad();

		this.animation = this.getComponent(Animation);
	}

	protected onBeginContact(
		selfCollider: Collider2D,
		otherCollider: Collider2D,
		contact: IPhysics2DContact | null
	) {
		const { node, animation } = this;

		animation.play('collect');

		animation.once(Animation.EventType.FINISHED, () => {
			node.destroy();
		});

		this.collider.off(
			Contact2DType.BEGIN_CONTACT,
			this.onBeginContact,
			this
		);

		node.dispatchEvent(
			new StarCollideWithPlayerEvent({
				selfCollider,
				otherCollider,
				contact,
			})
		);
	}
}
