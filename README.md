# devTinderBackend

s2e3

command line
ctrl + tilda

npm init for initialization of project
this will create a package.json

now we need to create a server
the listen on the server
when we listen it means we will be able to accept the incomign requests from the outside world once we create the server
now we create a server using express js

express nodejs framework
using this we will listen on the server and anybody can send requests to us
install expressjs

dependencies are nothing but any package our project is dependent on and without this our project cannot run

package.json
^ means our project will automatically get updated for 4.x.x
~

package-lock.json
what exact version im using is defined in the package-lock.json
becaue we are using ^ so project gets auto updated to lets say 4.2.3 to 4.2.4 but this 4.2.4 will be package-lock.json

now lets create our own server
const app = express();
this is an instance of an expressjs application
basically this is like creating a webserver using express
then i have listen on some port so that anybody can send requests or connect to us
app.listen(3000)
now i have created a webserver on port 3000 and my app is listening on that server
app.listen(3000, () => {
console.log("server is succesfully listening on port 3000");
});
server is up means it should listen on some port
the callback will be called only when my server is up and running

app.use((req, res) => {
res.send("hello from server");
});

(req, res) => {
res.send("hello from server");
}
here this function is known as request handler
if we do http://localhost:3000/
we get the resonsepnse

app.use("/test", (req, res) => {
res.send("hello from server");
});

we can give route as well for the first paramer
here if we do
http://localhost:3000/ we will get cannot get /
http://localhost:3000/test we will get the response

app.use("/test", (req, res) => {
res.send("hello from server");
});

app.use("/hello", (req, res) => {
res.send("hello hello server");
});

http://localhost:3000/ we will get cannot get /
http://localhost:3000/test we will get the response
http://localhost:3000/hello we will get the response

install nodemon
it will automatically refreshes the server whenever i save the changes

s2e4

app.use("/", (req, res) => {
res.send("hello from pavan");
});

app.use("/test", (req, res) => {
res.send("hello from server");
});

app.use("/hello", (req, res) => {
res.send("hello hello server");
});

http://localhost:3000/ we will get "hello from pavan"
http://localhost:3000/test we will get the response same "hello from pavan"
http://localhost:3000/hello we will get the response "hello from pavan"
http://localhost:3000/random we will get the response "hello from pavan"
this is because the below
app.use("/", (req, res) => {
res.send("hello from pavan");
});
overrides everything thats why
anything that matches after /
app.use("/", (req, res) => {
res.send("hello from pavan");
}); will be called

another example

app.use("/test", (req, res) => {
res.send("hello from test");
});

app.use("/hello", (req, res) => {
res.send("hello from hello");
});

http://localhost:3000/ we will get cannot get /
http://localhost:3000/test we will get the response same "hello from test"
http://localhost:3000/hello we will get the response "hello from hello"
http://localhost:3000/hello/random we will get the response "hello from hello"
http://localhost:3000/hello12/random we will get cannot get /hello12/random
http://localhost:3000/random we will get cannot get /random

another example

app.use("/test", (req, res) => {
res.send("hello from test");
});

app.use("/hello", (req, res) => {
res.send("hello from hello");
});

app.use("/", (req, res) => {
res.send("hello from pavan");
});

http://localhost:3000/ - hello from pavan
http://localhost:3000/test - hello from test
http://localhost:3000/hello - hello from hello
http://localhost:3000/random - hello from hello

if the first route does not match then the execution will go for next route
order of the routes matter a lot

http methods
post, get, patch, delete which are supported by the browsers and http protocol

lets say
app.use("/test", (req, res) => {
res.send("hello from server");
});

app.use("/hello", (req, res) => {
res.send("hello hello server");
});

we made http://localhost:3000/xyz we get cannot GET /xyz
here if we got network tab and see the Request method and it is making GET api call to /xyz
when we put any link in browser it makes and GET api call but post api directly we cannot do from browser

for testing our api or routes we use the postman

app.use match all the http method api calls

from now use app.get or app.post instead of app.use

if we do app.get it will match only get api call

for example if you have
app.use("/hello", (req, res) => {
res.send("hello from server");
});

app.get("/user", (req, res) => {
res.send("hello");
});

it will hello from server
order matters

app.get("/ab?c", (req, res) => {
res.send("response");
});
here b is optional so ac or abc also should work
app.get("/ac", (req, res) => {
res.send("response");
});

app.get("/ab+c", (req, res) => {
res.send("response");
});
abc works
abbc works
abbbbbc also works
abbbbcc not works

app.get("/ab\*cd", (req, res) => {
res.send("response");
});
anything between ab and cd should work

app.get("/a(bc)?d", (req, res) => {
res.send("response");
});
here bc is optional

abcd works
ad works

even we can write regex in the route, it also works

also
app.get("/user", (req, res) => {
console.log(req.query)
res.send("response");
});
req.query gives the query parameters in an object

dynamic route
app.get("/user/:userId", (req, res) => {
res.send("response");
});
req.params gives the userId value in an object

app.get("/user/:userId/:name/:password", (req, res) => {
res.send("response");
});
req.params gives the userId value in an object
