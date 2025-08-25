import AppModule from "./AppModule";
import ScalarsModule from "./ScalarsModule";
import TransactionModule from "./transaction/TransactionGroupModule";
import TypesModule from "./TypesModule";
import UserModule from "./users/UserModule";

export default [
  AppModule,
  ScalarsModule,
  TypesModule,
  UserModule,
  TransactionModule,
];
