export interface Contact {
    id: string | null;
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    phone: string | null;
    note: string | null;
    color: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export class ContactImpl implements Contact {

    constructor(
        public id: string | null = '',
        public firstname: string | null = '',
        public lastname: string | null = '',
        public email: string | null = '',
        public phone: string | null = null,
        public note: string | null = '',
        public color: string | null = '',
        public created_at: string | null = '',
        public updated_at: string | null = ''

    ) {}
}