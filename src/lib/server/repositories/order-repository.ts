import type { InferModel } from 'drizzle-orm';
import { BaseRepository } from './base-repository';
import { orders } from '$lib/server/database/schema';

type Order = typeof orders;
type Create = InferModel<Order, 'insert'>;

export class OrderRepository extends BaseRepository<Order> {
  constructor() {
    super(orders);
  }

  async create(values: Create) {
    const result = await this.drizzle.insert(this.table).values(values);

    return this.createResponse(result);
  }
}
