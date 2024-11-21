# Auction App Frontend

## Quickstart

## Install Dependencies

Clone the repo and then `cd` into the `root` directory. Once there run:

```shell
    npm install  //or yarn install. pnpm will not work.
```

If you don't have `npm` installed I recommend installing `nvm`. [You can find
it](https://github.com/nvm-sh/nvm) here. Follow instructions for your OS and for
setup. I've been using `node v22.8.0` which you can install via `nvm`.

## Setup AWS Amplify

In order to get the login functionality working you'll need to setup the local
dev environment for `aws`. You can find documentation for doing so here:

[Configure for local development](https://docs.amplify.aws/react/start/account-setup/)

Alternatively, if you're just trying to get the app to run, you can comment out
the `<Authenticator/>` component in the `dashboard-layout.tsx` file. This could
let you access the pages that require a user to be signed in.

Documentation for `<Authenticator/>` [can be found here](https://ui.docs.amplify.aws/react/connected-components/authenticator)

**NOTE**
**I haven't used any of the other components from the `amplify-ui`
library.**

## Start Server.

To start the client application run:

```bash
npm run start dev
```

You should see `vite` start and upon successful completion provide a link to
`localhost:5173`.

## Libraries and Technologies

[React](https://react.dev/) - To build the app as a Single Page Application (SPA

[React Router](https://reactrouter.com/en/main) - For navigating between pages as a Single Page Application without full page reloads.

[Shadcn](https://ui.shadcn.com/) - A flexible component library that allows styling via `tailwindcss`

[tailwindcss](https://tailwindcss.com/) - Apply CSS styles with pre-built classnames.

[TanStack Query](https://tanstack.com/query/latest) - A library that abstracts
data fetching from API's. This basically automagically manages the data on the
frontend and ensures its synced with the database.
