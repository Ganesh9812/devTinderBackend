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

s2e7
lets send user data in the api instead of in the code
i should be sending data from postman and my api should receive the data and push into the db
i should be sending json data to the server and server should be pushing that data into the db
raw data and json in postman
so express will convert req into object and will give us to use it
req.body if we console
we are getting undefined
because we are getting json data and our server is not able to read the json data
to read the json data we need the help of a middleware which i can use for all my apis
this middleware takes the incoming request and converts json into js object and put it into the body and give us the access to the data
this middle given by express and this is express.json()
app.use(express.json());
this will now activated for all the routes
now req.body will be js object

now lets ready the data from db
get api to get all the users

//get user by email
app.get("/user", async (req, res) => {
const userEmail = req.body.emailId;
try {
const users = await User.find({ emailId: userEmail });
if (users.length === 0) {
res.status(400).send("User not found");
} else {
res.send(users);
}
} catch (err) {
res.status(400).send("something went wrong");
}
});

right now here users in an array and find gives the duplicates as well if found

but there is a method findOne this will give only one user

also now lets see how we can make unique emailid rule

now udpate api
app.patch
//findoneandupadte({\_id: id}) is equivalent to findbyidandupdate(id)

s2e8
validations on the database
need to check what we send to our db
so that only valid data is sent to the db
we are more into the post api or patch api where we need to have more checks
mandatory fields like email, password required to signup
so make fields mandatory by using required
when we use required, user should mention these fields for sure either in api or in front end, these are mandatory else mongoose will not allow insertion into the db

and also if want only one entry of emailid which means unique email in db
which can throw email already exists
so use unique field
it will not allow me to insert the same emailid into my db
we can also add a default value
for eg: about: "this is a default about"

by default validate method is called only when the new document is create not for update case

so now how to know when the user registered into the platform or db like when was he signed up
pass this { timeStamps: true }
in document we will get created at and updated at

now what to do in case if i want my user not to update or change his emailid
how to add this type of check
when im updating the user i should not be able to change the emailid
i need to put api level validation

