# envample

Generates .env.example or .env.* file from your .env file.
This a quick way to keep your .env file and your .env.example file in sync.

## Installation

```sh
npm i -g envample
```

## Usage

```sh
envample .env .env.example
```

If the arguments are not specified `.env` and `.env.example` will be used

## How it works

Lines preceded with `#example` comment will be copied as is.
Lines preceded with `#example=value` comment will be copied with the value replaced by the specified value
Lines not preceded by an `#example` comment will be copied without the value
