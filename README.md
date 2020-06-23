# Production Environment Variables

Use one set of environment variables on development branches and another set on the default branch.

## Usage

### Inputs

* `keys`: The environment variables to search replace with production values.
* `defaultBranchName`: The default branch name (defaults to master).

### Example Workflow

```yaml
name: Do Stuff
on: push

jobs:
  doIt:
    name: Do It
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - uses: chadly/prod-env-variables@v1
      with:
        keys: |
          API_URL
          GOOGLE_ANALYTICS
      env:
        API_URL: https://devapi.example.com
        API_URL_PROD: https://api.example.com
        GOOGLE_ANALYTICS_PROD: my_analytics_key

    - name: Echo 1
      run: echo $API_URL
    - name: Echo 2
      run: echo $GOOGLE_ANALYTICS
```

With the above workflow, on the `master` branch, `API_URL` would be `https://api.example.com` while `GOOGLE_ANALYTICS` would be `my_analytics_key`. On any other branch, `API_URL` would be `https://devapi.example.com` while `GOOGLE_ANALYTICS` would be empty.
