
# Contributing to GeoPlatform's Client API Library

Thanks for taking an interest in contributing!


## Table of Contents
- [Testing](#testing)
- [Reporting Bugs](#reporting-bugs)
- [Submitting Code Changes](#submitting-code-changes)
- [Code Conventions](#code-conventions)
- [Code of Conduct](#code-of-conduct)


## Quick Links
- [Adding Client API to your application](README.md)
- [How Client API works](docs/api.md)
- [How to construct queries](docs/query.md)

## Testing
Tests are run using the Mocha framework and can be found inside the test/ folder.

After installing all dependencies using `npm install` (or `yarn install`), run the
tests using `npm run test` (or `yarn run test`).


## Reporting Bugs
Before create an issue, please follow these steps to be sure an issue needs to be created:

1. Try to reproduce the issue more than once and as many situations as possible.
Using Chrome? Try to reproduce the issue with Firefox and IE.  If the problem persists or
is inconsistent across all attempts, then continue down this list.
2. Try updating your code to the latest version of this library. If you're already running
the latest, continue to the next step.
3. Determine if the issue is caused by a component within this library's codebase. If it
isn't, such as an error from the GeoPlatform UAL service indicating errors such as timeouts
or bad requests, you should contact the [GeoPlatform Service Desk](mailto:servicedesk@geoplatform.gov).
If the problem is due to a failure within this library, continue to the next step.
4. Check to ensure an issue hasn't already been created for this problem. Use GitHub's search
capabilities to find an open ticket describing the same issue. If one exists, please add a
comment to that ticket, following the [Issue Best Practices](issue-best-practices) guidelines below.
If a ticket doesn't already exist, then continue.
5. Create an issue ticket following the [Issue Best Practices](issue-best-practices) guidelines below.

### Issue Best Practices
When filing an issue, please help us best understand the problem you're experiencing by
including as much of the following in the issue as possible:

- A clear and descriptive title for the issue
- The version of the Client API library you are using
- The environment in which the problem is being observed (including OS, Browser, and NodeJS versions)
- A detailed (as much as possible) description for __all steps__ needed to reproduce the problem.
- Sample inputs used to reproduce the problem by either including code snippets in the description or
providing links to the samples
- Observed behaviors and outputs during/after reproducing the problem
- Expected behaviors and outputs
- Screenshots (if helpful in describing the behavior/output)
- Browser developer tools console output pertaining to the problem


## Submitting Code Changes
If you wish to contribute code to this repository, please create a Pull Request and
be sure to include the following information:

- A detailed description of the change
- An explanation of why this change is desired/necessary
- Benefits
- Possible Drawbacks
- Verification and Validation Process (Acceptance Criteria)
- Links to Applicable Issues
- All code changes must provide tests that verify correctness and help prevent regressions

__Note:__ Not providing any of the above when creating a pull request may result in the request
being closed (denied) at the maintainer's discretion.


## Code Conventions
Refer to JS code conventions we use

## Code of Conduct
Refer to something prolly already published by DOI
