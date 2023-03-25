# cutshort

This API is being built for a social media app with todo lists

Following are the routes and functionalities for the API:

1. /user - post - create a new user
2. /login - post - login for existing user
3. /todo - post - create a new todo
4. /todo/:id - post - update an existing todo
5. /todo/:id - delete - delete an existing todo
6. /post - post - create a new post
7. /post/:id - post - update an existing post
8. /post/:id - delete - delete a post
9. /todo - get - get all todos
10. /post - get - get all posts

Schemas:

todo schema:
    {
        id:  integer,
        content: string
    }

user shcema:
    {
        id: integer,
        user_name: string,
        user_email: string
    }

post schema:
    {
        id: integer,
        post_title: string,
        post_content: string
    }

comments schema:
    {
        id: integer,
        comment_content: string,
        post_id: integer,
        user_id: integer
    }