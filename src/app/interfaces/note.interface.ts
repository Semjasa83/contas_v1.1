export interface Note {
    id: string | null ;
    contactIds: string[];
    company: string | null ;
    headline: string | null ;
    note: string | null ;
    startDate: string | null ;
    endDate: string | null ;
    priority: number | null ;
    color: string | null ;
    createdAt: string | null ;
    updatedAt: string | null ;
}

export class NoteImpl implements Note {

    constructor(
        public id: string | null = '',
        public contactIds: string[] = [],
        public company: string | null = '',
        public headline: string | null  = '',
        public note: string | null  = '',
        public startDate: string | null  = '',
        public endDate: string | null  = '',
        public priority: number | null = null,
        public color: string  | null  = '',
        public createdAt: string | null  = '',
        public updatedAt: string | null  = ''
    ) {}
}