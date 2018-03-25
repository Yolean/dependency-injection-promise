
This is a way to modularize a service with asynchronously configured components,
and declare these components at a global `config` object.

Modularization (like Guice's `Module`s) can be achived by nesting levels in `config`.
Can be an afterthought by introducing thew config source files that wrap the original config, without renaming and .

Thus config exports should probably be named.
```
import { myCurrentScope } from '../config';
```
