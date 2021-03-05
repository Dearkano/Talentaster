const azureConfig = require("../../config/azure");
const Service = require("egg").Service;
const databaseId = azureConfig.database.id;
const containerId = azureConfig.container.id;

class IndexService extends Service {
  async insert() {
    const itemBody = {
      id: "test1",
      name: "testname",
    };
    console.log("-----");
    const { item } = await this.app.client
      .database(databaseId)
      .container(containerId)
      .items.upsert(itemBody);
    console.log(`Created family item with id:\n${itemBody.id}\n`);
    return item;
  }
}
module.exports = IndexService;
