
export interface Checklist {
    // baristaName: string;
    name: string;
    // location: string;
    // day: string;
    // time: string;
    // alterEgo?: string;
    hours: Hours[];

}

export class Hours {
    day: Date;
    van: string;
    tot: string;
    uren: string;
    opbouwVan: string;
    opbouwTot: string;
    opbouwUren: number;
    uitvoeringVan: string;
    uitvoeringTot: string;
    uitvoeringUren: number;
    afbouwVan: string;
    afbouwTot: string;
    afbouwUren: number;
}