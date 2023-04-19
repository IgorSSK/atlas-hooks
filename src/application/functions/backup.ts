import { HttpResponse, ok } from "@application/helpers/http";
import { IAwsLambda } from "@application/functions/lambda";
import BackupUseCase from "@domain/use-cases/backup";

class StartInstanceFunction extends IAwsLambda {
  async perform(httpRequest: any): Promise<HttpResponse<any>> {
    console.log("## HTTP REQUEST:", httpRequest);
    await new BackupUseCase().handle();
    return ok({});
  }
}

export const handler = async (
  event: any,
  context: any
): Promise<HttpResponse<any>> => {
  return await new StartInstanceFunction().handle(event, context);
};
