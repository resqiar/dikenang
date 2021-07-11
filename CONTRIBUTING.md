# Contributing to dikenang

✨ First off, thank you so much for taking time to contribute, this is my first time maintaining open-source project, so with the help
of you, we will learn something together.✨

The following is a set of guidelines for contributing to dikenang. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

We love your help, we want to make this project as easy and transparent as possible, whether it's:
- Reporting an issue
- Discussing
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Code of Conduct
The code of conduct is described in [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Pull Requests
1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add some test examples.
3. Ensure to describe your pull request.

## Using Standard Commit Messages
This project is using the [conventional commits message](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) standard. Please follow these steps to ensure your
commit messages are standardized, for more informations see [semantic commit message](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716).

If you somehow commit with non conventional messages, it will automatically canceled due to bad commit message. You can run `yarn commit` to commit with following guidelines

## Code Styleguide
All JS/TS code is linted with [Prettier](https://prettier.io/).
* Prefer relative path import whenever possible instead of absolute. (Jest kinda have an issue with absolute path, we will fix this in the future)
* We use Tabs instead of Space.
* We dont use semicolons.
* Whenever possible, use single quote instead of double.
> More about code style/formatting see [.prettierrc](.prettierrc)

If you somehow non following our conventions, Prettier will automatically format them when you are committing changes 

## Issues
We use GitHub issues to track public bugs. Please ensure your description is
clear and has sufficient instructions to be able to reproduce the issue. Report a bug by <a href="https://github.com/resqiar/dikenang-server/issues">opening a new issue</a>; it's that easy!

## Feature Request
Great feature requests should have:

- A quick summary.
- What & why you wanted to add the specific feature.
- Additional context like images, links to resources to implement the feature etc.

## License
By contributing to Dikenang, you agree that your contributions will be licensed
under the [LICENSE](LICENSE).
