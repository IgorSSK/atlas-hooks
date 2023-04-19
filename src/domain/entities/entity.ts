export abstract class Entity<T> {
  constructor (public readonly props: T, protected readonly _id?: string) { }

  get id (): string {
    return this._id ?? ''
  }

  public equals (object?: Entity<T>): boolean {
    if (object === null || object === undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!(object instanceof Entity)) {
      return false
    }

    return this.id === object.id
  }
}
