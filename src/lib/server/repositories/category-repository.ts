import { type InferModel, desc, eq } from 'drizzle-orm';
import { BaseRepository } from './base-repository';
import { categories } from '$lib/server/database/schema';

type Category = typeof categories;
type Create = InferModel<Category, 'insert'>;

export class CategoryRepository extends BaseRepository<Category> {
  constructor() {
    super(categories);
  }

  async create(values: Create) {
    const result = await this.drizzle.insert(this.table).values(values);

    return this.createResponse(result);
  }

  async createMany(values: Create[]) {
    const result = await this.drizzle.insert(this.table).values(values);

    return this.createManyResponse(result);
  }

  async update(values: Create, id: number) {
    const result = await this.drizzle.update(this.table).set(values).where(eq(this.table.id, id));

    return this.updateResponse(result, id);
  }

  getManyWithName() {
    return this.drizzle.query.categories.findMany({
      columns: { id: true, name: true, image: true },
      orderBy: desc(this.table.createdAt),
    });
  }

  idExists(id: number) {
    return this.exists(this.table.id, id);
  }
}
