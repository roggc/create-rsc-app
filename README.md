# create-rsc-app

To use this package you must do **`npx create-rsc-app@latest my-app`**, to create a **RSC (React Server Components)** app, or, if you want also to have **SSR (Server Side Rendering)**, you must type **`npx create-rsc-app@latest my-app --ssr`**.

Basically what this package does is to clone a github repository where a setup for RSC development is found. Then it removes remote origin and finally it installs node modules dependencies. The github repository it clones depends on the option passed **`--ssr`**. If it's not passed then **[this](https://github.com/roggc/rsc)** repository is cloned. If passed, then **[this](https://github.com/roggc/rsc-ssr)** repository instead is cloned.
