import { Context, APIGatewayEvent } from "aws-lambda";
import {
  HttpResponse,
  badRequest,
  serverError,
  ok,
} from "@application/helpers/http";
import { Maybe } from "@common/types";

declare global {
  interface Object {
    isNullOrEmpty: (obj: object) => boolean;
  }
}

// eslint-disable-next-line no-extend-native
Object.prototype.isNullOrEmpty = (obj: object): boolean =>
  obj === null || obj === undefined;

export abstract class IAwsLambda {
  abstract perform(httpRequest: any): Promise<HttpResponse>;

  buildValidators(httpRequest: any): any[] {
    return [];
  }

  async handle(
    event: APIGatewayEvent,
    context: Context
  ): Promise<HttpResponse> {
    try {
      const params = {
        body: JSON.parse(event.body!),
        path: event.pathParameters,
        query: event.queryStringParameters,
        event,
        context
      };
      console.info(params);
      // const error = this.validate(params);
      // if (error !== null && error !== undefined) return badRequest(error);

      return await this.perform(params);
    } catch (error) {
      console.error(error);
      return serverError(error);
    }
  }
}
