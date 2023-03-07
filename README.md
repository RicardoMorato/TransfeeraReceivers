# Transfeera Receivers

## Table of contents

- [Summary](#summary)
- [Architecture overview](#architecture-overview)
- [How to run the project](#how-to-run-the-project)
- [How to run the tests](#how-to-run-the-tests)
- [Contributing](#contributing)

## Summary

An API capable of creating, reading, updating and deleting Transfeera's receivers. Written used NodeJs, Express, and Typescript. The tests were written with the help of Jest and Supertest. The codebase architecture was inspired in the [Layered architecture](https://dev.to/blindkai/backend-layered-architecture-514h) mixed with some [Domain Driven Design](https://www.amazon.com.br/Domain-Driven-Design-Eric-Evans/dp/8550800651/ref=asc_df_8550800651/) concepts, and the injection of dependencies strategy.

## Architecture overview

As said before, the codebase architecture was heavily inspired in the layered architecture style, with some Domain Driven Design approach. This means that, thanks to this strategy, it is possible to change several components/adapters/drivers inside the code, without big refactors needed.

For example, if we were to change the database that we are currently using (mongodb) to another (postgres, for example). It would be necessary only to create a class that implements the [DatabaseHelper protocol](src/infra/db/databaseHelperProtocol.ts) and another one that implements the [repository use cases](src/data/protocols/receiverRepository.ts) needed

Another example is if we wanted to implemented encryption at the server-side level. All main repositories now have this implemented by default. It would be only a matter of [changing the Encryptor Adapter used in the use case creation level](src/main/factories/useCases/addReceiverFactory.ts)

This architecture will provide a more scalable, and refactor-safe approach for the lifetime of the application.

## How to run the project

To run the project, you must first install the dependencies using the following command:

```
npm install
```

After this, to start the application, simply run:

```
npm run dev
```

To run it in the development mode

## How to run the tests

This project has unit, and integration tests.

Every small implementation (validator adapters, controllers, data use cases) has their own suite of tests they can be found in the folder `tests` in the same level as the implementations, and have the `.spec.ts` ending. Beyond this, every route has its own integration tests, made with Supertest. The integration tests are inside the folder `tests`, and have the `.test.ts` ending.

To run the unit tests, simply do:

```
npm run test:unit
```

To run the integration tests, run:

```
npm run test:integration
```

If you want to do manual testing in the application, here is a Postman collection for you!

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/20223915-2ba50894-3807-47b9-9592-afcd9b6c486e?action=collection%2Ffork&collection-url=entityId%3D20223915-2ba50894-3807-47b9-9592-afcd9b6c486e%26entityType%3Dcollection%26workspaceId%3Da7665902-02d0-43c5-97ff-30749f93af10#?env%5BTransfeeraReceiversEnvironment%5D=W3sia2V5IjoiYXBwX3VybCIsInZhbHVlIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJzZXNzaW9uSW5kZXgiOjB9XQ==)

## Contributing

Feel free to leave feedbacks and suggestions for this codebase. There are known minor issues, but some may have not been discovered yet.

Just open a Pull Request, or create an issue if you feel like doing so.

Thanks for your time! :D
