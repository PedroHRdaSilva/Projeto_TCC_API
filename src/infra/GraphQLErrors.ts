/* eslint-disable max-classes-per-file */
import type { GraphQLFormattedError } from "graphql";
import { GraphQLError } from "graphql";

export class UnauthenticatedError extends GraphQLError {
  constructor(
    message = "You provided an invalid or expired token",
    extensions: Record<string, any> = {}
  ) {
    super(message, {
      extensions: {
        code: "UNAUTHENTICATED",
        ...extensions,
      },
    });
    Object.defineProperty(this, "name", {
      value: "UnauthenticatedError",
    });
  }

  public static is(candidate?: GraphQLFormattedError) {
    return (
      candidate?.extensions?.code === "UNAUTHENTICATED" ||
      candidate?.message === "You provided an invalid or expired token"
    );
  }
}

export class ForbiddenError extends GraphQLError {
  constructor(
    message = "You are not authorized to perform this action",
    extensions: Record<string, any> = {}
  ) {
    super(message, {
      extensions: {
        code: "FORBIDDEN",
        ...extensions,
      },
    });
    Object.defineProperty(this, "name", {
      value: "ForbiddenError",
    });
  }

  public static is(candidate?: GraphQLFormattedError) {
    return (
      candidate?.extensions?.code === "FORBIDDEN" ||
      candidate?.message === "You are not authorized to perform this action"
    );
  }
}

export class ValidationError extends GraphQLError {
  constructor(
    message = "Validation error",
    extensions: Record<string, any> = {}
  ) {
    super(message, {
      extensions: {
        code: "VALIDATION_ERROR",
        ...extensions,
      },
    });
    Object.defineProperty(this, "name", {
      value: "ValidationError",
    });
  }

  public static is(candidate?: GraphQLFormattedError) {
    return candidate?.extensions?.code === "VALIDATION_ERROR";
  }
}

export class ConflictError extends GraphQLError {
  constructor(
    message = "Conflict error",
    extensions: Record<string, any> = {}
  ) {
    super(message, {
      extensions: {
        code: "CONFLICT_ERROR",
        ...extensions,
      },
    });

    Object.defineProperty(this, "name", {
      value: "ConflictError",
    });
  }

  public static is(candidate?: Partial<GraphQLFormattedError>): boolean {
    return candidate?.extensions?.code === "CONFLICT_ERROR";
  }
}

export class NotFoundError extends GraphQLError {
  constructor(
    message = "Not Found error",
    extensions: Record<string, any> = {}
  ) {
    super(message, {
      extensions: {
        code: "NOT_FOUND_ERROR",
        ...extensions,
      },
    });

    Object.defineProperty(this, "name", {
      value: "NotFoundError",
    });
  }

  public static is(candidate?: Partial<GraphQLFormattedError>): boolean {
    return candidate?.extensions?.code === "NotFoundError";
  }
}

export class UserNotInGroupError extends GraphQLError {
  static ERROR_CODE = "USER_NOT_IN_GROUP";

  constructor(
    message = "User is not a participant of the group",
    details: Record<string, any> = {}
  ) {
    super(message, {
      extensions: {
        code: UserNotInGroupError.ERROR_CODE,
        ...details,
      },
    });

    Object.defineProperty(this, "name", {
      value: "UserNotInGroupError",
    });
  }

  public static isUserNotInGroupError(
    candidate?: Partial<GraphQLFormattedError>
  ): boolean {
    return candidate?.extensions?.code === UserNotInGroupError.ERROR_CODE;
  }
}

export class UserIsNotOwnerError extends GraphQLError {
  static ERROR_CODE = "USER_IS_NOT_OWNER";

  constructor(
    message = "User is not the owner of the group",
    details: Record<string, any> = {}
  ) {
    super(message, {
      extensions: {
        code: UserIsNotOwnerError.ERROR_CODE,
        ...details,
      },
    });

    Object.defineProperty(this, "name", {
      value: "UserIsNotOwnerError",
    });
  }

  public static isUserIsNotOwnerError(
    candidate?: Partial<GraphQLFormattedError>
  ): boolean {
    return candidate?.extensions?.code === UserIsNotOwnerError.ERROR_CODE;
  }
}
export class UserNotFoundError extends GraphQLError {
  static ERROR_CODE = "USER_NOT_FOUND";

  constructor(message = "User not found", details: Record<string, any> = {}) {
    super(message, {
      extensions: {
        code: UserNotFoundError.ERROR_CODE,
        ...details,
      },
    });

    Object.defineProperty(this, "name", {
      value: "UserNotFoundError",
    });
  }
}
