
Here you don't bind to interfaces, but to typed properties in a config JSON-as-js. It's a way to modularize a service with asynchronously configured components.
The primary motivation is testability.
You inject dependencies by passing the config objects.
It's very close to what you end up doing anyway,
because you tend to need promises to initialize components.

Modularization (like Guice's `Module`s) can be achived by nesting levels in `config`.
Can be an afterthought by introducing thew config source files that wrap the original config, without renaming and .

Note that this is Inversion of Control: for `DependencyLazy` nothing will import the actual provider unless you do so.

## Say what?

This is some kind of inversion of Inversion of Control :)
and it's based on how we've productively developed small services:
 * There's a main, like `src/index.js` (package.json says so)
 * There's a `config.js` (not JSON because it has no comment syntax and can't read process.env)
 * Config declares constant, synchronous, parameters like connection strings.

Now we attempt to add:

 * In addition to constants, config declares modules, for example:
   - An established connection to a backend
   - A feature that exposes an API
 * Main does `import`s (or `require`s) to select implementations.
 * Modules that depend on other modules _don't import_, they read from config.
   - And while they too import config at the top, they can at the same time _provide_ impls for such modules.
 * The framework essentially defers the resolution (or "providers") of these modules until needed.
   - And guards agains multiple implementations of the same module.

This means that there's one main for production, one main for integration tests, no main for unit tests :), separate mains elswhere if the package is used as npm dependency.

The global require of config is the weak part here, in particular if used as lib,
but it has worked very well for simple services and we're not only aiming a little bit higher now.

The desired outcome is to avoid hierarchies of modues initializing each other, i.e. to simplify and clarify a production setup.
As with regular dependency injection this should also make TDD more practical.
