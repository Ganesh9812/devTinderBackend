# DevTinder Apis

- POST /signup
- POST /login
- POST /logout

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

- GET /user/connections
- GET /user/requests/received
- GET /user/feed - gets you the profiles of other users on platform

status: ignored, interested, accepted, rejected

routes folder manages all the routes
