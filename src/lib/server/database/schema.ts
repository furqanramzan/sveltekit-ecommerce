import {
  bigint,
  float,
  int,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { mysqlTableCreator } from './utils';

const mysqlTable = mysqlTableCreator();

export const admins = mysqlTable(
  'admins',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex('email_idx').on(table.email),
  }),
);

export const adminPasswords = mysqlTable('admin_passwords', {
  id: serial('id').primaryKey(),
  adminId: bigint('admin_id', { mode: 'number' }).references(() => admins.id),
  password: varchar('password', { length: 256 }).notNull(),
});

export const products = mysqlTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('description').notNull(),
  price: float('price').notNull(),
  quantity: int('quantity').notNull(),
  image: varchar('image', { length: 256 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const adminsRelations = relations(admins, ({ one }) => ({
  adminPassword: one(adminPasswords, {
    fields: [admins.id],
    references: [adminPasswords.adminId],
  }),
}));
