# cutshort

This API is being built for a social media app with todo lists

Following are the routes and functionalities for the API:

1. /user - post - create a new user
2. /login - get - login for existing user
3. /todo - post - create a new todo
4. /todo/:id - post - update an existing todo
5. /todo/:id - delete - delete an existing todo
6. /post - post - create a new post
7. /post/:id - post - update an existing post
8. /post/:id - delete - delete a post
9. /todo - get - get all todos
10. /post - get - get all posts

**Schemas:**

todo schema:
    {
        id:  integer,
        content: string
        deleteFlag: bool
    }

user shcema:
    {
        id: integer,
        user_name: string,
        user_email: string,
        deleteFlag: bool
    }

post schema:
    {
        id: integer,
        post_title: string,
        post_content: string
        deleteFlag: bool
    }

comments schema:
    {
        id: integer,
        comment_content: string,
        post_id: integer,
        user_id: integer
        deleteFlag: bool
    }

# Payloads and response
**/users - post**
payload: {
    user_name: string
    user_email: string
    password: string
}

response: {
    success: bool,
    errorMessage: string
}

**/login - get**
payload: {
    user_email: string,
    password: string
}

response: {
    success: bool,
    jwtToken: string,
    errorMessage: string
}

**Issues faced**
-> Mongo client not connecting to db - issue is with localhost being configured to a different address in the system