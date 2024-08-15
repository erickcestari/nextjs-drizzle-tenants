
      import { defineConfig } from "drizzle-kit";

      export default defineConfig({
        schema: "./src/db/tenant/schema.ts",
        out: "./migrations/tenant/1",
        dialect: "postgresql",
        dbCredentials: {
          url: "postgresql://postgres:123456@localhost:5432/example-tenant",
        },
      });
    