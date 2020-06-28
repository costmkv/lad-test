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

Run `index.js`
``` js
node index.js
```
Note: Node.js version 12
