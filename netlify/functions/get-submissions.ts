import { Client } from "pg";

export const handler = async (event: any) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const dbUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;

  try {
    let client: Client;

    if (dbUrl) {
      client = new Client({
        connectionString: dbUrl,
        ssl: {
          rejectUnauthorized: false
        }
      });
    } else if (process.env.PGHOST || process.env.NEON_DATABASE_URL) {
      client = new Client({
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
        ssl: {
          rejectUnauthorized: false
        }
      });
    } else {
      // Return empty array if DB is not configured yet (saves crashes in local dev)
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      };
    }

    await client.connect();

    // Check if table exists
    const checkTable = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'submissions'
      );
    `);

    const tableExists = checkTable.rows[0].exists;

    if (!tableExists) {
      await client.end();
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      };
    }

    // Retrieve submissions
    const res = await client.query(`
      SELECT id, algorithm, code, explanation, created_at 
      FROM submissions 
      ORDER BY created_at DESC 
      LIMIT 100
    `);

    await client.end();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(res.rows),
    };
  } catch (error: any) {
    console.error("Database error during get operation:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Database Query Error" }),
    };
  }
};
