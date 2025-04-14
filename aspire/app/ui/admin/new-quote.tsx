"use client";

import { generateQuote, State } from "@/app/lib/actions";
import { useActionState } from "react";

export default function QuoteForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(generateQuote, initialState);

  
  return (
    <form action={formAction} className="max-w-xl mx-auto space-y-6 p-4" aria-describedby="form-error">
      <fieldset className="border p-4 rounded">
        <legend className="font-semibold px-2">Personal Details</legend>
        {[
            {field: 'name', type: 'text'}, 
            {field: 'email', type: 'email'}, 
            {field: 'phoneNumber', type: 'tel'}, 
            {field: 'address', type: 'text'}, 
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
            />
          </div>
        ))}
      </fieldset>
      
      <fieldset className="border p-4 rounded">
        <legend className="font-semibold px-2">Rooms Configuration</legend>
        {['bedrooms', 'bathrooms', 'powderRooms', 'livingRooms', 'kitchen', 'laundryRooms'].map((field) => (
          <div key={field} className="flex flex-col mb-2">
            <label htmlFor={field} className="capitalize">
              {field.replace(/([A-Z])/g, ' $1')} 
            </label>
            <input
              type="number"
              id={field}
              name={field}
              className="border rounded p-1"
              min={0}
              defaultValue={0}
              aria-describedby={`${field}-error`}
            />
            {state.errors?.[field as keyof typeof state.errors] && 
                state.errors[field as keyof typeof state.errors]?.map((error: string) => (
                    <p id={`${field}-error`} className="mt-2 text-sm text-red-500" key={error}>
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
            />
            <label htmlFor="yes">Yes</label>
        </div>
        <div className="flex items-center gap-2 mb-2">
            <input 
                type="radio"
                id="no"
                name="pets"
                value={"no"}
                aria-describedby="pets-error"
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
        {['office', 'gymRoom', 'cinema'].map((field) => (
          <div key={field} className="flex flex-col mb-2">
            <label htmlFor={field} className="capitalize">
              {field.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
                type="number"
                id={field}
                name={field}
                className="border rounded p-1"
                min={0}
                defaultValue={0}
                aria-describedby={`${field}-error`}
            />
            {state.errors?.[field as keyof typeof state.errors] && 
                state.errors[field as keyof typeof state.errors]?.map((error: string) => (
                    <p id={`${field}-error`} className="mt-2 text-sm text-red-500" aria-live="polite" aria-atomic="true" key={error}>
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
        Generate Quote
      </button>
    </form>
  );
}
