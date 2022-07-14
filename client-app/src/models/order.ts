import { serviceType } from './service';

export type NewOrder = {
    name: string;
    phone: string;
    email: string;
    source: string;
    destination: string;
    service: serviceType;
    deadline: Date;
    note: string;
}

export type Order = {
    id: string;
    name: string;
    phone: string;
    email: string;
    source: string;
    destination: string;
    service: serviceType;
    deadline: Date;
    note: string;
}