import Cursor from "../../utils/Cursor";
import { ObjectId } from "mongodb";
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { TransactionCategory } from "../../module/transaction/models/TransactionCategory";
import { Transaction } from "../../module/transaction/models/Transaction";
import { TransactionsByCategoryChart } from "../../modules/transaction/models/TransactionsByCategoryChart";
import { TransactionsCardCategorySpending } from "../../modules/Transaction/models/TransactionsCardCategorySpending";
import { TGraphQLContext } from "./GraphqlContext";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  AccountNumber: { input: any; output: any };
  BigInt: { input: any; output: any };
  Byte: { input: any; output: any };
  CountryCode: { input: any; output: any };
  Currency: { input: any; output: any };
  Cursor: { input: Cursor; output: Cursor };
  DID: { input: any; output: any };
  Date: { input: any; output: any };
  DateTime: { input: any; output: any };
  Duration: { input: any; output: any };
  EmailAddress: { input: any; output: any };
  GUID: { input: any; output: any };
  HSL: { input: any; output: any };
  HSLA: { input: any; output: any };
  HexColorCode: { input: any; output: any };
  Hexadecimal: { input: any; output: any };
  IBAN: { input: any; output: any };
  IPv4: { input: any; output: any };
  IPv6: { input: any; output: any };
  ISBN: { input: any; output: any };
  ISO8601Duration: { input: any; output: any };
  JSON: { input: any; output: any };
  JSONObject: { input: any; output: any };
  JWT: { input: any; output: any };
  Latitude: { input: any; output: any };
  LocalDate: { input: any; output: any };
  LocalEndTime: { input: any; output: any };
  LocalTime: { input: any; output: any };
  Locale: { input: any; output: any };
  Long: { input: any; output: any };
  Longitude: { input: any; output: any };
  MAC: { input: any; output: any };
  NegativeFloat: { input: any; output: any };
  NegativeInt: { input: any; output: any };
  NonEmptyString: { input: any; output: any };
  NonNegativeFloat: { input: any; output: any };
  NonNegativeInt: { input: any; output: any };
  NonPositiveFloat: { input: any; output: any };
  NonPositiveInt: { input: any; output: any };
  ObjectID: { input: ObjectId; output: ObjectId };
  PhoneNumber: { input: any; output: any };
  Port: { input: any; output: any };
  PositiveFloat: { input: any; output: any };
  PositiveInt: { input: any; output: any };
  PostalCode: { input: any; output: any };
  RGB: { input: any; output: any };
  RGBA: { input: any; output: any };
  RoutingNumber: { input: any; output: any };
  SafeInt: { input: any; output: any };
  Time: { input: any; output: any };
  TimeZone: { input: any; output: any };
  Timestamp: { input: any; output: any };
  URL: { input: any; output: any };
  USCurrency: { input: any; output: any };
  UUID: { input: any; output: any };
  UnsignedFloat: { input: any; output: any };
  UnsignedInt: { input: any; output: any };
  UtcOffset: { input: any; output: any };
  Void: { input: any; output: any };
};

export type IAuthenticatedUser = {
  __typename?: "AuthenticatedUser";
  accessToken: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
};

export enum ICacheControlScope {
  Private = "PRIVATE",
  Public = "PUBLIC",
}

export type ICreateCategoryCustomInput = {
  categoryDefaultId?: InputMaybe<Scalars["ObjectID"]["input"]>;
  description: Scalars["String"]["input"];
  iconProperties: IIconPropertiesInput;
  transactionGroupId: Scalars["ObjectID"]["input"];
  type: ITransactionCategoryTypeEnum;
};

export type ICreateCategoryDefaultInput = {
  description: Scalars["String"]["input"];
  iconProperties: IIconPropertiesInput;
  type: ITransactionCategoryTypeEnum;
};

export type ICreateTransactionGroupInput = {
  description: Scalars["String"]["input"];
  iconProperties: IIconPropertiesInput;
};

