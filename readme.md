# Kanban
<img class="img-responsive" src="https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80">

A Kanban board is a method for managing the creation of products with an emphasis on continual delivery while not overburdening the development team. Like Scrum, Kanban is a process designed to help teams work together more effectively. This application will provide users with a digital Kanban board, where they can manage several lists of tasks for each board.

## Goals

In this checkpoint students will demonstrate a working knowledge of building full-stack applications. They will utilize a VueJs frontend implementing the Vuex design and Vue-Router to manage the dom. On the server side students will use Express with Node.js for their server, as well as implementing express-sessions for authentication, mongoose as an ORM and MongoDB as their database.

## The Buisness Logic

Kanban is a simple enough application. Users have the request to be able to create and manage boards, lists, and tasks. Tasks should also have the ability to add notes or comments. This setup will take a while to get all ironed out but we have some time to work on it so don't fret.

A board manages several lists. Once created lists can not be transfered between boards but they can be removed. If a list is removed go ahead and remove all of the tasks and comments on the list as well to avoid orphan data.

A task should be able to move between any of the lists on whatever board it was created. Tasks can be removed individually. 

Comments always belong to a task and will transfer with the task when moved. This should not require any extra efforts on your part. If a comment is created only the user who created the comment should be able to edit/remove it unless of course the task, list, or board is removed. 

## The Setup

Perhaps one of the most important skills to obtain on your road to becoming a Software Engineer is the ability to work on large projects. Especially when those larger projects have a code scaffolding that has been set up by someone other than yourself. It is important to be able to jump into the mix of a development teams build and disect what everything is doing. 

As we move into these larger projects we are also going to start enforcing stricter guidelines to help teach the concepts of Object Oriented Programming.

You will notice that there are two main directories in this project. One for the frontend and the other is for the server. Having these distinct directories helps create a separation of concerns. To help cement this even further you may want to open up two instances of vscode, one for each directory. 

You will need to launch both the client and the server independently. Make sure you start up and run both projects(front end and back end).

The goal of each of these projects is to be decoupled from each other. Meaning your web front-end should have no idea if your backend ever has to change databases, switch servers, or any number of other things that can often occur. Likewise our backend server shouldn't care at all about what JS-Flavor-of-the-Week-Framework we are using, or even if requests are coming from a mobile application. With this process we are beginning the foundations of an N-Tier application.

