# Functional programming in TypeScript

Published at: https://dev.to/attila_vecerek/series/18289

To run the code examples:

```sh
yarn compile
yarn node <path-to-compiled-js-file>
```

Simply running `node <path-to-compiled-js-file>` does not work because the project uses ESM + PnP. Using `yarn node` makes sure that the pnp loader is properly injected into the node command.
