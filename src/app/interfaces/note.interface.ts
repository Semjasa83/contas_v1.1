import { Contact } from "./contact.interface";

export interface Note {
    id: string | null ;
    contact: Contact[];
    company: string | null ;
    headline: string | null ;
    note: string | null ;
    startDate: string | null ;
    endDate: string | null ;
    priority: number | null ;
    createdAt: string | null ;
    updatedAt: string | null ;
}

export class NoteImpl implements Note {

    constructor(
        public id: string | null = '',
        public contact: Contact[] = [],
        public company: string | null = '',
        public headline: string | null  = '',
        public note: string | null  = '',
        public startDate: string | null  = '',
        public endDate: string | null  = '',
        public priority: number | null = null,
        public createdAt: string | null  = '',
        public updatedAt: string | null  = ''
    ) {}
}