![n-tier](http://www.amzi.com/articles/youbet_architecture.gif)


### Step 1

It will probably be helpful to start on the backend of this application first. Utilize a tool like postman to start creating and editing your boards which has been setup for you already. Then move onto the other collections. 

On the server you will utilize a node-mongodb setup with express sessions and a mongoose ORM. The server side code needs to be setup similar to your previous projects*. You will need to create a new free database on atlas for this assignment. 

The active user is always stored on the server side via sessions so you should be able to enforce some of the security concerns using something like `req.userInfo.email`

For now all users can see only their boards and anyone can create boards, lists, tasks, or comments but only allow them to do so on their own boards. Once we have all of the features working we will move to an invite only board setup that will have boards belonging to a primary user and having contributors

*\* portions of this have already been done for you*

### Step 2
The Web client will be a vue application. The project has already been initialized and some of the views/components established. Login/Register should all work for example, however it is up to you figure out what to do from there.

## Requirements

### Visualization

- The Front End is styled (this is a broad concept, but put a bit of effort into it as this makes a great portfolio piece)
- A user should not have to re-login everytime they refresh the page
- From the **Boards** Page Users can create/delete their own boards
- From the **Board** Page a user can create/delete The Lists associated with the board
- Tasks can be created/deleted inside any list on the **Board** page
- Tasks can be moved between lists (Does not have to be drag and drop)
- A user can add and remove comments to a Task

### Functionality

- Only the creator of an object can delete it
- A user Must have the ability to log in and out.
- The Backend needs to be able to create and store the boards created by users
- Each board can have lists
- Each List can have tasks
- Each task can have comments
- Only authenticated users currently logged in can access the api

### Bonus Ideas:
- Add to the front and backend the ability to have collaborators on boards
- Add Sockets to the project so any collaborator gets instant feedback when users modify a board
- Comment authors username is next to the comment




# Auth0 Server Setup

This template is designed to help kickstart a project that utilizes <a href="https://auth0.com/" target="_blank">Auth0.</a> The bulk of the structure has been setup and requires a few pieces of configuration.

The first thing you will need to provide is in the `.env` file. You will need to supply the port, Auth0 credentials, and mongoDb connectionstring. These environment variables are used throughout the template, so be sure to add them in when moving into production as well.

**_.env_**

```
PORT=
CONNECTION_STRING=
AUTH_DOMAIN=
AUTH_AUDIENCE=
AUTH_CLIENT_ID=
```

### MVC - Controllers

This template will automatically register all of the controllers found in the controllers folder of the server. This opinionated workflow should help provide a structure on how to build your api. Generally speaking every controller method should start with a `try catch block` and utilize the default error handler setup in Startup.js This means if a request ever fails the controller should call the next function with the error provided.

### MVC - Services

Services are responsible for implementing and enforcing your business rules. Be sure to use them wisely and do not put your business logic in controllers. Services should be usable by both controllers and sockets and potentally other services. Never directly access the `DbContext` outside of a service.

### MVC - (Models, Collections & DbContext)

Models are defined as mongoose schemas and then imported into a central location called the DbContext. All access to the database should be limited to the DbContext. `Collections.js` is a file purely designed to avoid the common problem of magic strings. This means when you register your models and have dependencies or relationships between one or more models you should import from Collections so you know the naming is always the same.

### Working with Auth0

This library provides easily configured middleware that will validate user auth tokens, roles, permissions and provides a simple approach to get userInfo associted with a user account. Each middleware will call next with an error on any failure so be sure to setup a default error handler. Also note that we extend the express request object with

- req.user: `{ UserIdentity }`
- req.userInfo: `{ UserInfo }`

### Enable RBAC or Extended Rules (required)

In your auth0 dashboard be sure to enable RBAC or add in this custom rule

```javascript
//AUTH0 RULE
function (user, context, callback) {
  // please note auth0 will strip any non namespaced properties
  const namespace = 'https://YOURDOMAIN.auth0.com';
  const assignedRoles = (context.authorization || {}).roles;

  let idTokenClaims = context.idToken || {};

  idTokenClaims[`${namespace}/roles`] = assignedRoles;
  context.idToken = idTokenClaims;
  context.idToken[namespace + '/user_metadata'] = user.user_metadata;
  context.idToken[namespace + '/app_metadata'] = user.app_metadata;

  callback(null, user, context);
}
```

Example of how to use and configure auth0provider, You can configure the auth0provider anywhere in your application and then import it and use the middleware anywhere

```javascript
import { auth0provider } from "@bcw/auth0-server";

auth0provider.configure({
  domain: process.env.AUTH_DOMAIN,
  clientId: process.env.AUTH_CLIENT_ID,
  audience: process.env.AUTH_AUDIENCE
});

// validates a request has a Bearer auth token in req.headers.authentication
app.use("/authenticated", auth0provider.isAuthenticated, (req, res, next) => {
  res.send({ userIdentity: req.user });
});

// validates the request token and extracts the userInfo saved in auth0
app.use("/user-profile", getAuthorizedUserInfo, (req, res, next) => {
  res.send({ userIdentity: req.user, userInfo: req.userInfo });
});

// validates the request token, extracts the userIdentity and userInfo
// fails if role is not found in the token
// Enable RBAC or Extended Rules
app.use(
  "/admins-only",
  auth0provider.hasRoles("admin"),
  (req, res, next) => {}
);

// validates the request token, extracts the userIdentity and userInfo
// fails if any permission is not found in the token
// Enable RBAC or Extended Rules
app.use(
  "/messages",
  auth0provider.hasPermissions(["read:messages", "write:messages"]),
  (req, res, next) => {}
);

//recommended default error handler
app.use((error, req, res, next) => {
  if (error.status == 500 || !error.status) {
    error.message = console.error(error); // should write to external
  }
  error = error || {
    status: 400,
    message: "An unexpected error occured please try again later"
  };
  res.status(error.status).send({ ...error, url: req.url });
});
```

Using chained methods with express.Router()

```javascript
express
  .Router()
  .get("", this.getAll)
  .use(AuthorizationService.isAuthorized)
  // everything below this point requires authorization
  .get("/:id", this.getById);
  .put("/:id", this.updateById);
  .use(AuthorizationService.hasPermission("delete:blog"))
  // requires permission to reach this point
  .delete("/:id", this.deleteById);
```
