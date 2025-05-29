export const formatDateToLocal = (
    dateStr: string,
    locale: string = 'en-US',
) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
};

export const formatCurrency = (amount: number) => {
    return (amount / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
};

export function calculateQuote({
    bedrooms,
    bathrooms,
    powderRooms,
    livingRooms,
    kitchen,
    laundryRooms,
    pets,
    office,
    gymRoom,
    cinema,
    blinders,
    oven,
    fridge,
    typeOfService,
} : {
    bedrooms: number,
    bathrooms: number,
    powderRooms: number,
    livingRooms: number,
    kitchen: number,
    laundryRooms: number,
    pets: 'yes' | 'no',
    office: number,
    gymRoom: number,
    cinema: number,
    blinders: boolean,
    oven: boolean,
    fridge: boolean,
    typeOfService: 'regularService' | 'deepClean' | 'moveOut',
}): number {
    const valuesInCents = {
        "bedrooms": 2000,
        "bathrooms": 4000,
        "powderRooms": 2000,
        "livingRooms": 2000,
        "kitchen": 4000,
        "laundryRooms": 2000,
        "pets": 3000,
        "office": 2000,
        "gymRoom": 2000,
        "cinema": 2000,
        "additionalRooms": 6000,
    };

    const typeOfServiceAmounts = {
        "regularService": 1,
        "deepClean": 1.3,
        "moveOut": 1.69,
    };

    const serviceMultiplier = typeOfServiceAmounts[typeOfService];

    const rooms = [
        { name: 'bedrooms', quantity: bedrooms },
        { name: 'bathrooms', quantity: bathrooms },
        { name: 'powderRooms', quantity: powderRooms },
        { name: 'livingRooms', quantity: livingRooms },
        { name: 'kitchen', quantity: kitchen },
        { name: 'laundryRooms', quantity: laundryRooms },
        { name: 'office', quantity: office },
        { name: 'gymRoom', quantity: gymRoom },
        { name: 'cinema', quantity: cinema },
    ];

    let totalAmountInCents = rooms.reduce((total, room) => {
        return total + valuesInCents[room.name as keyof typeof valuesInCents] * room.quantity;
    }, 0);
    
    if (pets === "yes") totalAmountInCents += valuesInCents.pets;

    const additionalRooms = [blinders, oven, fridge];

    additionalRooms.forEach((additionalRoom) => {
        if (additionalRoom) totalAmountInCents += valuesInCents.additionalRooms;
    });

    return totalAmountInCents * serviceMultiplier;
}
