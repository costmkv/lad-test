# lad test app

Set the following values in credentials.json (up one directory) under the web key:
``` js
{
  "web" : {
    "redirect_uris": ["http://localhost:3000/oauth2callback"],
    "client_id": "<YOUR_CLIENT_ID>",
    "client_secret": "<YOUR_CLIENT_SECRET>",
    "project_id": "<YOUR_PROJECT_ID>"
  }
}
```

Run `index.js` with MONGODB_URI
``` js
MONGODB_URI='mongodb://127.0.0.1:27017/testMovies' node index.js
```
Note: Node.js version 12
