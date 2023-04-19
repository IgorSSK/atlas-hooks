class EmbedField {
  name: string;
  value: string;
  inline: boolean;

  constructor(private readonly obj?: EmbedField) {
    if (obj) Object.assign(this, obj);
  }
}

class Embed {
  title: string;
  type: string;
  description: string;
  url: string;
  timestamp: Date;
  color: number;
  fields: EmbedField[];

  constructor() {}
}

export class EmbedBuilder {
  private embed: Embed;

  constructor() {
    this.embed = new Embed();
    this.embed.type = "rich";
  }

  setTitle(title: string): EmbedBuilder {
    this.embed.title = title;
    return this;
  }

  setType(type: string): EmbedBuilder {
    this.embed.type = type;
    return this;
  }

  setDescription(description: string): EmbedBuilder {
    this.embed.description = description;
    return this;
  }

  setUrl(url: string): EmbedBuilder {
    this.embed.url = url;
    return this;
  }

  setTimestamp(timestamp: Date): EmbedBuilder {
    this.embed.timestamp = timestamp;
    return this;
  }

  setColor(color: number): EmbedBuilder {
    this.embed.color = color;
    return this;
  }

  setFields(
    name: string,
    value: string = "",
    inline: boolean = false
  ): EmbedBuilder {
    if (!this.embed?.fields || this.embed?.fields?.length === 0)
      this.embed.fields = [];
    this.embed.fields.push(new EmbedField({ name, value, inline }));
    return this;
  }

  build(): Embed {
    return this.embed;
  }
}
