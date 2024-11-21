/**
 * This should be for general utilities that might be useful anywhere in the project,
 * from running command lines to camelCase conversion of strings and etc
 */
import * as color from "picocolors";
const { exec } = require("child_process");
import { spinner } from "@clack/prompts";

interface CommandResult {
  stdout: string;
  stderr: string;
}

export const checkMark = `${color.bold(color.green("✔ "))}`;
export const xMark = `${color.bold(color.red("✗ "))}`;
export const loader = spinner();

/**
 * Async func to allow terminal commands to be run programmatically
 * @param command Terminal command string
 * @returns stdout and stderr of terminal command
 */
export async function runCommand(command: string): Promise<CommandResult> {
  return new Promise((resolve, reject) => {
    exec(command, (error: Error | null, stdout: string, stderr: string) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

/**
 * Async timeout function to simulate waiting specified amounts of time
 * @param ms Amount of time to wait
 * @param asSeconds Whether to convert `ms` argument to seconds
 * @returns true after the set amount of time
 */
export async function sleep(ms = 5000, asSeconds = false): Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve(true);
      },
      asSeconds ? ms * 1000 : ms
    );
  });
}

/**
 * Deep merge two objects as a more comprehensive version of Object.assign()
 * @param target
 * @param ...sources
 */
export function mergeDeep(target: any, ...sources: any) {
  function isObject(item: any) {
    return item && typeof item === "object" && !Array.isArray(item);
  }
  if (!sources.length) return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else Object.assign(target, { [key]: source[key] });
    }
  }

  return mergeDeep(target, ...sources);
}

export function randomNumberBetween(min: number, max?: number): number {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }
  return ~~(Math.random() * ((max || 0) - min + 1)) + min;
}

export function randomRoll(min: number, max?: number, omit?: number[]): number {
  let roll = randomNumberBetween(min, max);
  return omit && omit.length
    ? omit.includes(roll)
      ? randomRoll(min, max, omit)
      : roll
    : roll;
}
