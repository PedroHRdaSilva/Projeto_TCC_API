import CreditCardModule from "~/module/transaction/CreditCardModule";
import AppModule from "./AppModule";
import ScalarsModule from "./ScalarsModule";
import TransactionCategoryModule from "./transaction/TransactionCategoryModule";
import TransactionModule from "./transaction/TransactionGroupModule";
import TypesModule from "./TypesModule";
import UserModule from "./users/UserModule";
import TransactionTotalsModule from "~/module/transaction/TransactionTotalsModule";

export default [
  AppModule,
  ScalarsModule,
  TypesModule,
  UserModule,
  TransactionModule,
  TransactionCategoryModule,
  TransactionModule,
  CreditCardModule,
  TransactionTotalsModule,
];
