var azureConfig = {};

azureConfig.endpoint = "https://digitalag21.documents.azure.com:443/";
azureConfig.key =
  "WJf28ZPeIwBcSexKEaDcqbT2WkbN00517CN1vZyd4C1Ve7uUYZ8f8SG5bnC0kxWPtNpsA9Ac7i4qNQJjrmNelw==";

azureConfig.database = {
  id: "ToDoList",
};

azureConfig.container = {
  id: "DOCUMENTCOLLECTIONID",
};

azureConfig.items = {
  Andersen: {
    id: "Anderson.1",
    Country: "USA",
    lastName: "Andersen",
    parents: [
      {
        firstName: "Thomas",
      },
      {
        firstName: "Mary Kay",
      },
    ],
    children: [
      {
        firstName: "Henriette Thaulow",
        gender: "female",
        grade: 5,
        pets: [
          {
            givenName: "Fluffy",
          },
        ],
      },
    ],
    address: {
      state: "WA",
      county: "King",
      city: "Seattle",
    },
  },
  Wakefield: {
    id: "Wakefield.7",
    Country: "Italy",
    parents: [
      {
        familyName: "Wakefield",
        firstName: "Robin",
      },
      {
        familyName: "Miller",
        firstName: "Ben",
      },
    ],
    children: [
      {
        familyName: "Merriam",
        firstName: "Jesse",
        gender: "female",
        grade: 8,
        pets: [
          {
            givenName: "Goofy",
          },
          {
            givenName: "Shadow",
          },
        ],
      },
      {
        familyName: "Miller",
        firstName: "Lisa",
        gender: "female",
        grade: 1,
      },
    ],
    address: {
      state: "NY",
      county: "Manhattan",
      city: "NY",
    },
    isRegistered: false,
  },
};

module.exports = azureConfig;
