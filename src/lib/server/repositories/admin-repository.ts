import { type InferModel, desc, eq } from 'drizzle-orm';
import { BaseRepository } from './base-repository';
import { admins } from '$lib/server/database/schema';

type Admin = typeof admins;
type Create = InferModel<Admin, 'insert'>;

export class AdminRepository extends BaseRepository<Admin> {
  constructor() {
    super(admins);
  }

  async create(values: Create) {
    const result = await this.drizzle.insert(this.table).values(values);

    return this.createResponse(result);
  }

  async update(values: Create, id: number) {
    const result = await this.drizzle
      .update(this.table)
      .set(values)
      .where(eq(this.table.id, id));

    return this.updateResponse(result, id);
  }

  emailExists(email: string, id?: number) {
    return this.existsWithEqualConstraint(this.table.email, email, id);
  }

  getLoginData(email: string) {
    return this.drizzle.query.admins.findFirst({
      with: { adminPassword: true },
      columns: { id: true, name: true, email: true },
      where: eq(this.table.email, email),
      orderBy: desc(this.table.createdAt),
    });
  }
}
