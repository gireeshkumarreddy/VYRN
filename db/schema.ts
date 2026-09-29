import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const carts=sqliteTable('carts',{id:text('id').primaryKey(),lines:text('lines').notNull().default('[]'),updatedAt:integer('updated_at').notNull()});
export const subscribers=sqliteTable('subscribers',{email:text('email').primaryKey(),createdAt:integer('created_at').notNull()});
export const messages=sqliteTable('messages',{id:text('id').primaryKey(),name:text('name').notNull(),email:text('email').notNull(),message:text('message').notNull(),createdAt:integer('created_at').notNull()});
export const checkoutSessions=sqliteTable('checkout_sessions',{id:text('id').primaryKey(),cartId:text('cart_id').notNull(),status:text('status').notNull().default('pending'),createdAt:integer('created_at').notNull()});
