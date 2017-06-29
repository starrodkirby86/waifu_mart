# Waifu Mart

![Screenshot](http://i.imgur.com/g7V22PU.png)

Waifu Mart is a sample app that was used to test out Apollo Client, React, and GraphQL queries and mutations.

## Setup
Install using ``npm install`` in the same folder as the ``package.json`` in your favorite command-line interface. ``semantic-ui`` may have difficulty installing because it has an installation wizard applied to it, so ignore it if you want.

The location for the ``semantic-ui`` css is inside ``src/vendor/semantic-ui/dist``. If you were to install ``semantic-ui``, use ``src/vendor/semantic-ui`` as your installation directory.

In the src folder, you need to add a ``secret.js`` containing your own graph.cool Simple API endpoint URL. You can then use the schema linked below for your project. You also need to provide at least one Person and their corresponding ID in ``MY_ID``. Take a look at ``App.js``, ``WaifuCart.jsx``, etc. to see usages demonstrating these constants.

## Schema

```graphql
type File implements Node {
  contentType: String!
  createdAt: DateTime!
  id: ID! @isUnique
  name: String!
  secret: String! @isUnique
  size: Int!
  updatedAt: DateTime!
  url: String! @isUnique
}

type Person implements Node {
  createdAt: DateTime!
  id: ID! @isUnique
  updatedAt: DateTime!
  username: String!
  waifus: [Waifu!]! @relation(name: "PersonsOnWaifu")
}

type User implements Node {
  createdAt: DateTime!
  id: ID! @isUnique
  updatedAt: DateTime!
}

type Waifu implements Node {
  anime: String!
  createdAt: DateTime!
  id: ID! @isUnique
  imageUrl: String!
  name: String!
  price: Float!
  updatedAt: DateTime!
  persons: [Person!]! @relation(name: "PersonsOnWaifu")
}
```

## Other Remarks
This code is a bit rushed, but just wanted to demonstrate working with Apollo Client and React.