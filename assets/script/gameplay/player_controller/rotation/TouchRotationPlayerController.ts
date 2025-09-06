import {
	_decorator,
	EventMouse,
	EventTouch,
	input,
	Input,
	math,
	Vec2,
} from 'cc';
import { BasicRotationPlayerController } from './BasicRotationPlayerController';
import { HALF_WINDOW_SIZE } from '../../constants';
const { ccclass, property } = _decorator;

@ccclass('TouchRotationPlayerController')
export class TouchRotationPlayerController extends BasicRotationPlayerController {
	protected tempVec2: Vec2 = new Vec2();

	protected onLoad(): void {
		input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
		input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
	}

	protected onTouchStart(event: EventTouch) {
		this.changeRotation(event);
	}

	protected onTouchMove(event: EventTouch) {
		this.changeRotation(event);
	}

	protected changeRotation(event: EventTouch) {
		event.getLocation(this.tempVec2);

		const halfScreenSize = new Vec2(HALF_WINDOW_SIZE.x, HALF_WINDOW_SIZE.y);

		this.rotation = math.toDegree(
			Math.atan2(
				this.tempVec2.y - halfScreenSize.y,
				this.tempVec2.x - halfScreenSize.x
			)
		);

		this.emitChangeRotation();
	}
}
