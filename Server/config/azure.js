var config = require("../db.json");
var azureConfig = {};

azureConfig.endpoint = "https://digitalag21.documents.azure.com:443/";
azureConfig.key = config.azure_key;

azureConfig.database = {
  id: "ToDoList",
};

azureConfig.container = {
  id: "DOCUMENTCOLLECTIONID",
};

module.exports = azureConfig;
