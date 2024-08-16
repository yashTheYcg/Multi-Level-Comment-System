
## API Reference
#### Endpoints
- [Signup](#signup)
- [Login](#login)
- [Post](#post)
- [Comment](#comment)
- [Reply Comment](#reply-comment)
- [Get Comments](#get-comments)
- [Expand Comment](#expand-comments)


#### Baseurl 
```http
https://yashchandilgupta-multilevel-comments-v0-2.onrender.com/
```

## Signup 
User can signup here

**Request:**
```json
POST /api/signup HTTP/1.1
Accept: application/json
Content-Type: application/json

{
    "email": "test@gmail.com",
    "password": "123456" 
}
```
**Response:**
```json
{
  "message": "User registered successfully",
  "status": "success"
}
```

## Login
User can login here & we get jwt token in response  which we can use for access other endpoints

**Request:**
```json
POST /api/login HTTP/1.1
Accept: application/json
Content-Type: application/json

{
    "email": "test@gmail.com",
    "password": "123456" 
}
```
**Response:**
```json
{
  "message": "Login Successfully",
  "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZThlMGZmNGMtYjk0MS00YmFmLWJjYTktNWYxOTg0MTA5MTA2In0sImlhdCI6MTcyMzgxMjEwMywiZXhwIjoxNzIzOTg0OTAzfQ.aS4Jvm4o3RjldbxiaFKYm_EinMT-PaQLG2wsq-vGC0",
  "status": "success"
}
```

## Post 
User can create post here in text form.

**Request:**
```json
POST /api/posts HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZThlMGZmNGMtYjk0MS00YmFmLWJjYTktNWYxOTg0MTA5MTA2In0sImlhdCI6MTcyMzcyNDgzOCwiZXhwIjoxNzIzODk3NjM4fQ.deFm9J62pRRaWlhUIBxnt-xGdcKOYMXfRKQQphn5tC
{
  "content":"Testing post while writing documentation"
}
```
**Response:**
```json
{
  "message": "Post created successfully"
}
```

## Comment
User can comment on any post

**Request:**
```json
POST /api/posts/{postId}/comments HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZThlMGZmNGMtYjk0MS00YmFmLWJjYTktNWYxOTg0MTA5MTA2In0sImlhdCI6MTcyMzcyNDgzOCwiZXhwIjoxNzIzODk3NjM4fQ.deFm9J62pRRaWlhUIBxnt-xGdcKOYMXfRKQQphn5tC
{
  "text":"This is 16th August Today 18:27 in the evening"
}
```
**Response:**
```json
{
  "message": "Comment added successfully"
}
```
**Rate Limiation:**
```json
User can do 2 comments only in 5 minutes for same post
```

## Reply Comment
User can reply to existing comment on a post

**Request:**
```json
POST /api/posts/{postId}/comments/{commentId}/reply HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZThlMGZmNGMtYjk0MS00YmFmLWJjYTktNWYxOTg0MTA5MTA2In0sImlhdCI6MTcyMzcyNDgzOCwiZXhwIjoxNzIzODk3NjM4fQ.deFm9J62pRRaWlhUIBxnt-xGdcKOYMXfRKQQphn5t
{
  "text":"Replying for the comment"
}
```
**Response:**
```json
{
  "message": "Comment replied"
}
```
**Rate Limiation:**
```json
User can do 2 reply only in 5 minutes for same comment
```

## Get comments
User can get all comments of the post

**Request:**
```json
POST /api/posts/{postId}/comments?sortBy=createdAt&sortOrder=asc HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZThlMGZmNGMtYjk0MS00YmFmLWJjYTktNWYxOTg0MTA5MTA2In0sImlhdCI6MTcyMzcyNDgzOCwiZXhwIjoxNzIzODk3NjM4fQ.deFm9J62pRRaWlhUIBxnt-xGdcKOYMXfRKQQphn5t
```
**Response:**
```json
{
  "comments": [
    {
      "commentId": "c08e8cc4-1833-4506-914a-1b89baa17e4a",
      "postId": "c5558dff-a59c-4dbb-a425-2dc8f2a7c208",
      "userId": "e8e0ff4c-b941-4baf-bca9-5f1984109106",
      "parentCommentId": null,
      "text": "Testing comment first",
      "createdAt": "2024-08-15T16:41:02.167Z",
      "totalReplies": 3,
      "replies": [
        {
          "commentId": "dada6383-2c64-4aae-a0fd-038a391f067e",
          "text": "This is the reply of the comment third time for second time",
          "createdAt": "2024-08-15T18:07:37.983Z"
        },
        {
          "commentId": "ee23bc67-248d-4d8d-aded-5622f5501a97",
          "text": "This is the reply of the comment second time",
          "createdAt": "2024-08-15T16:41:02.167Z"
        }
      ]
    },
    {
      "commentId": "c209ca13-1879-4ff2-b117-deca9f03c3e3",
      "postId": "c5558dff-a59c-4dbb-a425-2dc8f2a7c208",
      "userId": "e8e0ff4c-b941-4baf-bca9-5f1984109106",
      "parentCommentId": null,
      "text": "Adding more comments for testing for same post",
      "createdAt": "2024-08-15T18:43:09.158Z",
      "totalReplies": 1,
      "replies": [
        {
          "commentId": "3ea87eaf-a1e4-4eae-a2eb-88ce13ecd2a5",
          "text": "Replying for the added new comment",
          "createdAt": "2024-08-15T18:43:09.158Z"
        }
      ]
    },
    {
      "commentId": "8a4216ed-3d89-46af-840d-fa9ac89a1768",
      "postId": "c5558dff-a59c-4dbb-a425-2dc8f2a7c208",
      "userId": "e8e0ff4c-b941-4baf-bca9-5f1984109106",
      "parentCommentId": null,
      "text": "This is 16th August Today 05:58 in the morning",
      "createdAt": "2024-08-16T00:29:41.047Z",
      "totalReplies": 0,
      "replies": []
    },
    {
      "commentId": "63664465-cc88-4b6a-b477-2f9380bebca1",
      "postId": "c5558dff-a59c-4dbb-a425-2dc8f2a7c208",
      "userId": "e8e0ff4c-b941-4baf-bca9-5f1984109106",
      "parentCommentId": null,
      "text": "This is 16th August Today 05:58 in the morning",
      "createdAt": "2024-08-16T00:29:41.047Z",
      "totalReplies": 0,
      "replies": []
    }
  ]
}
```

## Expand Comments
User can expand the remaining replies of the comments

**Request:**
```json
POST /api/posts/{postId}/comments/{commentId}/expand HTTP/1.1
Accept: application/json
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZThlMGZmNGMtYjk0MS00YmFmLWJjYTktNWYxOTg0MTA5MTA2In0sImlhdCI6MTcyMzcyNDgzOCwiZXhwIjoxNzIzODk3NjM4fQ.deFm9J62pRRaWlhUIBxnt-xGdcKOYMXfRKQQphn5t
```
**Response:**
```json
{
  "replies": [
    {
      "commentId": "a9ca6d66-74d7-4aeb-8784-42c5440b66d0",
      "postId": "c5558dff-a59c-4dbb-a425-2dc8f2a7c208",
      "userId": "e8e0ff4c-b941-4baf-bca9-5f1984109106",
      "parentCommentId": "c08e8cc4-1833-4506-914a-1b89baa17e4a",
      "text": "This is the reply of the comment second time",
      "createdAt": "2024-08-15T16:41:02.167Z",
      "totalReplies": 2,
      "replies": [
        {
          "commentId": "0fcc9b88-92d1-4932-a1db-ff68b4cac72c",
          "text": "This is the nested reply first",
          "createdAt": "2024-08-15T18:29:26.332Z"
        },
        {
          "commentId": "bbbaf9d6-8498-438c-aa61-c4119fde06ca",
          "text": "This is the nested reply second",
          "createdAt": "2024-08-15T18:29:26.332Z"
        }
      ]
    }
  ]
}
```










