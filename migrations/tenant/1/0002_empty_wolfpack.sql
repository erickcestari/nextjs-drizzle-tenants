ALTER TABLE "user" RENAME TO "company";--> statement-breakpoint
ALTER TABLE "company" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN IF EXISTS "text";--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN IF EXISTS "cpf";--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN IF EXISTS "idade";