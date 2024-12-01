import LandbotCore from '@landbot/core';

const clients: Record<string, LandbotCore> = {};

export class LandBotClient {
  public static getInstance = async (url: string): Promise<LandbotCore> => {
    // Early return if the client exists
    if (clients[url]) return clients[url];

    // 1. Get LandBot config by URL
    const config = await (await fetch(url)).json();

    // 2. Get LandBot client instance by config
    const instance = new LandbotCore(config);

    // 3. Store the client for this URL in memory
    clients[url] = instance;

    return instance;
  };

  public static closeInstance = (url: string) => {
    // Early return if the client does not exists
    if (!clients[url]) return;

    clients[url].destroy();
    delete clients[url];
  };
}
