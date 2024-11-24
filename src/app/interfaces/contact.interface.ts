export interface Contact {
    id: string | null;
    name: string | null;
    email: string | null;
    phone: string | null;
    street: string | null;
    city: string | null;
    zip: string | null;
    country: string | null;
    note: string | null;
    color: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export class ContactImpl implements Contact {

    constructor(
        public id: string | null = '',
        public name: string | null = '',
        public email: string | null = '',
        public phone: string | null = null,
        public street: string | null = '',
        public city: string | null = '',
        public zip: string | null = '',
        public country: string | null = '',
        public note: string | null = '',
        public color: string | null = '',
        public created_at: string | null = '',
        public updated_at: string | null = ''

    ) {}
}