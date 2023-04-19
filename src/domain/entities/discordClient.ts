import { UnauthorizedError } from "@application/errors/http";
import nacl from "tweetnacl";

export default class DiscordClient {
  constructor(private readonly event: any, private readonly headers: any) {
    this.login();
  }

  login() {
    const PUBLIC_KEY = process.env.PUBLIC_KEY;

    const signature = this.headers["x-signature-ed25519"];
    const timestamp = this.headers["x-signature-timestamp"];

    const isVerified = nacl.sign.detached.verify(
      Buffer.from(timestamp + this.event),
      Buffer.from(signature, "hex"),
      Buffer.from(PUBLIC_KEY!, "hex")
    );

    if (!isVerified) {
      console.info("## INCOMING CALL NOT AUTHORIZED");
      throw new UnauthorizedError();
    }
  }
}
