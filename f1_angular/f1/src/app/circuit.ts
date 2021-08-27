import { Time } from "@angular/common";

export interface Circuit {
    id: number;
    name: string;
    location: string;
    country: string;
    url: string;
    lap_record?: Time;
    rec_driverid?: number;
    rec_forename?: string;
    rec_surname?: string;
    rec_year: number;
    msd_driverid?: number;
    msd_forename?: string;
    msd_surname?: string;
}