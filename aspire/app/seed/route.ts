import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'});

async function seedQuotes() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql`
      CREATE TYPE service_type AS ENUM ('regularService', 'deepClean', 'moveOut');       
    `;

    await sql`
        CREATE TABLE IF NOT EXISTS quote (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            date TIMESTAMPTZ DEFAULT now(),
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone_number VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            quote INT NOT NULL,
            bedrooms INT NOT NULL,
            bathrooms INT NOT NULL,
            powder_rooms INT NOT NULL,
            living_rooms INT NOT NULL,
            kitchen INT NOT NULL,
            laundry_rooms INT NOT NULL,
            pets BOOLEAN NOT NULL,
            office INT NOT NULL,
            gym_room INT NOT NULL,
            cinema INT NOT NULL,
            blinders BOOLEAN NOT NULL,
            oven BOOLEAN NOT NULL,
            fridge BOOLEAN NOT NULL,
            type_of_service service_type NOT NULL
        );`

  await sql`SET timezone = 'America/Mountain'`;
}

export async function GET() {
    try {
      const result = await sql.begin((sql) => [
        seedQuotes(),
      ]);
  
      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
  }