also if im updating with new field, it will get updated, api is not sanitising the data.
now we should make that we should be able to update only certain fields
const ALLOWED_UPDATES = ["userId","photoUrl", "about", "gender", "age"];
basically we need keep userId even though we are not changing because for updating we need userid else which document we will update
also instead of getting userdId from the body, lets get userId from the url
app.patch("/user/:userId", async (req, res) => {
const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age"];

now lets suppose we need a emailid, but emailid should be in a format not like a text right, so we need write a big regex instead of this we can take help of a library as well
i can use this for api level validation or db level validaiton
so now adding for schema/db level validation

s2e9
encrypting passwords
we store our passwords as plain text into the db
but we should not
lot of security issues
password should be store in encrypted or hash format
nobody should be able to see the password
lets see how can we keep our password safe

signup api lot of issues
lets first resolve them
never truest request.body data coming from api and attacker can send any bad data
even before const user = new User(req.body); we need to do the validation of data
if data not correct throw error
if data is correct then encrypt the password and then store this into the db
validate
encrypt
store the password in db

these validations we can do in db schema or validateSignUpData

once validation is done
then install bcryp libraray for password encryption
now using bcrypt create a hash
brcypt.hash returns a promise
const passwordHash = bcrypt.hash(password, 10);
10 is the salt rounds, more the salt rounds, more the complex the encryption

now talk about login
whenever we login we need to check the password right
lets create a login api as well

s2e10

what happens when a user login for the first time
if im a user and i want to access to my profile info, i cannot access without logging in
unless we login we should not do anything like signup, request etc...
all these things needs login first

when a user makes a api call or communicate with the server
we use the TCP protocall
TCP/IP protocall
for suppose profile api call
server will send back the data and the connection is closed
for everytime api call is made connection is made and closed

and now customer made a patch api call to update the profile info
everytime customer made a api call, the authentication happens to know if the user is valid or not
everytime user makes an api call, the user needs to be validated
the user needs to be validated if the request is coming from authorised source or not
so here to happen all these the user should be logged in

user makes a login request using emailid and password
the server gives a authentication token (jwt token) and sends back to the user
this token stored by the user
now everytime whenever user makes an api call for any reason to fetch profile or update profile, the token is sent along with the api to the server to valide if the token is correct or not to make sure that user is authorised

user first time login using emailid and password, the server sends back the user with jwt token and store in user browser
now when user makes an api call -- this token sent to the server everytime for validation

so everytime sending back to server for validation is kind of tough job
so web came up with a solution which is known as cookies
cookie -
when user login - the server sends back the jwt token inside a cookie
user login with emailid and password, the server validates the email and password
and it will create a jwt token and wrap that token inside the cookie
this token is unique only for this user
now the server sends back the cookie in the response
now all browsers will store this cookie inside them
now if we make any api call like get data, this cookie goes along with the api to server and the cookie is validated
and the profile info is fetched from db and sends back to the user
on every api this cookie is validated by the server

we can also set the expiry date of the cookie or jwt

so when will this cookie not work
i made some profile api to get somedata and if the cookie is expired, and the server will fail the validation
and response will be please login and redirected to the login page

when login, toke is sent in the cookie during login
now when you make api call of profile data, ideally your token needs to be sent along with the api for validation, but to read the cookie we need to use
cookie-parser library

jwt token
json web token
very secret token with secret information in it like how logged in, user id is stored in the token
this can contain special information
see how we can create and use this
jwt token
contains
red - header
pink -secret data which i will hide in this token
blue - signature

header payload signature

how to create jwt token
npm i jsonwebtoken

only way to get the token is to login first

now we will create a middleware
why we need here
i want my all apis to secure after login
all apis work after authentication

instead of writing token check in all the apis so better write a middle so that all apis it will work
so creating in middlewares userauth

now lets see how can we expire the jwt token

const token = await jwt.sign({ \_id: user.\_id }, "DEV@Tinder$790", {
expiresIn: "1d",
});

here we are just expiring the token,
but we can also expire the cookies
how do we expire cookies
you can set that here
res.cookie("token", token);

moongoose schema methods
i can attach some methods in user schema so that it will be applicable for all the users
helper methods

so you see we created jwt token in login api as below
but we can offload this to different function lets see how we can do that
so moving to user schema or user model by

app.post("/login", async (req, res) => {
try {
//login api takes email and password validate email and password is correct
//use bcrypt.compare
const { emailId, password } = req.body;

    //first check if the person emailId is valid or present in the db
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Emailid not present in the db");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //create a jwt token
      //lets write jwt token code here, first param is hiding the data in the token, here we are hiding userid
      //second param is secret key, this is used to encrypt the data...this is kind of password and only server knows this
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
        expiresIn: "1d",
      });

      //add the token to the cookie and send back the response to the user and this token can be used for other api calls to validate which now will be present in req.cookies
      res.cookie("token", token);
      res.send("login successful");
    } else {
      throw new Error("password is not valid");
    }

} catch (err) {
res.status(400).send("login failed" + err.message);
}
});

s2e11
lets build more apis

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

- GET /connections
- GET /requests/received
- GET /feed - gets you the profiles of other users on platform

status: ignored, interested, accepted, rejected

its not recommended to created all apis in app.js file
so create express router and handle routing in a proper way using express router
we will use express router to manage our apis efficiently

we will create different routers to handle apis
we create one route for login/signup/logout
and another router to handle set of apis
so we can create authRouter and we can login/signup/logout apis here

same profileRouter

this is for best practice
auth.js manages the routes specific to auth

app.use is same as router.use
const app = express()
const router = express.Router()

lets build the logout api
while creating a token you will set the expriy time
and also in res.cookie also you can set the expiry time
which is useful for logout api

s2e12
