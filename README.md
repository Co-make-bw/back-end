# Co-make

## Table Diagram
![Database Table](img/datatable.png)

## Models
### Users
```js
{
    username: string,
    password: string,
    points: integer
}
```
### Issues
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
### States
```js
{
    name: string,
}
```
## Endpoints
### Users
| Request Type | Endpoint                       | Description               |
|:------------:|:------------------------------:|:-------------------------:|
| POST         | /api/auth/register             | Creates User              |
| POST         | /api/auth/login                | Creates JWT               |
| GET          | /api/users                     | Returns All Users         |
| GET          | /api/users/:id                 | Returns User By ID        |
| PUT          | /api/users/:id                 | Update User               |
| DELETE       | /api/users/:id                 | Remove User               |
### States
| Request Type | Endpoint                       | Description               |
|:------------:|:------------------------------:|:-------------------------:|
| GET          | /api/states                    | Returns all states        |
| GET          | /api/states/:id                | Returns state by ID       |
| POST         | /api/states                    | Creates state             |
| PUT          | /api/states/:id                | Update state              |
| DELETE       | /api/states/:id                | Removes state             |
### Issues
| Request Type | Endpoint                       | Description               |
|:------------:|:------------------------------:|:-------------------------:|
| GET          | /api/issues                    | Returns all issues        |
| GET          | /api/issues/:id                | Returns issue by ID       |
| GET          | /api/states/:id/issues         | Returns all state issues  |
| GET          | /api/states/:id/issues/:id     | Returns state issue by ID |
| POST         | /api/states/:id/issues         | Create issue for state    |
| DELETE       | /api/states/:id/issues/:id     | Remove issue from state   |
| PUT          | /api/states/:id/issues/:id     | Updates issue from state  |