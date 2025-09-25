import CreditCardModule from "~/module/transaction/CreditCardModule";
import AppModule from "./AppModule";
import ScalarsModule from "./ScalarsModule";
import TransactionCategoryModule from "./transaction/TransactionCategoryModule";
import TypesModule from "./TypesModule";
import UserModule from "./users/UserModule";
import TransactionTotalsModule from "~/module/transaction/TransactionTotalsModule";
import TransactionGroupModule from "./transaction/TransactionGroupModule";
import TransactionModule from "~/module/transaction/TransactionModule";
import TransactionsModule from "~/module/transaction/TransactionsModule";

export default [
  AppModule,
  ScalarsModule,
  TypesModule,
  UserModule,
  TransactionGroupModule,
  TransactionCategoryModule,
  TransactionModule,
  CreditCardModule,
  TransactionTotalsModule,
  TransactionsModule,
];
