# cutshort

This API is being built for a social media app with todo lists

Following are the routes and functionalities for the API:

1. /user - post - create a new user - done
2. /login - get - login for existing user - done
3. /todo/create - post - create a new todo - done
4. /todo/update - post - update an existing todo - done
5. /todo/:id - delete - delete an existing todo - done
6. /post/create - post - create a new post
7. /post/update - post - update an existing post
8. /post/:id - delete - delete a post
9. /todo - get - get all todos - done
10. /post - get - get all posts

**Schemas:**

todo schema:
    {
        id:  integer,
        title: string,
        createdby_id: ObejctId,
        createdby_name: string,
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
        title: string,
        createdby_id: ObejctId,
        createdby_name: string,
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