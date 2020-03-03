# Co-make

# Table Diagram
![Database Table](img/datatable.png)

# Models
## Users
```js
{
    username: string, // Required
    password: string, // Required
    about: text, // Required
    points: integer // Required
}
```
## Issues
```js
{
    title: string, // Required
    description: string, // Required
    location: string, // Required
    upvotes: integer, // Defaults to 0
    user_id: integer, // Foreign key required
    state_id: integer // Foreign key required
}
```
## States
```js
{
    name: string, // Required
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
| GET          | /api/users/:id/states          | Returns User states       |
| POST         | /api/users/:id/states          | Add state to user         |
## States
| Request Type | Endpoint                       | Description               |
|:------------:|:------------------------------:|:-------------------------:|
| GET          | /api/states                    | Returns all states        |
| GET          | /api/states/:id                | Returns state by ID       |
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
```js
{
    id: 9,
    username: "Bob",
    points: 0,
    about: "I drive my Miata up and down the east coast weekly."
}
```
### PUT `/api/users/:id`
- Updates user information

**Expects the following shape :**
```js
{
    username: string,
    password: string,
    points: integer,
    about: text
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