import { HttpResponse, ok, unauthorized } from "@application/helpers/http";
import { IAwsLambda } from "@application/functions/lambda";
import nacl from "tweetnacl";
import StartInstanceUseCase from "@domain/use-cases/start-instance";
import StopInstanceUseCase from "@domain/use-cases/stop-instance";
import axios from "axios";
import { EmbedBuilder } from "@domain/entities/embed";
import DiscordClient from "@domain/entities/discordClient";
import InstanceStatusUseCase from "@domain/use-cases/instance-status";

class DiscordFunction extends IAwsLambda {
  async perform(httpRequest: any): Promise<any> {
    console.log("## STARTING DISCORD INTERATION");

    const client = new DiscordClient(
      httpRequest.event.body,
      httpRequest.event.headers
    );

    if (httpRequest.body?.type === 1) {
      console.log("## PING");
      return ok({ type: 1 });
    }

    console.log("## INCOMING REQUEST: ", httpRequest.body?.data);
    if (httpRequest.body?.data?.name === "hello") {
      const output = await axios.get("https://api.chucknorris.io/jokes/random");
      console.info("## RESPONDING FOR /hello");

      const builder = new EmbedBuilder()
        .setTitle("Let me tell you a joke")
        .setColor(0xa834eb)
        .setDescription(output.data?.value);
      console.info(builder.build());
      return JSON.stringify({
        type: 4,
        data: {
          embeds: [builder.build()],
        },
      });
    }

    if (httpRequest.body?.data?.name === "start-server") {
      const output = await new StartInstanceUseCase().handle();

      if (output) {
        const builder = new EmbedBuilder()
          .setTitle("Starting Server")
          .setColor(0x32a852)
          .setDescription(
            "Starting AWS Server.. Get Ready to Play your favorite Game!"
          );
        output.forEach((value) => {
          builder
            .setFields("Instance ID", value.InstanceId, true)
            .setFields("Instance State", value.InstanceState?.Name, true)
            .setFields("Instance Status", value.InstanceStatus?.Status, true)
            .setFields("Events", JSON.stringify(value.Events));
        });

        console.info(builder.build());
        return JSON.stringify({ type: 4, data: { embeds: [builder.build()] } });
      }
    }

    if (httpRequest.body?.data?.name === "stop-server") {
      const output = await new StopInstanceUseCase().handle();

      if (output) {
        const builder = new EmbedBuilder()
          .setTitle("Stopping Server")
          .setColor(0xa83232)
          .setDescription(
            "Stopping AWS Server.. Get Ready to Play your favorite Game!"
          );
        output.forEach((value) => {
          builder
            .setFields("Instance ID", value.InstanceId, true)
            .setFields("Instance State", value.InstanceState?.Name, true)
            .setFields("Instance Status", value.InstanceStatus?.Status, true)
            .setFields("Events", JSON.stringify(value.Events));
        });

        console.info(builder.build());
        return JSON.stringify({ type: 4, data: { embeds: [builder.build()] } });
      }
    }

    if (httpRequest.body?.data?.name === "status-server") {
      const output = await new InstanceStatusUseCase().handle();

      if (output) {
        const builder = new EmbedBuilder()
          .setTitle("Server Status")
          .setColor(0x09099c)
          .setDescription("Status of AWS Server");
        output.forEach((value) => {
          builder
            .setFields("Instance ID", value.InstanceId, true)
            .setFields("Instance State", value.InstanceState?.Name, true)
            .setFields("Instance Status", value.InstanceStatus?.Status, true)
            .setFields("Events", JSON.stringify(value.Events));
        });

        console.info(builder.build());
        return JSON.stringify({ type: 4, data: { embeds: [builder.build()] } });
      }
    }

    return JSON.stringify({
      type: 4,
      data: { content: "Não existe esse bagui.. :(" },
    });
  }
}

export const handler = async (
  event: any,
  context: any
): Promise<HttpResponse<any>> => {
  return await new DiscordFunction().handle(event, context);
};
