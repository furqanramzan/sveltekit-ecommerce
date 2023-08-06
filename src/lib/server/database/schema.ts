/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  bigint,
  float,
  int,
  primaryKey,
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
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const categories = mysqlTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  image: varchar('image', { length: 256 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const products = mysqlTable('products', {
  id: serial('id').primaryKey(),
  categoryId: bigint('category_id', { mode: 'number' }).references(
    () => categories.id,
  ),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('description').notNull(),
  price: float('price').notNull(),
  quantity: int('quantity').notNull(),
  image: varchar('image', { length: 256 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const orders = mysqlTable('orders', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  phone: varchar('phone', { length: 256 }).notNull(),
  city: varchar('city', { length: 256 }).notNull(),
  address: varchar('address', { length: 256 }).notNull(),
  total: float('total').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const adminsRelations = relations(admins, ({ one }) => ({
  adminPassword: one(adminPasswords, {
    fields: [admins.id],
    references: [adminPasswords.adminId],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  orders: many(productsToOrders),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
  products: many(productsToOrders),
}));

export const productsToOrders = mysqlTable(
  'products_to_orders',
  {
    productId: bigint('product_id', { mode: 'number' })
      .notNull()
      .references(() => products.id),
    orderId: bigint('order_id', { mode: 'number' })
      .notNull()
      .references(() => orders.id),
  },
  (t) => ({
    pk: primaryKey(t.productId, t.orderId),
  }),
);

export const productsToOrdersRelations = relations(
  productsToOrders,
  ({ one }) => ({
    product: one(products, {
      fields: [productsToOrders.productId],
      references: [products.id],
    }),
    order: one(orders, {
      fields: [productsToOrders.orderId],
      references: [orders.id],
    }),
  }),
);
