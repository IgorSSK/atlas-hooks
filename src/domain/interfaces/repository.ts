export namespace IRepository {
  export interface Save<TEntity> { save: (obj: TEntity) => Promise<void> }
  export interface Load<TEntity> { load: () => Promise<TEntity[]> }
  export interface FindById<TEntity> { findById: (id: string | number) => Promise<TEntity> }
  export interface Delete { delete: (id: string | number) => Promise<void> }
  export interface Exists { exists: (id: string | number) => Promise<boolean> }
}
