# isolate-plugin-runner

Proof of concept for switching between different plugin versions without restarting the main NodeJS thread.

- [x] base implementation
- [ ] Tests for true isolation (module caching / global space)
- [ ] performance checks yet

```
yarn install
node --trace-uncaught src/index.js
```