import { Client } from "pg";

export const handler = async (event: any) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // Netlify Database can inject either DATABASE_URL or NETLIFY_DATABASE_URL
  const dbUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;
  if (!dbUrl) {
    console.error("Database connection string is missing in environment variables.");
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Database Connection string is missing. Please ensure your database is connected to this site and trigger a redeploy." 
      }),
    };
  }

  try {
    const { algorithm, code, explanation } = JSON.parse(event.body || "{}");

    if (!algorithm || !code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const client = new Client({
      connectionString: dbUrl,
      ssl: {
        rejectUnauthorized: false
      }
    });

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
