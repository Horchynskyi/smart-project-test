import { _decorator, Component } from 'cc';
import type { StateMachine } from './StateMachine';
const { ccclass, property } = _decorator;

@ccclass('State')
export class State extends Component {
    @property
    readonly id: string = 'idle';

    protected stateMachine: StateMachine = null;

    protected onLoad(): void {
        this.stateMachine = this.getComponent('StateMachine') as StateMachine;
    }

    protected onEnable(): void {}

    protected onDisable(): void {}
}