export type ICreateUserInput = {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type ICreditCard = {
  __typename?: "CreditCard";
  _id: Scalars["ObjectID"]["output"];
  description: Scalars["String"]["output"];
  transactionGroupId: Scalars["ObjectID"]["output"];
};

export type ICreditCardInput = {
  description: Scalars["String"]["input"];
  transactionGroupId: Scalars["ObjectID"]["input"];
};

export type IIconProperties = {
  __typename?: "IconProperties";
  background: Scalars["String"]["output"];
  color: Scalars["String"]["output"];
  icon: Scalars["String"]["output"];
};

export type IIconPropertiesInput = {
  background: Scalars["String"]["input"];
  color: Scalars["String"]["input"];
  icon: Scalars["String"]["input"];
};

export type IInstallments = {
  __typename?: "Installments";
  current: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type IMutation = {
  __typename?: "Mutation";
  createCategory: ITransactionCategory;
  createCreditCard: ICreditCard;
  createTransaction: Array<ITransaction>;
  createTransactionGroup: ITransactionGroup;
  createUser: Scalars["Boolean"]["output"];
  deleteCategory?: Maybe<Scalars["Boolean"]["output"]>;
  deleteCreditCard?: Maybe<Scalars["Boolean"]["output"]>;
  deleteTransaction: Scalars["Boolean"]["output"];
  deleteTransactionGroup: Scalars["Boolean"]["output"];
  forgotPassword: Scalars["Boolean"]["output"];
  loginWithCredentials: IAuthenticatedUser;
  now?: Maybe<Scalars["BigInt"]["output"]>;
  resetPassword: Scalars["Boolean"]["output"];
  transactionStatus: Scalars["Boolean"]["output"];
  updateCategory: ITransactionCategory;
  updateCreditCard: ICreditCard;
  updateTransaction?: Maybe<ITransaction>;
  updateTransactionGroup: ITransactionGroup;
};

export type IMutationCreateCategoryArgs = {
  input: ICreateCategoryCustomInput;
};

export type IMutationCreateCreditCardArgs = {
  input: ICreditCardInput;
};

export type IMutationCreateTransactionArgs = {
  input: ITransactionInput;
};

export type IMutationCreateTransactionGroupArgs = {
  input: ICreateTransactionGroupInput;
};

export type IMutationCreateUserArgs = {
  input: ICreateUserInput;
};

export type IMutationDeleteCategoryArgs = {
  _id: Scalars["ObjectID"]["input"];
  groupId: Scalars["ObjectID"]["input"];
};

export type IMutationDeleteCreditCardArgs = {
  _id: Scalars["ObjectID"]["input"];
};

export type IMutationDeleteTransactionArgs = {
  _id: Scalars["ObjectID"]["input"];
};

export type IMutationDeleteTransactionGroupArgs = {
  _id: Scalars["ObjectID"]["input"];
};

export type IMutationForgotPasswordArgs = {
  email: Scalars["String"]["input"];
};

export type IMutationLoginWithCredentialsArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type IMutationResetPasswordArgs = {
  password: Scalars["String"]["input"];
  token: Scalars["String"]["input"];
};

export type IMutationTransactionStatusArgs = {
  _id: Array<Scalars["ObjectID"]["input"]>;
  status: ITransactionStatus;
};

export type IMutationUpdateCategoryArgs = {
  _id: Scalars["ObjectID"]["input"];
  input: IUpdateCustomInput;
};

export type IMutationUpdateCreditCardArgs = {
  _id: Scalars["ObjectID"]["input"];
  input: ICreditCardInput;
};

export type IMutationUpdateTransactionArgs = {
  _id: Scalars["ObjectID"]["input"];
  input: ITransactionInput;
};

export type IMutationUpdateTransactionGroupArgs = {
  _id: Scalars["ObjectID"]["input"];
  input: IUpdateTransactionGroupInput;
};

export type IObjectKeyValue = {
  __typename?: "ObjectKeyValue";
  key: Scalars["String"]["output"];
  value: Scalars["String"]["output"];
};

export type IObjectKeyValueInput = {
  key: Scalars["String"]["input"];
  value: Scalars["String"]["input"];
};

export type IPageInfo = {
  __typename?: "PageInfo";
  cursor?: Maybe<Scalars["Cursor"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
  totalCount: Scalars["Int"]["output"];
};

export type IQuery = {
  __typename?: "Query";
  cardCategorySpending: Array<ITransactionsCardCategorySpending>;
  categoriesByGroupId: Array<ITransactionCategory>;
  categoryById?: Maybe<ITransactionCategory>;
  creditCardByGroupId: Array<ICreditCard>;
  creditCardById?: Maybe<ICreditCard>;
  monthlyRevenueVsExpenses: Array<ITransactionsChart>;
  monthlySpendingByCategory: Array<ITransactionsByCategoryChart>;
  now?: Maybe<Scalars["BigInt"]["output"]>;
  transactionById?: Maybe<ITransaction>;
  transactionGroupById?: Maybe<ITransactionGroup>;
  transactionTotals?: Maybe<ITransactionsTotals>;
  transactions: ITransactionDetailsPagination;
  transactionsGroup: Array<ITransactionGroup>;
  viewer?: Maybe<IViewer>;
};

export type IQueryCardCategorySpendingArgs = {
  filterByEndMonth?: InputMaybe<Scalars["Date"]["input"]>;
  filterByStartMonth?: InputMaybe<Scalars["Date"]["input"]>;
  groupId: Scalars["ObjectID"]["input"];
};

export type IQueryCategoriesByGroupIdArgs = {
  transactionGroupId: Scalars["ObjectID"]["input"];
};

export type IQueryCategoryByIdArgs = {
  categoryId: Scalars["ObjectID"]["input"];
};

export type IQueryCreditCardByGroupIdArgs = {
  transactionGroupId: Scalars["ObjectID"]["input"];
};

export type IQueryCreditCardByIdArgs = {
  _id: Scalars["ObjectID"]["input"];
};

export type IQueryMonthlyRevenueVsExpensesArgs = {
  filterByEndMonth?: InputMaybe<Scalars["Date"]["input"]>;
  filterByStartMonth?: InputMaybe<Scalars["Date"]["input"]>;
  groupId: Scalars["ObjectID"]["input"];
};

export type IQueryMonthlySpendingByCategoryArgs = {
  filterByEndMonth?: InputMaybe<Scalars["Date"]["input"]>;
  filterByStartMonth?: InputMaybe<Scalars["Date"]["input"]>;
  groupId: Scalars["ObjectID"]["input"];
};

export type IQueryTransactionByIdArgs = {
  _id: Scalars["ObjectID"]["input"];
};

export type IQueryTransactionGroupByIdArgs = {
  _id?: InputMaybe<Scalars["ObjectID"]["input"]>;
};

export type IQueryTransactionTotalsArgs = {
  filterByCategoryId?: InputMaybe<Scalars["ObjectID"]["input"]>;
  filterByPeriod: Scalars["Date"]["input"];
  filterBySearch?: InputMaybe<Scalars["String"]["input"]>;
  groupId: Scalars["ObjectID"]["input"];
};

export type IQueryTransactionsArgs = {
  cursor?: InputMaybe<Scalars["Cursor"]["input"]>;
  filterByCategoryId?: InputMaybe<Scalars["ObjectID"]["input"]>;
  filterByPeriod: Scalars["Date"]["input"];
  filterBySearch?: InputMaybe<Scalars["String"]["input"]>;
  groupId: Scalars["ObjectID"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type IQueryTransactionsGroupArgs = {
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type ITransaction = {
  __typename?: "Transaction";
  _id: Scalars["ObjectID"]["output"];
  amount: Scalars["Float"]["output"];
  category: ITransactionCategory;
  creditCard?: Maybe<ICreditCard>;
  date: Scalars["Date"]["output"];
  description: Scalars["String"]["output"];
  installments?: Maybe<IInstallments>;
  isRecurringPayment: Scalars["Boolean"]["output"];
  status?: Maybe<ITransactionStatus>;
  transactionGroupId: Scalars["ObjectID"]["output"];
};

export type ITransactionCategory = {
  __typename?: "TransactionCategory";
  _id: Scalars["ObjectID"]["output"];
  description: Scalars["String"]["output"];
  iconProperties: IIconProperties;
  isDefault: Scalars["Boolean"]["output"];
  type: ITransactionCategoryTypeEnum;
};

export enum ITransactionCategoryTypeEnum {
  Earnings = "EARNINGS",
  Expenses = "EXPENSES",
}

export type ITransactionDetailsPagination = {
  __typename?: "TransactionDetailsPagination";
  nodes: Array<ITransaction>;
  pageInfo: IPageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ITransactionGroup = {
  __typename?: "TransactionGroup";
  _id: Scalars["ObjectID"]["output"];
  description: Scalars["String"]["output"];
  iconProperties: IIconProperties;
  owner: IUser;
};

export type ITransactionGrouped = {
  __typename?: "TransactionGrouped";
  groupBy: Scalars["ObjectID"]["output"];
  nodes: Array<ITransaction>;
};

export type ITransactionGroupedDetailsPagination = {
  __typename?: "TransactionGroupedDetailsPagination";
  groups: Array<ITransactionGrouped>;
  pageInfo: IPageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ITransactionInput = {
  amount: Scalars["Float"]["input"];
  categoryId: Scalars["ObjectID"]["input"];
  creditCardId?: InputMaybe<Scalars["ObjectID"]["input"]>;
  date: Scalars["Date"]["input"];
  description: Scalars["String"]["input"];
  installmentCount?: InputMaybe<Scalars["Int"]["input"]>;
  isRecurringPayment: Scalars["Boolean"]["input"];
  transactionGroupId: Scalars["ObjectID"]["input"];
};

export enum ITransactionStatus {
  Paid = "PAID",
  Pending = "PENDING",
}

export type ITransactionsByCategoryChart = {
  __typename?: "TransactionsByCategoryChart";
  amount: Scalars["Float"]["output"];
  category: ITransactionCategory;
  reportDate: Scalars["Date"]["output"];
  transactions?: Maybe<Array<ITransaction>>;
};

export type ITransactionsCardCategorySpending = {
  __typename?: "TransactionsCardCategorySpending";
  amount: Scalars["Float"]["output"];
  category: ITransactionCategory;
  creditCard: ICreditCard;
  reportDate: Scalars["Date"]["output"];
  transactions?: Maybe<Array<ITransaction>>;
};

export type ITransactionsChart = {
  __typename?: "TransactionsChart";
  expense: Scalars["Float"]["output"];
  reportDate: Scalars["Date"]["output"];
  revenue: Scalars["Float"]["output"];
  transactions: Array<ITransaction>;
};

export type ITransactionsGroupedByCategoryPagination = {
  __typename?: "TransactionsGroupedByCategoryPagination";
  groupBy: Scalars["ObjectID"]["output"];
  nodes: Array<ITransaction>;
  pageInfo: IPageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ITransactionsTotalize = {
  __typename?: "TransactionsTotalize";
  percentageVariation: Scalars["Float"]["output"];
  total: Scalars["Float"]["output"];
};

export type ITransactionsTotals = {
  __typename?: "TransactionsTotals";
  balance: ITransactionsTotalize;
  expense: ITransactionsTotalize;
  revenue: ITransactionsTotalize;
};

export type IUpdateCustomInput = {
  categoryDefaultId?: InputMaybe<Scalars["ObjectID"]["input"]>;
  description: Scalars["String"]["input"];
  iconProperties: IIconPropertiesInput;
  transactionGroupId: Scalars["ObjectID"]["input"];
  type: ITransactionCategoryTypeEnum;
};

export type IUpdateTransactionGroupInput = {
  description: Scalars["String"]["input"];
  iconProperties: IIconPropertiesInput;
};

export type IUser = {
  __typename?: "User";
  _id: Scalars["ObjectID"]["output"];
  email: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type IViewer = {
  __typename?: "Viewer";
  _id: Scalars["ObjectID"]["output"];
  email: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = ResolversObject<{
  AccountNumber: ResolverTypeWrapper<
    Partial<Scalars["AccountNumber"]["output"]>
  >;
  AuthenticatedUser: ResolverTypeWrapper<Partial<IAuthenticatedUser>>;
  BigInt: ResolverTypeWrapper<Partial<Scalars["BigInt"]["output"]>>;
  Boolean: ResolverTypeWrapper<Partial<Scalars["Boolean"]["output"]>>;
  Byte: ResolverTypeWrapper<Partial<Scalars["Byte"]["output"]>>;
  CacheControlScope: ResolverTypeWrapper<Partial<ICacheControlScope>>;
  CountryCode: ResolverTypeWrapper<Partial<Scalars["CountryCode"]["output"]>>;
  CreateCategoryCustomInput: ResolverTypeWrapper<
    Partial<ICreateCategoryCustomInput>
  >;
  CreateCategoryDefaultInput: ResolverTypeWrapper<
    Partial<ICreateCategoryDefaultInput>
  >;
  CreateTransactionGroupInput: ResolverTypeWrapper<
    Partial<ICreateTransactionGroupInput>
  >;
  CreateUserInput: ResolverTypeWrapper<Partial<ICreateUserInput>>;
  CreditCard: ResolverTypeWrapper<Partial<ICreditCard>>;
  CreditCardInput: ResolverTypeWrapper<Partial<ICreditCardInput>>;
  Currency: ResolverTypeWrapper<Partial<Scalars["Currency"]["output"]>>;
  Cursor: ResolverTypeWrapper<Partial<Scalars["Cursor"]["output"]>>;
  DID: ResolverTypeWrapper<Partial<Scalars["DID"]["output"]>>;
  Date: ResolverTypeWrapper<Partial<Scalars["Date"]["output"]>>;
  DateTime: ResolverTypeWrapper<Partial<Scalars["DateTime"]["output"]>>;
  Duration: ResolverTypeWrapper<Partial<Scalars["Duration"]["output"]>>;
  EmailAddress: ResolverTypeWrapper<Partial<Scalars["EmailAddress"]["output"]>>;
  Float: ResolverTypeWrapper<Partial<Scalars["Float"]["output"]>>;
  GUID: ResolverTypeWrapper<Partial<Scalars["GUID"]["output"]>>;
  HSL: ResolverTypeWrapper<Partial<Scalars["HSL"]["output"]>>;
  HSLA: ResolverTypeWrapper<Partial<Scalars["HSLA"]["output"]>>;
  HexColorCode: ResolverTypeWrapper<Partial<Scalars["HexColorCode"]["output"]>>;
  Hexadecimal: ResolverTypeWrapper<Partial<Scalars["Hexadecimal"]["output"]>>;
  IBAN: ResolverTypeWrapper<Partial<Scalars["IBAN"]["output"]>>;
  IPv4: ResolverTypeWrapper<Partial<Scalars["IPv4"]["output"]>>;
  IPv6: ResolverTypeWrapper<Partial<Scalars["IPv6"]["output"]>>;
  ISBN: ResolverTypeWrapper<Partial<Scalars["ISBN"]["output"]>>;
  ISO8601Duration: ResolverTypeWrapper<
    Partial<Scalars["ISO8601Duration"]["output"]>
  >;
  IconProperties: ResolverTypeWrapper<Partial<IIconProperties>>;
  IconPropertiesInput: ResolverTypeWrapper<Partial<IIconPropertiesInput>>;
  Installments: ResolverTypeWrapper<Partial<IInstallments>>;
  Int: ResolverTypeWrapper<Partial<Scalars["Int"]["output"]>>;
  JSON: ResolverTypeWrapper<Partial<Scalars["JSON"]["output"]>>;
  JSONObject: ResolverTypeWrapper<Partial<Scalars["JSONObject"]["output"]>>;
  JWT: ResolverTypeWrapper<Partial<Scalars["JWT"]["output"]>>;
  Latitude: ResolverTypeWrapper<Partial<Scalars["Latitude"]["output"]>>;
  LocalDate: ResolverTypeWrapper<Partial<Scalars["LocalDate"]["output"]>>;
  LocalEndTime: ResolverTypeWrapper<Partial<Scalars["LocalEndTime"]["output"]>>;
  LocalTime: ResolverTypeWrapper<Partial<Scalars["LocalTime"]["output"]>>;
  Locale: ResolverTypeWrapper<Partial<Scalars["Locale"]["output"]>>;
  Long: ResolverTypeWrapper<Partial<Scalars["Long"]["output"]>>;
  Longitude: ResolverTypeWrapper<Partial<Scalars["Longitude"]["output"]>>;
  MAC: ResolverTypeWrapper<Partial<Scalars["MAC"]["output"]>>;
  Mutation: ResolverTypeWrapper<{}>;
  NegativeFloat: ResolverTypeWrapper<
    Partial<Scalars["NegativeFloat"]["output"]>
  >;
  NegativeInt: ResolverTypeWrapper<Partial<Scalars["NegativeInt"]["output"]>>;
  NonEmptyString: ResolverTypeWrapper<
    Partial<Scalars["NonEmptyString"]["output"]>
  >;
  NonNegativeFloat: ResolverTypeWrapper<
    Partial<Scalars["NonNegativeFloat"]["output"]>
  >;
  NonNegativeInt: ResolverTypeWrapper<
    Partial<Scalars["NonNegativeInt"]["output"]>
  >;
  NonPositiveFloat: ResolverTypeWrapper<
    Partial<Scalars["NonPositiveFloat"]["output"]>
  >;
  NonPositiveInt: ResolverTypeWrapper<
    Partial<Scalars["NonPositiveInt"]["output"]>
  >;
  ObjectID: ResolverTypeWrapper<Partial<Scalars["ObjectID"]["output"]>>;
  ObjectKeyValue: ResolverTypeWrapper<Partial<IObjectKeyValue>>;
  ObjectKeyValueInput: ResolverTypeWrapper<Partial<IObjectKeyValueInput>>;
  PageInfo: ResolverTypeWrapper<Partial<IPageInfo>>;
  PhoneNumber: ResolverTypeWrapper<Partial<Scalars["PhoneNumber"]["output"]>>;
  Port: ResolverTypeWrapper<Partial<Scalars["Port"]["output"]>>;
  PositiveFloat: ResolverTypeWrapper<
    Partial<Scalars["PositiveFloat"]["output"]>
  >;
  PositiveInt: ResolverTypeWrapper<Partial<Scalars["PositiveInt"]["output"]>>;
  PostalCode: ResolverTypeWrapper<Partial<Scalars["PostalCode"]["output"]>>;
  Query: ResolverTypeWrapper<{}>;
  RGB: ResolverTypeWrapper<Partial<Scalars["RGB"]["output"]>>;
  RGBA: ResolverTypeWrapper<Partial<Scalars["RGBA"]["output"]>>;
  RoutingNumber: ResolverTypeWrapper<
    Partial<Scalars["RoutingNumber"]["output"]>
  >;
  SafeInt: ResolverTypeWrapper<Partial<Scalars["SafeInt"]["output"]>>;
  String: ResolverTypeWrapper<Partial<Scalars["String"]["output"]>>;
  Time: ResolverTypeWrapper<Partial<Scalars["Time"]["output"]>>;
  TimeZone: ResolverTypeWrapper<Partial<Scalars["TimeZone"]["output"]>>;
  Timestamp: ResolverTypeWrapper<Partial<Scalars["Timestamp"]["output"]>>;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionCategory: ResolverTypeWrapper<TransactionCategory>;
  TransactionCategoryTypeEnum: ResolverTypeWrapper<
    Partial<ITransactionCategoryTypeEnum>
  >;
  TransactionDetailsPagination: ResolverTypeWrapper<
    Partial<
      Omit<ITransactionDetailsPagination, "nodes"> & {
        nodes: Array<IResolversTypes["Transaction"]>;
      }
    >
  >;
  TransactionGroup: ResolverTypeWrapper<Partial<ITransactionGroup>>;
  TransactionGrouped: ResolverTypeWrapper<
    Partial<
      Omit<ITransactionGrouped, "nodes"> & {
        nodes: Array<IResolversTypes["Transaction"]>;
      }
    >
  >;
  TransactionGroupedDetailsPagination: ResolverTypeWrapper<
    Partial<
      Omit<ITransactionGroupedDetailsPagination, "groups"> & {
        groups: Array<IResolversTypes["TransactionGrouped"]>;
      }
    >
  >;
  TransactionInput: ResolverTypeWrapper<Partial<ITransactionInput>>;
  TransactionStatus: ResolverTypeWrapper<Partial<ITransactionStatus>>;
  TransactionsByCategoryChart: ResolverTypeWrapper<TransactionsByCategoryChart>;
  TransactionsCardCategorySpending: ResolverTypeWrapper<TransactionsCardCategorySpending>;
  TransactionsChart: ResolverTypeWrapper<
    Partial<
      Omit<ITransactionsChart, "transactions"> & {
        transactions: Array<IResolversTypes["Transaction"]>;
      }
    >
  >;
  TransactionsGroupedByCategoryPagination: ResolverTypeWrapper<
    Partial<
      Omit<ITransactionsGroupedByCategoryPagination, "nodes"> & {
        nodes: Array<IResolversTypes["Transaction"]>;
      }
    >
  >;
  TransactionsTotalize: ResolverTypeWrapper<Partial<ITransactionsTotalize>>;
  TransactionsTotals: ResolverTypeWrapper<Partial<ITransactionsTotals>>;
  URL: ResolverTypeWrapper<Partial<Scalars["URL"]["output"]>>;
  USCurrency: ResolverTypeWrapper<Partial<Scalars["USCurrency"]["output"]>>;
  UUID: ResolverTypeWrapper<Partial<Scalars["UUID"]["output"]>>;
  UnsignedFloat: ResolverTypeWrapper<
    Partial<Scalars["UnsignedFloat"]["output"]>
  >;
  UnsignedInt: ResolverTypeWrapper<Partial<Scalars["UnsignedInt"]["output"]>>;
  UpdateCustomInput: ResolverTypeWrapper<Partial<IUpdateCustomInput>>;
  UpdateTransactionGroupInput: ResolverTypeWrapper<
    Partial<IUpdateTransactionGroupInput>
  >;
  User: ResolverTypeWrapper<Partial<IUser>>;
  UtcOffset: ResolverTypeWrapper<Partial<Scalars["UtcOffset"]["output"]>>;
  Viewer: ResolverTypeWrapper<Partial<IViewer>>;
  Void: ResolverTypeWrapper<Partial<Scalars["Void"]["output"]>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = ResolversObject<{
  AccountNumber: Partial<Scalars["AccountNumber"]["output"]>;
  AuthenticatedUser: Partial<IAuthenticatedUser>;
  BigInt: Partial<Scalars["BigInt"]["output"]>;
  Boolean: Partial<Scalars["Boolean"]["output"]>;
  Byte: Partial<Scalars["Byte"]["output"]>;
  CountryCode: Partial<Scalars["CountryCode"]["output"]>;
  CreateCategoryCustomInput: Partial<ICreateCategoryCustomInput>;
  CreateCategoryDefaultInput: Partial<ICreateCategoryDefaultInput>;
  CreateTransactionGroupInput: Partial<ICreateTransactionGroupInput>;
  CreateUserInput: Partial<ICreateUserInput>;
  CreditCard: Partial<ICreditCard>;
  CreditCardInput: Partial<ICreditCardInput>;
  Currency: Partial<Scalars["Currency"]["output"]>;
  Cursor: Partial<Scalars["Cursor"]["output"]>;
  DID: Partial<Scalars["DID"]["output"]>;
  Date: Partial<Scalars["Date"]["output"]>;
  DateTime: Partial<Scalars["DateTime"]["output"]>;
  Duration: Partial<Scalars["Duration"]["output"]>;
  EmailAddress: Partial<Scalars["EmailAddress"]["output"]>;
  Float: Partial<Scalars["Float"]["output"]>;
  GUID: Partial<Scalars["GUID"]["output"]>;
  HSL: Partial<Scalars["HSL"]["output"]>;
  HSLA: Partial<Scalars["HSLA"]["output"]>;
  HexColorCode: Partial<Scalars["HexColorCode"]["output"]>;
  Hexadecimal: Partial<Scalars["Hexadecimal"]["output"]>;
  IBAN: Partial<Scalars["IBAN"]["output"]>;
  IPv4: Partial<Scalars["IPv4"]["output"]>;
  IPv6: Partial<Scalars["IPv6"]["output"]>;
  ISBN: Partial<Scalars["ISBN"]["output"]>;
  ISO8601Duration: Partial<Scalars["ISO8601Duration"]["output"]>;
  IconProperties: Partial<IIconProperties>;
  IconPropertiesInput: Partial<IIconPropertiesInput>;
  Installments: Partial<IInstallments>;
  Int: Partial<Scalars["Int"]["output"]>;
  JSON: Partial<Scalars["JSON"]["output"]>;
  JSONObject: Partial<Scalars["JSONObject"]["output"]>;
  JWT: Partial<Scalars["JWT"]["output"]>;
  Latitude: Partial<Scalars["Latitude"]["output"]>;
  LocalDate: Partial<Scalars["LocalDate"]["output"]>;
  LocalEndTime: Partial<Scalars["LocalEndTime"]["output"]>;
  LocalTime: Partial<Scalars["LocalTime"]["output"]>;
  Locale: Partial<Scalars["Locale"]["output"]>;
  Long: Partial<Scalars["Long"]["output"]>;
  Longitude: Partial<Scalars["Longitude"]["output"]>;
  MAC: Partial<Scalars["MAC"]["output"]>;
  Mutation: {};
  NegativeFloat: Partial<Scalars["NegativeFloat"]["output"]>;
  NegativeInt: Partial<Scalars["NegativeInt"]["output"]>;
  NonEmptyString: Partial<Scalars["NonEmptyString"]["output"]>;
  NonNegativeFloat: Partial<Scalars["NonNegativeFloat"]["output"]>;
  NonNegativeInt: Partial<Scalars["NonNegativeInt"]["output"]>;
  NonPositiveFloat: Partial<Scalars["NonPositiveFloat"]["output"]>;
  NonPositiveInt: Partial<Scalars["NonPositiveInt"]["output"]>;
  ObjectID: Partial<Scalars["ObjectID"]["output"]>;
  ObjectKeyValue: Partial<IObjectKeyValue>;
  ObjectKeyValueInput: Partial<IObjectKeyValueInput>;
  PageInfo: Partial<IPageInfo>;
  PhoneNumber: Partial<Scalars["PhoneNumber"]["output"]>;
  Port: Partial<Scalars["Port"]["output"]>;
  PositiveFloat: Partial<Scalars["PositiveFloat"]["output"]>;
  PositiveInt: Partial<Scalars["PositiveInt"]["output"]>;
  PostalCode: Partial<Scalars["PostalCode"]["output"]>;
  Query: {};
  RGB: Partial<Scalars["RGB"]["output"]>;
  RGBA: Partial<Scalars["RGBA"]["output"]>;
  RoutingNumber: Partial<Scalars["RoutingNumber"]["output"]>;
  SafeInt: Partial<Scalars["SafeInt"]["output"]>;
  String: Partial<Scalars["String"]["output"]>;
  Time: Partial<Scalars["Time"]["output"]>;
  TimeZone: Partial<Scalars["TimeZone"]["output"]>;
  Timestamp: Partial<Scalars["Timestamp"]["output"]>;
  Transaction: Transaction;
  TransactionCategory: TransactionCategory;
  TransactionDetailsPagination: Partial<
    Omit<ITransactionDetailsPagination, "nodes"> & {
      nodes: Array<IResolversParentTypes["Transaction"]>;
    }
  >;
  TransactionGroup: Partial<ITransactionGroup>;
  TransactionGrouped: Partial<
    Omit<ITransactionGrouped, "nodes"> & {
      nodes: Array<IResolversParentTypes["Transaction"]>;
    }
  >;
  TransactionGroupedDetailsPagination: Partial<
    Omit<ITransactionGroupedDetailsPagination, "groups"> & {
      groups: Array<IResolversParentTypes["TransactionGrouped"]>;
    }
  >;
  TransactionInput: Partial<ITransactionInput>;
  TransactionsByCategoryChart: TransactionsByCategoryChart;
  TransactionsCardCategorySpending: TransactionsCardCategorySpending;
  TransactionsChart: Partial<
    Omit<ITransactionsChart, "transactions"> & {
      transactions: Array<IResolversParentTypes["Transaction"]>;
    }
  >;
  TransactionsGroupedByCategoryPagination: Partial<
    Omit<ITransactionsGroupedByCategoryPagination, "nodes"> & {
      nodes: Array<IResolversParentTypes["Transaction"]>;
    }
  >;
  TransactionsTotalize: Partial<ITransactionsTotalize>;
  TransactionsTotals: Partial<ITransactionsTotals>;
  URL: Partial<Scalars["URL"]["output"]>;
  USCurrency: Partial<Scalars["USCurrency"]["output"]>;
  UUID: Partial<Scalars["UUID"]["output"]>;
  UnsignedFloat: Partial<Scalars["UnsignedFloat"]["output"]>;
  UnsignedInt: Partial<Scalars["UnsignedInt"]["output"]>;
  UpdateCustomInput: Partial<IUpdateCustomInput>;
  UpdateTransactionGroupInput: Partial<IUpdateTransactionGroupInput>;
  User: Partial<IUser>;
  UtcOffset: Partial<Scalars["UtcOffset"]["output"]>;
  Viewer: Partial<IViewer>;
  Void: Partial<Scalars["Void"]["output"]>;
}>;

export type ICacheControlDirectiveArgs = {
  inheritMaxAge?: Maybe<Scalars["Boolean"]["input"]>;
  maxAge?: Maybe<Scalars["Int"]["input"]>;
  scope?: Maybe<ICacheControlScope>;
};

export type ICacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = TGraphQLContext,
  Args = ICacheControlDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface IAccountNumberScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["AccountNumber"], any> {
  name: "AccountNumber";
}

export type IAuthenticatedUserResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["AuthenticatedUser"] = IResolversParentTypes["AuthenticatedUser"],
> = ResolversObject<{
  accessToken?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface IBigIntScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["BigInt"], any> {
  name: "BigInt";
}

export interface IByteScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["Byte"], any> {
  name: "Byte";
}

export interface ICountryCodeScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["CountryCode"], any> {
  name: "CountryCode";
}

export type ICreditCardResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["CreditCard"] = IResolversParentTypes["CreditCard"],
> = ResolversObject<{
  _id?: Resolver<IResolversTypes["ObjectID"], ParentType, ContextType>;
  description?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  transactionGroupId?: Resolver<
    IResolversTypes["ObjectID"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface ICurrencyScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["Currency"], any> {
  name: "Currency";
}

export interface ICursorScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["Cursor"], any> {
  name: "Cursor";
}

export interface IDidScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["DID"], any> {
  name: "DID";
}

export interface IDateScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["Date"], any> {
  name: "Date";
}

export interface IDateTimeScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export interface IDurationScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["Duration"], any> {
  name: "Duration";
}

export interface IEmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["EmailAddress"], any> {
  name: "EmailAddress";
}

export interface IGuidScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["GUID"], any> {
  name: "GUID";
}

export interface IHslScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["HSL"], any> {
  name: "HSL";
}

export interface IHslaScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["HSLA"], any> {
  name: "HSLA";
}

export interface IHexColorCodeScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["HexColorCode"], any> {
  name: "HexColorCode";
}

export interface IHexadecimalScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["Hexadecimal"], any> {
  name: "Hexadecimal";
}

export interface IIbanScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["IBAN"], any> {
  name: "IBAN";
}

export interface IIPv4ScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["IPv4"], any> {
  name: "IPv4";
}

export interface IIPv6ScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["IPv6"], any> {
  name: "IPv6";
}

export interface IIsbnScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["ISBN"], any> {
  name: "ISBN";
}

export interface IIso8601DurationScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["ISO8601Duration"], any> {
  name: "ISO8601Duration";
}

export type IIconPropertiesResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["IconProperties"] = IResolversParentTypes["IconProperties"],
> = ResolversObject<{
  background?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  color?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  icon?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IInstallmentsResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["Installments"] = IResolversParentTypes["Installments"],
> = ResolversObject<{
  current?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  total?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface IJsonScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["JSON"], any> {
  name: "JSON";
}

export interface IJsonObjectScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["JSONObject"], any> {
  name: "JSONObject";
}

export interface IJwtScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["JWT"], any> {
  name: "JWT";
}

export interface ILatitudeScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["Latitude"], any> {
  name: "Latitude";
}

export interface ILocalDateScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["LocalDate"], any> {
  name: "LocalDate";
}

export interface ILocalEndTimeScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["LocalEndTime"], any> {
  name: "LocalEndTime";
}

export interface ILocalTimeScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["LocalTime"], any> {
  name: "LocalTime";
}

export interface ILocaleScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["Locale"], any> {
  name: "Locale";
}

export interface ILongScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["Long"], any> {
  name: "Long";
}

export interface ILongitudeScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["Longitude"], any> {
  name: "Longitude";
}

export interface IMacScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["MAC"], any> {
  name: "MAC";
}

export type IMutationResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["Mutation"] = IResolversParentTypes["Mutation"],
> = ResolversObject<{
  createCategory?: Resolver<
    IResolversTypes["TransactionCategory"],
    ParentType,
    ContextType,
    RequireFields<IMutationCreateCategoryArgs, "input">
  >;
  createCreditCard?: Resolver<
    IResolversTypes["CreditCard"],
    ParentType,
    ContextType,
    RequireFields<IMutationCreateCreditCardArgs, "input">
  >;
  createTransaction?: Resolver<
    Array<IResolversTypes["Transaction"]>,
    ParentType,
    ContextType,
    RequireFields<IMutationCreateTransactionArgs, "input">
  >;
  createTransactionGroup?: Resolver<
    IResolversTypes["TransactionGroup"],
    ParentType,
    ContextType,
    RequireFields<IMutationCreateTransactionGroupArgs, "input">
  >;
  createUser?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<IMutationCreateUserArgs, "input">
  >;
  deleteCategory?: Resolver<
    Maybe<IResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<IMutationDeleteCategoryArgs, "_id" | "groupId">
  >;
  deleteCreditCard?: Resolver<
    Maybe<IResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<IMutationDeleteCreditCardArgs, "_id">
  >;
  deleteTransaction?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<IMutationDeleteTransactionArgs, "_id">
  >;
  deleteTransactionGroup?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<IMutationDeleteTransactionGroupArgs, "_id">
  >;
  forgotPassword?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<IMutationForgotPasswordArgs, "email">
  >;
  loginWithCredentials?: Resolver<
    IResolversTypes["AuthenticatedUser"],
    ParentType,
    ContextType,
    RequireFields<IMutationLoginWithCredentialsArgs, "email" | "password">
  >;
  now?: Resolver<Maybe<IResolversTypes["BigInt"]>, ParentType, ContextType>;
  resetPassword?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<IMutationResetPasswordArgs, "password" | "token">
  >;
  transactionStatus?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<IMutationTransactionStatusArgs, "_id" | "status">
  >;
  updateCategory?: Resolver<
    IResolversTypes["TransactionCategory"],
    ParentType,
    ContextType,
    RequireFields<IMutationUpdateCategoryArgs, "_id" | "input">
  >;
  updateCreditCard?: Resolver<
    IResolversTypes["CreditCard"],
    ParentType,
    ContextType,
    RequireFields<IMutationUpdateCreditCardArgs, "_id" | "input">
  >;
  updateTransaction?: Resolver<
    Maybe<IResolversTypes["Transaction"]>,
    ParentType,
    ContextType,
    RequireFields<IMutationUpdateTransactionArgs, "_id" | "input">
  >;
  updateTransactionGroup?: Resolver<
    IResolversTypes["TransactionGroup"],
    ParentType,
    ContextType,
    RequireFields<IMutationUpdateTransactionGroupArgs, "_id" | "input">
  >;
}>;

export interface INegativeFloatScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["NegativeFloat"], any> {
  name: "NegativeFloat";
}

export interface INegativeIntScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["NegativeInt"], any> {
  name: "NegativeInt";
}

export interface INonEmptyStringScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["NonEmptyString"], any> {
  name: "NonEmptyString";
}

export interface INonNegativeFloatScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["NonNegativeFloat"], any> {
  name: "NonNegativeFloat";
}

export interface INonNegativeIntScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["NonNegativeInt"], any> {
  name: "NonNegativeInt";
}

export interface INonPositiveFloatScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["NonPositiveFloat"], any> {
  name: "NonPositiveFloat";
}

export interface INonPositiveIntScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["NonPositiveInt"], any> {
  name: "NonPositiveInt";
}

export interface IObjectIdScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["ObjectID"], any> {
  name: "ObjectID";
}

export type IObjectKeyValueResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["ObjectKeyValue"] = IResolversParentTypes["ObjectKeyValue"],
> = ResolversObject<{
  key?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  value?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IPageInfoResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["PageInfo"] = IResolversParentTypes["PageInfo"],
> = ResolversObject<{
  cursor?: Resolver<Maybe<IResolversTypes["Cursor"]>, ParentType, ContextType>;
  hasNextPage?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  totalCount?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface IPhoneNumberScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["PhoneNumber"], any> {
  name: "PhoneNumber";
}

export interface IPortScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["Port"], any> {
  name: "Port";
}

export interface IPositiveFloatScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["PositiveFloat"], any> {
  name: "PositiveFloat";
}

export interface IPositiveIntScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["PositiveInt"], any> {
  name: "PositiveInt";
}

export interface IPostalCodeScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["PostalCode"], any> {
  name: "PostalCode";
}

export type IQueryResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["Query"] = IResolversParentTypes["Query"],
> = ResolversObject<{
  cardCategorySpending?: Resolver<
    Array<IResolversTypes["TransactionsCardCategorySpending"]>,
    ParentType,
    ContextType,
    RequireFields<IQueryCardCategorySpendingArgs, "groupId">
  >;
  categoriesByGroupId?: Resolver<
    Array<IResolversTypes["TransactionCategory"]>,
    ParentType,
    ContextType,
    RequireFields<IQueryCategoriesByGroupIdArgs, "transactionGroupId">
  >;
  categoryById?: Resolver<
    Maybe<IResolversTypes["TransactionCategory"]>,
    ParentType,
    ContextType,
    RequireFields<IQueryCategoryByIdArgs, "categoryId">
  >;
  creditCardByGroupId?: Resolver<
    Array<IResolversTypes["CreditCard"]>,
    ParentType,
    ContextType,
    RequireFields<IQueryCreditCardByGroupIdArgs, "transactionGroupId">
  >;
  creditCardById?: Resolver<
    Maybe<IResolversTypes["CreditCard"]>,
    ParentType,
    ContextType,
    RequireFields<IQueryCreditCardByIdArgs, "_id">
  >;
  monthlyRevenueVsExpenses?: Resolver<
    Array<IResolversTypes["TransactionsChart"]>,
    ParentType,
    ContextType,
    RequireFields<IQueryMonthlyRevenueVsExpensesArgs, "groupId">
  >;
  monthlySpendingByCategory?: Resolver<
    Array<IResolversTypes["TransactionsByCategoryChart"]>,
    ParentType,
    ContextType,
    RequireFields<IQueryMonthlySpendingByCategoryArgs, "groupId">
  >;
  now?: Resolver<Maybe<IResolversTypes["BigInt"]>, ParentType, ContextType>;
  transactionById?: Resolver<
    Maybe<IResolversTypes["Transaction"]>,
    ParentType,
    ContextType,
    RequireFields<IQueryTransactionByIdArgs, "_id">
  >;
  transactionGroupById?: Resolver<
    Maybe<IResolversTypes["TransactionGroup"]>,
    ParentType,
    ContextType,
    Partial<IQueryTransactionGroupByIdArgs>
  >;
  transactionTotals?: Resolver<
    Maybe<IResolversTypes["TransactionsTotals"]>,
    ParentType,
    ContextType,
    RequireFields<IQueryTransactionTotalsArgs, "filterByPeriod" | "groupId">
  >;
  transactions?: Resolver<
    IResolversTypes["TransactionDetailsPagination"],
    ParentType,
    ContextType,
    RequireFields<
      IQueryTransactionsArgs,
      "filterByPeriod" | "groupId" | "limit"
    >
  >;
  transactionsGroup?: Resolver<
    Array<IResolversTypes["TransactionGroup"]>,
    ParentType,
    ContextType,
    Partial<IQueryTransactionsGroupArgs>
  >;
  viewer?: Resolver<Maybe<IResolversTypes["Viewer"]>, ParentType, ContextType>;
}>;

export interface IRgbScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["RGB"], any> {
  name: "RGB";
}

export interface IRgbaScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["RGBA"], any> {
  name: "RGBA";
}

export interface IRoutingNumberScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["RoutingNumber"], any> {
  name: "RoutingNumber";
}

export interface ISafeIntScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["SafeInt"], any> {
  name: "SafeInt";
}

export interface ITimeScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["Time"], any> {
  name: "Time";
}

export interface ITimeZoneScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["TimeZone"], any> {
  name: "TimeZone";
}

export interface ITimestampScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["Timestamp"], any> {
  name: "Timestamp";
}

export type ITransactionResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["Transaction"] = IResolversParentTypes["Transaction"],
> = ResolversObject<{
  _id?: Resolver<IResolversTypes["ObjectID"], ParentType, ContextType>;
  amount?: Resolver<IResolversTypes["Float"], ParentType, ContextType>;
  category?: Resolver<
    IResolversTypes["TransactionCategory"],
    ParentType,
    ContextType
  >;
  creditCard?: Resolver<
    Maybe<IResolversTypes["CreditCard"]>,
    ParentType,
    ContextType
  >;
  date?: Resolver<IResolversTypes["Date"], ParentType, ContextType>;
  description?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  installments?: Resolver<
    Maybe<IResolversTypes["Installments"]>,
    ParentType,
    ContextType
  >;
  isRecurringPayment?: Resolver<
    IResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  status?: Resolver<
    Maybe<IResolversTypes["TransactionStatus"]>,
    ParentType,
    ContextType
  >;
  transactionGroupId?: Resolver<
    IResolversTypes["ObjectID"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ITransactionCategoryResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["TransactionCategory"] = IResolversParentTypes["TransactionCategory"],
> = ResolversObject<{
  _id?: Resolver<IResolversTypes["ObjectID"], ParentType, ContextType>;
  description?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  iconProperties?: Resolver<
    IResolversTypes["IconProperties"],
    ParentType,
    ContextType
  >;
  isDefault?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  type?: Resolver<
    IResolversTypes["TransactionCategoryTypeEnum"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ITransactionDetailsPaginationResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["TransactionDetailsPagination"] = IResolversParentTypes["TransactionDetailsPagination"],
> = ResolversObject<{
  nodes?: Resolver<
    Array<IResolversTypes["Transaction"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<IResolversTypes["PageInfo"], ParentType, ContextType>;
  totalCount?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ITransactionGroupResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["TransactionGroup"] = IResolversParentTypes["TransactionGroup"],
> = ResolversObject<{
  _id?: Resolver<IResolversTypes["ObjectID"], ParentType, ContextType>;
  description?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  iconProperties?: Resolver<
    IResolversTypes["IconProperties"],
    ParentType,
    ContextType
  >;
  owner?: Resolver<IResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ITransactionGroupedResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["TransactionGrouped"] = IResolversParentTypes["TransactionGrouped"],
> = ResolversObject<{
  groupBy?: Resolver<IResolversTypes["ObjectID"], ParentType, ContextType>;
  nodes?: Resolver<
    Array<IResolversTypes["Transaction"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ITransactionGroupedDetailsPaginationResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["TransactionGroupedDetailsPagination"] = IResolversParentTypes["TransactionGroupedDetailsPagination"],
> = ResolversObject<{
  groups?: Resolver<
    Array<IResolversTypes["TransactionGrouped"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<IResolversTypes["PageInfo"], ParentType, ContextType>;
  totalCount?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ITransactionsByCategoryChartResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["TransactionsByCategoryChart"] = IResolversParentTypes["TransactionsByCategoryChart"],
> = ResolversObject<{
  amount?: Resolver<IResolversTypes["Float"], ParentType, ContextType>;
  category?: Resolver<
    IResolversTypes["TransactionCategory"],
    ParentType,
    ContextType
  >;
  reportDate?: Resolver<IResolversTypes["Date"], ParentType, ContextType>;
  transactions?: Resolver<
    Maybe<Array<IResolversTypes["Transaction"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ITransactionsCardCategorySpendingResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["TransactionsCardCategorySpending"] = IResolversParentTypes["TransactionsCardCategorySpending"],
> = ResolversObject<{
  amount?: Resolver<IResolversTypes["Float"], ParentType, ContextType>;
  category?: Resolver<
    IResolversTypes["TransactionCategory"],
    ParentType,
    ContextType
  >;
  creditCard?: Resolver<IResolversTypes["CreditCard"], ParentType, ContextType>;
  reportDate?: Resolver<IResolversTypes["Date"], ParentType, ContextType>;
  transactions?: Resolver<
    Maybe<Array<IResolversTypes["Transaction"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ITransactionsChartResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["TransactionsChart"] = IResolversParentTypes["TransactionsChart"],
> = ResolversObject<{
  expense?: Resolver<IResolversTypes["Float"], ParentType, ContextType>;
  reportDate?: Resolver<IResolversTypes["Date"], ParentType, ContextType>;
  revenue?: Resolver<IResolversTypes["Float"], ParentType, ContextType>;
  transactions?: Resolver<
    Array<IResolversTypes["Transaction"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ITransactionsGroupedByCategoryPaginationResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["TransactionsGroupedByCategoryPagination"] = IResolversParentTypes["TransactionsGroupedByCategoryPagination"],
> = ResolversObject<{
  groupBy?: Resolver<IResolversTypes["ObjectID"], ParentType, ContextType>;
  nodes?: Resolver<
    Array<IResolversTypes["Transaction"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<IResolversTypes["PageInfo"], ParentType, ContextType>;
  totalCount?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ITransactionsTotalizeResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["TransactionsTotalize"] = IResolversParentTypes["TransactionsTotalize"],
> = ResolversObject<{
  percentageVariation?: Resolver<
    IResolversTypes["Float"],
    ParentType,
    ContextType
  >;
  total?: Resolver<IResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ITransactionsTotalsResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["TransactionsTotals"] = IResolversParentTypes["TransactionsTotals"],
> = ResolversObject<{
  balance?: Resolver<
    IResolversTypes["TransactionsTotalize"],
    ParentType,
    ContextType
  >;
  expense?: Resolver<
    IResolversTypes["TransactionsTotalize"],
    ParentType,
    ContextType
  >;
  revenue?: Resolver<
    IResolversTypes["TransactionsTotalize"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface IUrlScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["URL"], any> {
  name: "URL";
}

export interface IUsCurrencyScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["USCurrency"], any> {
  name: "USCurrency";
}

export interface IUuidScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["UUID"], any> {
  name: "UUID";
}

export interface IUnsignedFloatScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["UnsignedFloat"], any> {
  name: "UnsignedFloat";
}

export interface IUnsignedIntScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["UnsignedInt"], any> {
  name: "UnsignedInt";
}

export type IUserResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["User"] = IResolversParentTypes["User"],
> = ResolversObject<{
  _id?: Resolver<IResolversTypes["ObjectID"], ParentType, ContextType>;
  email?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface IUtcOffsetScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["UtcOffset"], any> {
  name: "UtcOffset";
}

export type IViewerResolvers<
  ContextType = TGraphQLContext,
  ParentType extends
    IResolversParentTypes["Viewer"] = IResolversParentTypes["Viewer"],
> = ResolversObject<{
  _id?: Resolver<IResolversTypes["ObjectID"], ParentType, ContextType>;
  email?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface IVoidScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["Void"], any> {
  name: "Void";
}

export type IResolvers<ContextType = TGraphQLContext> = ResolversObject<{
  AccountNumber?: GraphQLScalarType;
  AuthenticatedUser?: IAuthenticatedUserResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Byte?: GraphQLScalarType;
  CountryCode?: GraphQLScalarType;
  CreditCard?: ICreditCardResolvers<ContextType>;
  Currency?: GraphQLScalarType;
  Cursor?: GraphQLScalarType;
  DID?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Duration?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  GUID?: GraphQLScalarType;
  HSL?: GraphQLScalarType;
  HSLA?: GraphQLScalarType;
  HexColorCode?: GraphQLScalarType;
  Hexadecimal?: GraphQLScalarType;
  IBAN?: GraphQLScalarType;
  IPv4?: GraphQLScalarType;
  IPv6?: GraphQLScalarType;
  ISBN?: GraphQLScalarType;
  ISO8601Duration?: GraphQLScalarType;
  IconProperties?: IIconPropertiesResolvers<ContextType>;
  Installments?: IInstallmentsResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  JWT?: GraphQLScalarType;
  Latitude?: GraphQLScalarType;
  LocalDate?: GraphQLScalarType;
  LocalEndTime?: GraphQLScalarType;
  LocalTime?: GraphQLScalarType;
  Locale?: GraphQLScalarType;
  Long?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  MAC?: GraphQLScalarType;
  Mutation?: IMutationResolvers<ContextType>;
  NegativeFloat?: GraphQLScalarType;
  NegativeInt?: GraphQLScalarType;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeFloat?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveFloat?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  ObjectID?: GraphQLScalarType;
  ObjectKeyValue?: IObjectKeyValueResolvers<ContextType>;
  PageInfo?: IPageInfoResolvers<ContextType>;
  PhoneNumber?: GraphQLScalarType;
  Port?: GraphQLScalarType;
  PositiveFloat?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  PostalCode?: GraphQLScalarType;
  Query?: IQueryResolvers<ContextType>;
  RGB?: GraphQLScalarType;
  RGBA?: GraphQLScalarType;
  RoutingNumber?: GraphQLScalarType;
  SafeInt?: GraphQLScalarType;
  Time?: GraphQLScalarType;
  TimeZone?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  Transaction?: ITransactionResolvers<ContextType>;
  TransactionCategory?: ITransactionCategoryResolvers<ContextType>;
  TransactionDetailsPagination?: ITransactionDetailsPaginationResolvers<ContextType>;
  TransactionGroup?: ITransactionGroupResolvers<ContextType>;
  TransactionGrouped?: ITransactionGroupedResolvers<ContextType>;
  TransactionGroupedDetailsPagination?: ITransactionGroupedDetailsPaginationResolvers<ContextType>;
  TransactionsByCategoryChart?: ITransactionsByCategoryChartResolvers<ContextType>;
  TransactionsCardCategorySpending?: ITransactionsCardCategorySpendingResolvers<ContextType>;
  TransactionsChart?: ITransactionsChartResolvers<ContextType>;
  TransactionsGroupedByCategoryPagination?: ITransactionsGroupedByCategoryPaginationResolvers<ContextType>;
  TransactionsTotalize?: ITransactionsTotalizeResolvers<ContextType>;
  TransactionsTotals?: ITransactionsTotalsResolvers<ContextType>;
  URL?: GraphQLScalarType;
  USCurrency?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  UnsignedFloat?: GraphQLScalarType;
  UnsignedInt?: GraphQLScalarType;
  User?: IUserResolvers<ContextType>;
  UtcOffset?: GraphQLScalarType;
  Viewer?: IViewerResolvers<ContextType>;
  Void?: GraphQLScalarType;
}>;

export type IDirectiveResolvers<ContextType = TGraphQLContext> =
  ResolversObject<{
    cacheControl?: ICacheControlDirectiveResolver<any, any, ContextType>;
  }>;
