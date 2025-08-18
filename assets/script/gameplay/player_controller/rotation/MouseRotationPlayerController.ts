import { _decorator, EventMouse, input, Input, math, Vec2 } from 'cc';
import { BasicRotationPlayerController } from './BasicRotationPlayerController';
import { HALF_WINDOW_SIZE } from '../../constants';
const { ccclass, property } = _decorator;

@ccclass('MouseRotationPlayerController')
export class MouseRotationPlayerController extends BasicRotationPlayerController {
	protected tempVec2: Vec2 = new Vec2();

	protected onLoad(): void {
		input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
	}

	protected onMouseMove(event: EventMouse) {
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
