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

s2e5

app.get("/abc", (req, res) => {
res.send("response");
});

(req, res) => {
res.send("response");
}
this function is known as route handler

app.use("/abc", (req, res) => {
res.send("response");
});
what if we didnt send response
what if we didnt send any response
it goes to infinite loop, after sometime there will be timeout hit and after that this request will be timed out

also one route can have the multiple route handlers

app.use(
"/abc",
(req, res) => {
res.send("response1");
},
(req, res) => {
res.send("response2");
}
);
which response we get
we get response1
why because once the route matches, first the code goes to the first route handler and if it sees res then it will be send the response

app.use(
"/abc",
(req, res) => {

},
(req, res) => {
res.send("response2");
}
);
here we dont get any response and it goes infinit loop till it gets timedout
but it can go to the second route handler or request handler
for that we need to use next

app.use(
"/abc",
(req, res, next) => {
next();

},
(req, res) => {
res.send("response2");
}
);
now we can see the respone2

what if now will it go to next as we have already a response1
app.use(
"/abc",
(req, res, next) => {
console.log("my response1")
res.send("response1");  
next();

},
(req, res) => {
console.log("my response2")
res.send("response2");
}
);
we get
"my response1"
"response"
"myresponse2"
but along with below we got the error in the console
"my response1"
"response"
"myresponse2"
now the first route handler got executed and we got the response and since we have next it will go the next route handler and
console get executed
also then it will show an error because arleady response is sent
only one response per one url
a tcp connection is formed between server and client postman once the response is sent the tcp connection will be closed
so here response1 is already sent right

now what will happen
app.use(
"/abc",
(req, res, next) => {
console.log("my response1")
next();
res.send("response1");

},
(req, res) => {
console.log("my response2")
res.send("response2");
}
);
here js code executes line by line right
my response1
my reponse2
response2
then we get code goes to the line res.send("response1") and now we get error in console as we already sent a response

also we can add more route handlers
but they go to next route handler only if we use next()

one more
app.use(
"/abc",
(req, res, next) => {
console.log("my response1")
next();

},
(req, res, next) => {
console.log("my response2")
next();
},
(req, res, next) => {
console.log("my response3")
next();
},
(req, res, next) => {
console.log("my response4")
next();
},
(req, res, next) => {
console.log("my response5")
next();
},
);
now what will happen
all console logs will print and code when reaches to last next()
we get cannot get /
because it is looking for another route handler and since it's not present we get this cannot get /
for any route we need a route handler right
in this case if you dont use next at last it will hang as there is no response at the last route handler
we are keep all the route handlers in the array as well

one more way to define route handler
/one more to define route handler instead of nesting, this is same as the above
app.get("/user", (req, res, next) => {
console.log("handling first route hanlder");
next();
});

app.get("/user", (req, res) => {
console.log("second route handler");
res.send("response2");
});

now also why we need all these route hanlders means why we need multiple route handlers for a route, does this actually needed
the answer is middlewares
usually we call them as route handlers but they are middlewares
all the fucntions are known as middlewares but the funtion which actually sends the response is called as request handler or route handler

//why we need middlewares
app.get("/admin/getData", (req, res) => {
//check if the request is authorised
const token = "xyz";
const isAdminAuthorized = token === "xyz";
if (isAdminAuthorized) {
res.send("data sent");
//here by default for 200 http status code is sent
} else {
res.status(401).send("unauthorized request");
}
});

app.get("/admin/delete/user", (req, res) => {
//check if the request is authorised same again as above
res.send("deleted a user");
});

//so if i have to put authorization to all the apis, i have to put the same code in all the apis, this is where middleware comes into the picture
//how we can simplify this using middleware
//handle auth middleware for all request, get, post etc...
app.use("/admin", (req, res, next) => {
const token = "xyz";
const isAdminAuthorized = token === "xyz";
if (!isAdminAuthorized) {
res.status(401).send("unauthorized request");
} else {
next();
}
});

app.get("/admin/getData", (req, res) => {
res.send("data sent");
});
//this is why we use middlewares

error handling
always handle error properly using try catch
app.get("/getUserData", (req, res, next)=>{
res.send("data sent")
})
app.use("/", (err, req, res, next)=>{
if(err){
res.status(500).send("something went wrong");
}
})
we can also try catch to handle the errors

s2e6
to talk to the database if we use the library mongoose
npm install moongoose

//here we are connecting to the cluster
mongoose.connect(
"mongodb+srv://ganeshpavankumars:cOeeng04sYTtEKA9@namastenode.yqrkb.mongodb.net"
);
this returns a promise and tells if the connection is succesful or not, so put in async

const connectDB = async () => {
await mongoose.connect(
"mongodb+srv://ganeshpavankumars:cOeeng04sYTtEKA9@namastenode.yqrkb.mongodb.net"
);
};

connectDB()
.then(() => {
console.log("connection successful");
})
.catch((err) => {
console.log("connection not successful");
});

usually we connect to the cluster
if we add mongodb+srv://ganeshpavankumars:cOeeng04sYTtEKA9@namastenode.yqrkb.mongodb.net/hello, this connects to a specific db

const connectDB = async () => {
await mongoose.connect(
"mongodb+srv://ganeshpavankumars:cOeeng04sYTtEKA9@namastenode.yqrkb.mongodb.net"
);
};

connectDB()
.then(() => {
console.log("connection successful");
})
.catch((err) => {
console.log("connection not successful");
});
also this is always not right way to connect to db
as server is first connected to port and then db code runs
so first connect to the db and listen on to the server for the requests
once db connection is successful then only listen to the request
so do like this
onnectDB()
.then(() => {
console.log("db connection successful");

    app.listen(3000, () => {
      console.log("server is succesfully listening on port 3000");
    });

})
.catch((err) => {
console.log("db connection not successful");
});

schema
schema is an identity for a collection documents
like what things can have for a use collection
create a schema using mongoose
first we create a schema and then model
schema tells you what all information about user are we storing into our database or what this user schema can store
once after creating schema now we create mongoose model
mongoose.model("User", userSchema);
//name always capitalized so that it says like it is mongoose model
//whenever we create mongodb database we create collection inside it
//using this model ill create new instances of the model for any new user

A model is a JavaScript class that represents a collection and adds:

Schema validation (e.g., required fields, data types).

Methods (e.g., save(), find()).

Business logic (e.g., password hashing before saving).

now create a post api

\_id and \_\_v are created by mongodb automatically unique id and very useful
