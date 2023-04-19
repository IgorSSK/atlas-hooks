import { HttpResponse, ok } from "@application/helpers/http";
import { IAwsLambda } from "@application/functions/lambda";
import StartInstanceUseCase from "@domain/use-cases/start-instance";

class StartInstanceFunction extends IAwsLambda {
  async perform(httpRequest: any): Promise<HttpResponse<any>> {
    console.info("## STARTING INSTANCE");
    const output = await new StartInstanceUseCase().handle();
    return ok(output);
  }
}

export const handler = async (
  event: any,
  context: any
): Promise<HttpResponse<any>> => {
  return await new StartInstanceFunction().handle(event, context);
};
