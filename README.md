# "Github Projects" - plugin for Strapi 4

This plugin allows to automatically generate "Projects" from public Github repositories, meant to be then exposed via a public API, e.g. to be shown on a front-end application with the aim to showcase a developer's portfolio.
It is meant mostly for educational purposes, being built  by Bilgekaan36, so it's not tested in production.

## How to install

```bash
# yarn
yarn add @kaan36/strapi-plugin-github-projects

# npm
npm i @kaan36/strapi-plugin-github-projects
```

## Initial configuration

In order to use this plugin, you need to generate a new personal token [on Github](https://github.com/settings/tokens).
The generated API key must then be set up for your Strapi app as an environment variable called `GITHUB_TOKEN` (add it to your `.env` file).

## Submit issues

Click [here](https://github.com/kaan36/strapi-plugin-github-projects/issues/new) to submit an issue

## About me

I’m Bilgekaan Yilmaz, a passionate Fullstack Developer who believes in the power of beautifully crafted code. With a keen eye for design and a love for creating seamless user experiences, I thrive on transforming ideas into visually stunning and functional digital solutions.

## Disclaimer

I`m not endorsed or affiliate in any way with Strapi nor with Github. The names and/or logos of such third-parties are or may be used just to describe the functionality of this plugin.