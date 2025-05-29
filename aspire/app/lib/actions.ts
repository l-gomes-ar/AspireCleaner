"use server";

import { z } from "zod";
import { calculateQuote } from "./utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});


// Shared validation for all non-negative number fields
const nonNegativeNumber = z
    .coerce
    .number({
        message: "Not a valid amount!"
    })
    .nonnegative({
        message: "Please enter an amount greater or equal to 0."
    }
);

// Combine with the rest of the schema
const FormSchema = z.object({
    id: z.string(),
    date: z.string(),
    name: z.string().trim().min(1, { message: "A name is required!" }),
    email: z
    .string()
    .transform(val => (val!.trim() === "" ? null : val))
    .refine(
      (val) => val === null || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val!),
      {
        message: "Please enter a valid email address",
      }
    )
    .nullable(),
    phoneNumber: z.string().nullable().nullable().transform(val => (val!.trim() === "" ? null : val)),
    address: z.string().nullable().nullable().transform(val => (val!.trim() === "" ? null : val)),
    notes: z.string().max(255, {message: "Notes must be less than 256 character(s)"}).nullable().transform(val => (val!.trim() === "" ? null : val)),
    bedrooms: nonNegativeNumber,
    bathrooms: nonNegativeNumber,
    powderRooms: nonNegativeNumber,
    livingRooms: nonNegativeNumber,
    kitchen: nonNegativeNumber,
    laundryRooms: nonNegativeNumber,
    pets: z.enum(['yes', 'no'], {
        message: "Please select an option."
    }),
    office: nonNegativeNumber,
    gymRoom: nonNegativeNumber,
    cinema: nonNegativeNumber,
    blinders: z.coerce.boolean().optional().default(false),
    oven: z.coerce.boolean().optional().default(false),
    fridge: z.coerce.boolean().optional().default(false),
    typeOfService: z.enum(['regularService', 'deepClean', 'moveOut'], {
       message: "Please select a type of service.",
    }),
});

const GenerateQuote = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        phoneNumber?: string[];
        address?: string[];
        notes?: string[];
        bedrooms?: string[];
        bathrooms?: string[];
        powderRooms?: string[];
        livingRooms?: string[];
        kitchen?: string[];
        laundryRooms?: string[];
        pets?: string[];
        office?: string[];
        gymRoom?: string[];
        cinema?: string[];
        blinders?: string[];
        oven?: string[];
        fridge?: string[];
        typeOfService?: string[];
    };
    message?: string | null;
};

export async function generateQuote(prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = GenerateQuote.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phoneNumber: formData.get("phoneNumber"),
        address: formData.get("address"),
        notes: formData.get("notes"),
        bedrooms: formData.get("bedrooms"),
        bathrooms: formData.get("bathrooms"),
        powderRooms: formData.get("powderRooms"),
        livingRooms: formData.get("livingRooms"),
        kitchen: formData.get("kitchen"),
        laundryRooms: formData.get("laundryRooms"),
        pets: formData.get("pets"),
        office: formData.get("office"),
        gymRoom: formData.get("gymRoom"),
        cinema: formData.get("cinema"),
        blinders: formData.get("blinders"),
        oven: formData.get("oven"),
        fridge: formData.get("fridge"),
        typeOfService: formData.get("typeOfService"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Generate Quote.",
        };
    }

    const {
        name,
        email,
        phoneNumber,
        address,
        notes,
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
    } = validatedFields.data;

    const quoteInCents = calculateQuote({
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
        typeOfService
    });
    
    try {
        await sql`
            INSERT INTO 
              quote
                (name, email, phone_number, address, notes, quote, bedrooms, bathrooms, powder_rooms, living_rooms, kitchen, laundry_rooms, pets, office, gym_room, cinema, blinders, oven, fridge, type_of_service)
            VALUES 
                (${name}, ${email}, ${phoneNumber}, ${address}, ${notes}, ${quoteInCents}, ${bedrooms}, ${bathrooms}, ${powderRooms}, ${livingRooms}, ${kitchen}, ${laundryRooms}, ${pets === "yes"}, ${office}, ${gymRoom}, ${cinema}, ${blinders}, ${oven}, ${fridge}, ${typeOfService})
        `;
    } catch (error) {
        return {
            message: "Database Error: Failed to Generate Quote"
        }
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath("/admin/quotes/");
    
    // Redirect to confirmation page
    redirect("/admin/quotes/");
}

export async function updateQuote(id: string, prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = GenerateQuote.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        phoneNumber: formData.get("phoneNumber"),
        address: formData.get("address"),
        notes: formData.get("notes"),
        bedrooms: formData.get("bedrooms"),
        bathrooms: formData.get("bathrooms"),
        powderRooms: formData.get("powderRooms"),
        livingRooms: formData.get("livingRooms"),
        kitchen: formData.get("kitchen"),
        laundryRooms: formData.get("laundryRooms"),
        pets: formData.get("pets"),
        office: formData.get("office"),
        gymRoom: formData.get("gymRoom"),
        cinema: formData.get("cinema"),
        blinders: formData.get("blinders"),
        oven: formData.get("oven"),
        fridge: formData.get("fridge"),
        typeOfService: formData.get("typeOfService"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Generate Quote.",
        };
    }

    const {
        name,
        email,
        phoneNumber,
        address,
        notes,
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
    } = validatedFields.data;

    const quoteInCents = calculateQuote({
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
        typeOfService
    });
    
    try {
        await sql`
            UPDATE quote
            SET
                name = ${name},
                email = ${email},
                phone_number = ${phoneNumber},
                address = ${address},
                notes = ${notes},
                quote = ${quoteInCents},
                bedrooms = ${bedrooms},
                bathrooms = ${bathrooms},
                powder_rooms = ${powderRooms},
                living_rooms = ${livingRooms},
                kitchen = ${kitchen},
                laundry_rooms = ${laundryRooms},
                pets = ${pets === "yes"},
                office = ${office},
                gym_room = ${gymRoom},
                cinema = ${cinema},
                blinders = ${blinders},
                oven = ${oven},
                fridge = ${fridge},
                type_of_service = ${typeOfService}
            WHERE
                id = ${id}
        `;
    } catch (error) {
        return {
            message: "Database Error: Failed to Update Quote"
        }
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath("/admin/quotes/");
    
    // Redirect to confirmation page
    redirect("/admin/quotes/");
}

export async function deleteQuote(id: string) {
    await sql`DELETE FROM quote WHERE id = ${id}`;
    revalidatePath("/admin/quotes");
}