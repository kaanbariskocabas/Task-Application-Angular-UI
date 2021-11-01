import { TimeCycle } from "./time-cycle.model"
import { TimeSpent } from "./time-spent.model"

export class Timer {
    id!: number;
    timeCycles?: TimeCycle[];
    totalTimeSpent?: TimeSpent;
}