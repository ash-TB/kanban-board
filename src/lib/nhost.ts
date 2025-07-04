/**
 * nhost.ts
 * --------------------------------------------------
 * Initializes and exports the Nhost client for
 * interacting with the Nhost backend.
 *
 * Uses NEXT_PUBLIC_NHOST_SUBDOMAIN and NEXT_PUBLIC_NHOST_REGION
 * environment variables for configuration.
 *
 * This client handles:
 * - Auth (session, JWT)
 * - GraphQL
 * - Storage (if enabled)
 */

import { NhostClient } from '@nhost/nextjs';

// Create a new Nhost client instance with config from env vars.
export const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || '',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || '',
});
