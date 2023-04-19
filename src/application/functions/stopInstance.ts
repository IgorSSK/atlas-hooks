import { HttpResponse, ok } from "@application/helpers/http";
import { IAwsLambda } from "@application/functions/lambda";
import StopInstanceUseCase from "@domain/use-cases/stop-instance";

class StopInstanceFunction extends IAwsLambda {
  async perform(httpRequest: any): Promise<HttpResponse<any>> {
    console.info("## STOPPING INSTANCE");
    const output = await new StopInstanceUseCase().handle();
    return ok(output);
  }
}

export const handler = async (
  event: any,
  context: any
): Promise<HttpResponse<any>> => {
  return await new StopInstanceFunction().handle(event, context);
};
