# RecipeBook


## Dependencies

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.3. and NodeJS v24.9.0.</br>
It also uses:

* ngx-translate
* ESLint
* Husky
* keycloak-js

## Developper Environement setup

* Clone this git repository
* CD to the local directory ```cd recipe-book```
* Run ```npm install```

## Development Keycloak Server

* Pre-requisite: Docker

run a containerised keycloack on you local machine in dev-mode with docker-compose with:

```
docker-compose up
```

*access the Keycloack UI : http://localhost:8080*
</br></br>

## Testing keycloak and Roles

Your realm will be loaded whenyou run the container. multiple test users will be created:

* admin:admin - Role: admin
* chef:chef   - Role: chef
* cook:cook   - Role: cook

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Husky / ESLint / Prettier

Please run ```npm run format``` before commit to git. This will bulk format your code.</br>
This beeing said, Husky has been installed when you ran the ```npm install``` and will ensure the Linter and Prettier are ran with ```--fix``` before committing.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
