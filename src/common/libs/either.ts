import { Optional } from '@common/types'

class Either<L, R> {
  value: Optional<L | R>

  isLeft (): this is Left<L, R> {
    return true
  }

  isRight (): this is Right<L, R> {
    return false
  }
}

export class Left<L, R> extends Either<L, R> {
  constructor (value: L) {
    super()
    this.value = value
  }
}

export class Right<L, R> extends Either<L, R> {
  readonly value: R

  constructor (value: R) {
    super()
    this.value = value
  }
}

export const left = <L, R>(l: L): Either<L, R> => {
  return new Left<L, R>(l)
}

export const right = <L, R>(a: R): Either<L, R> => {
  return new Right<L, R>(a)
}
