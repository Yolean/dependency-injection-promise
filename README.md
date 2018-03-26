
Here you don't bind to interfaces, but to typed properties in a config JSON-as-js. It's a way to modularize a service with asynchronously configured components.
The primary motivation is testability.
You inject dependencies by passing the config objects.
It's very close to what you end up doing anyway,
because you tend to need promises to initialize components.

Modularization (like Guice's `Module`s) can be achived by nesting levels in `config`.
Can be an afterthought by introducing thew config source files that wrap the original config, without renaming and .

Note that this is Inversion of Control: for `DependencyLazy` nothing will import the actual provider unless you do so.
