
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model cursos
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type cursos = $Result.DefaultSelection<Prisma.$cursosPayload>
/**
 * Model usuarios
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type usuarios = $Result.DefaultSelection<Prisma.$usuariosPayload>
/**
 * Model times
 * 
 */
export type times = $Result.DefaultSelection<Prisma.$timesPayload>
/**
 * Model membros_time
 * 
 */
export type membros_time = $Result.DefaultSelection<Prisma.$membros_timePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const tipo_funcao: {
  capitao: 'capitao',
  jogador: 'jogador',
  reserva: 'reserva'
};

export type tipo_funcao = (typeof tipo_funcao)[keyof typeof tipo_funcao]


export const tipo_usuario: {
  aluno: 'aluno',
  professor: 'professor',
  coordenador: 'coordenador',
  diretor: 'diretor',
  visitante: 'visitante'
};

export type tipo_usuario = (typeof tipo_usuario)[keyof typeof tipo_usuario]


export const tipo_modalidade: {
  Futebol: 'Futebol',
  V_lei: 'V_lei',
  Basquete: 'Basquete',
  Nata__o: 'Nata__o'
};

export type tipo_modalidade = (typeof tipo_modalidade)[keyof typeof tipo_modalidade]

}

export type tipo_funcao = $Enums.tipo_funcao

export const tipo_funcao: typeof $Enums.tipo_funcao

export type tipo_usuario = $Enums.tipo_usuario

export const tipo_usuario: typeof $Enums.tipo_usuario

export type tipo_modalidade = $Enums.tipo_modalidade

