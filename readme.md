# @inshel/code

*Concept. Not ready for use*

## Motivation

One monorepo for storage and run packages.

## Install

```bash
npm install --save @inshel/code
```

## API

### Projects

| Field    | Type    | Description       |
| -------- | ------- | ----------------- |
| id       | integer | Project id        |
| owner    | integer | Owner key id      |
| name     | string  | Unique name       |
| type     | string  | Project type      |
| isPublic | boolean | Is project public |
| payload  | object  | Any object        |

If isPublic - false, only owner can use this project.  
Support to run only "static" type.

*Lambdas*

- projects.create
- projects.get
- projects.list
- projects.update
- projects.remove

### Versions

| Field    | Type    | Description       |
| -------- | ------- | ----------------- |
| id       | integer | Version id        |
| project  | integer | Project id        |
| name     | string  | Version name      |
| isPublic | boolean | Is version public |
| payload  | object  | Any object        |

If isPublic - false, only owner see and can use this version.
project, name - unique

*Lambdas*

- versions.create
- versions.get
- versions.list
- versions.update
- versions.remove

### Files

| Field    | Type     | Description       |
| -------- | -------- | ----------------- |
| id       | integer  | File id           |
| version  | integer  | Version id        |
| path     | string[] | File path         |
| name     | string   | Name              |
| contect  | string   | File content      |
| payload  | object   | Any object        |

If isPublic - false, only owner can use this version.
version, path, name - unique

*Lambdas*

- fs.create
- fs.get
- fs.content
- fs.list
- fs.subdirs
- fs.update
- fs.remove

### Tags

| Field    | Type     | Description       |
| -------- | -------- | ----------------- |
| id       | integer  | Tag id            |
| project  | integer  | Project id        |
| name     | string   | Name              |
| version  | integer  | Version id        |
| payload  | object   | Any object        |

If isPublic - false, only owner can use this version.
project, name - unique

*Lambdas*

- tags.create
- tags.get
- tags.list
- tags.update
- tags.remove

### TagHistory

| Field    | Type     | Description        |
| -------- | -------- | ------------------ |
| id       | integer  | Tag history id     |
| tag      | integer  | Tag id             |
| index    | integer  | History item index |
| value    | object   | Tag value          |

tag, index - unique

*Lambdas*

- tagHistory.list
- tagHistory.remove
- tagHistory.restore

### Domains

| Field    | Type     | Description          |
| -------- | -------- | -------------------- |
| id       | integer  | Domain id            |
| domain   | string   | domain name (unique) |
| owner    | integer  | Owner key id         |
| payload  | object   | Domain payload       |

*Lambdas*

- domains.approve
- domains.get
- domains.list
- domains.update
- domains.remove

### Tokens

*Lambdas*

- tokens.create(ttl:integer): string
- tokens.remove
- tokens.remove-all

## Versions

### next

- New documentation

### 0.1.0

- First implementation