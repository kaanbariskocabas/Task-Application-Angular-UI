export class TimeCycle {
    id?: number;
    createdAt?: Date;
    startedAt?: Date;
    cancelledAt?: Date;
    finishedAt?: Date;
    status?: TimeCycleStatusType;
    workCycleInMinutes?: number;
    breakCycleInMinutes?: number;
    pausedAt?: Date;
    totalWorkInSeconds?: number;
}

export enum TimeCycleStatusType {
    CREATED,
    STARTED,
    PAUSED,
    CANCELLED,
    FINISHED
}