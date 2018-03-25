# Server-Side Concepts, REST, and Node.js

## Introduction

## Prerequisites

## Major Concepts

#### Request-Response Cycle
<!-- // what is a client
// what is a server
// when traveling over the internet, requests/responses are transmitted as formatted packages of data (network packets). when interacting with requests/responses in a server-side programming language, however, they take the form of in-memory objects that we can interact with -->

#### REST

REST stands for Representational State Transfer. Okay great, but what exactly does that mean?

In a phrase, REST is an architectural style. It is neither a framework nor a library nor any sort of software. It is specifically an architectural style used to build web applications. A good definition of an architectural style is "a coordinated set of architectural constraints."<sup>[1](#myfootnote1)</sup> Put more simply, we impose a set of limitations or restrictions on the way we build our web application with the goal of improving some desired characteristic/s of our web application design.

Below I list all of the constraints imposed by REST<sup>[2](#myfootnote2)</sup>, however I don't discuss all of them in detail. I instead focus on those most relevant to the exercise included in this repo. I encourage you to follow the link provided in footnote #2 some time after you have completed the exercises. This link will take you to the source material on REST and allow you to read about the other constraints.

1. Client-Server<sup>[3](#myfootnote3)</sup>
    - Constraint Imposed:
        - There must be a clear separation of concerns between the client and the server.
        - The Client is concerned with UI and translating user input into requests to be sent to the server, often for data/media.
        - The Server is concerned with responding to these requests.
        - Servers open themselves up for connection and Clients connect to servers. Multiple Clients can connect to one Server.
    - Resulting Improvement:
        - Clients and Servers can now be scaled and maintained independently of one another.

2. Stateless
3. Cache

4. Uniform Interface
    - Constraint Imposed:
      - Servers must separate the interface for making requests from the implementation details employed in servicing those requests. 
      - Put another way, the computational logic necessary to fulfill a request should be separate from the "buttons" to be pushed that initiate the request.
      - These uniform interfaces or "buttons" take the form of a set of endpoints (URLs) to which Clients can make HTTP requests and receive responses that contain the desired information. (See below for a discussion of these topics). 
    - Resulting Improvement:
      - Any Client can connect to a Server and use the interface to make requests. The Client has no need to have any knowledge of how the Server actually fulfills the request as this is abstracted away.

5. Layered System
6. Code-On-Demand (Optional)

#### Communicating Across the Web

Now that we have an understanding of REST as an architectural style, let's discuss the tools Clients and Servers use to communicate across the web. 

In order to accomplish this, we use of a combination of HTTP (Hypertext Transfer Protocol) and URLs (Uniform Resource Locators).

HTTP is the underlying set of rules for exchanging data between computers. It takes the form of a request-response cycle, as described above. When a Client sends an HTTP request, the request will also include an Action Verb that describes what Action the request wishes to take with respect to a "resource". The most commonly used verbs are `GET`, `POST`, `PUT`, and `DELETE`.

A URL, also commonly called an "endpoint", describes a resource that can be located on the web. The term "resource" can be loosely interpreted to be any of sort of data or media (JSON, images, text, etc.) We can examine the following URL to see an example of this: [https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming](https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming). 

This URL actually gives us a lot of information about the resource we are requesting. Given that the word "questions" comes right after the domain, we can assume that we are requesting a question. It would also be reasonable to assume that the number located in the middle of the URL may be some sort of unique identifier for the question. The last portion of the url then names the specific question we are viewing on Stack Overflow. Putting all the pieces together, we can see how this URL describes a resource (a question of interest on Stack Overflow) that we can access via the web.

**The combination of HTTP Requests and URLs allows us to make requests for resources. More specifically, the interface for a making requests to a server, one that is constructed according to the fourth principle of REST (uniform-interface), takes the form of a combination of a url that describes a resource and a verb that describes what we want to do with that resource. Put yet another way, when we say an API is RESTful, we typically mean that a server exposes a uniform interface (a set of endpoints) to which we can make requests using HTTP.**

For example, a `GET` request to `https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming` gives us the HTML we need to see the question in the browser.

(A quick aside: Note that an API doesn't always have to be RESTful. JavaScript has an API but we don't communicate via the web to use the `forEach` method. If this adds further confusion, banish the thought.)

#### RESTful Thought Experiment

Now that we have been exposed to the concepts of REST, HTTP, and URLs, let's put all the pieces together and run a thought experiment.

Say there are three robots sitting in their respective offices in a large factory. Robot A needs to transmit some data to Robot B so that Robot B can record this data and then indicate to Robot A that it has completed recording the data. Robot C will want to retrieve the recorded data at some point in the future and will also be looking for some kind of code indicating that the request was successful.

The caveat is that these robots, while capable of thought, have very limited speech.

In fact, their speech is so limited that Robots A and C are only able to send requests to Robot B that contain the following:
- Verbs (most commonly `GET`, `POST`, `PUT`, and `DELETE`)
- Data (Optional)

Robot B is only able to send responses to Robots A and C that contain the following:
- StatusCodes (indicate whether a request succeeded or failed)
- Data (Optional)

Given these constraints, you can imagine that Robot B might easily get confused by what Robots A and C and trying to tell it. The interaction might go something like this:
* Robot A:
    - **sends a request to Robot B**:
        - Data: JSON File
        - Verb: `POST`!
* Robot B: 
    - **attempts to process request**
        - *What do I do with this JSON file...the other robot said `POST`, but `POST` it where? What is this data in the first place? Where do I record this data? What am I doing? What is my purpose...?*
* Robot A: 
    - **waiting for response**
        - *I don't seem to be getting any response back...wonder what Robot B is doing...*
* Robot C:
    - **sends a request to Robot B**:
        - Verb: `GET`!
* Robot B:
    - **attempts to process request**
        - *`GET` WHAT?!?*
* Robot C: 
    - **waiting for response**
        - *Robot B is such a slacker*

So this wasn't very successful. A single verb by itself isn't enough information for Robot B to determine how to respond to the request.

Upon learning this, the overlords of the robots decide to upgrade them and now they can additionally send URLs that describe a resource as part of their requests.

Let's retry the interaction:
* Robot A:
    - **sends a request to Robot B**:
        - Data: JSON File
        - Verb: `POST`!
        - URL: `https://robot-repair-shop.io/repairs/12345/unable-to-pass-butter`
* Robot B: 
    - **processes request**
        - *Aha! I know where to put this now. Looks like the data sent to me relates to a repair to robot #12345 because this robot is unable to pass butter. I will find the section of my database that is responsible for storing this kind of data, save it, and respond with a status code indicating the `POST` was successful!*
    - **sends a response to Robot A**
        - StatusCode: `201`!
* Robot A: 
    - **receives response**
        - *Looks like my data was successfully stored!*
* Robot C:
    - **sends a request to Robot B**:
        - Verb: `GET`!
        - URL: `https://robot-repair-shop.io/repairs/12345/unable-to-pass-butter`
* Robot B:
    - **processes request**
        - *Ah, looks like Robot C is requesting repair information related to robot #12345. Let me find that information in my database and send it over to Robot C.*
    - **sends a response to Robot C**
        - StatusCode: `200`!
        - Data: JSON File
* Robot C: 
    - **receives response**
        - *Perfect! I received the data I wanted.*

**Analysis**:

<!-- Some simplifications were made for the sake of the example. We did not discuss headers, meta-data, what exactly is meant by stateless transfer. These topics warrant greater discussion but for now we are building out our mental model of what REST means and how the request-response cycle fits into REST. -->

#### Node.js

[http module](https://nodejs.org/dist/latest-v8.x/docs/api/http.html)

[url module](https://nodejs.org/dist/latest-v8.x/docs/api/url.html)

[path module](https://nodejs.org/dist/latest-v8.x/docs/api/path.html)

#### NPM

## References

<a name="myfootnote1">1</a>: https://www.ics.uci.edu/~fielding/pubs/dissertation/introduction.htm

<a name="myfootnote2">2</a>: I encourage you to read the dissertation on this topic over some weekend.
https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm

<a name="myfootnote3">3</a>: For a great and concise explanation of the client-server relationship, read section 3.4.1 of the dissertation.
https://www.ics.uci.edu/~fielding/pubs/dissertation/net_arch_styles.htm#sec_3_4_1

https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm