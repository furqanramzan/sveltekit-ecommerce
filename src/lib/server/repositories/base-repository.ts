import {
  type AnyColumn,
  type GetColumnData,
  type SQL,
  and,
  desc,
  eq,
  gte,
  inArray,
  ne,
  sql,
} from 'drizzle-orm';
import type {
  MySqlSerial,
  MySqlTableWithColumns,
  MySqlTimestamp,
} from 'drizzle-orm/mysql-core';
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
    createdAt: MySqlTimestamp<{
      tableName: string;
      name: 'created_at';
      data: Date;
      driverParam: string | number;
      notNull: true;
      hasDefault: true;
    }>;
    updatedAt: MySqlTimestamp<{
      tableName: string;
      name: 'updated_at';
      data: Date;
      driverParam: string | number;
      notNull: true;
      hasDefault: true;
    }>;
  };
}
type BaseTable = MySqlTableWithColumns<BaseTableConfig>;
export interface GetMany {
  limit: number;
  offset: number;
}
export type AnyRepository = BaseRepository<BaseTable>;

export class BaseRepository<TBaseTable extends BaseTable> {
  protected table: TBaseTable;

  protected drizzle = drizzle;

  constructor(table: TBaseTable) {
    this.table = table;
  }

  async getMany(params?: GetMany) {
    if (params) {
      const { limit, offset } = params;

      const items = await this.drizzle
        .select()
        .from(this.table)
        .orderBy(desc(this.table.createdAt))
        .limit(limit)
        .offset(offset);

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
    const data = await this.drizzle
      .select()
      .from(this.table)
      .limit(1)
      .offset(0)
      .where(where);

    return data[0] ? data[0] : undefined;
  }

  async destroy(id: number) {
    const result = await this.drizzle
      .delete(this.table)
      .where(eq(this.table.id, id));

    return this.destroyResponse(result, id);
  }

  async getOneByColumn<TColumn extends AnyColumn>(
    column: TColumn,
    value: GetColumnData<TColumn, 'raw'>,
  ) {
    const data = await this.drizzle
      .select()
      .from(this.table)
      .where(eq(column, value));

    return data[0] ? data[0] : undefined;
  }

  async existsWithEqualConstraint<TColumn extends AnyColumn>(
    column: TColumn,
    value: GetColumnData<TColumn, 'raw'>,
    id?: number,
  ) {
    const columnConstraint = eq(column, value);

    let where = and(columnConstraint);
    if (id) {
      where = and(columnConstraint, ne(this.table.id, id));
    }

    return this.exists(where);
  }

  async exists(where?: SQL<unknown>) {
    const data = await this.drizzle
      .select({ id: this.table.id })
      .from(this.table)
      .where(where)
      .limit(1)
      .offset(0);

    return !!data[0];
  }

  async getAllByInColumn<TColumn extends AnyColumn>(
    column: TColumn,
    value: GetColumnData<TColumn, 'raw'>[],
  ) {
    return value.length > 0
      ? this.drizzle.select().from(this.table).where(inArray(column, value))
      : [];
  }

  createResponse(result: MySqlRawQueryResult) {
    return {
      id: result[0].insertId,
    };
  }

  createManyResponse(result: MySqlRawQueryResult) {
    return drizzle
      .select({ id: this.table.id })
      .from(this.table)
      .where(gte(this.table.id, result[0].insertId));
  }

  updateResponse(result: MySqlRawQueryResult, id: number) {
    return result[0].affectedRows === 0 ? undefined : { id };
  }

  destroyResponse(result: MySqlRawQueryResult, id: number) {
    return this.updateResponse(result, id);
  }
}
