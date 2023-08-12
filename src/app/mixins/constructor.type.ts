/**
 * Represents a generic constructor function type.
 *
 * This type can be used to describe a class or function that can be instantiated
 * with the `new` keyword.
 *
 */
export type GConstructor<T> = new (...args: any[]) => T;
/**
 * Represents a generic abstract constructor function type.
 *
 * This type can be used to describe an abstract class. It can't be instantiated
 * directly, but can be used for type constraints and inheritance.
 */
export type AGConstructor<T = object> = abstract new (...args: any[]) => T;
