import * as winston from "winston";
import { transports, format } from "winston";
import dotenv from "dotenv";
import DailyRotateFile from "winston-daily-rotate-file";

dotenv.config({ path: "./env/.env" });

const customColors = {
  info: "green",
  warn: "yellow",
  error: "red",
};

winston.addColors(customColors);

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} - ${level} : ${message}`;
});

/**
 * This function is aimed to create the logger
 */
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(winston.format.timestamp(), customFormat),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true, colors: customColors }), // Enable colorizing for the console
        customFormat // Apply the custom format
      ),
    }),
    new DailyRotateFile({
      filename: "./logs/%DATE%-automation.log",
      level: "info",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "10d",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `[${info.timestamp}] -[${info.level}]: ${info.message}`
        )
      ),
    }),
  ],
});
