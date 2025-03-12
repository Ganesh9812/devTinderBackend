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
res.send("hello from dashboard");
});

app.use("/test", (req, res) => {
res.send("hello from server");
});

app.use("/hello", (req, res) => {
res.send("hello hello server");
});

http://localhost:3000/ we will get cannot get /
http://localhost:3000/test we will get the response
http://localhost:3000/hello we will get the response
