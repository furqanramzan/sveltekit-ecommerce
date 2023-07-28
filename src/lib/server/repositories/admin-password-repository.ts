import type { InferModel } from 'drizzle-orm';
import { BaseRepository } from './base-repository';
import { adminPasswords } from '$lib/server/database/schema';

type AdminPassword = typeof adminPasswords;
type Create = InferModel<AdminPassword, 'insert'>;

export class AdminPasswordRepository extends BaseRepository<AdminPassword> {
  constructor() {
    super(adminPasswords);
  }

  async upsert(values: Create) {
    // TODO: update on conflict
    const result = await this.drizzle.insert(this.table).values(values);

    return this.createResponse(result);
  }
}
