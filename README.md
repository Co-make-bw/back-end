# Co-make

# Table Diagram
![Database Table](img/datatable.png)

# Models
## Users
```js
{
    username: string,
    password: string,
    points: integer
}
```
## Issues
```js
{
    title: string,
    description: string,
    upvotes: integer,
    location: string,
    user_id: integer,
    state_id: integer
}
```
## States
```js
{
    name: string,
}
```
# Endpoints
## Users
| Request Type | Endpoint                       | Description               |
|:------------:|:------------------------------:|:-------------------------:|
| POST         | /api/auth/register             | Creates User              |
| POST         | /api/auth/login                | Creates JWT               |
| GET          | /api/users                     | Returns All Users         |
| GET          | /api/users/:id                 | Returns User By ID        |
| PUT          | /api/users/:id                 | Update User               |
| DELETE       | /api/users/:id                 | Remove User               |
## States
| Request Type | Endpoint                       | Description               |
|:------------:|:------------------------------:|:-------------------------:|
| GET          | /api/states                    | Returns all states        |
| GET          | /api/states/:id                | Returns state by ID       |
| POST         | /api/states                    | Creates state             |
| PUT          | /api/states/:id                | Update state              |
| DELETE       | /api/states/:id                | Removes state             |
| GET          | /api/states/:id/issues         | Returns all state issues  |
| GET          | /api/states/:id/issues/:id     | Returns state issue by ID |
| POST         | /api/states/:id/issues         | Create issue for state    |
| DELETE       | /api/states/:id/issues/:id     | Remove issue from state   |
| PUT          | /api/states/:id/issues/:id     | Updates issue from state  |
## Issues
| Request Type | Endpoint                       | Description               |
|:------------:|:------------------------------:|:-------------------------:|
| GET          | /api/issues                    | Returns all issues        |
| GET          | /api/issues/:id                | Returns issue by ID       |

# API
## Auth routes
----------------
### POST `/api/auth/register`

**Expects the following shape**
```js
{
    username: string,
    password: string
}
```
### POST `/api/auth/login`

**Expects the following shape**
```js
{
    username: string,
    password: string
}
```
## User routes
----------------
### GET `/api/users`
- Returns all users in database
### GET `/api/users/:id`
- Returns user with matching id
### PUT `/api/users/:id`
- Updates user information

**Expects the following shape :**
```js
{
    username: string,
    password: string,
    points: integer
}
```
### DELETE `/api/users/:id`
- Removes user with matching id

## State routes
----------------
### GET `/api/states`
- Returns all states
### GET `/api/states/:id`
- Returns state with matching id

## Issue routes
----------------
### GET `/api/issues`
- Returns all issues everywhere
### GET `/api/issues/:id`
- Returns issue with matching id
### GET `/api/states/:id/issues`
- Returns all issues for a specified state
### GET `/api/states/:id/issues/:id`
- Returns issue with matching id for a specified state
### POST `/api/states/:id/issues`
- Creates new issue for state
- Upvotes (not shown) will automatically be set to 0
- user_id and state_id will be set by back end 😁

**Expects the following shape :**
```js
{
    title: string,
    description: string,
    location: string
}
```
### DELETE `/api/states/:id/issues/:id`
- Removes issue from state
### PUT `/api/states/:id/issues/:id`
- Updates issue with matching id for a specified state
- Update *at least* one field required

**Expects the following shape :**

```js
{
    title: string,
    description: string,
    location: string,
    upvotes: integer
}
```