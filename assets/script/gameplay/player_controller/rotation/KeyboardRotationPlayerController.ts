import {
	_decorator,
	Component,
	EventKeyboard,
	input,
	Input,
	KeyCode,
	Node,
} from 'cc';
import { BasicRotationPlayerController } from './BasicRotationPlayerController';
const { ccclass, property } = _decorator;

@ccclass('KeyboardRotationPlayerController')
export class KeyboardRotationPlayerController extends BasicRotationPlayerController {
	protected rotationChangeSign: number = 0;
	protected rotationChangePressedKeys: number = 0;
	protected rotationChangeSpeed: number = 500;

	protected onLoad(): void {
		input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
		input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
	}

	protected onKeyDown(event: EventKeyboard) {
		switch (event.keyCode) {
			case KeyCode.KEY_A:
			case KeyCode.ARROW_LEFT:
				this.rotationChangeSign = 1;
				this.rotationChangePressedKeys++;
				break;

			case KeyCode.KEY_D:
			case KeyCode.ARROW_RIGHT:
				this.rotationChangeSign = -1;
				this.rotationChangePressedKeys++;
				break;
		}
	}

	protected onKeyUp(event: EventKeyboard) {
		switch (event.keyCode) {
			case KeyCode.KEY_A:
			case KeyCode.KEY_D:
			case KeyCode.ARROW_RIGHT:
			case KeyCode.ARROW_LEFT:
				this.rotationChangePressedKeys--;

				if (!this.rotationChangePressedKeys) {
					this.rotationChangeSign = 0;
				}
				break;
		}
	}

	protected update(dt: number): void {
		this.rotation +=
			this.rotationChangeSign * this.rotationChangeSpeed * dt;

		if (this.rotationChangeSign) {
			this.emitChangeRotation();
		}
	}
}
