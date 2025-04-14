'use client';

import { updateQuote, State } from "@/app/lib/actions";
import { useActionState } from "react";
import { Quote } from "@/app/lib/definitions";

export default function UpdateQuoteForm({ quote }:{ quote: Quote }) {
    const initialState: State = { message: null, errors: {} };
    const updateQuoteWithId = updateQuote.bind(null, quote.id);
    const [state, formAction] = useActionState(updateQuoteWithId, initialState);

  return (
    <form action={formAction} className="max-w-xl mx-auto space-y-6 p-4" aria-describedby="form-error">
      <fieldset className="border p-4 rounded">
        <legend className="font-semibold px-2">Personal Details</legend>
        {[
            {field: 'name', type: 'text', value: quote.name}, 
            {field: 'email', type: 'email', value: quote.email}, 
            {field: 'phoneNumber', type: 'tel', value: quote.phone_number}, 
            {field: 'address', type: 'text', value: quote.address}, 
        ].map((field) => (
          <div key={field.field} className="flex flex-col mb-2">
            <label htmlFor={field.field} className="capitalize">
              {field.field.replace(/([A-Z])/g, ' $1')} 
            </label>
            <input
              type={field.type}
              id={field.field}
              name={field.field}
              className="border rounded p-1"
              defaultValue={field.value}
            />
          </div>
        ))}
      </fieldset>
      
      <fieldset className="border p-4 rounded">
        <legend className="font-semibold px-2">Rooms Configuration</legend>
        {[
            { name: 'bedrooms', value: quote.bedrooms }, 
            { name: 'bathrooms', value: quote.bathrooms }, 
            { name: 'powderRooms', value: quote.powder_rooms },
            { name: 'livingRooms', value: quote.living_rooms }, 
            { name: 'kitchen', value: quote.kitchen }, 
            { name: 'laundryRooms', value: quote.laundry_rooms }]
            .map((field) => (
          <div key={field.name} className="flex flex-col mb-2">
            <label htmlFor={field.name} className="capitalize">
              {field.name.replace(/([A-Z])/g, ' $1')} 
            </label>
            <input
              type="number"
              id={field.name}
              name={field.name}
              className="border rounded p-1"
              min={0}
              defaultValue={field.value}
              aria-describedby={`${field.name}-error`}
            />
            {state.errors?.[field.name as keyof typeof state.errors] && 
                state.errors[field.name as keyof typeof state.errors]?.map((error: string) => (
                    <p id={`${field.name}-error`} className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                    </p>
                ))
            }
          </div>
        ))}
      </fieldset>

      <fieldset className="border p-4 rounded">
        <legend className="font-semibold px-2">
            Pets
        </legend>
        <div className="flex items-center gap-2 mb-2">
            <input 
                type="radio"
                id="yes"
                name="pets"
                value="yes"
                aria-describedby="pets-error"
                defaultChecked={quote.pets}
            />
            <label htmlFor="yes">Yes</label>
        </div>
        <div className="flex items-center gap-2 mb-2">
            <input 
                type="radio"
                id="no"
                name="pets"
                value="no"
                aria-describedby="pets-error"
                defaultChecked={!quote.pets}
            />
            <label htmlFor="no">No</label>
        </div>
        {state.errors?.pets && 
            state.errors.pets.map((error: string) => (
                <p id="pets-error" className="text-red-500 text-sm mt-2" aria-live="polite" aria-atomic="true" key={error}>
                    {error}
                </p>
            ))
        }

      </fieldset>

      <fieldset className="border p-4 rounded">
        <legend className="font-semibold px-2">Additional Rooms</legend>
        {[{ name: 'office', value: quote.office },
          { name: 'gymRoom', value:quote.gym_room }, 
          { name: 'cinema', value: quote.cinema }]
          .map((field) => (
          <div key={field.name} className="flex flex-col mb-2">
            <label htmlFor={field.name} className="capitalize">
              {field.name.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
                type="number"
                id={field.name}
                name={field.name}
                className="border rounded p-1"
                min={0}
                defaultValue={field.value}
                aria-describedby={`${field.name}-error`}
            />
            {state.errors?.[field.name as keyof typeof state.errors] && 
                state.errors[field.name as keyof typeof state.errors]?.map((error: string) => (
                    <p id={`${field.name}-error`} className="mt-2 text-sm text-red-500" aria-live="polite" aria-atomic="true" key={error}>
                        {error}
                    </p>
                ))
            }
          </div>
        ))}
      </fieldset>

      <fieldset className="border p-4 rounded">
        <legend className="font-semibold px-2">Additional Services</legend>
        {['blinders', 'oven', 'fridge'].map((field) => (
          <div key={field} className="flex items-center gap-2 mb-2">
            <input
                type="checkbox"
                id={field}
                name={field}
                defaultChecked={quote[field as keyof typeof quote] === true}
            />
            <label htmlFor={field} className="capitalize">{field}</label>
          </div>
        ))}
      </fieldset>

      <fieldset className="border p-4 rounded">
        <legend className="font-semibold px-2">Type of Service</legend>
        {['regularService', 'deepClean', 'moveOut'].map((option) => (
            <div key={option} className="flex items-center gap-2 mb-2">
                <input
                    type="radio"
                    id={option}
                    name="typeOfService"
                    value={option}
                    aria-describedby="service-error"
                    defaultChecked={option === quote.type_of_service}
                />
                <label htmlFor={option} className="capitalize">{option.replace(/([A-Z])/g, ' $1')}</label>
            </div>
        ))}
        {state.errors?.typeOfService && 
        state.errors.typeOfService.map((error: string) => (
            <p id="service-error" className="mt-2 text-sm text-red-500" aria-live="polite" aria-atomic="true" key={error}>
                {error}
            </p>
        ))}
      </fieldset>
      {state.message && (
        <p id="form-error" className="text-sm text-red-500" aria-live="polite" aria-atomic="true">
            {state.message}
        </p>
      )}

      <button type="submit" className=" bg-blue-600 text-white px-4 py-2 rounded hover:cursor-pointer w-full">
        Update Quote
      </button>
    </form>
  );
}
