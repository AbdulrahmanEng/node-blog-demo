# Blog

## MySQL commands for Posts:

### Create Post table
`CREATE TABLE posts (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, title VARCHAR(20), body TEXT);`

### Create post
`INSERT INTO posts (id,title,body) VALUES (NULL, ?, ?);`

### Update post
`UPDATE posts SET title='New Title', body = 'New Body' WHERE posts.id = ?;`

### Delete post
`DELETE from posts where id=?;`