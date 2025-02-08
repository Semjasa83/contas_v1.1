
export interface Note {
    id: string | null ;
    contact: string[]
    company: string | null ;
    headline: string | null ;
    note: string | null ;
    start_date: string | null ;
    end_date: string | null ;
    priority: number | null ;
    created_at: string | null ;
    updated_at: string | null ;
}

export class NoteImpl implements Note {

    constructor(
        public id: string | null = '',
        public contact: string[] = [],
        public company: string | null = '',
        public headline: string | null  = '',
        public note: string | null  = '',
        public start_date: string | null  = '',
        public end_date: string | null  = '',
        public priority: number | null = null,
        public created_at: string | null  = '',
        public updated_at: string | null  = ''
    ) {}
}