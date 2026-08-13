import { Client } from "pg";

export const handler = async (event: any) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // Debugging line to see what keys Netlify is actually injecting
  const keys = Object.keys(process.env).filter(
    (k) =>
      k.toLowerCase().includes("db") ||
      k.toLowerCase().includes("database") ||
      k.toLowerCase().includes("url") ||
      k.toLowerCase().includes("pg") ||
      k.toLowerCase().includes("neon")
  );
  console.log("Available database-related environment keys:", keys);

  const dbUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;
  
  try {
    const { algorithm, code, explanation } = JSON.parse(event.body || "{}");

    if (!algorithm || !code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    let client: Client;

    if (dbUrl) {
      // Connect using full connection URI string
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
      console.error("No database credentials found in environment variables.");
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: "Database credentials are not configured. Please connect the database in the Netlify site panel and deploy.",
          debug_keys: keys
        }),
      };
    }

    await client.connect();

    // Create submissions table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        algorithm VARCHAR(50) NOT NULL,
        code TEXT NOT NULL,
        explanation TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert entry
    await client.query(
      `INSERT INTO submissions (algorithm, code, explanation) VALUES ($1, $2, $3)`,
      [algorithm, code, explanation || ""]
    );

    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Submission saved successfully!" }),
    };
  } catch (error: any) {
    console.error("Database error during operation:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Database Query Error" }),
    };
  }
};
