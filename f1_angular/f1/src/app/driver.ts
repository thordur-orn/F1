export interface Driver {
    id: number;
    forename: string;
    surname: string;
    ref?: string;
    number?: number;
    code?: string;
    dob?: string;
    nationality?: string;
    url?: string;
    wins?: number;
    starts?: number;
    career_points?: number;
    podiums?: number;
    fastest_laps?: number;
    poles?: number;
}