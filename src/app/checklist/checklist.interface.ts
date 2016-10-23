
export interface Checklist {
    // baristaName: string;
    name: string;
    // location: string;
    // day: string;
    // time: string;
    // alterEgo?: string;
       hours: Hours[];
}

export interface Hours {
    van: string;  
    tot: string;
}