export const tipo_modalidade: typeof $Enums.tipo_modalidade

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Cursos
 * const cursos = await prisma.cursos.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Cursos
   * const cursos = await prisma.cursos.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.cursos`: Exposes CRUD operations for the **cursos** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cursos
    * const cursos = await prisma.cursos.findMany()
    * ```
    */
  get cursos(): Prisma.cursosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usuarios`: Exposes CRUD operations for the **usuarios** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuarios.findMany()
    * ```
    */
  get usuarios(): Prisma.usuariosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.times`: Exposes CRUD operations for the **times** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Times
    * const times = await prisma.times.findMany()
    * ```
    */
  get times(): Prisma.timesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.membros_time`: Exposes CRUD operations for the **membros_time** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Membros_times
    * const membros_times = await prisma.membros_time.findMany()
    * ```
    */
  get membros_time(): Prisma.membros_timeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    cursos: 'cursos',
    usuarios: 'usuarios',
    times: 'times',
    membros_time: 'membros_time'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "cursos" | "usuarios" | "times" | "membros_time"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      cursos: {
        payload: Prisma.$cursosPayload<ExtArgs>
        fields: Prisma.cursosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.cursosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cursosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.cursosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cursosPayload>
          }
          findFirst: {
            args: Prisma.cursosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cursosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.cursosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cursosPayload>
          }
          findMany: {
            args: Prisma.cursosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cursosPayload>[]
          }
          create: {
            args: Prisma.cursosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cursosPayload>
          }
          createMany: {
            args: Prisma.cursosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.cursosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cursosPayload>[]
          }
          delete: {
            args: Prisma.cursosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cursosPayload>
          }
          update: {
            args: Prisma.cursosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cursosPayload>
          }
          deleteMany: {
            args: Prisma.cursosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.cursosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.cursosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cursosPayload>[]
          }
          upsert: {
            args: Prisma.cursosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cursosPayload>
          }
          aggregate: {
            args: Prisma.CursosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCursos>
          }
          groupBy: {
            args: Prisma.cursosGroupByArgs<ExtArgs>
            result: $Utils.Optional<CursosGroupByOutputType>[]
          }
          count: {
            args: Prisma.cursosCountArgs<ExtArgs>
            result: $Utils.Optional<CursosCountAggregateOutputType> | number
          }
        }
      }
      usuarios: {
        payload: Prisma.$usuariosPayload<ExtArgs>
        fields: Prisma.usuariosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usuariosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usuariosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          findFirst: {
            args: Prisma.usuariosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usuariosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          findMany: {
            args: Prisma.usuariosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>[]
          }
          create: {
            args: Prisma.usuariosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          createMany: {
            args: Prisma.usuariosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usuariosCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>[]
          }
          delete: {
            args: Prisma.usuariosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          update: {
            args: Prisma.usuariosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          deleteMany: {
            args: Prisma.usuariosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usuariosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usuariosUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>[]
          }
          upsert: {
            args: Prisma.usuariosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuariosPayload>
          }
          aggregate: {
            args: Prisma.UsuariosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuarios>
          }
          groupBy: {
            args: Prisma.usuariosGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuariosGroupByOutputType>[]
          }
          count: {
            args: Prisma.usuariosCountArgs<ExtArgs>
            result: $Utils.Optional<UsuariosCountAggregateOutputType> | number
          }
        }
      }
      times: {
        payload: Prisma.$timesPayload<ExtArgs>
        fields: Prisma.timesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.timesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$timesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.timesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$timesPayload>
          }
          findFirst: {
            args: Prisma.timesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$timesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.timesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$timesPayload>
          }
          findMany: {
            args: Prisma.timesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$timesPayload>[]
          }
          create: {
            args: Prisma.timesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$timesPayload>
          }
          createMany: {
            args: Prisma.timesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.timesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$timesPayload>[]
          }
          delete: {
            args: Prisma.timesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$timesPayload>
          }
          update: {
            args: Prisma.timesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$timesPayload>
          }
          deleteMany: {
            args: Prisma.timesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.timesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.timesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$timesPayload>[]
          }
          upsert: {
            args: Prisma.timesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$timesPayload>
          }
          aggregate: {
            args: Prisma.TimesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimes>
          }
          groupBy: {
            args: Prisma.timesGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimesGroupByOutputType>[]
          }
          count: {
            args: Prisma.timesCountArgs<ExtArgs>
            result: $Utils.Optional<TimesCountAggregateOutputType> | number
          }
        }
      }
      membros_time: {
        payload: Prisma.$membros_timePayload<ExtArgs>
        fields: Prisma.membros_timeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.membros_timeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$membros_timePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.membros_timeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$membros_timePayload>
          }
          findFirst: {
            args: Prisma.membros_timeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$membros_timePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.membros_timeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$membros_timePayload>
          }
          findMany: {
            args: Prisma.membros_timeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$membros_timePayload>[]
          }
          create: {
            args: Prisma.membros_timeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$membros_timePayload>
          }
          createMany: {
            args: Prisma.membros_timeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.membros_timeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$membros_timePayload>[]
          }
          delete: {
            args: Prisma.membros_timeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$membros_timePayload>
          }
          update: {
            args: Prisma.membros_timeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$membros_timePayload>
          }
          deleteMany: {
            args: Prisma.membros_timeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.membros_timeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.membros_timeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$membros_timePayload>[]
          }
          upsert: {
            args: Prisma.membros_timeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$membros_timePayload>
          }
          aggregate: {
            args: Prisma.Membros_timeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMembros_time>
          }
          groupBy: {
            args: Prisma.membros_timeGroupByArgs<ExtArgs>
            result: $Utils.Optional<Membros_timeGroupByOutputType>[]
          }
          count: {
            args: Prisma.membros_timeCountArgs<ExtArgs>
            result: $Utils.Optional<Membros_timeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    cursos?: cursosOmit
    usuarios?: usuariosOmit
    times?: timesOmit
    membros_time?: membros_timeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CursosCountOutputType
   */

  export type CursosCountOutputType = {
    usuarios: number
  }

  export type CursosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarios?: boolean | CursosCountOutputTypeCountUsuariosArgs
  }

  // Custom InputTypes
  /**
   * CursosCountOutputType without action
   */
  export type CursosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CursosCountOutputType
     */
    select?: CursosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CursosCountOutputType without action
   */
  export type CursosCountOutputTypeCountUsuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usuariosWhereInput
  }


  /**
   * Count Type UsuariosCountOutputType
   */

  export type UsuariosCountOutputType = {
    membros_time: number
  }

  export type UsuariosCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    membros_time?: boolean | UsuariosCountOutputTypeCountMembros_timeArgs
  }

  // Custom InputTypes
  /**
   * UsuariosCountOutputType without action
   */
  export type UsuariosCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuariosCountOutputType
     */
    select?: UsuariosCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuariosCountOutputType without action
   */
  export type UsuariosCountOutputTypeCountMembros_timeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: membros_timeWhereInput
  }


  /**
   * Count Type TimesCountOutputType
   */

  export type TimesCountOutputType = {
    membros_time: number
  }

  export type TimesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    membros_time?: boolean | TimesCountOutputTypeCountMembros_timeArgs
  }

  // Custom InputTypes
  /**
   * TimesCountOutputType without action
   */
  export type TimesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TimesCountOutputType
     */
    select?: TimesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TimesCountOutputType without action
   */
  export type TimesCountOutputTypeCountMembros_timeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: membros_timeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model cursos
   */

  export type AggregateCursos = {
    _count: CursosCountAggregateOutputType | null
    _avg: CursosAvgAggregateOutputType | null
    _sum: CursosSumAggregateOutputType | null
    _min: CursosMinAggregateOutputType | null
    _max: CursosMaxAggregateOutputType | null
  }

  export type CursosAvgAggregateOutputType = {
    id: number | null
    ano: number | null
    periodo: number | null
  }

  export type CursosSumAggregateOutputType = {
    id: number | null
    ano: number | null
    periodo: number | null
  }

  export type CursosMinAggregateOutputType = {
    id: number | null
    sigla: string | null
    ano: number | null
    nome: string | null
    periodo: number | null
  }

  export type CursosMaxAggregateOutputType = {
    id: number | null
    sigla: string | null
    ano: number | null
    nome: string | null
    periodo: number | null
  }

  export type CursosCountAggregateOutputType = {
    id: number
    sigla: number
    ano: number
    nome: number
    periodo: number
    _all: number
  }


  export type CursosAvgAggregateInputType = {
    id?: true
    ano?: true
    periodo?: true
  }

  export type CursosSumAggregateInputType = {
    id?: true
    ano?: true
    periodo?: true
  }

  export type CursosMinAggregateInputType = {
    id?: true
    sigla?: true
    ano?: true
    nome?: true
    periodo?: true
  }

  export type CursosMaxAggregateInputType = {
    id?: true
    sigla?: true
    ano?: true
    nome?: true
    periodo?: true
  }

  export type CursosCountAggregateInputType = {
    id?: true
    sigla?: true
    ano?: true
    nome?: true
    periodo?: true
    _all?: true
  }

  export type CursosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cursos to aggregate.
     */
    where?: cursosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cursos to fetch.
     */
    orderBy?: cursosOrderByWithRelationInput | cursosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: cursosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cursos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cursos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned cursos
    **/
    _count?: true | CursosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CursosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CursosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CursosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CursosMaxAggregateInputType
  }

  export type GetCursosAggregateType<T extends CursosAggregateArgs> = {
        [P in keyof T & keyof AggregateCursos]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCursos[P]>
      : GetScalarType<T[P], AggregateCursos[P]>
  }




  export type cursosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cursosWhereInput
    orderBy?: cursosOrderByWithAggregationInput | cursosOrderByWithAggregationInput[]
    by: CursosScalarFieldEnum[] | CursosScalarFieldEnum
    having?: cursosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CursosCountAggregateInputType | true
    _avg?: CursosAvgAggregateInputType
    _sum?: CursosSumAggregateInputType
    _min?: CursosMinAggregateInputType
    _max?: CursosMaxAggregateInputType
  }

  export type CursosGroupByOutputType = {
    id: number
    sigla: string
    ano: number
    nome: string
    periodo: number
    _count: CursosCountAggregateOutputType | null
    _avg: CursosAvgAggregateOutputType | null
    _sum: CursosSumAggregateOutputType | null
    _min: CursosMinAggregateOutputType | null
    _max: CursosMaxAggregateOutputType | null
  }

  type GetCursosGroupByPayload<T extends cursosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CursosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CursosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CursosGroupByOutputType[P]>
            : GetScalarType<T[P], CursosGroupByOutputType[P]>
        }
      >
    >


  export type cursosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sigla?: boolean
    ano?: boolean
    nome?: boolean
    periodo?: boolean
    usuarios?: boolean | cursos$usuariosArgs<ExtArgs>
    _count?: boolean | CursosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cursos"]>

  export type cursosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sigla?: boolean
    ano?: boolean
    nome?: boolean
    periodo?: boolean
  }, ExtArgs["result"]["cursos"]>

  export type cursosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sigla?: boolean
    ano?: boolean
    nome?: boolean
    periodo?: boolean
  }, ExtArgs["result"]["cursos"]>

  export type cursosSelectScalar = {
    id?: boolean
    sigla?: boolean
    ano?: boolean
    nome?: boolean
    periodo?: boolean
  }

  export type cursosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sigla" | "ano" | "nome" | "periodo", ExtArgs["result"]["cursos"]>
  export type cursosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarios?: boolean | cursos$usuariosArgs<ExtArgs>
    _count?: boolean | CursosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type cursosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type cursosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $cursosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "cursos"
    objects: {
      usuarios: Prisma.$usuariosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      sigla: string
      ano: number
      nome: string
      periodo: number
    }, ExtArgs["result"]["cursos"]>
    composites: {}
  }

  type cursosGetPayload<S extends boolean | null | undefined | cursosDefaultArgs> = $Result.GetResult<Prisma.$cursosPayload, S>

  type cursosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<cursosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CursosCountAggregateInputType | true
    }

  export interface cursosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['cursos'], meta: { name: 'cursos' } }
    /**
     * Find zero or one Cursos that matches the filter.
     * @param {cursosFindUniqueArgs} args - Arguments to find a Cursos
     * @example
     * // Get one Cursos
     * const cursos = await prisma.cursos.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends cursosFindUniqueArgs>(args: SelectSubset<T, cursosFindUniqueArgs<ExtArgs>>): Prisma__cursosClient<$Result.GetResult<Prisma.$cursosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cursos that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {cursosFindUniqueOrThrowArgs} args - Arguments to find a Cursos
     * @example
     * // Get one Cursos
     * const cursos = await prisma.cursos.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends cursosFindUniqueOrThrowArgs>(args: SelectSubset<T, cursosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__cursosClient<$Result.GetResult<Prisma.$cursosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cursos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cursosFindFirstArgs} args - Arguments to find a Cursos
     * @example
     * // Get one Cursos
     * const cursos = await prisma.cursos.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends cursosFindFirstArgs>(args?: SelectSubset<T, cursosFindFirstArgs<ExtArgs>>): Prisma__cursosClient<$Result.GetResult<Prisma.$cursosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cursos that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cursosFindFirstOrThrowArgs} args - Arguments to find a Cursos
     * @example
     * // Get one Cursos
     * const cursos = await prisma.cursos.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends cursosFindFirstOrThrowArgs>(args?: SelectSubset<T, cursosFindFirstOrThrowArgs<ExtArgs>>): Prisma__cursosClient<$Result.GetResult<Prisma.$cursosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cursos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cursosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cursos
     * const cursos = await prisma.cursos.findMany()
     * 
     * // Get first 10 Cursos
     * const cursos = await prisma.cursos.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cursosWithIdOnly = await prisma.cursos.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends cursosFindManyArgs>(args?: SelectSubset<T, cursosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cursosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cursos.
     * @param {cursosCreateArgs} args - Arguments to create a Cursos.
     * @example
     * // Create one Cursos
     * const Cursos = await prisma.cursos.create({
     *   data: {
     *     // ... data to create a Cursos
     *   }
     * })
     * 
     */
    create<T extends cursosCreateArgs>(args: SelectSubset<T, cursosCreateArgs<ExtArgs>>): Prisma__cursosClient<$Result.GetResult<Prisma.$cursosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cursos.
     * @param {cursosCreateManyArgs} args - Arguments to create many Cursos.
     * @example
     * // Create many Cursos
     * const cursos = await prisma.cursos.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends cursosCreateManyArgs>(args?: SelectSubset<T, cursosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cursos and returns the data saved in the database.
     * @param {cursosCreateManyAndReturnArgs} args - Arguments to create many Cursos.
     * @example
     * // Create many Cursos
     * const cursos = await prisma.cursos.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cursos and only return the `id`
     * const cursosWithIdOnly = await prisma.cursos.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends cursosCreateManyAndReturnArgs>(args?: SelectSubset<T, cursosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cursosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cursos.
     * @param {cursosDeleteArgs} args - Arguments to delete one Cursos.
     * @example
     * // Delete one Cursos
     * const Cursos = await prisma.cursos.delete({
     *   where: {
     *     // ... filter to delete one Cursos
     *   }
     * })
     * 
     */
    delete<T extends cursosDeleteArgs>(args: SelectSubset<T, cursosDeleteArgs<ExtArgs>>): Prisma__cursosClient<$Result.GetResult<Prisma.$cursosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cursos.
     * @param {cursosUpdateArgs} args - Arguments to update one Cursos.
     * @example
     * // Update one Cursos
     * const cursos = await prisma.cursos.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends cursosUpdateArgs>(args: SelectSubset<T, cursosUpdateArgs<ExtArgs>>): Prisma__cursosClient<$Result.GetResult<Prisma.$cursosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cursos.
     * @param {cursosDeleteManyArgs} args - Arguments to filter Cursos to delete.
     * @example
     * // Delete a few Cursos
     * const { count } = await prisma.cursos.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends cursosDeleteManyArgs>(args?: SelectSubset<T, cursosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cursos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cursosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cursos
     * const cursos = await prisma.cursos.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends cursosUpdateManyArgs>(args: SelectSubset<T, cursosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cursos and returns the data updated in the database.
     * @param {cursosUpdateManyAndReturnArgs} args - Arguments to update many Cursos.
     * @example
     * // Update many Cursos
     * const cursos = await prisma.cursos.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cursos and only return the `id`
     * const cursosWithIdOnly = await prisma.cursos.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends cursosUpdateManyAndReturnArgs>(args: SelectSubset<T, cursosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cursosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cursos.
     * @param {cursosUpsertArgs} args - Arguments to update or create a Cursos.
     * @example
     * // Update or create a Cursos
     * const cursos = await prisma.cursos.upsert({
     *   create: {
     *     // ... data to create a Cursos
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cursos we want to update
     *   }
     * })
     */
    upsert<T extends cursosUpsertArgs>(args: SelectSubset<T, cursosUpsertArgs<ExtArgs>>): Prisma__cursosClient<$Result.GetResult<Prisma.$cursosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cursos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cursosCountArgs} args - Arguments to filter Cursos to count.
     * @example
     * // Count the number of Cursos
     * const count = await prisma.cursos.count({
     *   where: {
     *     // ... the filter for the Cursos we want to count
     *   }
     * })
    **/
    count<T extends cursosCountArgs>(
      args?: Subset<T, cursosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CursosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cursos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CursosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CursosAggregateArgs>(args: Subset<T, CursosAggregateArgs>): Prisma.PrismaPromise<GetCursosAggregateType<T>>

    /**
     * Group by Cursos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cursosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends cursosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: cursosGroupByArgs['orderBy'] }
        : { orderBy?: cursosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, cursosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCursosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the cursos model
   */
  readonly fields: cursosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for cursos.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__cursosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuarios<T extends cursos$usuariosArgs<ExtArgs> = {}>(args?: Subset<T, cursos$usuariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the cursos model
   */
  interface cursosFieldRefs {
    readonly id: FieldRef<"cursos", 'Int'>
    readonly sigla: FieldRef<"cursos", 'String'>
    readonly ano: FieldRef<"cursos", 'Int'>
    readonly nome: FieldRef<"cursos", 'String'>
    readonly periodo: FieldRef<"cursos", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * cursos findUnique
   */
  export type cursosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cursos
     */
    select?: cursosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cursos
     */
    omit?: cursosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cursosInclude<ExtArgs> | null
    /**
     * Filter, which cursos to fetch.
     */
    where: cursosWhereUniqueInput
  }

  /**
   * cursos findUniqueOrThrow
   */
  export type cursosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cursos
     */
    select?: cursosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cursos
     */
    omit?: cursosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cursosInclude<ExtArgs> | null
    /**
     * Filter, which cursos to fetch.
     */
    where: cursosWhereUniqueInput
  }

  /**
   * cursos findFirst
   */
  export type cursosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cursos
     */
    select?: cursosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cursos
     */
    omit?: cursosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cursosInclude<ExtArgs> | null
    /**
     * Filter, which cursos to fetch.
     */
    where?: cursosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cursos to fetch.
     */
    orderBy?: cursosOrderByWithRelationInput | cursosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cursos.
     */
    cursor?: cursosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cursos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cursos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cursos.
     */
    distinct?: CursosScalarFieldEnum | CursosScalarFieldEnum[]
  }

  /**
   * cursos findFirstOrThrow
   */
  export type cursosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cursos
     */
    select?: cursosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cursos
     */
    omit?: cursosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cursosInclude<ExtArgs> | null
    /**
     * Filter, which cursos to fetch.
     */
    where?: cursosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cursos to fetch.
     */
    orderBy?: cursosOrderByWithRelationInput | cursosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cursos.
     */
    cursor?: cursosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cursos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cursos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cursos.
     */
    distinct?: CursosScalarFieldEnum | CursosScalarFieldEnum[]
  }

  /**
   * cursos findMany
   */
  export type cursosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cursos
     */
    select?: cursosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cursos
     */
    omit?: cursosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cursosInclude<ExtArgs> | null
    /**
     * Filter, which cursos to fetch.
     */
    where?: cursosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cursos to fetch.
     */
    orderBy?: cursosOrderByWithRelationInput | cursosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing cursos.
     */
    cursor?: cursosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cursos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cursos.
     */
    skip?: number
    distinct?: CursosScalarFieldEnum | CursosScalarFieldEnum[]
  }

  /**
   * cursos create
   */
  export type cursosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cursos
     */
    select?: cursosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cursos
     */
    omit?: cursosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cursosInclude<ExtArgs> | null
    /**
     * The data needed to create a cursos.
     */
    data: XOR<cursosCreateInput, cursosUncheckedCreateInput>
  }

  /**
   * cursos createMany
   */
  export type cursosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many cursos.
     */
    data: cursosCreateManyInput | cursosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * cursos createManyAndReturn
   */
  export type cursosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cursos
     */
    select?: cursosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cursos
     */
    omit?: cursosOmit<ExtArgs> | null
    /**
     * The data used to create many cursos.
     */
    data: cursosCreateManyInput | cursosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * cursos update
   */
  export type cursosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cursos
     */
    select?: cursosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cursos
     */
    omit?: cursosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cursosInclude<ExtArgs> | null
    /**
     * The data needed to update a cursos.
     */
    data: XOR<cursosUpdateInput, cursosUncheckedUpdateInput>
    /**
     * Choose, which cursos to update.
     */
    where: cursosWhereUniqueInput
  }

  /**
   * cursos updateMany
   */
  export type cursosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update cursos.
     */
    data: XOR<cursosUpdateManyMutationInput, cursosUncheckedUpdateManyInput>
    /**
     * Filter which cursos to update
     */
    where?: cursosWhereInput
    /**
     * Limit how many cursos to update.
     */
    limit?: number
  }

  /**
   * cursos updateManyAndReturn
   */
  export type cursosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cursos
     */
    select?: cursosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cursos
     */
    omit?: cursosOmit<ExtArgs> | null
    /**
     * The data used to update cursos.
     */
    data: XOR<cursosUpdateManyMutationInput, cursosUncheckedUpdateManyInput>
    /**
     * Filter which cursos to update
     */
    where?: cursosWhereInput
    /**
     * Limit how many cursos to update.
     */
    limit?: number
  }

  /**
   * cursos upsert
   */
  export type cursosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cursos
     */
    select?: cursosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cursos
     */
    omit?: cursosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cursosInclude<ExtArgs> | null
    /**
     * The filter to search for the cursos to update in case it exists.
     */
    where: cursosWhereUniqueInput
    /**
     * In case the cursos found by the `where` argument doesn't exist, create a new cursos with this data.
     */
    create: XOR<cursosCreateInput, cursosUncheckedCreateInput>
    /**
     * In case the cursos was found with the provided `where` argument, update it with this data.
     */
    update: XOR<cursosUpdateInput, cursosUncheckedUpdateInput>
  }

  /**
   * cursos delete
   */
  export type cursosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cursos
     */
    select?: cursosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cursos
     */
    omit?: cursosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cursosInclude<ExtArgs> | null
    /**
     * Filter which cursos to delete.
     */
    where: cursosWhereUniqueInput
  }

  /**
   * cursos deleteMany
   */
  export type cursosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cursos to delete
     */
    where?: cursosWhereInput
    /**
     * Limit how many cursos to delete.
     */
    limit?: number
  }

  /**
   * cursos.usuarios
   */
  export type cursos$usuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    where?: usuariosWhereInput
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    cursor?: usuariosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * cursos without action
   */
  export type cursosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cursos
     */
    select?: cursosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cursos
     */
    omit?: cursosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cursosInclude<ExtArgs> | null
  }


  /**
   * Model usuarios
   */

  export type AggregateUsuarios = {
    _count: UsuariosCountAggregateOutputType | null
    _avg: UsuariosAvgAggregateOutputType | null
    _sum: UsuariosSumAggregateOutputType | null
    _min: UsuariosMinAggregateOutputType | null
    _max: UsuariosMaxAggregateOutputType | null
  }

  export type UsuariosAvgAggregateOutputType = {
    id: number | null
    curso_id: number | null
    codigo_verificacao: number | null
    tentativas_login: number | null
  }

  export type UsuariosSumAggregateOutputType = {
    id: number | null
    curso_id: number | null
    codigo_verificacao: number | null
    tentativas_login: number | null
  }

  export type UsuariosMinAggregateOutputType = {
    id: number | null
    rm: string | null
    nome: string | null
    data_nascimento: Date | null
    curso_id: number | null
    email: string | null
    senha: string | null
    telefone: string | null
    foto_perfil: string | null
    criado_em: Date | null
    atualizado_em: Date | null
    codigo_verificacao: number | null
    codigo_gerado_em: Date | null
    tentativas_login: number | null
    tipo_usuario: $Enums.tipo_usuario | null
  }

  export type UsuariosMaxAggregateOutputType = {
    id: number | null
    rm: string | null
    nome: string | null
    data_nascimento: Date | null
    curso_id: number | null
    email: string | null
    senha: string | null
    telefone: string | null
    foto_perfil: string | null
    criado_em: Date | null
    atualizado_em: Date | null
    codigo_verificacao: number | null
    codigo_gerado_em: Date | null
    tentativas_login: number | null
    tipo_usuario: $Enums.tipo_usuario | null
  }

  export type UsuariosCountAggregateOutputType = {
    id: number
    rm: number
    nome: number
    data_nascimento: number
    curso_id: number
    email: number
    senha: number
    telefone: number
    foto_perfil: number
    criado_em: number
    atualizado_em: number
    codigo_verificacao: number
    codigo_gerado_em: number
    tentativas_login: number
    tipo_usuario: number
    modalidades: number
    _all: number
  }


  export type UsuariosAvgAggregateInputType = {
    id?: true
    curso_id?: true
    codigo_verificacao?: true
    tentativas_login?: true
  }

  export type UsuariosSumAggregateInputType = {
    id?: true
    curso_id?: true
    codigo_verificacao?: true
    tentativas_login?: true
  }

  export type UsuariosMinAggregateInputType = {
    id?: true
    rm?: true
    nome?: true
    data_nascimento?: true
    curso_id?: true
    email?: true
    senha?: true
    telefone?: true
    foto_perfil?: true
    criado_em?: true
    atualizado_em?: true
    codigo_verificacao?: true
    codigo_gerado_em?: true
    tentativas_login?: true
    tipo_usuario?: true
  }

  export type UsuariosMaxAggregateInputType = {
    id?: true
    rm?: true
    nome?: true
    data_nascimento?: true
    curso_id?: true
    email?: true
    senha?: true
    telefone?: true
    foto_perfil?: true
    criado_em?: true
    atualizado_em?: true
    codigo_verificacao?: true
    codigo_gerado_em?: true
    tentativas_login?: true
    tipo_usuario?: true
  }

  export type UsuariosCountAggregateInputType = {
    id?: true
    rm?: true
    nome?: true
    data_nascimento?: true
    curso_id?: true
    email?: true
    senha?: true
    telefone?: true
    foto_perfil?: true
    criado_em?: true
    atualizado_em?: true
    codigo_verificacao?: true
    codigo_gerado_em?: true
    tentativas_login?: true
    tipo_usuario?: true
    modalidades?: true
    _all?: true
  }

  export type UsuariosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which usuarios to aggregate.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned usuarios
    **/
    _count?: true | UsuariosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuariosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuariosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuariosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuariosMaxAggregateInputType
  }

  export type GetUsuariosAggregateType<T extends UsuariosAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuarios]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuarios[P]>
      : GetScalarType<T[P], AggregateUsuarios[P]>
  }




  export type usuariosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usuariosWhereInput
    orderBy?: usuariosOrderByWithAggregationInput | usuariosOrderByWithAggregationInput[]
    by: UsuariosScalarFieldEnum[] | UsuariosScalarFieldEnum
    having?: usuariosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuariosCountAggregateInputType | true
    _avg?: UsuariosAvgAggregateInputType
    _sum?: UsuariosSumAggregateInputType
    _min?: UsuariosMinAggregateInputType
    _max?: UsuariosMaxAggregateInputType
  }

  export type UsuariosGroupByOutputType = {
    id: number
    rm: string
    nome: string
    data_nascimento: Date | null
    curso_id: number | null
    email: string
    senha: string
    telefone: string
    foto_perfil: string | null
    criado_em: Date
    atualizado_em: Date
    codigo_verificacao: number | null
    codigo_gerado_em: Date | null
    tentativas_login: number
    tipo_usuario: $Enums.tipo_usuario
    modalidades: JsonValue | null
    _count: UsuariosCountAggregateOutputType | null
    _avg: UsuariosAvgAggregateOutputType | null
    _sum: UsuariosSumAggregateOutputType | null
    _min: UsuariosMinAggregateOutputType | null
    _max: UsuariosMaxAggregateOutputType | null
  }

  type GetUsuariosGroupByPayload<T extends usuariosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuariosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuariosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuariosGroupByOutputType[P]>
            : GetScalarType<T[P], UsuariosGroupByOutputType[P]>
        }
      >
    >


  export type usuariosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rm?: boolean
    nome?: boolean
    data_nascimento?: boolean
    curso_id?: boolean
    email?: boolean
    senha?: boolean
    telefone?: boolean
    foto_perfil?: boolean
    criado_em?: boolean
    atualizado_em?: boolean
    codigo_verificacao?: boolean
    codigo_gerado_em?: boolean
    tentativas_login?: boolean
    tipo_usuario?: boolean
    modalidades?: boolean
    membros_time?: boolean | usuarios$membros_timeArgs<ExtArgs>
    cursos?: boolean | usuarios$cursosArgs<ExtArgs>
    _count?: boolean | UsuariosCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuarios"]>

  export type usuariosSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rm?: boolean
    nome?: boolean
    data_nascimento?: boolean
    curso_id?: boolean
    email?: boolean
    senha?: boolean
    telefone?: boolean
    foto_perfil?: boolean
    criado_em?: boolean
    atualizado_em?: boolean
    codigo_verificacao?: boolean
    codigo_gerado_em?: boolean
    tentativas_login?: boolean
    tipo_usuario?: boolean
    modalidades?: boolean
    cursos?: boolean | usuarios$cursosArgs<ExtArgs>
  }, ExtArgs["result"]["usuarios"]>

  export type usuariosSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rm?: boolean
    nome?: boolean
    data_nascimento?: boolean
    curso_id?: boolean
    email?: boolean
    senha?: boolean
    telefone?: boolean
    foto_perfil?: boolean
    criado_em?: boolean
    atualizado_em?: boolean
    codigo_verificacao?: boolean
    codigo_gerado_em?: boolean
    tentativas_login?: boolean
    tipo_usuario?: boolean
    modalidades?: boolean
    cursos?: boolean | usuarios$cursosArgs<ExtArgs>
  }, ExtArgs["result"]["usuarios"]>

  export type usuariosSelectScalar = {
    id?: boolean
    rm?: boolean
    nome?: boolean
    data_nascimento?: boolean
    curso_id?: boolean
    email?: boolean
    senha?: boolean
    telefone?: boolean
    foto_perfil?: boolean
    criado_em?: boolean
    atualizado_em?: boolean
    codigo_verificacao?: boolean
    codigo_gerado_em?: boolean
    tentativas_login?: boolean
    tipo_usuario?: boolean
    modalidades?: boolean
  }

  export type usuariosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rm" | "nome" | "data_nascimento" | "curso_id" | "email" | "senha" | "telefone" | "foto_perfil" | "criado_em" | "atualizado_em" | "codigo_verificacao" | "codigo_gerado_em" | "tentativas_login" | "tipo_usuario" | "modalidades", ExtArgs["result"]["usuarios"]>
  export type usuariosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    membros_time?: boolean | usuarios$membros_timeArgs<ExtArgs>
    cursos?: boolean | usuarios$cursosArgs<ExtArgs>
    _count?: boolean | UsuariosCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usuariosIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cursos?: boolean | usuarios$cursosArgs<ExtArgs>
  }
  export type usuariosIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cursos?: boolean | usuarios$cursosArgs<ExtArgs>
  }

  export type $usuariosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "usuarios"
    objects: {
      membros_time: Prisma.$membros_timePayload<ExtArgs>[]
      cursos: Prisma.$cursosPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      rm: string
      nome: string
      data_nascimento: Date | null
      curso_id: number | null
      email: string
      senha: string
      telefone: string
      foto_perfil: string | null
      criado_em: Date
      atualizado_em: Date
      codigo_verificacao: number | null
      codigo_gerado_em: Date | null
      tentativas_login: number
      tipo_usuario: $Enums.tipo_usuario
      modalidades: Prisma.JsonValue | null
    }, ExtArgs["result"]["usuarios"]>
    composites: {}
  }

  type usuariosGetPayload<S extends boolean | null | undefined | usuariosDefaultArgs> = $Result.GetResult<Prisma.$usuariosPayload, S>

  type usuariosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usuariosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuariosCountAggregateInputType | true
    }

  export interface usuariosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['usuarios'], meta: { name: 'usuarios' } }
    /**
     * Find zero or one Usuarios that matches the filter.
     * @param {usuariosFindUniqueArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usuariosFindUniqueArgs>(args: SelectSubset<T, usuariosFindUniqueArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuarios that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usuariosFindUniqueOrThrowArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usuariosFindUniqueOrThrowArgs>(args: SelectSubset<T, usuariosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosFindFirstArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usuariosFindFirstArgs>(args?: SelectSubset<T, usuariosFindFirstArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuarios that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosFindFirstOrThrowArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usuariosFindFirstOrThrowArgs>(args?: SelectSubset<T, usuariosFindFirstOrThrowArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuarios.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuarios.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuariosWithIdOnly = await prisma.usuarios.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usuariosFindManyArgs>(args?: SelectSubset<T, usuariosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuarios.
     * @param {usuariosCreateArgs} args - Arguments to create a Usuarios.
     * @example
     * // Create one Usuarios
     * const Usuarios = await prisma.usuarios.create({
     *   data: {
     *     // ... data to create a Usuarios
     *   }
     * })
     * 
     */
    create<T extends usuariosCreateArgs>(args: SelectSubset<T, usuariosCreateArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {usuariosCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuarios = await prisma.usuarios.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usuariosCreateManyArgs>(args?: SelectSubset<T, usuariosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {usuariosCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuarios = await prisma.usuarios.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuariosWithIdOnly = await prisma.usuarios.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usuariosCreateManyAndReturnArgs>(args?: SelectSubset<T, usuariosCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuarios.
     * @param {usuariosDeleteArgs} args - Arguments to delete one Usuarios.
     * @example
     * // Delete one Usuarios
     * const Usuarios = await prisma.usuarios.delete({
     *   where: {
     *     // ... filter to delete one Usuarios
     *   }
     * })
     * 
     */
    delete<T extends usuariosDeleteArgs>(args: SelectSubset<T, usuariosDeleteArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuarios.
     * @param {usuariosUpdateArgs} args - Arguments to update one Usuarios.
     * @example
     * // Update one Usuarios
     * const usuarios = await prisma.usuarios.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usuariosUpdateArgs>(args: SelectSubset<T, usuariosUpdateArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {usuariosDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuarios.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usuariosDeleteManyArgs>(args?: SelectSubset<T, usuariosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuarios = await prisma.usuarios.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usuariosUpdateManyArgs>(args: SelectSubset<T, usuariosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {usuariosUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuarios = await prisma.usuarios.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuariosWithIdOnly = await prisma.usuarios.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usuariosUpdateManyAndReturnArgs>(args: SelectSubset<T, usuariosUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuarios.
     * @param {usuariosUpsertArgs} args - Arguments to update or create a Usuarios.
     * @example
     * // Update or create a Usuarios
     * const usuarios = await prisma.usuarios.upsert({
     *   create: {
     *     // ... data to create a Usuarios
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuarios we want to update
     *   }
     * })
     */
    upsert<T extends usuariosUpsertArgs>(args: SelectSubset<T, usuariosUpsertArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuarios.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends usuariosCountArgs>(
      args?: Subset<T, usuariosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuariosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuariosAggregateArgs>(args: Subset<T, UsuariosAggregateArgs>): Prisma.PrismaPromise<GetUsuariosAggregateType<T>>

    /**
     * Group by Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuariosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usuariosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usuariosGroupByArgs['orderBy'] }
        : { orderBy?: usuariosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usuariosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuariosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the usuarios model
   */
  readonly fields: usuariosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for usuarios.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usuariosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    membros_time<T extends usuarios$membros_timeArgs<ExtArgs> = {}>(args?: Subset<T, usuarios$membros_timeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$membros_timePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cursos<T extends usuarios$cursosArgs<ExtArgs> = {}>(args?: Subset<T, usuarios$cursosArgs<ExtArgs>>): Prisma__cursosClient<$Result.GetResult<Prisma.$cursosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the usuarios model
   */
  interface usuariosFieldRefs {
    readonly id: FieldRef<"usuarios", 'Int'>
    readonly rm: FieldRef<"usuarios", 'String'>
    readonly nome: FieldRef<"usuarios", 'String'>
    readonly data_nascimento: FieldRef<"usuarios", 'DateTime'>
    readonly curso_id: FieldRef<"usuarios", 'Int'>
    readonly email: FieldRef<"usuarios", 'String'>
    readonly senha: FieldRef<"usuarios", 'String'>
    readonly telefone: FieldRef<"usuarios", 'String'>
    readonly foto_perfil: FieldRef<"usuarios", 'String'>
    readonly criado_em: FieldRef<"usuarios", 'DateTime'>
    readonly atualizado_em: FieldRef<"usuarios", 'DateTime'>
    readonly codigo_verificacao: FieldRef<"usuarios", 'Int'>
    readonly codigo_gerado_em: FieldRef<"usuarios", 'DateTime'>
    readonly tentativas_login: FieldRef<"usuarios", 'Int'>
    readonly tipo_usuario: FieldRef<"usuarios", 'tipo_usuario'>
    readonly modalidades: FieldRef<"usuarios", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * usuarios findUnique
   */
  export type usuariosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios findUniqueOrThrow
   */
  export type usuariosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios findFirst
   */
  export type usuariosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for usuarios.
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of usuarios.
     */
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * usuarios findFirstOrThrow
   */
  export type usuariosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for usuarios.
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of usuarios.
     */
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * usuarios findMany
   */
  export type usuariosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where?: usuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuariosOrderByWithRelationInput | usuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing usuarios.
     */
    cursor?: usuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    distinct?: UsuariosScalarFieldEnum | UsuariosScalarFieldEnum[]
  }

  /**
   * usuarios create
   */
  export type usuariosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * The data needed to create a usuarios.
     */
    data: XOR<usuariosCreateInput, usuariosUncheckedCreateInput>
  }

  /**
   * usuarios createMany
   */
  export type usuariosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many usuarios.
     */
    data: usuariosCreateManyInput | usuariosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * usuarios createManyAndReturn
   */
  export type usuariosCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * The data used to create many usuarios.
     */
    data: usuariosCreateManyInput | usuariosCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * usuarios update
   */
  export type usuariosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * The data needed to update a usuarios.
     */
    data: XOR<usuariosUpdateInput, usuariosUncheckedUpdateInput>
    /**
     * Choose, which usuarios to update.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios updateMany
   */
  export type usuariosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update usuarios.
     */
    data: XOR<usuariosUpdateManyMutationInput, usuariosUncheckedUpdateManyInput>
    /**
     * Filter which usuarios to update
     */
    where?: usuariosWhereInput
    /**
     * Limit how many usuarios to update.
     */
    limit?: number
  }

  /**
   * usuarios updateManyAndReturn
   */
  export type usuariosUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * The data used to update usuarios.
     */
    data: XOR<usuariosUpdateManyMutationInput, usuariosUncheckedUpdateManyInput>
    /**
     * Filter which usuarios to update
     */
    where?: usuariosWhereInput
    /**
     * Limit how many usuarios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * usuarios upsert
   */
  export type usuariosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * The filter to search for the usuarios to update in case it exists.
     */
    where: usuariosWhereUniqueInput
    /**
     * In case the usuarios found by the `where` argument doesn't exist, create a new usuarios with this data.
     */
    create: XOR<usuariosCreateInput, usuariosUncheckedCreateInput>
    /**
     * In case the usuarios was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usuariosUpdateInput, usuariosUncheckedUpdateInput>
  }

  /**
   * usuarios delete
   */
  export type usuariosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
    /**
     * Filter which usuarios to delete.
     */
    where: usuariosWhereUniqueInput
  }

  /**
   * usuarios deleteMany
   */
  export type usuariosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which usuarios to delete
     */
    where?: usuariosWhereInput
    /**
     * Limit how many usuarios to delete.
     */
    limit?: number
  }

  /**
   * usuarios.membros_time
   */
  export type usuarios$membros_timeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the membros_time
     */
    select?: membros_timeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the membros_time
     */
    omit?: membros_timeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: membros_timeInclude<ExtArgs> | null
    where?: membros_timeWhereInput
    orderBy?: membros_timeOrderByWithRelationInput | membros_timeOrderByWithRelationInput[]
    cursor?: membros_timeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Membros_timeScalarFieldEnum | Membros_timeScalarFieldEnum[]
  }

  /**
   * usuarios.cursos
   */
  export type usuarios$cursosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cursos
     */
    select?: cursosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cursos
     */
    omit?: cursosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cursosInclude<ExtArgs> | null
    where?: cursosWhereInput
  }

  /**
   * usuarios without action
   */
  export type usuariosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuarios
     */
    select?: usuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuarios
     */
    omit?: usuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuariosInclude<ExtArgs> | null
  }


  /**
   * Model times
   */

  export type AggregateTimes = {
    _count: TimesCountAggregateOutputType | null
    _avg: TimesAvgAggregateOutputType | null
    _sum: TimesSumAggregateOutputType | null
    _min: TimesMinAggregateOutputType | null
    _max: TimesMaxAggregateOutputType | null
  }

  export type TimesAvgAggregateOutputType = {
    id: number | null
  }

  export type TimesSumAggregateOutputType = {
    id: number | null
  }

  export type TimesMinAggregateOutputType = {
    id: number | null
    nome: string | null
    modalidades: $Enums.tipo_modalidade | null
  }

  export type TimesMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    modalidades: $Enums.tipo_modalidade | null
  }

  export type TimesCountAggregateOutputType = {
    id: number
    nome: number
    modalidades: number
    _all: number
  }


  export type TimesAvgAggregateInputType = {
    id?: true
  }

  export type TimesSumAggregateInputType = {
    id?: true
  }

  export type TimesMinAggregateInputType = {
    id?: true
    nome?: true
    modalidades?: true
  }

  export type TimesMaxAggregateInputType = {
    id?: true
    nome?: true
    modalidades?: true
  }

  export type TimesCountAggregateInputType = {
    id?: true
    nome?: true
    modalidades?: true
    _all?: true
  }

  export type TimesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which times to aggregate.
     */
    where?: timesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of times to fetch.
     */
    orderBy?: timesOrderByWithRelationInput | timesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: timesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` times from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` times.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned times
    **/
    _count?: true | TimesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TimesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TimesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimesMaxAggregateInputType
  }

  export type GetTimesAggregateType<T extends TimesAggregateArgs> = {
        [P in keyof T & keyof AggregateTimes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimes[P]>
      : GetScalarType<T[P], AggregateTimes[P]>
  }




  export type timesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: timesWhereInput
    orderBy?: timesOrderByWithAggregationInput | timesOrderByWithAggregationInput[]
    by: TimesScalarFieldEnum[] | TimesScalarFieldEnum
    having?: timesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimesCountAggregateInputType | true
    _avg?: TimesAvgAggregateInputType
    _sum?: TimesSumAggregateInputType
    _min?: TimesMinAggregateInputType
    _max?: TimesMaxAggregateInputType
  }

  export type TimesGroupByOutputType = {
    id: number
    nome: string
    modalidades: $Enums.tipo_modalidade | null
    _count: TimesCountAggregateOutputType | null
    _avg: TimesAvgAggregateOutputType | null
    _sum: TimesSumAggregateOutputType | null
    _min: TimesMinAggregateOutputType | null
    _max: TimesMaxAggregateOutputType | null
  }

  type GetTimesGroupByPayload<T extends timesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimesGroupByOutputType[P]>
            : GetScalarType<T[P], TimesGroupByOutputType[P]>
        }
      >
    >


  export type timesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    modalidades?: boolean
    membros_time?: boolean | times$membros_timeArgs<ExtArgs>
    _count?: boolean | TimesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["times"]>

  export type timesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    modalidades?: boolean
  }, ExtArgs["result"]["times"]>

  export type timesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    modalidades?: boolean
  }, ExtArgs["result"]["times"]>

  export type timesSelectScalar = {
    id?: boolean
    nome?: boolean
    modalidades?: boolean
  }

  export type timesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "modalidades", ExtArgs["result"]["times"]>
  export type timesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    membros_time?: boolean | times$membros_timeArgs<ExtArgs>
    _count?: boolean | TimesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type timesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type timesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $timesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "times"
    objects: {
      membros_time: Prisma.$membros_timePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      modalidades: $Enums.tipo_modalidade | null
    }, ExtArgs["result"]["times"]>
    composites: {}
  }

  type timesGetPayload<S extends boolean | null | undefined | timesDefaultArgs> = $Result.GetResult<Prisma.$timesPayload, S>

  type timesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<timesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TimesCountAggregateInputType | true
    }

  export interface timesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['times'], meta: { name: 'times' } }
    /**
     * Find zero or one Times that matches the filter.
     * @param {timesFindUniqueArgs} args - Arguments to find a Times
     * @example
     * // Get one Times
     * const times = await prisma.times.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends timesFindUniqueArgs>(args: SelectSubset<T, timesFindUniqueArgs<ExtArgs>>): Prisma__timesClient<$Result.GetResult<Prisma.$timesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Times that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {timesFindUniqueOrThrowArgs} args - Arguments to find a Times
     * @example
     * // Get one Times
     * const times = await prisma.times.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends timesFindUniqueOrThrowArgs>(args: SelectSubset<T, timesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__timesClient<$Result.GetResult<Prisma.$timesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Times that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {timesFindFirstArgs} args - Arguments to find a Times
     * @example
     * // Get one Times
     * const times = await prisma.times.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends timesFindFirstArgs>(args?: SelectSubset<T, timesFindFirstArgs<ExtArgs>>): Prisma__timesClient<$Result.GetResult<Prisma.$timesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Times that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {timesFindFirstOrThrowArgs} args - Arguments to find a Times
     * @example
     * // Get one Times
     * const times = await prisma.times.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends timesFindFirstOrThrowArgs>(args?: SelectSubset<T, timesFindFirstOrThrowArgs<ExtArgs>>): Prisma__timesClient<$Result.GetResult<Prisma.$timesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Times that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {timesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Times
     * const times = await prisma.times.findMany()
     * 
     * // Get first 10 Times
     * const times = await prisma.times.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timesWithIdOnly = await prisma.times.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends timesFindManyArgs>(args?: SelectSubset<T, timesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$timesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Times.
     * @param {timesCreateArgs} args - Arguments to create a Times.
     * @example
     * // Create one Times
     * const Times = await prisma.times.create({
     *   data: {
     *     // ... data to create a Times
     *   }
     * })
     * 
     */
    create<T extends timesCreateArgs>(args: SelectSubset<T, timesCreateArgs<ExtArgs>>): Prisma__timesClient<$Result.GetResult<Prisma.$timesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Times.
     * @param {timesCreateManyArgs} args - Arguments to create many Times.
     * @example
     * // Create many Times
     * const times = await prisma.times.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends timesCreateManyArgs>(args?: SelectSubset<T, timesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Times and returns the data saved in the database.
     * @param {timesCreateManyAndReturnArgs} args - Arguments to create many Times.
     * @example
     * // Create many Times
     * const times = await prisma.times.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Times and only return the `id`
     * const timesWithIdOnly = await prisma.times.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends timesCreateManyAndReturnArgs>(args?: SelectSubset<T, timesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$timesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Times.
     * @param {timesDeleteArgs} args - Arguments to delete one Times.
     * @example
     * // Delete one Times
     * const Times = await prisma.times.delete({
     *   where: {
     *     // ... filter to delete one Times
     *   }
     * })
     * 
     */
    delete<T extends timesDeleteArgs>(args: SelectSubset<T, timesDeleteArgs<ExtArgs>>): Prisma__timesClient<$Result.GetResult<Prisma.$timesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Times.
     * @param {timesUpdateArgs} args - Arguments to update one Times.
     * @example
     * // Update one Times
     * const times = await prisma.times.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends timesUpdateArgs>(args: SelectSubset<T, timesUpdateArgs<ExtArgs>>): Prisma__timesClient<$Result.GetResult<Prisma.$timesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Times.
     * @param {timesDeleteManyArgs} args - Arguments to filter Times to delete.
     * @example
     * // Delete a few Times
     * const { count } = await prisma.times.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends timesDeleteManyArgs>(args?: SelectSubset<T, timesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Times.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {timesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Times
     * const times = await prisma.times.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends timesUpdateManyArgs>(args: SelectSubset<T, timesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Times and returns the data updated in the database.
     * @param {timesUpdateManyAndReturnArgs} args - Arguments to update many Times.
     * @example
     * // Update many Times
     * const times = await prisma.times.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Times and only return the `id`
     * const timesWithIdOnly = await prisma.times.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends timesUpdateManyAndReturnArgs>(args: SelectSubset<T, timesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$timesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Times.
     * @param {timesUpsertArgs} args - Arguments to update or create a Times.
     * @example
     * // Update or create a Times
     * const times = await prisma.times.upsert({
     *   create: {
     *     // ... data to create a Times
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Times we want to update
     *   }
     * })
     */
    upsert<T extends timesUpsertArgs>(args: SelectSubset<T, timesUpsertArgs<ExtArgs>>): Prisma__timesClient<$Result.GetResult<Prisma.$timesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Times.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {timesCountArgs} args - Arguments to filter Times to count.
     * @example
     * // Count the number of Times
     * const count = await prisma.times.count({
     *   where: {
     *     // ... the filter for the Times we want to count
     *   }
     * })
    **/
    count<T extends timesCountArgs>(
      args?: Subset<T, timesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Times.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TimesAggregateArgs>(args: Subset<T, TimesAggregateArgs>): Prisma.PrismaPromise<GetTimesAggregateType<T>>

    /**
     * Group by Times.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {timesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends timesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: timesGroupByArgs['orderBy'] }
        : { orderBy?: timesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, timesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the times model
   */
  readonly fields: timesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for times.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__timesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    membros_time<T extends times$membros_timeArgs<ExtArgs> = {}>(args?: Subset<T, times$membros_timeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$membros_timePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the times model
   */
  interface timesFieldRefs {
    readonly id: FieldRef<"times", 'Int'>
    readonly nome: FieldRef<"times", 'String'>
    readonly modalidades: FieldRef<"times", 'tipo_modalidade'>
  }
    

  // Custom InputTypes
  /**
   * times findUnique
   */
  export type timesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the times
     */
    select?: timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the times
     */
    omit?: timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: timesInclude<ExtArgs> | null
    /**
     * Filter, which times to fetch.
     */
    where: timesWhereUniqueInput
  }

  /**
   * times findUniqueOrThrow
   */
  export type timesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the times
     */
    select?: timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the times
     */
    omit?: timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: timesInclude<ExtArgs> | null
    /**
     * Filter, which times to fetch.
     */
    where: timesWhereUniqueInput
  }

  /**
   * times findFirst
   */
  export type timesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the times
     */
    select?: timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the times
     */
    omit?: timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: timesInclude<ExtArgs> | null
    /**
     * Filter, which times to fetch.
     */
    where?: timesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of times to fetch.
     */
    orderBy?: timesOrderByWithRelationInput | timesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for times.
     */
    cursor?: timesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` times from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` times.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of times.
     */
    distinct?: TimesScalarFieldEnum | TimesScalarFieldEnum[]
  }

  /**
   * times findFirstOrThrow
   */
  export type timesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the times
     */
    select?: timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the times
     */
    omit?: timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: timesInclude<ExtArgs> | null
    /**
     * Filter, which times to fetch.
     */
    where?: timesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of times to fetch.
     */
    orderBy?: timesOrderByWithRelationInput | timesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for times.
     */
    cursor?: timesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` times from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` times.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of times.
     */
    distinct?: TimesScalarFieldEnum | TimesScalarFieldEnum[]
  }

  /**
   * times findMany
   */
  export type timesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the times
     */
    select?: timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the times
     */
    omit?: timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: timesInclude<ExtArgs> | null
    /**
     * Filter, which times to fetch.
     */
    where?: timesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of times to fetch.
     */
    orderBy?: timesOrderByWithRelationInput | timesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing times.
     */
    cursor?: timesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` times from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` times.
     */
    skip?: number
    distinct?: TimesScalarFieldEnum | TimesScalarFieldEnum[]
  }

  /**
   * times create
   */
  export type timesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the times
     */
    select?: timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the times
     */
    omit?: timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: timesInclude<ExtArgs> | null
    /**
     * The data needed to create a times.
     */
    data: XOR<timesCreateInput, timesUncheckedCreateInput>
  }

  /**
   * times createMany
   */
  export type timesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many times.
     */
    data: timesCreateManyInput | timesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * times createManyAndReturn
   */
  export type timesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the times
     */
    select?: timesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the times
     */
    omit?: timesOmit<ExtArgs> | null
    /**
     * The data used to create many times.
     */
    data: timesCreateManyInput | timesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * times update
   */
  export type timesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the times
     */
    select?: timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the times
     */
    omit?: timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: timesInclude<ExtArgs> | null
    /**
     * The data needed to update a times.
     */
    data: XOR<timesUpdateInput, timesUncheckedUpdateInput>
    /**
     * Choose, which times to update.
     */
    where: timesWhereUniqueInput
  }

  /**
   * times updateMany
   */
  export type timesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update times.
     */
    data: XOR<timesUpdateManyMutationInput, timesUncheckedUpdateManyInput>
    /**
     * Filter which times to update
     */
    where?: timesWhereInput
    /**
     * Limit how many times to update.
     */
    limit?: number
  }

  /**
   * times updateManyAndReturn
   */
  export type timesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the times
     */
    select?: timesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the times
     */
    omit?: timesOmit<ExtArgs> | null
    /**
     * The data used to update times.
     */
    data: XOR<timesUpdateManyMutationInput, timesUncheckedUpdateManyInput>
    /**
     * Filter which times to update
     */
    where?: timesWhereInput
    /**
     * Limit how many times to update.
     */
    limit?: number
  }

  /**
   * times upsert
   */
  export type timesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the times
     */
    select?: timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the times
     */
    omit?: timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: timesInclude<ExtArgs> | null
    /**
     * The filter to search for the times to update in case it exists.
     */
    where: timesWhereUniqueInput
    /**
     * In case the times found by the `where` argument doesn't exist, create a new times with this data.
     */
    create: XOR<timesCreateInput, timesUncheckedCreateInput>
    /**
     * In case the times was found with the provided `where` argument, update it with this data.
     */
    update: XOR<timesUpdateInput, timesUncheckedUpdateInput>
  }

  /**
   * times delete
   */
  export type timesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the times
     */
    select?: timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the times
     */
    omit?: timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: timesInclude<ExtArgs> | null
    /**
     * Filter which times to delete.
     */
    where: timesWhereUniqueInput
  }

  /**
   * times deleteMany
   */
  export type timesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which times to delete
     */
    where?: timesWhereInput
    /**
     * Limit how many times to delete.
     */
    limit?: number
  }

  /**
   * times.membros_time
   */
  export type times$membros_timeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the membros_time
     */
    select?: membros_timeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the membros_time
     */
    omit?: membros_timeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: membros_timeInclude<ExtArgs> | null
    where?: membros_timeWhereInput
    orderBy?: membros_timeOrderByWithRelationInput | membros_timeOrderByWithRelationInput[]
    cursor?: membros_timeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Membros_timeScalarFieldEnum | Membros_timeScalarFieldEnum[]
  }

  /**
   * times without action
   */
  export type timesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the times
     */
    select?: timesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the times
     */
    omit?: timesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: timesInclude<ExtArgs> | null
  }


  /**
   * Model membros_time
   */

  export type AggregateMembros_time = {
    _count: Membros_timeCountAggregateOutputType | null
    _avg: Membros_timeAvgAggregateOutputType | null
    _sum: Membros_timeSumAggregateOutputType | null
    _min: Membros_timeMinAggregateOutputType | null
    _max: Membros_timeMaxAggregateOutputType | null
  }

  export type Membros_timeAvgAggregateOutputType = {
    time_id: number | null
    membro_id: number | null
  }

  export type Membros_timeSumAggregateOutputType = {
    time_id: number | null
    membro_id: number | null
  }

  export type Membros_timeMinAggregateOutputType = {
    time_id: number | null
    membro_id: number | null
    funcao: $Enums.tipo_funcao | null
  }

  export type Membros_timeMaxAggregateOutputType = {
    time_id: number | null
    membro_id: number | null
    funcao: $Enums.tipo_funcao | null
  }

  export type Membros_timeCountAggregateOutputType = {
    time_id: number
    membro_id: number
    funcao: number
    _all: number
  }


  export type Membros_timeAvgAggregateInputType = {
    time_id?: true
    membro_id?: true
  }

  export type Membros_timeSumAggregateInputType = {
    time_id?: true
    membro_id?: true
  }

  export type Membros_timeMinAggregateInputType = {
    time_id?: true
    membro_id?: true
    funcao?: true
  }

  export type Membros_timeMaxAggregateInputType = {
    time_id?: true
    membro_id?: true
    funcao?: true
  }

  export type Membros_timeCountAggregateInputType = {
    time_id?: true
    membro_id?: true
    funcao?: true
    _all?: true
  }

  export type Membros_timeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which membros_time to aggregate.
     */
    where?: membros_timeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of membros_times to fetch.
     */
    orderBy?: membros_timeOrderByWithRelationInput | membros_timeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: membros_timeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` membros_times from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` membros_times.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned membros_times
    **/
    _count?: true | Membros_timeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Membros_timeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Membros_timeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Membros_timeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Membros_timeMaxAggregateInputType
  }

  export type GetMembros_timeAggregateType<T extends Membros_timeAggregateArgs> = {
        [P in keyof T & keyof AggregateMembros_time]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMembros_time[P]>
      : GetScalarType<T[P], AggregateMembros_time[P]>
  }




  export type membros_timeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: membros_timeWhereInput
    orderBy?: membros_timeOrderByWithAggregationInput | membros_timeOrderByWithAggregationInput[]
    by: Membros_timeScalarFieldEnum[] | Membros_timeScalarFieldEnum
    having?: membros_timeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Membros_timeCountAggregateInputType | true
    _avg?: Membros_timeAvgAggregateInputType
    _sum?: Membros_timeSumAggregateInputType
    _min?: Membros_timeMinAggregateInputType
    _max?: Membros_timeMaxAggregateInputType
  }

  export type Membros_timeGroupByOutputType = {
    time_id: number
    membro_id: number
    funcao: $Enums.tipo_funcao | null
    _count: Membros_timeCountAggregateOutputType | null
    _avg: Membros_timeAvgAggregateOutputType | null
    _sum: Membros_timeSumAggregateOutputType | null
    _min: Membros_timeMinAggregateOutputType | null
    _max: Membros_timeMaxAggregateOutputType | null
  }

  type GetMembros_timeGroupByPayload<T extends membros_timeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Membros_timeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Membros_timeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Membros_timeGroupByOutputType[P]>
            : GetScalarType<T[P], Membros_timeGroupByOutputType[P]>
        }
      >
    >


  export type membros_timeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    time_id?: boolean
    membro_id?: boolean
    funcao?: boolean
    usuarios?: boolean | usuariosDefaultArgs<ExtArgs>
    times?: boolean | timesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["membros_time"]>

  export type membros_timeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    time_id?: boolean
    membro_id?: boolean
    funcao?: boolean
    usuarios?: boolean | usuariosDefaultArgs<ExtArgs>
    times?: boolean | timesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["membros_time"]>

  export type membros_timeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    time_id?: boolean
    membro_id?: boolean
    funcao?: boolean
    usuarios?: boolean | usuariosDefaultArgs<ExtArgs>
    times?: boolean | timesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["membros_time"]>

  export type membros_timeSelectScalar = {
    time_id?: boolean
    membro_id?: boolean
    funcao?: boolean
  }

  export type membros_timeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"time_id" | "membro_id" | "funcao", ExtArgs["result"]["membros_time"]>
  export type membros_timeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarios?: boolean | usuariosDefaultArgs<ExtArgs>
    times?: boolean | timesDefaultArgs<ExtArgs>
  }
  export type membros_timeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarios?: boolean | usuariosDefaultArgs<ExtArgs>
    times?: boolean | timesDefaultArgs<ExtArgs>
  }
  export type membros_timeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarios?: boolean | usuariosDefaultArgs<ExtArgs>
    times?: boolean | timesDefaultArgs<ExtArgs>
  }

  export type $membros_timePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "membros_time"
    objects: {
      usuarios: Prisma.$usuariosPayload<ExtArgs>
      times: Prisma.$timesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      time_id: number
      membro_id: number
      funcao: $Enums.tipo_funcao | null
    }, ExtArgs["result"]["membros_time"]>
    composites: {}
  }

  type membros_timeGetPayload<S extends boolean | null | undefined | membros_timeDefaultArgs> = $Result.GetResult<Prisma.$membros_timePayload, S>

  type membros_timeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<membros_timeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Membros_timeCountAggregateInputType | true
    }

  export interface membros_timeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['membros_time'], meta: { name: 'membros_time' } }
    /**
     * Find zero or one Membros_time that matches the filter.
     * @param {membros_timeFindUniqueArgs} args - Arguments to find a Membros_time
     * @example
     * // Get one Membros_time
     * const membros_time = await prisma.membros_time.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends membros_timeFindUniqueArgs>(args: SelectSubset<T, membros_timeFindUniqueArgs<ExtArgs>>): Prisma__membros_timeClient<$Result.GetResult<Prisma.$membros_timePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Membros_time that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {membros_timeFindUniqueOrThrowArgs} args - Arguments to find a Membros_time
     * @example
     * // Get one Membros_time
     * const membros_time = await prisma.membros_time.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends membros_timeFindUniqueOrThrowArgs>(args: SelectSubset<T, membros_timeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__membros_timeClient<$Result.GetResult<Prisma.$membros_timePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Membros_time that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {membros_timeFindFirstArgs} args - Arguments to find a Membros_time
     * @example
     * // Get one Membros_time
     * const membros_time = await prisma.membros_time.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends membros_timeFindFirstArgs>(args?: SelectSubset<T, membros_timeFindFirstArgs<ExtArgs>>): Prisma__membros_timeClient<$Result.GetResult<Prisma.$membros_timePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Membros_time that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {membros_timeFindFirstOrThrowArgs} args - Arguments to find a Membros_time
     * @example
     * // Get one Membros_time
     * const membros_time = await prisma.membros_time.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends membros_timeFindFirstOrThrowArgs>(args?: SelectSubset<T, membros_timeFindFirstOrThrowArgs<ExtArgs>>): Prisma__membros_timeClient<$Result.GetResult<Prisma.$membros_timePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Membros_times that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {membros_timeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Membros_times
     * const membros_times = await prisma.membros_time.findMany()
     * 
     * // Get first 10 Membros_times
     * const membros_times = await prisma.membros_time.findMany({ take: 10 })
     * 
     * // Only select the `time_id`
     * const membros_timeWithTime_idOnly = await prisma.membros_time.findMany({ select: { time_id: true } })
     * 
     */
    findMany<T extends membros_timeFindManyArgs>(args?: SelectSubset<T, membros_timeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$membros_timePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Membros_time.
     * @param {membros_timeCreateArgs} args - Arguments to create a Membros_time.
     * @example
     * // Create one Membros_time
     * const Membros_time = await prisma.membros_time.create({
     *   data: {
     *     // ... data to create a Membros_time
     *   }
     * })
     * 
     */
    create<T extends membros_timeCreateArgs>(args: SelectSubset<T, membros_timeCreateArgs<ExtArgs>>): Prisma__membros_timeClient<$Result.GetResult<Prisma.$membros_timePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Membros_times.
     * @param {membros_timeCreateManyArgs} args - Arguments to create many Membros_times.
     * @example
     * // Create many Membros_times
     * const membros_time = await prisma.membros_time.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends membros_timeCreateManyArgs>(args?: SelectSubset<T, membros_timeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Membros_times and returns the data saved in the database.
     * @param {membros_timeCreateManyAndReturnArgs} args - Arguments to create many Membros_times.
     * @example
     * // Create many Membros_times
     * const membros_time = await prisma.membros_time.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Membros_times and only return the `time_id`
     * const membros_timeWithTime_idOnly = await prisma.membros_time.createManyAndReturn({
     *   select: { time_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends membros_timeCreateManyAndReturnArgs>(args?: SelectSubset<T, membros_timeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$membros_timePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Membros_time.
     * @param {membros_timeDeleteArgs} args - Arguments to delete one Membros_time.
     * @example
     * // Delete one Membros_time
     * const Membros_time = await prisma.membros_time.delete({
     *   where: {
     *     // ... filter to delete one Membros_time
     *   }
     * })
     * 
     */
    delete<T extends membros_timeDeleteArgs>(args: SelectSubset<T, membros_timeDeleteArgs<ExtArgs>>): Prisma__membros_timeClient<$Result.GetResult<Prisma.$membros_timePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Membros_time.
     * @param {membros_timeUpdateArgs} args - Arguments to update one Membros_time.
     * @example
     * // Update one Membros_time
     * const membros_time = await prisma.membros_time.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends membros_timeUpdateArgs>(args: SelectSubset<T, membros_timeUpdateArgs<ExtArgs>>): Prisma__membros_timeClient<$Result.GetResult<Prisma.$membros_timePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Membros_times.
     * @param {membros_timeDeleteManyArgs} args - Arguments to filter Membros_times to delete.
     * @example
     * // Delete a few Membros_times
     * const { count } = await prisma.membros_time.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends membros_timeDeleteManyArgs>(args?: SelectSubset<T, membros_timeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Membros_times.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {membros_timeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Membros_times
     * const membros_time = await prisma.membros_time.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends membros_timeUpdateManyArgs>(args: SelectSubset<T, membros_timeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Membros_times and returns the data updated in the database.
     * @param {membros_timeUpdateManyAndReturnArgs} args - Arguments to update many Membros_times.
     * @example
     * // Update many Membros_times
     * const membros_time = await prisma.membros_time.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Membros_times and only return the `time_id`
     * const membros_timeWithTime_idOnly = await prisma.membros_time.updateManyAndReturn({
     *   select: { time_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends membros_timeUpdateManyAndReturnArgs>(args: SelectSubset<T, membros_timeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$membros_timePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Membros_time.
     * @param {membros_timeUpsertArgs} args - Arguments to update or create a Membros_time.
     * @example
     * // Update or create a Membros_time
     * const membros_time = await prisma.membros_time.upsert({
     *   create: {
     *     // ... data to create a Membros_time
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Membros_time we want to update
     *   }
     * })
     */
    upsert<T extends membros_timeUpsertArgs>(args: SelectSubset<T, membros_timeUpsertArgs<ExtArgs>>): Prisma__membros_timeClient<$Result.GetResult<Prisma.$membros_timePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Membros_times.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {membros_timeCountArgs} args - Arguments to filter Membros_times to count.
     * @example
     * // Count the number of Membros_times
     * const count = await prisma.membros_time.count({
     *   where: {
     *     // ... the filter for the Membros_times we want to count
     *   }
     * })
    **/
    count<T extends membros_timeCountArgs>(
      args?: Subset<T, membros_timeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Membros_timeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Membros_time.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Membros_timeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Membros_timeAggregateArgs>(args: Subset<T, Membros_timeAggregateArgs>): Prisma.PrismaPromise<GetMembros_timeAggregateType<T>>

    /**
     * Group by Membros_time.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {membros_timeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends membros_timeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: membros_timeGroupByArgs['orderBy'] }
        : { orderBy?: membros_timeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, membros_timeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMembros_timeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the membros_time model
   */
  readonly fields: membros_timeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for membros_time.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__membros_timeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuarios<T extends usuariosDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usuariosDefaultArgs<ExtArgs>>): Prisma__usuariosClient<$Result.GetResult<Prisma.$usuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    times<T extends timesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, timesDefaultArgs<ExtArgs>>): Prisma__timesClient<$Result.GetResult<Prisma.$timesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the membros_time model
   */
  interface membros_timeFieldRefs {
    readonly time_id: FieldRef<"membros_time", 'Int'>
    readonly membro_id: FieldRef<"membros_time", 'Int'>
    readonly funcao: FieldRef<"membros_time", 'tipo_funcao'>
  }
    

  // Custom InputTypes
  /**
   * membros_time findUnique
   */
  export type membros_timeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the membros_time
     */
    select?: membros_timeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the membros_time
     */
    omit?: membros_timeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: membros_timeInclude<ExtArgs> | null
    /**
     * Filter, which membros_time to fetch.
     */
    where: membros_timeWhereUniqueInput
  }

  /**
   * membros_time findUniqueOrThrow
   */
  export type membros_timeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the membros_time
     */
    select?: membros_timeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the membros_time
     */
    omit?: membros_timeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: membros_timeInclude<ExtArgs> | null
    /**
     * Filter, which membros_time to fetch.
     */
    where: membros_timeWhereUniqueInput
  }

  /**
   * membros_time findFirst
   */
  export type membros_timeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the membros_time
     */
    select?: membros_timeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the membros_time
     */
    omit?: membros_timeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: membros_timeInclude<ExtArgs> | null
    /**
     * Filter, which membros_time to fetch.
     */
    where?: membros_timeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of membros_times to fetch.
     */
    orderBy?: membros_timeOrderByWithRelationInput | membros_timeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for membros_times.
     */
    cursor?: membros_timeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` membros_times from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` membros_times.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of membros_times.
     */
    distinct?: Membros_timeScalarFieldEnum | Membros_timeScalarFieldEnum[]
  }

  /**
   * membros_time findFirstOrThrow
   */
  export type membros_timeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the membros_time
     */
    select?: membros_timeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the membros_time
     */
    omit?: membros_timeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: membros_timeInclude<ExtArgs> | null
    /**
     * Filter, which membros_time to fetch.
     */
    where?: membros_timeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of membros_times to fetch.
     */
    orderBy?: membros_timeOrderByWithRelationInput | membros_timeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for membros_times.
     */
    cursor?: membros_timeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` membros_times from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` membros_times.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of membros_times.
     */
    distinct?: Membros_timeScalarFieldEnum | Membros_timeScalarFieldEnum[]
  }

  /**
   * membros_time findMany
   */
  export type membros_timeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the membros_time
     */
    select?: membros_timeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the membros_time
     */
    omit?: membros_timeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: membros_timeInclude<ExtArgs> | null
    /**
     * Filter, which membros_times to fetch.
     */
    where?: membros_timeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of membros_times to fetch.
     */
    orderBy?: membros_timeOrderByWithRelationInput | membros_timeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing membros_times.
     */
    cursor?: membros_timeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` membros_times from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` membros_times.
     */
    skip?: number
    distinct?: Membros_timeScalarFieldEnum | Membros_timeScalarFieldEnum[]
  }

  /**
   * membros_time create
   */
  export type membros_timeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the membros_time
     */
    select?: membros_timeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the membros_time
     */
    omit?: membros_timeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: membros_timeInclude<ExtArgs> | null
    /**
     * The data needed to create a membros_time.
     */
    data: XOR<membros_timeCreateInput, membros_timeUncheckedCreateInput>
  }

  /**
   * membros_time createMany
   */
  export type membros_timeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many membros_times.
     */
    data: membros_timeCreateManyInput | membros_timeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * membros_time createManyAndReturn
   */
  export type membros_timeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the membros_time
     */
    select?: membros_timeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the membros_time
     */
    omit?: membros_timeOmit<ExtArgs> | null
    /**
     * The data used to create many membros_times.
     */
    data: membros_timeCreateManyInput | membros_timeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: membros_timeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * membros_time update
   */
  export type membros_timeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the membros_time
     */
    select?: membros_timeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the membros_time
     */
    omit?: membros_timeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: membros_timeInclude<ExtArgs> | null
    /**
     * The data needed to update a membros_time.
     */
    data: XOR<membros_timeUpdateInput, membros_timeUncheckedUpdateInput>
    /**
     * Choose, which membros_time to update.
     */
    where: membros_timeWhereUniqueInput
  }

  /**
   * membros_time updateMany
   */
  export type membros_timeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update membros_times.
     */
    data: XOR<membros_timeUpdateManyMutationInput, membros_timeUncheckedUpdateManyInput>
    /**
     * Filter which membros_times to update
     */
    where?: membros_timeWhereInput
    /**
     * Limit how many membros_times to update.
     */
    limit?: number
  }

  /**
   * membros_time updateManyAndReturn
   */
  export type membros_timeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the membros_time
     */
    select?: membros_timeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the membros_time
     */
    omit?: membros_timeOmit<ExtArgs> | null
    /**
     * The data used to update membros_times.
     */
    data: XOR<membros_timeUpdateManyMutationInput, membros_timeUncheckedUpdateManyInput>
    /**
     * Filter which membros_times to update
     */
    where?: membros_timeWhereInput
    /**
     * Limit how many membros_times to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: membros_timeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * membros_time upsert
   */
  export type membros_timeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the membros_time
     */
    select?: membros_timeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the membros_time
     */
    omit?: membros_timeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: membros_timeInclude<ExtArgs> | null
    /**
     * The filter to search for the membros_time to update in case it exists.
     */
    where: membros_timeWhereUniqueInput
    /**
     * In case the membros_time found by the `where` argument doesn't exist, create a new membros_time with this data.
     */
    create: XOR<membros_timeCreateInput, membros_timeUncheckedCreateInput>
    /**
     * In case the membros_time was found with the provided `where` argument, update it with this data.
     */
    update: XOR<membros_timeUpdateInput, membros_timeUncheckedUpdateInput>
  }

  /**
   * membros_time delete
   */
  export type membros_timeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the membros_time
     */
    select?: membros_timeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the membros_time
     */
    omit?: membros_timeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: membros_timeInclude<ExtArgs> | null
    /**
     * Filter which membros_time to delete.
     */
    where: membros_timeWhereUniqueInput
  }

  /**
   * membros_time deleteMany
   */
  export type membros_timeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which membros_times to delete
     */
    where?: membros_timeWhereInput
    /**
     * Limit how many membros_times to delete.
     */
    limit?: number
  }

  /**
   * membros_time without action
   */
  export type membros_timeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the membros_time
     */
    select?: membros_timeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the membros_time
     */
    omit?: membros_timeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: membros_timeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CursosScalarFieldEnum: {
    id: 'id',
    sigla: 'sigla',
    ano: 'ano',
    nome: 'nome',
    periodo: 'periodo'
  };

  export type CursosScalarFieldEnum = (typeof CursosScalarFieldEnum)[keyof typeof CursosScalarFieldEnum]


  export const UsuariosScalarFieldEnum: {
    id: 'id',
    rm: 'rm',
    nome: 'nome',
    data_nascimento: 'data_nascimento',
    curso_id: 'curso_id',
    email: 'email',
    senha: 'senha',
    telefone: 'telefone',
    foto_perfil: 'foto_perfil',
    criado_em: 'criado_em',
    atualizado_em: 'atualizado_em',
    codigo_verificacao: 'codigo_verificacao',
    codigo_gerado_em: 'codigo_gerado_em',
    tentativas_login: 'tentativas_login',
    tipo_usuario: 'tipo_usuario',
    modalidades: 'modalidades'
  };

  export type UsuariosScalarFieldEnum = (typeof UsuariosScalarFieldEnum)[keyof typeof UsuariosScalarFieldEnum]


  export const TimesScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    modalidades: 'modalidades'
  };

  export type TimesScalarFieldEnum = (typeof TimesScalarFieldEnum)[keyof typeof TimesScalarFieldEnum]


  export const Membros_timeScalarFieldEnum: {
    time_id: 'time_id',
    membro_id: 'membro_id',
    funcao: 'funcao'
  };

  export type Membros_timeScalarFieldEnum = (typeof Membros_timeScalarFieldEnum)[keyof typeof Membros_timeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'tipo_usuario'
   */
  export type Enumtipo_usuarioFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'tipo_usuario'>
    


  /**
   * Reference to a field of type 'tipo_usuario[]'
   */
  export type ListEnumtipo_usuarioFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'tipo_usuario[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'tipo_modalidade'
   */
  export type Enumtipo_modalidadeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'tipo_modalidade'>
    


  /**
   * Reference to a field of type 'tipo_modalidade[]'
   */
  export type ListEnumtipo_modalidadeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'tipo_modalidade[]'>
    


  /**
   * Reference to a field of type 'tipo_funcao'
   */
  export type Enumtipo_funcaoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'tipo_funcao'>
    


  /**
   * Reference to a field of type 'tipo_funcao[]'
   */
  export type ListEnumtipo_funcaoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'tipo_funcao[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type cursosWhereInput = {
    AND?: cursosWhereInput | cursosWhereInput[]
    OR?: cursosWhereInput[]
    NOT?: cursosWhereInput | cursosWhereInput[]
    id?: IntFilter<"cursos"> | number
    sigla?: StringFilter<"cursos"> | string
    ano?: IntFilter<"cursos"> | number
    nome?: StringFilter<"cursos"> | string
    periodo?: IntFilter<"cursos"> | number
    usuarios?: UsuariosListRelationFilter
  }

  export type cursosOrderByWithRelationInput = {
    id?: SortOrder
    sigla?: SortOrder
    ano?: SortOrder
    nome?: SortOrder
    periodo?: SortOrder
    usuarios?: usuariosOrderByRelationAggregateInput
  }

  export type cursosWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: cursosWhereInput | cursosWhereInput[]
    OR?: cursosWhereInput[]
    NOT?: cursosWhereInput | cursosWhereInput[]
    sigla?: StringFilter<"cursos"> | string
    ano?: IntFilter<"cursos"> | number
    nome?: StringFilter<"cursos"> | string
    periodo?: IntFilter<"cursos"> | number
    usuarios?: UsuariosListRelationFilter
  }, "id">

  export type cursosOrderByWithAggregationInput = {
    id?: SortOrder
    sigla?: SortOrder
    ano?: SortOrder
    nome?: SortOrder
    periodo?: SortOrder
    _count?: cursosCountOrderByAggregateInput
    _avg?: cursosAvgOrderByAggregateInput
    _max?: cursosMaxOrderByAggregateInput
    _min?: cursosMinOrderByAggregateInput
    _sum?: cursosSumOrderByAggregateInput
  }

  export type cursosScalarWhereWithAggregatesInput = {
    AND?: cursosScalarWhereWithAggregatesInput | cursosScalarWhereWithAggregatesInput[]
    OR?: cursosScalarWhereWithAggregatesInput[]
    NOT?: cursosScalarWhereWithAggregatesInput | cursosScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"cursos"> | number
    sigla?: StringWithAggregatesFilter<"cursos"> | string
    ano?: IntWithAggregatesFilter<"cursos"> | number
    nome?: StringWithAggregatesFilter<"cursos"> | string
    periodo?: IntWithAggregatesFilter<"cursos"> | number
  }

  export type usuariosWhereInput = {
    AND?: usuariosWhereInput | usuariosWhereInput[]
    OR?: usuariosWhereInput[]
    NOT?: usuariosWhereInput | usuariosWhereInput[]
    id?: IntFilter<"usuarios"> | number
    rm?: StringFilter<"usuarios"> | string
    nome?: StringFilter<"usuarios"> | string
    data_nascimento?: DateTimeNullableFilter<"usuarios"> | Date | string | null
    curso_id?: IntNullableFilter<"usuarios"> | number | null
    email?: StringFilter<"usuarios"> | string
    senha?: StringFilter<"usuarios"> | string
    telefone?: StringFilter<"usuarios"> | string
    foto_perfil?: StringNullableFilter<"usuarios"> | string | null
    criado_em?: DateTimeFilter<"usuarios"> | Date | string
    atualizado_em?: DateTimeFilter<"usuarios"> | Date | string
    codigo_verificacao?: IntNullableFilter<"usuarios"> | number | null
    codigo_gerado_em?: DateTimeNullableFilter<"usuarios"> | Date | string | null
    tentativas_login?: IntFilter<"usuarios"> | number
    tipo_usuario?: Enumtipo_usuarioFilter<"usuarios"> | $Enums.tipo_usuario
    modalidades?: JsonNullableFilter<"usuarios">
    membros_time?: Membros_timeListRelationFilter
    cursos?: XOR<CursosNullableScalarRelationFilter, cursosWhereInput> | null
  }

  export type usuariosOrderByWithRelationInput = {
    id?: SortOrder
    rm?: SortOrder
    nome?: SortOrder
    data_nascimento?: SortOrderInput | SortOrder
    curso_id?: SortOrderInput | SortOrder
    email?: SortOrder
    senha?: SortOrder
    telefone?: SortOrder
    foto_perfil?: SortOrderInput | SortOrder
    criado_em?: SortOrder
    atualizado_em?: SortOrder
    codigo_verificacao?: SortOrderInput | SortOrder
    codigo_gerado_em?: SortOrderInput | SortOrder
    tentativas_login?: SortOrder
    tipo_usuario?: SortOrder
    modalidades?: SortOrderInput | SortOrder
    membros_time?: membros_timeOrderByRelationAggregateInput
    cursos?: cursosOrderByWithRelationInput
  }

  export type usuariosWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    rm?: string
    email?: string
    AND?: usuariosWhereInput | usuariosWhereInput[]
    OR?: usuariosWhereInput[]
    NOT?: usuariosWhereInput | usuariosWhereInput[]
    nome?: StringFilter<"usuarios"> | string
    data_nascimento?: DateTimeNullableFilter<"usuarios"> | Date | string | null
    curso_id?: IntNullableFilter<"usuarios"> | number | null
    senha?: StringFilter<"usuarios"> | string
    telefone?: StringFilter<"usuarios"> | string
    foto_perfil?: StringNullableFilter<"usuarios"> | string | null
    criado_em?: DateTimeFilter<"usuarios"> | Date | string
    atualizado_em?: DateTimeFilter<"usuarios"> | Date | string
    codigo_verificacao?: IntNullableFilter<"usuarios"> | number | null
    codigo_gerado_em?: DateTimeNullableFilter<"usuarios"> | Date | string | null
    tentativas_login?: IntFilter<"usuarios"> | number
    tipo_usuario?: Enumtipo_usuarioFilter<"usuarios"> | $Enums.tipo_usuario
    modalidades?: JsonNullableFilter<"usuarios">
    membros_time?: Membros_timeListRelationFilter
    cursos?: XOR<CursosNullableScalarRelationFilter, cursosWhereInput> | null
  }, "id" | "rm" | "email">

  export type usuariosOrderByWithAggregationInput = {
    id?: SortOrder
    rm?: SortOrder
    nome?: SortOrder
    data_nascimento?: SortOrderInput | SortOrder
    curso_id?: SortOrderInput | SortOrder
    email?: SortOrder
    senha?: SortOrder
    telefone?: SortOrder
    foto_perfil?: SortOrderInput | SortOrder
    criado_em?: SortOrder
    atualizado_em?: SortOrder
    codigo_verificacao?: SortOrderInput | SortOrder
    codigo_gerado_em?: SortOrderInput | SortOrder
    tentativas_login?: SortOrder
    tipo_usuario?: SortOrder
    modalidades?: SortOrderInput | SortOrder
    _count?: usuariosCountOrderByAggregateInput
    _avg?: usuariosAvgOrderByAggregateInput
    _max?: usuariosMaxOrderByAggregateInput
    _min?: usuariosMinOrderByAggregateInput
    _sum?: usuariosSumOrderByAggregateInput
  }

  export type usuariosScalarWhereWithAggregatesInput = {
    AND?: usuariosScalarWhereWithAggregatesInput | usuariosScalarWhereWithAggregatesInput[]
    OR?: usuariosScalarWhereWithAggregatesInput[]
    NOT?: usuariosScalarWhereWithAggregatesInput | usuariosScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"usuarios"> | number
    rm?: StringWithAggregatesFilter<"usuarios"> | string
    nome?: StringWithAggregatesFilter<"usuarios"> | string
    data_nascimento?: DateTimeNullableWithAggregatesFilter<"usuarios"> | Date | string | null
    curso_id?: IntNullableWithAggregatesFilter<"usuarios"> | number | null
    email?: StringWithAggregatesFilter<"usuarios"> | string
    senha?: StringWithAggregatesFilter<"usuarios"> | string
    telefone?: StringWithAggregatesFilter<"usuarios"> | string
    foto_perfil?: StringNullableWithAggregatesFilter<"usuarios"> | string | null
    criado_em?: DateTimeWithAggregatesFilter<"usuarios"> | Date | string
    atualizado_em?: DateTimeWithAggregatesFilter<"usuarios"> | Date | string
    codigo_verificacao?: IntNullableWithAggregatesFilter<"usuarios"> | number | null
    codigo_gerado_em?: DateTimeNullableWithAggregatesFilter<"usuarios"> | Date | string | null
    tentativas_login?: IntWithAggregatesFilter<"usuarios"> | number
    tipo_usuario?: Enumtipo_usuarioWithAggregatesFilter<"usuarios"> | $Enums.tipo_usuario
    modalidades?: JsonNullableWithAggregatesFilter<"usuarios">
  }

  export type timesWhereInput = {
    AND?: timesWhereInput | timesWhereInput[]
    OR?: timesWhereInput[]
    NOT?: timesWhereInput | timesWhereInput[]
    id?: IntFilter<"times"> | number
    nome?: StringFilter<"times"> | string
    modalidades?: Enumtipo_modalidadeNullableFilter<"times"> | $Enums.tipo_modalidade | null
    membros_time?: Membros_timeListRelationFilter
  }

  export type timesOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    modalidades?: SortOrderInput | SortOrder
    membros_time?: membros_timeOrderByRelationAggregateInput
  }

  export type timesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nome?: string
    AND?: timesWhereInput | timesWhereInput[]
    OR?: timesWhereInput[]
    NOT?: timesWhereInput | timesWhereInput[]
    modalidades?: Enumtipo_modalidadeNullableFilter<"times"> | $Enums.tipo_modalidade | null
    membros_time?: Membros_timeListRelationFilter
  }, "id" | "nome">

  export type timesOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    modalidades?: SortOrderInput | SortOrder
    _count?: timesCountOrderByAggregateInput
    _avg?: timesAvgOrderByAggregateInput
    _max?: timesMaxOrderByAggregateInput
    _min?: timesMinOrderByAggregateInput
    _sum?: timesSumOrderByAggregateInput
  }

  export type timesScalarWhereWithAggregatesInput = {
    AND?: timesScalarWhereWithAggregatesInput | timesScalarWhereWithAggregatesInput[]
    OR?: timesScalarWhereWithAggregatesInput[]
    NOT?: timesScalarWhereWithAggregatesInput | timesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"times"> | number
    nome?: StringWithAggregatesFilter<"times"> | string
    modalidades?: Enumtipo_modalidadeNullableWithAggregatesFilter<"times"> | $Enums.tipo_modalidade | null
  }

  export type membros_timeWhereInput = {
    AND?: membros_timeWhereInput | membros_timeWhereInput[]
    OR?: membros_timeWhereInput[]
    NOT?: membros_timeWhereInput | membros_timeWhereInput[]
    time_id?: IntFilter<"membros_time"> | number
    membro_id?: IntFilter<"membros_time"> | number
    funcao?: Enumtipo_funcaoNullableFilter<"membros_time"> | $Enums.tipo_funcao | null
    usuarios?: XOR<UsuariosScalarRelationFilter, usuariosWhereInput>
    times?: XOR<TimesScalarRelationFilter, timesWhereInput>
  }

  export type membros_timeOrderByWithRelationInput = {
    time_id?: SortOrder
    membro_id?: SortOrder
    funcao?: SortOrderInput | SortOrder
    usuarios?: usuariosOrderByWithRelationInput
    times?: timesOrderByWithRelationInput
  }

  export type membros_timeWhereUniqueInput = Prisma.AtLeast<{
    time_id_membro_id?: membros_timeTime_idMembro_idCompoundUniqueInput
    AND?: membros_timeWhereInput | membros_timeWhereInput[]
    OR?: membros_timeWhereInput[]
    NOT?: membros_timeWhereInput | membros_timeWhereInput[]
    time_id?: IntFilter<"membros_time"> | number
    membro_id?: IntFilter<"membros_time"> | number
    funcao?: Enumtipo_funcaoNullableFilter<"membros_time"> | $Enums.tipo_funcao | null
    usuarios?: XOR<UsuariosScalarRelationFilter, usuariosWhereInput>
    times?: XOR<TimesScalarRelationFilter, timesWhereInput>
  }, "time_id_membro_id">

  export type membros_timeOrderByWithAggregationInput = {
    time_id?: SortOrder
    membro_id?: SortOrder
    funcao?: SortOrderInput | SortOrder
    _count?: membros_timeCountOrderByAggregateInput
    _avg?: membros_timeAvgOrderByAggregateInput
    _max?: membros_timeMaxOrderByAggregateInput
    _min?: membros_timeMinOrderByAggregateInput
    _sum?: membros_timeSumOrderByAggregateInput
  }

  export type membros_timeScalarWhereWithAggregatesInput = {
    AND?: membros_timeScalarWhereWithAggregatesInput | membros_timeScalarWhereWithAggregatesInput[]
    OR?: membros_timeScalarWhereWithAggregatesInput[]
    NOT?: membros_timeScalarWhereWithAggregatesInput | membros_timeScalarWhereWithAggregatesInput[]
    time_id?: IntWithAggregatesFilter<"membros_time"> | number
    membro_id?: IntWithAggregatesFilter<"membros_time"> | number
    funcao?: Enumtipo_funcaoNullableWithAggregatesFilter<"membros_time"> | $Enums.tipo_funcao | null
  }

  export type cursosCreateInput = {
    sigla: string
    ano: number
    nome: string
    periodo: number
    usuarios?: usuariosCreateNestedManyWithoutCursosInput
  }

  export type cursosUncheckedCreateInput = {
    id?: number
    sigla: string
    ano: number
    nome: string
    periodo: number
    usuarios?: usuariosUncheckedCreateNestedManyWithoutCursosInput
  }

  export type cursosUpdateInput = {
    sigla?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    periodo?: IntFieldUpdateOperationsInput | number
    usuarios?: usuariosUpdateManyWithoutCursosNestedInput
  }

  export type cursosUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    sigla?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    periodo?: IntFieldUpdateOperationsInput | number
    usuarios?: usuariosUncheckedUpdateManyWithoutCursosNestedInput
  }

  export type cursosCreateManyInput = {
    id?: number
    sigla: string
    ano: number
    nome: string
    periodo: number
  }

  export type cursosUpdateManyMutationInput = {
    sigla?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    periodo?: IntFieldUpdateOperationsInput | number
  }

  export type cursosUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    sigla?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    periodo?: IntFieldUpdateOperationsInput | number
  }

  export type usuariosCreateInput = {
    rm: string
    nome: string
    data_nascimento?: Date | string | null
    email: string
    senha: string
    telefone: string
    foto_perfil?: string | null
    criado_em?: Date | string
    atualizado_em?: Date | string
    codigo_verificacao?: number | null
    codigo_gerado_em?: Date | string | null
    tentativas_login?: number
    tipo_usuario?: $Enums.tipo_usuario
    modalidades?: NullableJsonNullValueInput | InputJsonValue
    membros_time?: membros_timeCreateNestedManyWithoutUsuariosInput
    cursos?: cursosCreateNestedOneWithoutUsuariosInput
  }

  export type usuariosUncheckedCreateInput = {
    id?: number
    rm: string
    nome: string
    data_nascimento?: Date | string | null
    curso_id?: number | null
    email: string
    senha: string
    telefone: string
    foto_perfil?: string | null
    criado_em?: Date | string
    atualizado_em?: Date | string
    codigo_verificacao?: number | null
    codigo_gerado_em?: Date | string | null
    tentativas_login?: number
    tipo_usuario?: $Enums.tipo_usuario
    modalidades?: NullableJsonNullValueInput | InputJsonValue
    membros_time?: membros_timeUncheckedCreateNestedManyWithoutUsuariosInput
  }

  export type usuariosUpdateInput = {
    rm?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    foto_perfil?: NullableStringFieldUpdateOperationsInput | string | null
    criado_em?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizado_em?: DateTimeFieldUpdateOperationsInput | Date | string
    codigo_verificacao?: NullableIntFieldUpdateOperationsInput | number | null
    codigo_gerado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tentativas_login?: IntFieldUpdateOperationsInput | number
    tipo_usuario?: Enumtipo_usuarioFieldUpdateOperationsInput | $Enums.tipo_usuario
    modalidades?: NullableJsonNullValueInput | InputJsonValue
    membros_time?: membros_timeUpdateManyWithoutUsuariosNestedInput
    cursos?: cursosUpdateOneWithoutUsuariosNestedInput
  }

  export type usuariosUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    rm?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    curso_id?: NullableIntFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    foto_perfil?: NullableStringFieldUpdateOperationsInput | string | null
    criado_em?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizado_em?: DateTimeFieldUpdateOperationsInput | Date | string
    codigo_verificacao?: NullableIntFieldUpdateOperationsInput | number | null
    codigo_gerado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tentativas_login?: IntFieldUpdateOperationsInput | number
    tipo_usuario?: Enumtipo_usuarioFieldUpdateOperationsInput | $Enums.tipo_usuario
    modalidades?: NullableJsonNullValueInput | InputJsonValue
    membros_time?: membros_timeUncheckedUpdateManyWithoutUsuariosNestedInput
  }

  export type usuariosCreateManyInput = {
    id?: number
    rm: string
    nome: string
    data_nascimento?: Date | string | null
    curso_id?: number | null
    email: string
    senha: string
    telefone: string
    foto_perfil?: string | null
    criado_em?: Date | string
    atualizado_em?: Date | string
    codigo_verificacao?: number | null
    codigo_gerado_em?: Date | string | null
    tentativas_login?: number
    tipo_usuario?: $Enums.tipo_usuario
    modalidades?: NullableJsonNullValueInput | InputJsonValue
  }

  export type usuariosUpdateManyMutationInput = {
    rm?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    foto_perfil?: NullableStringFieldUpdateOperationsInput | string | null
    criado_em?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizado_em?: DateTimeFieldUpdateOperationsInput | Date | string
    codigo_verificacao?: NullableIntFieldUpdateOperationsInput | number | null
    codigo_gerado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tentativas_login?: IntFieldUpdateOperationsInput | number
    tipo_usuario?: Enumtipo_usuarioFieldUpdateOperationsInput | $Enums.tipo_usuario
    modalidades?: NullableJsonNullValueInput | InputJsonValue
  }

  export type usuariosUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    rm?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    curso_id?: NullableIntFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    foto_perfil?: NullableStringFieldUpdateOperationsInput | string | null
    criado_em?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizado_em?: DateTimeFieldUpdateOperationsInput | Date | string
    codigo_verificacao?: NullableIntFieldUpdateOperationsInput | number | null
    codigo_gerado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tentativas_login?: IntFieldUpdateOperationsInput | number
    tipo_usuario?: Enumtipo_usuarioFieldUpdateOperationsInput | $Enums.tipo_usuario
    modalidades?: NullableJsonNullValueInput | InputJsonValue
  }

  export type timesCreateInput = {
    nome: string
    modalidades?: $Enums.tipo_modalidade | null
    membros_time?: membros_timeCreateNestedManyWithoutTimesInput
  }

  export type timesUncheckedCreateInput = {
    id?: number
    nome: string
    modalidades?: $Enums.tipo_modalidade | null
    membros_time?: membros_timeUncheckedCreateNestedManyWithoutTimesInput
  }

  export type timesUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    modalidades?: NullableEnumtipo_modalidadeFieldUpdateOperationsInput | $Enums.tipo_modalidade | null
    membros_time?: membros_timeUpdateManyWithoutTimesNestedInput
  }

  export type timesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    modalidades?: NullableEnumtipo_modalidadeFieldUpdateOperationsInput | $Enums.tipo_modalidade | null
    membros_time?: membros_timeUncheckedUpdateManyWithoutTimesNestedInput
  }

  export type timesCreateManyInput = {
    id?: number
    nome: string
    modalidades?: $Enums.tipo_modalidade | null
  }

  export type timesUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    modalidades?: NullableEnumtipo_modalidadeFieldUpdateOperationsInput | $Enums.tipo_modalidade | null
  }

  export type timesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    modalidades?: NullableEnumtipo_modalidadeFieldUpdateOperationsInput | $Enums.tipo_modalidade | null
  }

  export type membros_timeCreateInput = {
    funcao?: $Enums.tipo_funcao | null
    usuarios: usuariosCreateNestedOneWithoutMembros_timeInput
    times: timesCreateNestedOneWithoutMembros_timeInput
  }

  export type membros_timeUncheckedCreateInput = {
    time_id: number
    membro_id: number
    funcao?: $Enums.tipo_funcao | null
  }

  export type membros_timeUpdateInput = {
    funcao?: NullableEnumtipo_funcaoFieldUpdateOperationsInput | $Enums.tipo_funcao | null
    usuarios?: usuariosUpdateOneRequiredWithoutMembros_timeNestedInput
    times?: timesUpdateOneRequiredWithoutMembros_timeNestedInput
  }

  export type membros_timeUncheckedUpdateInput = {
    time_id?: IntFieldUpdateOperationsInput | number
    membro_id?: IntFieldUpdateOperationsInput | number
    funcao?: NullableEnumtipo_funcaoFieldUpdateOperationsInput | $Enums.tipo_funcao | null
  }

  export type membros_timeCreateManyInput = {
    time_id: number
    membro_id: number
    funcao?: $Enums.tipo_funcao | null
  }

  export type membros_timeUpdateManyMutationInput = {
    funcao?: NullableEnumtipo_funcaoFieldUpdateOperationsInput | $Enums.tipo_funcao | null
  }

  export type membros_timeUncheckedUpdateManyInput = {
    time_id?: IntFieldUpdateOperationsInput | number
    membro_id?: IntFieldUpdateOperationsInput | number
    funcao?: NullableEnumtipo_funcaoFieldUpdateOperationsInput | $Enums.tipo_funcao | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type UsuariosListRelationFilter = {
    every?: usuariosWhereInput
    some?: usuariosWhereInput
    none?: usuariosWhereInput
  }

  export type usuariosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type cursosCountOrderByAggregateInput = {
    id?: SortOrder
    sigla?: SortOrder
    ano?: SortOrder
    nome?: SortOrder
    periodo?: SortOrder
  }

  export type cursosAvgOrderByAggregateInput = {
    id?: SortOrder
    ano?: SortOrder
    periodo?: SortOrder
  }

  export type cursosMaxOrderByAggregateInput = {
    id?: SortOrder
    sigla?: SortOrder
    ano?: SortOrder
    nome?: SortOrder
    periodo?: SortOrder
  }

  export type cursosMinOrderByAggregateInput = {
    id?: SortOrder
    sigla?: SortOrder
    ano?: SortOrder
    nome?: SortOrder
    periodo?: SortOrder
  }

  export type cursosSumOrderByAggregateInput = {
    id?: SortOrder
    ano?: SortOrder
    periodo?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type Enumtipo_usuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.tipo_usuario | Enumtipo_usuarioFieldRefInput<$PrismaModel>
    in?: $Enums.tipo_usuario[] | ListEnumtipo_usuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.tipo_usuario[] | ListEnumtipo_usuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumtipo_usuarioFilter<$PrismaModel> | $Enums.tipo_usuario
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type Membros_timeListRelationFilter = {
    every?: membros_timeWhereInput
    some?: membros_timeWhereInput
    none?: membros_timeWhereInput
  }

  export type CursosNullableScalarRelationFilter = {
    is?: cursosWhereInput | null
    isNot?: cursosWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type membros_timeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usuariosCountOrderByAggregateInput = {
    id?: SortOrder
    rm?: SortOrder
    nome?: SortOrder
    data_nascimento?: SortOrder
    curso_id?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    telefone?: SortOrder
    foto_perfil?: SortOrder
    criado_em?: SortOrder
    atualizado_em?: SortOrder
    codigo_verificacao?: SortOrder
    codigo_gerado_em?: SortOrder
    tentativas_login?: SortOrder
    tipo_usuario?: SortOrder
    modalidades?: SortOrder
  }

  export type usuariosAvgOrderByAggregateInput = {
    id?: SortOrder
    curso_id?: SortOrder
    codigo_verificacao?: SortOrder
    tentativas_login?: SortOrder
  }

  export type usuariosMaxOrderByAggregateInput = {
    id?: SortOrder
    rm?: SortOrder
    nome?: SortOrder
    data_nascimento?: SortOrder
    curso_id?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    telefone?: SortOrder
    foto_perfil?: SortOrder
    criado_em?: SortOrder
    atualizado_em?: SortOrder
    codigo_verificacao?: SortOrder
    codigo_gerado_em?: SortOrder
    tentativas_login?: SortOrder
    tipo_usuario?: SortOrder
  }

  export type usuariosMinOrderByAggregateInput = {
    id?: SortOrder
    rm?: SortOrder
    nome?: SortOrder
    data_nascimento?: SortOrder
    curso_id?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    telefone?: SortOrder
    foto_perfil?: SortOrder
    criado_em?: SortOrder
    atualizado_em?: SortOrder
    codigo_verificacao?: SortOrder
    codigo_gerado_em?: SortOrder
    tentativas_login?: SortOrder
    tipo_usuario?: SortOrder
  }

  export type usuariosSumOrderByAggregateInput = {
    id?: SortOrder
    curso_id?: SortOrder
    codigo_verificacao?: SortOrder
    tentativas_login?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Enumtipo_usuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.tipo_usuario | Enumtipo_usuarioFieldRefInput<$PrismaModel>
    in?: $Enums.tipo_usuario[] | ListEnumtipo_usuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.tipo_usuario[] | ListEnumtipo_usuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumtipo_usuarioWithAggregatesFilter<$PrismaModel> | $Enums.tipo_usuario
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumtipo_usuarioFilter<$PrismaModel>
    _max?: NestedEnumtipo_usuarioFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type Enumtipo_modalidadeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.tipo_modalidade | Enumtipo_modalidadeFieldRefInput<$PrismaModel> | null
    in?: $Enums.tipo_modalidade[] | ListEnumtipo_modalidadeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.tipo_modalidade[] | ListEnumtipo_modalidadeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumtipo_modalidadeNullableFilter<$PrismaModel> | $Enums.tipo_modalidade | null
  }

  export type timesCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    modalidades?: SortOrder
  }

  export type timesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type timesMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    modalidades?: SortOrder
  }

  export type timesMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    modalidades?: SortOrder
  }

  export type timesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type Enumtipo_modalidadeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.tipo_modalidade | Enumtipo_modalidadeFieldRefInput<$PrismaModel> | null
    in?: $Enums.tipo_modalidade[] | ListEnumtipo_modalidadeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.tipo_modalidade[] | ListEnumtipo_modalidadeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumtipo_modalidadeNullableWithAggregatesFilter<$PrismaModel> | $Enums.tipo_modalidade | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumtipo_modalidadeNullableFilter<$PrismaModel>
    _max?: NestedEnumtipo_modalidadeNullableFilter<$PrismaModel>
  }

  export type Enumtipo_funcaoNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.tipo_funcao | Enumtipo_funcaoFieldRefInput<$PrismaModel> | null
    in?: $Enums.tipo_funcao[] | ListEnumtipo_funcaoFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.tipo_funcao[] | ListEnumtipo_funcaoFieldRefInput<$PrismaModel> | null
    not?: NestedEnumtipo_funcaoNullableFilter<$PrismaModel> | $Enums.tipo_funcao | null
  }

  export type UsuariosScalarRelationFilter = {
    is?: usuariosWhereInput
    isNot?: usuariosWhereInput
  }

  export type TimesScalarRelationFilter = {
    is?: timesWhereInput
    isNot?: timesWhereInput
  }

  export type membros_timeTime_idMembro_idCompoundUniqueInput = {
    time_id: number
    membro_id: number
  }

  export type membros_timeCountOrderByAggregateInput = {
    time_id?: SortOrder
    membro_id?: SortOrder
    funcao?: SortOrder
  }

  export type membros_timeAvgOrderByAggregateInput = {
    time_id?: SortOrder
    membro_id?: SortOrder
  }

  export type membros_timeMaxOrderByAggregateInput = {
    time_id?: SortOrder
    membro_id?: SortOrder
    funcao?: SortOrder
  }

  export type membros_timeMinOrderByAggregateInput = {
    time_id?: SortOrder
    membro_id?: SortOrder
    funcao?: SortOrder
  }

  export type membros_timeSumOrderByAggregateInput = {
    time_id?: SortOrder
    membro_id?: SortOrder
  }

  export type Enumtipo_funcaoNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.tipo_funcao | Enumtipo_funcaoFieldRefInput<$PrismaModel> | null
    in?: $Enums.tipo_funcao[] | ListEnumtipo_funcaoFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.tipo_funcao[] | ListEnumtipo_funcaoFieldRefInput<$PrismaModel> | null
    not?: NestedEnumtipo_funcaoNullableWithAggregatesFilter<$PrismaModel> | $Enums.tipo_funcao | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumtipo_funcaoNullableFilter<$PrismaModel>
    _max?: NestedEnumtipo_funcaoNullableFilter<$PrismaModel>
  }

  export type usuariosCreateNestedManyWithoutCursosInput = {
    create?: XOR<usuariosCreateWithoutCursosInput, usuariosUncheckedCreateWithoutCursosInput> | usuariosCreateWithoutCursosInput[] | usuariosUncheckedCreateWithoutCursosInput[]
    connectOrCreate?: usuariosCreateOrConnectWithoutCursosInput | usuariosCreateOrConnectWithoutCursosInput[]
    createMany?: usuariosCreateManyCursosInputEnvelope
    connect?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
  }

  export type usuariosUncheckedCreateNestedManyWithoutCursosInput = {
    create?: XOR<usuariosCreateWithoutCursosInput, usuariosUncheckedCreateWithoutCursosInput> | usuariosCreateWithoutCursosInput[] | usuariosUncheckedCreateWithoutCursosInput[]
    connectOrCreate?: usuariosCreateOrConnectWithoutCursosInput | usuariosCreateOrConnectWithoutCursosInput[]
    createMany?: usuariosCreateManyCursosInputEnvelope
    connect?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type usuariosUpdateManyWithoutCursosNestedInput = {
    create?: XOR<usuariosCreateWithoutCursosInput, usuariosUncheckedCreateWithoutCursosInput> | usuariosCreateWithoutCursosInput[] | usuariosUncheckedCreateWithoutCursosInput[]
    connectOrCreate?: usuariosCreateOrConnectWithoutCursosInput | usuariosCreateOrConnectWithoutCursosInput[]
    upsert?: usuariosUpsertWithWhereUniqueWithoutCursosInput | usuariosUpsertWithWhereUniqueWithoutCursosInput[]
    createMany?: usuariosCreateManyCursosInputEnvelope
    set?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
    disconnect?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
    delete?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
    connect?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
    update?: usuariosUpdateWithWhereUniqueWithoutCursosInput | usuariosUpdateWithWhereUniqueWithoutCursosInput[]
    updateMany?: usuariosUpdateManyWithWhereWithoutCursosInput | usuariosUpdateManyWithWhereWithoutCursosInput[]
    deleteMany?: usuariosScalarWhereInput | usuariosScalarWhereInput[]
  }

  export type usuariosUncheckedUpdateManyWithoutCursosNestedInput = {
    create?: XOR<usuariosCreateWithoutCursosInput, usuariosUncheckedCreateWithoutCursosInput> | usuariosCreateWithoutCursosInput[] | usuariosUncheckedCreateWithoutCursosInput[]
    connectOrCreate?: usuariosCreateOrConnectWithoutCursosInput | usuariosCreateOrConnectWithoutCursosInput[]
    upsert?: usuariosUpsertWithWhereUniqueWithoutCursosInput | usuariosUpsertWithWhereUniqueWithoutCursosInput[]
    createMany?: usuariosCreateManyCursosInputEnvelope
    set?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
    disconnect?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
    delete?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
    connect?: usuariosWhereUniqueInput | usuariosWhereUniqueInput[]
    update?: usuariosUpdateWithWhereUniqueWithoutCursosInput | usuariosUpdateWithWhereUniqueWithoutCursosInput[]
    updateMany?: usuariosUpdateManyWithWhereWithoutCursosInput | usuariosUpdateManyWithWhereWithoutCursosInput[]
    deleteMany?: usuariosScalarWhereInput | usuariosScalarWhereInput[]
  }

  export type membros_timeCreateNestedManyWithoutUsuariosInput = {
    create?: XOR<membros_timeCreateWithoutUsuariosInput, membros_timeUncheckedCreateWithoutUsuariosInput> | membros_timeCreateWithoutUsuariosInput[] | membros_timeUncheckedCreateWithoutUsuariosInput[]
    connectOrCreate?: membros_timeCreateOrConnectWithoutUsuariosInput | membros_timeCreateOrConnectWithoutUsuariosInput[]
    createMany?: membros_timeCreateManyUsuariosInputEnvelope
    connect?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
  }

  export type cursosCreateNestedOneWithoutUsuariosInput = {
    create?: XOR<cursosCreateWithoutUsuariosInput, cursosUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: cursosCreateOrConnectWithoutUsuariosInput
    connect?: cursosWhereUniqueInput
  }

  export type membros_timeUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: XOR<membros_timeCreateWithoutUsuariosInput, membros_timeUncheckedCreateWithoutUsuariosInput> | membros_timeCreateWithoutUsuariosInput[] | membros_timeUncheckedCreateWithoutUsuariosInput[]
    connectOrCreate?: membros_timeCreateOrConnectWithoutUsuariosInput | membros_timeCreateOrConnectWithoutUsuariosInput[]
    createMany?: membros_timeCreateManyUsuariosInputEnvelope
    connect?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type Enumtipo_usuarioFieldUpdateOperationsInput = {
    set?: $Enums.tipo_usuario
  }

  export type membros_timeUpdateManyWithoutUsuariosNestedInput = {
    create?: XOR<membros_timeCreateWithoutUsuariosInput, membros_timeUncheckedCreateWithoutUsuariosInput> | membros_timeCreateWithoutUsuariosInput[] | membros_timeUncheckedCreateWithoutUsuariosInput[]
    connectOrCreate?: membros_timeCreateOrConnectWithoutUsuariosInput | membros_timeCreateOrConnectWithoutUsuariosInput[]
    upsert?: membros_timeUpsertWithWhereUniqueWithoutUsuariosInput | membros_timeUpsertWithWhereUniqueWithoutUsuariosInput[]
    createMany?: membros_timeCreateManyUsuariosInputEnvelope
    set?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
    disconnect?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
    delete?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
    connect?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
    update?: membros_timeUpdateWithWhereUniqueWithoutUsuariosInput | membros_timeUpdateWithWhereUniqueWithoutUsuariosInput[]
    updateMany?: membros_timeUpdateManyWithWhereWithoutUsuariosInput | membros_timeUpdateManyWithWhereWithoutUsuariosInput[]
    deleteMany?: membros_timeScalarWhereInput | membros_timeScalarWhereInput[]
  }

  export type cursosUpdateOneWithoutUsuariosNestedInput = {
    create?: XOR<cursosCreateWithoutUsuariosInput, cursosUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: cursosCreateOrConnectWithoutUsuariosInput
    upsert?: cursosUpsertWithoutUsuariosInput
    disconnect?: cursosWhereInput | boolean
    delete?: cursosWhereInput | boolean
    connect?: cursosWhereUniqueInput
    update?: XOR<XOR<cursosUpdateToOneWithWhereWithoutUsuariosInput, cursosUpdateWithoutUsuariosInput>, cursosUncheckedUpdateWithoutUsuariosInput>
  }

  export type membros_timeUncheckedUpdateManyWithoutUsuariosNestedInput = {
    create?: XOR<membros_timeCreateWithoutUsuariosInput, membros_timeUncheckedCreateWithoutUsuariosInput> | membros_timeCreateWithoutUsuariosInput[] | membros_timeUncheckedCreateWithoutUsuariosInput[]
    connectOrCreate?: membros_timeCreateOrConnectWithoutUsuariosInput | membros_timeCreateOrConnectWithoutUsuariosInput[]
    upsert?: membros_timeUpsertWithWhereUniqueWithoutUsuariosInput | membros_timeUpsertWithWhereUniqueWithoutUsuariosInput[]
    createMany?: membros_timeCreateManyUsuariosInputEnvelope
    set?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
    disconnect?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
    delete?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
    connect?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
    update?: membros_timeUpdateWithWhereUniqueWithoutUsuariosInput | membros_timeUpdateWithWhereUniqueWithoutUsuariosInput[]
    updateMany?: membros_timeUpdateManyWithWhereWithoutUsuariosInput | membros_timeUpdateManyWithWhereWithoutUsuariosInput[]
    deleteMany?: membros_timeScalarWhereInput | membros_timeScalarWhereInput[]
  }

  export type membros_timeCreateNestedManyWithoutTimesInput = {
    create?: XOR<membros_timeCreateWithoutTimesInput, membros_timeUncheckedCreateWithoutTimesInput> | membros_timeCreateWithoutTimesInput[] | membros_timeUncheckedCreateWithoutTimesInput[]
    connectOrCreate?: membros_timeCreateOrConnectWithoutTimesInput | membros_timeCreateOrConnectWithoutTimesInput[]
    createMany?: membros_timeCreateManyTimesInputEnvelope
    connect?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
  }

  export type membros_timeUncheckedCreateNestedManyWithoutTimesInput = {
    create?: XOR<membros_timeCreateWithoutTimesInput, membros_timeUncheckedCreateWithoutTimesInput> | membros_timeCreateWithoutTimesInput[] | membros_timeUncheckedCreateWithoutTimesInput[]
    connectOrCreate?: membros_timeCreateOrConnectWithoutTimesInput | membros_timeCreateOrConnectWithoutTimesInput[]
    createMany?: membros_timeCreateManyTimesInputEnvelope
    connect?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
  }

  export type NullableEnumtipo_modalidadeFieldUpdateOperationsInput = {
    set?: $Enums.tipo_modalidade | null
  }

  export type membros_timeUpdateManyWithoutTimesNestedInput = {
    create?: XOR<membros_timeCreateWithoutTimesInput, membros_timeUncheckedCreateWithoutTimesInput> | membros_timeCreateWithoutTimesInput[] | membros_timeUncheckedCreateWithoutTimesInput[]
    connectOrCreate?: membros_timeCreateOrConnectWithoutTimesInput | membros_timeCreateOrConnectWithoutTimesInput[]
    upsert?: membros_timeUpsertWithWhereUniqueWithoutTimesInput | membros_timeUpsertWithWhereUniqueWithoutTimesInput[]
    createMany?: membros_timeCreateManyTimesInputEnvelope
    set?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
    disconnect?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
    delete?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
    connect?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
    update?: membros_timeUpdateWithWhereUniqueWithoutTimesInput | membros_timeUpdateWithWhereUniqueWithoutTimesInput[]
    updateMany?: membros_timeUpdateManyWithWhereWithoutTimesInput | membros_timeUpdateManyWithWhereWithoutTimesInput[]
    deleteMany?: membros_timeScalarWhereInput | membros_timeScalarWhereInput[]
  }

  export type membros_timeUncheckedUpdateManyWithoutTimesNestedInput = {
    create?: XOR<membros_timeCreateWithoutTimesInput, membros_timeUncheckedCreateWithoutTimesInput> | membros_timeCreateWithoutTimesInput[] | membros_timeUncheckedCreateWithoutTimesInput[]
    connectOrCreate?: membros_timeCreateOrConnectWithoutTimesInput | membros_timeCreateOrConnectWithoutTimesInput[]
    upsert?: membros_timeUpsertWithWhereUniqueWithoutTimesInput | membros_timeUpsertWithWhereUniqueWithoutTimesInput[]
    createMany?: membros_timeCreateManyTimesInputEnvelope
    set?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
    disconnect?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
    delete?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
    connect?: membros_timeWhereUniqueInput | membros_timeWhereUniqueInput[]
    update?: membros_timeUpdateWithWhereUniqueWithoutTimesInput | membros_timeUpdateWithWhereUniqueWithoutTimesInput[]
    updateMany?: membros_timeUpdateManyWithWhereWithoutTimesInput | membros_timeUpdateManyWithWhereWithoutTimesInput[]
    deleteMany?: membros_timeScalarWhereInput | membros_timeScalarWhereInput[]
  }

  export type usuariosCreateNestedOneWithoutMembros_timeInput = {
    create?: XOR<usuariosCreateWithoutMembros_timeInput, usuariosUncheckedCreateWithoutMembros_timeInput>
    connectOrCreate?: usuariosCreateOrConnectWithoutMembros_timeInput
    connect?: usuariosWhereUniqueInput
  }

  export type timesCreateNestedOneWithoutMembros_timeInput = {
    create?: XOR<timesCreateWithoutMembros_timeInput, timesUncheckedCreateWithoutMembros_timeInput>
    connectOrCreate?: timesCreateOrConnectWithoutMembros_timeInput
    connect?: timesWhereUniqueInput
  }

  export type NullableEnumtipo_funcaoFieldUpdateOperationsInput = {
    set?: $Enums.tipo_funcao | null
  }

  export type usuariosUpdateOneRequiredWithoutMembros_timeNestedInput = {
    create?: XOR<usuariosCreateWithoutMembros_timeInput, usuariosUncheckedCreateWithoutMembros_timeInput>
    connectOrCreate?: usuariosCreateOrConnectWithoutMembros_timeInput
    upsert?: usuariosUpsertWithoutMembros_timeInput
    connect?: usuariosWhereUniqueInput
    update?: XOR<XOR<usuariosUpdateToOneWithWhereWithoutMembros_timeInput, usuariosUpdateWithoutMembros_timeInput>, usuariosUncheckedUpdateWithoutMembros_timeInput>
  }

  export type timesUpdateOneRequiredWithoutMembros_timeNestedInput = {
    create?: XOR<timesCreateWithoutMembros_timeInput, timesUncheckedCreateWithoutMembros_timeInput>
    connectOrCreate?: timesCreateOrConnectWithoutMembros_timeInput
    upsert?: timesUpsertWithoutMembros_timeInput
    connect?: timesWhereUniqueInput
    update?: XOR<XOR<timesUpdateToOneWithWhereWithoutMembros_timeInput, timesUpdateWithoutMembros_timeInput>, timesUncheckedUpdateWithoutMembros_timeInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumtipo_usuarioFilter<$PrismaModel = never> = {
    equals?: $Enums.tipo_usuario | Enumtipo_usuarioFieldRefInput<$PrismaModel>
    in?: $Enums.tipo_usuario[] | ListEnumtipo_usuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.tipo_usuario[] | ListEnumtipo_usuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumtipo_usuarioFilter<$PrismaModel> | $Enums.tipo_usuario
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumtipo_usuarioWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.tipo_usuario | Enumtipo_usuarioFieldRefInput<$PrismaModel>
    in?: $Enums.tipo_usuario[] | ListEnumtipo_usuarioFieldRefInput<$PrismaModel>
    notIn?: $Enums.tipo_usuario[] | ListEnumtipo_usuarioFieldRefInput<$PrismaModel>
    not?: NestedEnumtipo_usuarioWithAggregatesFilter<$PrismaModel> | $Enums.tipo_usuario
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumtipo_usuarioFilter<$PrismaModel>
    _max?: NestedEnumtipo_usuarioFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumtipo_modalidadeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.tipo_modalidade | Enumtipo_modalidadeFieldRefInput<$PrismaModel> | null
    in?: $Enums.tipo_modalidade[] | ListEnumtipo_modalidadeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.tipo_modalidade[] | ListEnumtipo_modalidadeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumtipo_modalidadeNullableFilter<$PrismaModel> | $Enums.tipo_modalidade | null
  }

  export type NestedEnumtipo_modalidadeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.tipo_modalidade | Enumtipo_modalidadeFieldRefInput<$PrismaModel> | null
    in?: $Enums.tipo_modalidade[] | ListEnumtipo_modalidadeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.tipo_modalidade[] | ListEnumtipo_modalidadeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumtipo_modalidadeNullableWithAggregatesFilter<$PrismaModel> | $Enums.tipo_modalidade | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumtipo_modalidadeNullableFilter<$PrismaModel>
    _max?: NestedEnumtipo_modalidadeNullableFilter<$PrismaModel>
  }

  export type NestedEnumtipo_funcaoNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.tipo_funcao | Enumtipo_funcaoFieldRefInput<$PrismaModel> | null
    in?: $Enums.tipo_funcao[] | ListEnumtipo_funcaoFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.tipo_funcao[] | ListEnumtipo_funcaoFieldRefInput<$PrismaModel> | null
    not?: NestedEnumtipo_funcaoNullableFilter<$PrismaModel> | $Enums.tipo_funcao | null
  }

  export type NestedEnumtipo_funcaoNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.tipo_funcao | Enumtipo_funcaoFieldRefInput<$PrismaModel> | null
    in?: $Enums.tipo_funcao[] | ListEnumtipo_funcaoFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.tipo_funcao[] | ListEnumtipo_funcaoFieldRefInput<$PrismaModel> | null
    not?: NestedEnumtipo_funcaoNullableWithAggregatesFilter<$PrismaModel> | $Enums.tipo_funcao | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumtipo_funcaoNullableFilter<$PrismaModel>
    _max?: NestedEnumtipo_funcaoNullableFilter<$PrismaModel>
  }

  export type usuariosCreateWithoutCursosInput = {
    rm: string
    nome: string
    data_nascimento?: Date | string | null
    email: string
    senha: string
    telefone: string
    foto_perfil?: string | null
    criado_em?: Date | string
    atualizado_em?: Date | string
    codigo_verificacao?: number | null
    codigo_gerado_em?: Date | string | null
    tentativas_login?: number
    tipo_usuario?: $Enums.tipo_usuario
    modalidades?: NullableJsonNullValueInput | InputJsonValue
    membros_time?: membros_timeCreateNestedManyWithoutUsuariosInput
  }

  export type usuariosUncheckedCreateWithoutCursosInput = {
    id?: number
    rm: string
    nome: string
    data_nascimento?: Date | string | null
    email: string
    senha: string
    telefone: string
    foto_perfil?: string | null
    criado_em?: Date | string
    atualizado_em?: Date | string
    codigo_verificacao?: number | null
    codigo_gerado_em?: Date | string | null
    tentativas_login?: number
    tipo_usuario?: $Enums.tipo_usuario
    modalidades?: NullableJsonNullValueInput | InputJsonValue
    membros_time?: membros_timeUncheckedCreateNestedManyWithoutUsuariosInput
  }

  export type usuariosCreateOrConnectWithoutCursosInput = {
    where: usuariosWhereUniqueInput
    create: XOR<usuariosCreateWithoutCursosInput, usuariosUncheckedCreateWithoutCursosInput>
  }

  export type usuariosCreateManyCursosInputEnvelope = {
    data: usuariosCreateManyCursosInput | usuariosCreateManyCursosInput[]
    skipDuplicates?: boolean
  }

  export type usuariosUpsertWithWhereUniqueWithoutCursosInput = {
    where: usuariosWhereUniqueInput
    update: XOR<usuariosUpdateWithoutCursosInput, usuariosUncheckedUpdateWithoutCursosInput>
    create: XOR<usuariosCreateWithoutCursosInput, usuariosUncheckedCreateWithoutCursosInput>
  }

  export type usuariosUpdateWithWhereUniqueWithoutCursosInput = {
    where: usuariosWhereUniqueInput
    data: XOR<usuariosUpdateWithoutCursosInput, usuariosUncheckedUpdateWithoutCursosInput>
  }

  export type usuariosUpdateManyWithWhereWithoutCursosInput = {
    where: usuariosScalarWhereInput
    data: XOR<usuariosUpdateManyMutationInput, usuariosUncheckedUpdateManyWithoutCursosInput>
  }

  export type usuariosScalarWhereInput = {
    AND?: usuariosScalarWhereInput | usuariosScalarWhereInput[]
    OR?: usuariosScalarWhereInput[]
    NOT?: usuariosScalarWhereInput | usuariosScalarWhereInput[]
    id?: IntFilter<"usuarios"> | number
    rm?: StringFilter<"usuarios"> | string
    nome?: StringFilter<"usuarios"> | string
    data_nascimento?: DateTimeNullableFilter<"usuarios"> | Date | string | null
    curso_id?: IntNullableFilter<"usuarios"> | number | null
    email?: StringFilter<"usuarios"> | string
    senha?: StringFilter<"usuarios"> | string
    telefone?: StringFilter<"usuarios"> | string
    foto_perfil?: StringNullableFilter<"usuarios"> | string | null
    criado_em?: DateTimeFilter<"usuarios"> | Date | string
    atualizado_em?: DateTimeFilter<"usuarios"> | Date | string
    codigo_verificacao?: IntNullableFilter<"usuarios"> | number | null
    codigo_gerado_em?: DateTimeNullableFilter<"usuarios"> | Date | string | null
    tentativas_login?: IntFilter<"usuarios"> | number
    tipo_usuario?: Enumtipo_usuarioFilter<"usuarios"> | $Enums.tipo_usuario
    modalidades?: JsonNullableFilter<"usuarios">
  }

  export type membros_timeCreateWithoutUsuariosInput = {
    funcao?: $Enums.tipo_funcao | null
    times: timesCreateNestedOneWithoutMembros_timeInput
  }

  export type membros_timeUncheckedCreateWithoutUsuariosInput = {
    time_id: number
    funcao?: $Enums.tipo_funcao | null
  }

  export type membros_timeCreateOrConnectWithoutUsuariosInput = {
    where: membros_timeWhereUniqueInput
    create: XOR<membros_timeCreateWithoutUsuariosInput, membros_timeUncheckedCreateWithoutUsuariosInput>
  }

  export type membros_timeCreateManyUsuariosInputEnvelope = {
    data: membros_timeCreateManyUsuariosInput | membros_timeCreateManyUsuariosInput[]
    skipDuplicates?: boolean
  }

  export type cursosCreateWithoutUsuariosInput = {
    sigla: string
    ano: number
    nome: string
    periodo: number
  }

  export type cursosUncheckedCreateWithoutUsuariosInput = {
    id?: number
    sigla: string
    ano: number
    nome: string
    periodo: number
  }

  export type cursosCreateOrConnectWithoutUsuariosInput = {
    where: cursosWhereUniqueInput
    create: XOR<cursosCreateWithoutUsuariosInput, cursosUncheckedCreateWithoutUsuariosInput>
  }

  export type membros_timeUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: membros_timeWhereUniqueInput
    update: XOR<membros_timeUpdateWithoutUsuariosInput, membros_timeUncheckedUpdateWithoutUsuariosInput>
    create: XOR<membros_timeCreateWithoutUsuariosInput, membros_timeUncheckedCreateWithoutUsuariosInput>
  }

  export type membros_timeUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: membros_timeWhereUniqueInput
    data: XOR<membros_timeUpdateWithoutUsuariosInput, membros_timeUncheckedUpdateWithoutUsuariosInput>
  }

  export type membros_timeUpdateManyWithWhereWithoutUsuariosInput = {
    where: membros_timeScalarWhereInput
    data: XOR<membros_timeUpdateManyMutationInput, membros_timeUncheckedUpdateManyWithoutUsuariosInput>
  }

  export type membros_timeScalarWhereInput = {
    AND?: membros_timeScalarWhereInput | membros_timeScalarWhereInput[]
    OR?: membros_timeScalarWhereInput[]
    NOT?: membros_timeScalarWhereInput | membros_timeScalarWhereInput[]
    time_id?: IntFilter<"membros_time"> | number
    membro_id?: IntFilter<"membros_time"> | number
    funcao?: Enumtipo_funcaoNullableFilter<"membros_time"> | $Enums.tipo_funcao | null
  }

  export type cursosUpsertWithoutUsuariosInput = {
    update: XOR<cursosUpdateWithoutUsuariosInput, cursosUncheckedUpdateWithoutUsuariosInput>
    create: XOR<cursosCreateWithoutUsuariosInput, cursosUncheckedCreateWithoutUsuariosInput>
    where?: cursosWhereInput
  }

  export type cursosUpdateToOneWithWhereWithoutUsuariosInput = {
    where?: cursosWhereInput
    data: XOR<cursosUpdateWithoutUsuariosInput, cursosUncheckedUpdateWithoutUsuariosInput>
  }

  export type cursosUpdateWithoutUsuariosInput = {
    sigla?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    periodo?: IntFieldUpdateOperationsInput | number
  }

  export type cursosUncheckedUpdateWithoutUsuariosInput = {
    id?: IntFieldUpdateOperationsInput | number
    sigla?: StringFieldUpdateOperationsInput | string
    ano?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    periodo?: IntFieldUpdateOperationsInput | number
  }

  export type membros_timeCreateWithoutTimesInput = {
    funcao?: $Enums.tipo_funcao | null
    usuarios: usuariosCreateNestedOneWithoutMembros_timeInput
  }

  export type membros_timeUncheckedCreateWithoutTimesInput = {
    membro_id: number
    funcao?: $Enums.tipo_funcao | null
  }

  export type membros_timeCreateOrConnectWithoutTimesInput = {
    where: membros_timeWhereUniqueInput
    create: XOR<membros_timeCreateWithoutTimesInput, membros_timeUncheckedCreateWithoutTimesInput>
  }

  export type membros_timeCreateManyTimesInputEnvelope = {
    data: membros_timeCreateManyTimesInput | membros_timeCreateManyTimesInput[]
    skipDuplicates?: boolean
  }

  export type membros_timeUpsertWithWhereUniqueWithoutTimesInput = {
    where: membros_timeWhereUniqueInput
    update: XOR<membros_timeUpdateWithoutTimesInput, membros_timeUncheckedUpdateWithoutTimesInput>
    create: XOR<membros_timeCreateWithoutTimesInput, membros_timeUncheckedCreateWithoutTimesInput>
  }

  export type membros_timeUpdateWithWhereUniqueWithoutTimesInput = {
    where: membros_timeWhereUniqueInput
    data: XOR<membros_timeUpdateWithoutTimesInput, membros_timeUncheckedUpdateWithoutTimesInput>
  }

  export type membros_timeUpdateManyWithWhereWithoutTimesInput = {
    where: membros_timeScalarWhereInput
    data: XOR<membros_timeUpdateManyMutationInput, membros_timeUncheckedUpdateManyWithoutTimesInput>
  }

  export type usuariosCreateWithoutMembros_timeInput = {
    rm: string
    nome: string
    data_nascimento?: Date | string | null
    email: string
    senha: string
    telefone: string
    foto_perfil?: string | null
    criado_em?: Date | string
    atualizado_em?: Date | string
    codigo_verificacao?: number | null
    codigo_gerado_em?: Date | string | null
    tentativas_login?: number
    tipo_usuario?: $Enums.tipo_usuario
    modalidades?: NullableJsonNullValueInput | InputJsonValue
    cursos?: cursosCreateNestedOneWithoutUsuariosInput
  }

  export type usuariosUncheckedCreateWithoutMembros_timeInput = {
    id?: number
    rm: string
    nome: string
    data_nascimento?: Date | string | null
    curso_id?: number | null
    email: string
    senha: string
    telefone: string
    foto_perfil?: string | null
    criado_em?: Date | string
    atualizado_em?: Date | string
    codigo_verificacao?: number | null
    codigo_gerado_em?: Date | string | null
    tentativas_login?: number
    tipo_usuario?: $Enums.tipo_usuario
    modalidades?: NullableJsonNullValueInput | InputJsonValue
  }

  export type usuariosCreateOrConnectWithoutMembros_timeInput = {
    where: usuariosWhereUniqueInput
    create: XOR<usuariosCreateWithoutMembros_timeInput, usuariosUncheckedCreateWithoutMembros_timeInput>
  }

  export type timesCreateWithoutMembros_timeInput = {
    nome: string
    modalidades?: $Enums.tipo_modalidade | null
  }

  export type timesUncheckedCreateWithoutMembros_timeInput = {
    id?: number
    nome: string
    modalidades?: $Enums.tipo_modalidade | null
  }

  export type timesCreateOrConnectWithoutMembros_timeInput = {
    where: timesWhereUniqueInput
    create: XOR<timesCreateWithoutMembros_timeInput, timesUncheckedCreateWithoutMembros_timeInput>
  }

  export type usuariosUpsertWithoutMembros_timeInput = {
    update: XOR<usuariosUpdateWithoutMembros_timeInput, usuariosUncheckedUpdateWithoutMembros_timeInput>
    create: XOR<usuariosCreateWithoutMembros_timeInput, usuariosUncheckedCreateWithoutMembros_timeInput>
    where?: usuariosWhereInput
  }

  export type usuariosUpdateToOneWithWhereWithoutMembros_timeInput = {
    where?: usuariosWhereInput
    data: XOR<usuariosUpdateWithoutMembros_timeInput, usuariosUncheckedUpdateWithoutMembros_timeInput>
  }

  export type usuariosUpdateWithoutMembros_timeInput = {
    rm?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    foto_perfil?: NullableStringFieldUpdateOperationsInput | string | null
    criado_em?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizado_em?: DateTimeFieldUpdateOperationsInput | Date | string
    codigo_verificacao?: NullableIntFieldUpdateOperationsInput | number | null
    codigo_gerado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tentativas_login?: IntFieldUpdateOperationsInput | number
    tipo_usuario?: Enumtipo_usuarioFieldUpdateOperationsInput | $Enums.tipo_usuario
    modalidades?: NullableJsonNullValueInput | InputJsonValue
    cursos?: cursosUpdateOneWithoutUsuariosNestedInput
  }

  export type usuariosUncheckedUpdateWithoutMembros_timeInput = {
    id?: IntFieldUpdateOperationsInput | number
    rm?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    curso_id?: NullableIntFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    foto_perfil?: NullableStringFieldUpdateOperationsInput | string | null
    criado_em?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizado_em?: DateTimeFieldUpdateOperationsInput | Date | string
    codigo_verificacao?: NullableIntFieldUpdateOperationsInput | number | null
    codigo_gerado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tentativas_login?: IntFieldUpdateOperationsInput | number
    tipo_usuario?: Enumtipo_usuarioFieldUpdateOperationsInput | $Enums.tipo_usuario
    modalidades?: NullableJsonNullValueInput | InputJsonValue
  }

  export type timesUpsertWithoutMembros_timeInput = {
    update: XOR<timesUpdateWithoutMembros_timeInput, timesUncheckedUpdateWithoutMembros_timeInput>
    create: XOR<timesCreateWithoutMembros_timeInput, timesUncheckedCreateWithoutMembros_timeInput>
    where?: timesWhereInput
  }

  export type timesUpdateToOneWithWhereWithoutMembros_timeInput = {
    where?: timesWhereInput
    data: XOR<timesUpdateWithoutMembros_timeInput, timesUncheckedUpdateWithoutMembros_timeInput>
  }

  export type timesUpdateWithoutMembros_timeInput = {
    nome?: StringFieldUpdateOperationsInput | string
    modalidades?: NullableEnumtipo_modalidadeFieldUpdateOperationsInput | $Enums.tipo_modalidade | null
  }

  export type timesUncheckedUpdateWithoutMembros_timeInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    modalidades?: NullableEnumtipo_modalidadeFieldUpdateOperationsInput | $Enums.tipo_modalidade | null
  }

  export type usuariosCreateManyCursosInput = {
    id?: number
    rm: string
    nome: string
    data_nascimento?: Date | string | null
    email: string
    senha: string
    telefone: string
    foto_perfil?: string | null
    criado_em?: Date | string
    atualizado_em?: Date | string
    codigo_verificacao?: number | null
    codigo_gerado_em?: Date | string | null
    tentativas_login?: number
    tipo_usuario?: $Enums.tipo_usuario
    modalidades?: NullableJsonNullValueInput | InputJsonValue
  }

  export type usuariosUpdateWithoutCursosInput = {
    rm?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    foto_perfil?: NullableStringFieldUpdateOperationsInput | string | null
    criado_em?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizado_em?: DateTimeFieldUpdateOperationsInput | Date | string
    codigo_verificacao?: NullableIntFieldUpdateOperationsInput | number | null
    codigo_gerado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tentativas_login?: IntFieldUpdateOperationsInput | number
    tipo_usuario?: Enumtipo_usuarioFieldUpdateOperationsInput | $Enums.tipo_usuario
    modalidades?: NullableJsonNullValueInput | InputJsonValue
    membros_time?: membros_timeUpdateManyWithoutUsuariosNestedInput
  }

  export type usuariosUncheckedUpdateWithoutCursosInput = {
    id?: IntFieldUpdateOperationsInput | number
    rm?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    foto_perfil?: NullableStringFieldUpdateOperationsInput | string | null
    criado_em?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizado_em?: DateTimeFieldUpdateOperationsInput | Date | string
    codigo_verificacao?: NullableIntFieldUpdateOperationsInput | number | null
    codigo_gerado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tentativas_login?: IntFieldUpdateOperationsInput | number
    tipo_usuario?: Enumtipo_usuarioFieldUpdateOperationsInput | $Enums.tipo_usuario
    modalidades?: NullableJsonNullValueInput | InputJsonValue
    membros_time?: membros_timeUncheckedUpdateManyWithoutUsuariosNestedInput
  }

  export type usuariosUncheckedUpdateManyWithoutCursosInput = {
    id?: IntFieldUpdateOperationsInput | number
    rm?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    data_nascimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    foto_perfil?: NullableStringFieldUpdateOperationsInput | string | null
    criado_em?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizado_em?: DateTimeFieldUpdateOperationsInput | Date | string
    codigo_verificacao?: NullableIntFieldUpdateOperationsInput | number | null
    codigo_gerado_em?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tentativas_login?: IntFieldUpdateOperationsInput | number
    tipo_usuario?: Enumtipo_usuarioFieldUpdateOperationsInput | $Enums.tipo_usuario
    modalidades?: NullableJsonNullValueInput | InputJsonValue
  }

  export type membros_timeCreateManyUsuariosInput = {
    time_id: number
    funcao?: $Enums.tipo_funcao | null
  }

  export type membros_timeUpdateWithoutUsuariosInput = {
    funcao?: NullableEnumtipo_funcaoFieldUpdateOperationsInput | $Enums.tipo_funcao | null
    times?: timesUpdateOneRequiredWithoutMembros_timeNestedInput
  }

  export type membros_timeUncheckedUpdateWithoutUsuariosInput = {
    time_id?: IntFieldUpdateOperationsInput | number
    funcao?: NullableEnumtipo_funcaoFieldUpdateOperationsInput | $Enums.tipo_funcao | null
  }

  export type membros_timeUncheckedUpdateManyWithoutUsuariosInput = {
    time_id?: IntFieldUpdateOperationsInput | number
    funcao?: NullableEnumtipo_funcaoFieldUpdateOperationsInput | $Enums.tipo_funcao | null
  }

  export type membros_timeCreateManyTimesInput = {
    membro_id: number
    funcao?: $Enums.tipo_funcao | null
  }

  export type membros_timeUpdateWithoutTimesInput = {
    funcao?: NullableEnumtipo_funcaoFieldUpdateOperationsInput | $Enums.tipo_funcao | null
    usuarios?: usuariosUpdateOneRequiredWithoutMembros_timeNestedInput
  }

  export type membros_timeUncheckedUpdateWithoutTimesInput = {
    membro_id?: IntFieldUpdateOperationsInput | number
    funcao?: NullableEnumtipo_funcaoFieldUpdateOperationsInput | $Enums.tipo_funcao | null
  }

  export type membros_timeUncheckedUpdateManyWithoutTimesInput = {
    membro_id?: IntFieldUpdateOperationsInput | number
    funcao?: NullableEnumtipo_funcaoFieldUpdateOperationsInput | $Enums.tipo_funcao | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}