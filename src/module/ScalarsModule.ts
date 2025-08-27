import gql from "graphql-tag";
import { resolvers as scalarResolvers } from "graphql-scalars";
import ObjectIDScalar from "~/graphql/scalars/ObjectIDScalar";
import CursorScalar from "~/graphql/scalars/CursorScalar";

export default {
  typeDefs: gql`
    scalar Cursor

    scalar BigInt
    scalar Byte
    scalar Date
    scalar Time
    scalar Timestamp
    scalar TimeZone
    scalar DateTime
    scalar UtcOffset
    scalar Duration
    scalar ISO8601Duration
    scalar LocalDate
    scalar LocalTime
    scalar LocalEndTime
    scalar EmailAddress
    scalar UUID
    scalar Hexadecimal
    scalar HexColorCode
    scalar HSL
    scalar HSLA
    scalar IBAN
    scalar IPv4
    scalar IPv6
    scalar ISBN
    scalar JWT
    scalar Latitude
    scalar Longitude
    scalar JSON
    scalar JSONObject
    scalar MAC
    scalar NegativeFloat
    scalar NegativeInt
    scalar NonEmptyString
    scalar NonNegativeFloat
    scalar NonNegativeInt
    scalar NonPositiveFloat
    scalar NonPositiveInt
    scalar PhoneNumber
    scalar Port
    scalar PositiveFloat
    scalar PositiveInt
    scalar PostalCode
    scalar RGB
    scalar RGBA
    scalar SafeInt
    scalar URL
    scalar USCurrency
    scalar Currency
    scalar RoutingNumber
    scalar AccountNumber
    scalar UnsignedFloat
    scalar UnsignedInt
    scalar GUID
    scalar Long
    scalar ObjectID
    scalar Void
    scalar DID
    scalar CountryCode
    scalar Locale

    enum CacheControlScope {
      PUBLIC
      PRIVATE
    }

    directive @cacheControl(
      maxAge: Int
      scope: CacheControlScope
      inheritMaxAge: Boolean
    ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
  `,
  resolvers: {
    ...scalarResolvers,
    ObjectID: ObjectIDScalar,
    Cursor: CursorScalar,
  },
};
