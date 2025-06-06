export type Quote = {
    id: string;
    date: Date;
    name: string;
    email: string | null;
    phone_number: string | null;
    address: string | null;
    notes: string | null;
    quote: number;
    bedrooms: number;
    bathrooms: number;
    powder_rooms: number;
    living_rooms: number;
    kitchen: number;
    laundry_rooms: number;
    pets: boolean;
    office: number;
    gym_room: number;
    cinema: number;
    blinders: boolean;
    oven: boolean;
    fridge: boolean;
    type_of_service: 'regularService' | 'deepClean' | 'moveOut';
};