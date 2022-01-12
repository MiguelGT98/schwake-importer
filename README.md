# Schwacke Importer

## Overview

This is my solution to the case study "Schwacke Importer".

## Usage

### Installation

To run this app locally, you'll need to have Docker installed and perform the following steps:

Clone this repository.

```
git clone https://github.com/MiguelGT98/schwake-importer.git
```

After doing that, move into the newly created folder.

```
cd reponame
```

Now, install dependencies on the host machine.

```
npm install
```

Build and run the container using docker-compose to have mongo up and running.

```
docker-compose build && docker-compose up
```

After doing the previous initial setup, you don't need to build the container again, you can just start the database by running.

```
docker-compose up
```

To run the importer, you can run the following command:

```
npx ts-node index.ts rimsPath=./path/to/rims/file/rims.dat timespansPath=./path/to/timespans/file/timespans.dat
```

## Tests

Some tests were set up for this project using Jest, to be able to run them, perform the following command in the terminal:

```
npm test
```

## Final thoughts and decision-making

Here is a quick summary of my key decisions while developing the importer

1. I chose a NoSQL database because it's flexibility when not having a predefined schema or having different versions of the same schema. I think it's quite easy to manage different versions of the same data with this approach.

2. I created a data stream for reading our files because I didn't want to load the whole file in memory before being able to process it. I also think working with smaller chunks of data gives us a lot of flexibility in case we want to implement a solution that gradually uploads data to the database, instead of doing that once the whole file is processed.

3. Version handling was not fully implemented due to some time constraints, but I think the basic setup is there, if a new version of the data comes up, then we can easily create a new Model and Validations for that new version and just upload everything into the same collection (but with a different version field).

4. I made it so that files can be given through the command line to make it easy for the user to choose which files to import. This could be extended so that you could maybe just choose one file to import, instead of two. Or maybe load files from a storage bucket.
