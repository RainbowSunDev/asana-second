ALTER TABLE "organisation" ADD COLUMN "expires_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "organisation" DROP COLUMN IF EXISTS "expires_in";