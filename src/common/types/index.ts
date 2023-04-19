import { Left, Right } from '@common/libs/either'

export type Maybe<T> = T | undefined | null

export type Nullable<T> = T | null

export type Optional<T> = T | undefined

export type Either<L, R> = Left<L, R> | Right<L, R>
