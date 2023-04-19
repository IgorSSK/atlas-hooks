import { IUseCase } from "../interfaces/use-case";
import {
  EC2Client,
  StopInstancesCommand,
  DescribeInstanceStatusCommand,
  InstanceStatus,
} from "@aws-sdk/client-ec2";

class InstanceStatusUseCase implements IUseCase<any, any> {
  private readonly INSTANCE_ID = "i-098f3b333285a67b5";

  async handle(request?: any): Promise<InstanceStatus[] | undefined> {
    try {
      const client = new EC2Client({});

      console.info(`## EC2 CLIENT - INSTANCE NAME: ${this.INSTANCE_ID}`);

      const instanceState = await client.send(
        new DescribeInstanceStatusCommand({
          InstanceIds: [this.INSTANCE_ID],
        })
      );

      return instanceState.InstanceStatuses;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default InstanceStatusUseCase;
