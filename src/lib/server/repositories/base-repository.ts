import { type AnyColumn, type GetColumnData, type SQL, and, eq, ne, sql } from 'drizzle-orm';
import type { MySqlSerial, MySqlTableWithColumns } from 'drizzle-orm/mysql-core';
import type { MySqlRawQueryResult } from 'drizzle-orm/mysql2';
import { drizzle } from '$lib/server/database';

interface BaseTableConfig {
  name: string;
  schema: string | undefined;
  columns: {
    id: MySqlSerial<{
      tableName: string;
      data: number;
      name: 'id';
      driverParam: number;
      hasDefault: true;
      notNull: true;
    }>;
  };
}
type BaseTable = MySqlTableWithColumns<BaseTableConfig>;
interface GetMany {
  limit: number;
  offset: number;
}

export class BaseRepository<TBaseTable extends BaseTable> {
  protected table: TBaseTable;

  protected drizzle = drizzle;

  constructor(table: TBaseTable) {
    this.table = table;
  }

  async getMany(params?: GetMany) {
    if (params) {
      const { limit, offset } = params;

      const items = await this.drizzle.select().from(this.table).limit(limit).offset(offset);

      const total = await this.count();

      return { items, total };
    }

    const items = await this.drizzle.select().from(this.table);
    return { items };
  }

  async count() {
    const data = await this.drizzle
      .select({ count: sql<number>`count(${this.table.id})` })
      .from(this.table);

    return data[0].count;
  }

  async getOne(id?: number) {
    let where: SQL<unknown> | undefined;
    if (id) {
      where = eq(this.table.id, id);
    }
    const data = await this.drizzle.select().from(this.table).limit(1).offset(0).where(where);

    return data[0] ? data[0] : null;
  }

  async destroy(id: number) {
    const result = await this.drizzle.delete(this.table).where(eq(this.table.id, id));

    return this.destroyResponse(result, id);
  }

  async getOneByColumn<TColumn extends AnyColumn>(
    column: TColumn,
    value: GetColumnData<TColumn, 'raw'>,
  ) {
    const data = await this.drizzle.select().from(this.table).where(eq(column, value));

    return data[0] ? data[0] : null;
  }

  async exists<TColumn extends AnyColumn>(
    column: TColumn,
    value: GetColumnData<TColumn, 'raw'>,
    id?: number,
  ) {
    const columnConstraint = eq(column, value);

    let where = and(columnConstraint);
    if (id) {
      where = and(columnConstraint, ne(this.table.id, id));
    }

    const data = await this.drizzle
      .select({ count: sql<number>`count(${this.table.id})` })
      .from(this.table)
      .where(where);

    return data[0].count > 0;
  }

  createResponse(result: MySqlRawQueryResult) {
    return {
      id: result[0].insertId,
    };
  }

  updateResponse(result: MySqlRawQueryResult, id: number) {
    return result[0].affectedRows === 0 ? null : { id };
  }

  destroyResponse(result: MySqlRawQueryResult, id: number) {
    return this.updateResponse(result, id);
  }

  getDrizzle() {
    return this.drizzle;
  }

  getTable() {
    return this.table;
  }
}