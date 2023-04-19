export interface IUseCase<IRequest, IResponse> {
  handle: (request?: IRequest) => IResponse
}
