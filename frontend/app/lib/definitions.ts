// This file contains type definitions for the data

export enum Role {
    ADMIN,
    PSYCHOLOGIST,
    CLIENT
}

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
};

export type Session = {
    id: string;
    psycho_id: string;
    client_id: string | null;
    token: string;
    used: boolean;
};

export type Appointment = {
    id: string;
    psycho_id: string;
    client_id: string;
    time: Date;
}

export type DailyNote = {
    id: string;
    client_id: string;
    title: string;
    content: string;
    date: Date;
    viewed: boolean;
    notes_psycho: string;
}

export type PsychologistProfile = {
    id: string;
    psychologist_id: string;
    description?: string;
    specialty?: string;
    experience?: number;
    education?: string;
    certifications?: string[];
    areas_of_expertise?: string[];
}

export type PsychologistProfileView = {
    name? : string;
    description?: string;
    specialty?: string;
    experience?: number;
    education?: string;
    certifications?: string[];
    areas_of_expertise?: string[];
}

export type FormattedUsersTable = {
    id: string;
    name: string;
    email: string;
    role: Role;
}