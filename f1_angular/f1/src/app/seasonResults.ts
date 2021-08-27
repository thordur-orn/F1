export interface SeasonResults {
    date: Date;
    racename: string;
    position: number;
    driver: string;
    driverid: number;
    status: string;
    round: number;
    points: number;
    timems: number;
    grid: number;
    laps: number;
    team: string;
    teamid: number;
    circuit: string;
    circuitid: number;
    location: string;
    country: string;
    results: any[];
}