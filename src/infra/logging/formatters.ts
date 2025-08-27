/* eslint-disable no-param-reassign */
import winston from "winston";

export const formatUppercaseLevel = winston.format((info) => {
  info.level = info.level.toUpperCase();
  return info;
});
