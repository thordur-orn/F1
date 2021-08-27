export interface Team {
    id: number;
    name: string;
    nationality?: string;
    url?: string;
    wins?: number;
    entries?: number;
    total_points?: number;
    podiums?: number;
}