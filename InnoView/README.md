# InnoView

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Innoview Docker

Go to https://www.docker.com/get-started/ and follow directions there to install docker on your machine

Open a terminal and set the working directory to where the Dockerfile is

Run `docker build . -t innoview` to create the docker image

Run `docker run -p 4200:4200 innoview` to make a dev server. 
OR
Run ` docker compose up -d` to run the compose file to make a dev server

Navigate to `http://localhost:4200/`

To shut down the docker container, go to the docker hub, go to the containers tad, click stop on the container you made
To shut down a docker compose, run ` docker compose down`