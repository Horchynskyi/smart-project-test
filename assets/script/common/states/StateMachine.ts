import { _decorator, Component } from 'cc';
import { State } from './State';
const { ccclass, property } = _decorator;

@ccclass('StateMachine')
export class StateMachine<T extends State = State> extends Component {
	@property
	private startState: string = 'idle';

	readonly states: { [key: string]: T } = {};

	private _currentState: T = null;
	private _currentStateID: string = null;

	protected onLoad(): void {
		const { states } = this;

		const statesComponents = this.getComponents(State);

		for (let i = 0; i < statesComponents.length; i++) {
			const stateComponent = statesComponents[i];

			stateComponent.enabled = false;

			states[stateComponent.id] = stateComponent as T;
		}
	}

	protected start(): void {
		if (this.currentStateID === null) {
			this.state = this.startState;
		}
	}

	public setStateByEvent(event: any, value: string) {
		this.state = value;
	}

	public setState(value: string) {
		this.state = value;
	}

	public get currentState() {
		return this._currentState;
	}

	public set state(value: string) {
		const { states, node } = this;

		if (this._currentState) {
			this._currentState.enabled = false;
		}

		const state = (this._currentState = states[value]);

		if (state) {
			this._currentStateID = value;

			state.enabled = true;
		} else {
			console.warn(`State with id: ${value} isn't provided.`);
		}

		node.emit('state_changed', value);
	}

	public get currentStateID() {
		return this._currentStateID;
	}
}
