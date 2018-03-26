# Server-Side Concepts and REST

## Table of Contents

1.  [Introduction](#introduction)
1.  [Major Concepts](#major-concepts)
1.  [Request-Response Cycle](#request-response-cycle)
1.  [REST](#rest)
1.  [Communicating Across the Web](#communicating-across-the-web)
1.  [RESTful Thought Experiment](#restful-thought-experiment)
1.  [RESTful Thought Experiment Analysis](#restful-thought-experiment-analysis)
1.  [References](#references)

## Introduction

_[Back to Top](#table-of-contents)_

This repository is meant for individuals who have a basic understanding of a programming language (e.g. Python, JavaScript, Java) but have not yet been exposed to the concepts of REST or HTTP and have not yet written server-side code.

It serves two purposes.

First, it serves the purpose of introducing Server-Side Concepts and REST. Below you will find a discussion of concepts that are important to developing an understanding of REST and HTTP.

Second, it serves as a way of using a programming language to practice these concepts. Included in this repository is a directory titled `node-rest-server` that specifies a challenge and resources available to you to help you complete the challenge. You are to implement a REST server using Node.js. You will incrementally build the REST server using the provided tests to guide you.

I want to stress that although we are using Node.js to illustrate the concepts explored below, these concepts are not tied to any one specific programming language. Further iterations of this project will allow knowledge-seekers to implement a REST server in other languages e.g. Python, Java, Go, etc.

## Major Concepts

#### Request-Response Cycle

_[Back to Top](#table-of-contents)_

The request-response cycle refers to the flow of requests and responses between clients and servers.

Let's first start with definitions for clients and servers, beginning with a generalization of each.

A client is any program that acts as a "triggering process. Clients make requests that trigger reactions from servers."<sup>[4](#footnote4)</sup> Clients arbitrarily determine when to make requests and generally have to delay any further actions until they're received a response from the server.

A server is any program that functions as "a reactive process. A server waits for requests to be made and then reacts to them."<sup>[4](#footnote4)</sup>

In the context of the web, a client is most often an application running in the browser. The client connects to a server in order to make requests for data that can then be displayed in the browser. A server is a process running on a computer that receives requests, does the work specified in the request, and sends a response to the client indicating the outcome of that request.

When travelling over the internet, requests/responses are transmitted as formatted packages of data (network packets). When interacting with requests on the server and responses on the client, however, they take the form of in-memory objects. Since they take the form of in-memory objects, we can then access the data they contain as we would any other object.

Abbreviated example in-memory request object:

```javascript
{
  headers: {
    'Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1l'
    'Content-Type': 'application/json'
  },
  method: 'GET',
  url: 'https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming'
}
```

Abbreviated example in-memory response object:

```javascript
{
  headers: {
    'Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1l'
    'Content-Type': 'application/json'
  },
  status: 200,
  statusText: 'Successfully retrieved data.'
}
```

I say abbreviated because in reality we would see far more properties on the object than those listed above. The examples should nonetheless be sufficient for developing our mental model of how we might interact with requests and responses via code.

#### REST

_[Back to Top](#table-of-contents)_

REST stands for Representational State Transfer. Okay great, but what exactly does that mean?

In a phrase, REST is an architectural style. It is neither a framework nor a library nor any sort of software. It is specifically an architectural style used to build web applications. A good definition of an architectural style is "a coordinated set of architectural constraints."<sup>[1](#footnote1)</sup> Put more simply, we impose a set of limitations or restrictions on the way we build our web application with the goal of improving some desired characteristic/s of our web application design.

Below I list all of the constraints imposed by REST<sup>[2](#footnote2)</sup>, however I don't discuss all of them in detail. I instead focus on those most relevant to the exercise included in this repo. I encourage you to follow the link provided in footnote #2 some time after you have completed the exercises. This link will take you to the dissertation written by the originator of the REST architectural style and allow you to read about the other constraints.

1.  Client-Server<sup>[3](#footnote3)</sup>

    * Constraint Imposed:
      * There must be a clear separation of concerns between the client and the server.
      * The client is concerned with UI and translating user input into requests to be sent to the server, often for data/media.
      * The server is concerned with responding to these requests.
      * Servers open themselves up for connection and clients connect to servers. Multiple clients can connect to one server.
    * Resulting Improvement:
      * Clients and servers can now be scaled and maintained independently of one another.

2.  Stateless

    * Constraint Imposed:
      * Servers don't carry state i.e. servers do not store information related to previous requests.
      * Since servers don't carry state, any incoming request MUST include all of the information that a server needs to process the request.
    * Resulting Improvement:
      * Servers are more scalable and maintainable as they don't need to allocate memory for state.
      * There are no external variables that might affect the outcome of a request since all requests are self-contained i.e. they contain all the information a server needs to process the request.

3.  Cache

4.  Uniform Interface

    * Constraint Imposed:
      * Servers must separate the interface for making requests from the implementation details employed in servicing those requests.
      * Put another way, the computational logic necessary to fulfil a request should be separate from the "buttons" to be pushed that initiate the request.
      * These uniform interfaces or "buttons" take the form of a set of endpoints (URLs) to which clients can make HTTP requests and receive responses that contain the desired information.
      * See [Communicating Across the Web](#communicating-across-the-web) for a further detail.
    * Resulting Improvement:
      * Any client can connect to a server and use the interface to make requests. The client has no need to have any knowledge of how the server actually fulfils the request as this is abstracted away.

5.  Layered System
6.  Code-On-Demand (Optional)

#### Communicating Across the Web

_[Back to Top](#table-of-contents)_

Now that we have an understanding of REST as an architectural style, let's discuss the tools clients and servers use to communicate across the web.

In order to accomplish this, we use of a combination of HTTP (Hypertext Transfer Protocol) and URLs (Uniform Resource Locators).

HTTP is the underlying set of rules for exchanging data between computers. It takes the form of a request-response cycle, as described above. When a client sends an HTTP request, the request includes all the data a server needs to process the request. Doing so allows us to fulfil the second principle of REST (stateless). One of the most important pieces of data included in the request is an Action Verb that describes what Action the request wishes to take with respect to a "resource". The most commonly used verbs are `GET`, `POST`, `PUT`, and `DELETE`.

Verb meanings:

* `GET` retrieves data
* `POST` sends data
* `PUT` update existing data
* `DELETE` deletes data

A URL, also commonly called an "endpoint", describes a resource that can be located on the web. The term "resource" can be loosely interpreted to be any of sort of data or media (JSON, images, text, etc.) We can examine the following URL to see an example of this: [https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming](https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming).

This URL actually gives us a lot of information about the resource we are requesting. Given that the word "questions" comes right after the domain, we can assume that we are requesting a question. It would also be reasonable to assume that the number located in the middle of the URL may be some sort of unique identifier for the question. The last portion of the url then names the specific question we are viewing on Stack Overflow. Putting all the pieces together, we can see how this URL describes a resource (a question of interest on Stack Overflow) that we can access via the web.

**The combination of HTTP Requests and URLs allows us to make requests for resources. More specifically, the interface for a making requests to a server, one that is constructed according to the fourth principle of REST (uniform-interface), takes the form of a combination of a url that describes a resource and a verb that describes what we want to do with that resource. Put yet another way, when we say an API is RESTful, we typically mean that a server exposes a uniform interface (a set of endpoints) to which we can make requests using HTTP.**

For example, a `GET` request to `https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming` gives us the HTML we need to see the question in the browser.

(A quick aside: Note that an API doesn't always have to be RESTful. JavaScript has an API but we don't communicate via the web to use the `forEach` method. If this adds further confusion, banish the thought.)

#### RESTful Thought Experiment

_[Back to Top](#table-of-contents)_

Now that we have been exposed to the concepts of REST, HTTP, and URLs, let's put all the pieces together and run a thought experiment.

Say there are three robots sitting in their respective offices in a large factory. Robot A needs to transmit some data to Robot B so that Robot B can record this data and then indicate to Robot A that it has completed recording the data. Robot C will want to retrieve the recorded data at some point in the future and will also be looking for some kind of code indicating that the request was successful.

The caveat is that these robots, while capable of thought, have very limited speech.

In fact, their speech is so limited that Robots A and C are only able to send requests to Robot B that contain the following:

* Verb (most commonly `GET`, `POST`, `PUT`, and `DELETE`)
* Data (Optional)

Robot B is only able to send responses to Robots A and C that contain the following:

* StatusCode (a number that describes the outcome of a request)
* Data (Optional)

Given these constraints, you can imagine that Robot B might easily get confused by what Robots A and C and trying to tell it. The interaction might go something like this:

* Robot A:
  * **sends a request to Robot B**:
    * Data: JSON File
    * Verb: `POST`!
* Robot B:
  * **attempts to process request**
    * _What do I do with this JSON file...the other robot said `POST`, but `POST` it where? What is this data in the first place? Where do I record this data? What am I doing? What is my purpose...?_
* Robot A:
  * **waiting for response**
    * _I don't seem to be getting any response back...wonder what Robot B is doing..._
* Robot C:
  * **sends a request to Robot B**:
    * Verb: `GET`!
* Robot B:
  * **attempts to process request**
    * _`GET` WHAT?!?_
* Robot C:
  * **waiting for response**
    * _Robot B is such a slacker_

So this wasn't very successful. A single verb by itself isn't enough information for Robot B to determine how to respond to the request.

Upon learning this, the overlords of the robots decide to upgrade them and now they can additionally send URLs that describe a resource as part of their requests.

Let's retry the interaction:

* Robot A:
  * **sends a request to Robot B**:
    * Data: JSON File
    * Verb: `POST`!
    * URL: `https://robot-repair-shop.io/repairs/12345/unable-to-pass-butter`
* Robot B:
  * **processes request**
    * _Aha! I know where to put this now. Looks like the data sent to me relates to a repair to robot #12345 because this robot is unable to pass butter. I will find the section of my database that is responsible for storing this kind of data, save it, and respond with a status code indicating the `POST` was successful!_
  * **sends a response to Robot A**
    * StatusCode: `201`!
* Robot A:
  * **receives response**
    * _Based on the StatusCode, I can see that my request was successful so my data was successfully stored!_
* Robot C:
  * **sends a request to Robot B**:
    * Verb: `GET`!
    * URL: `https://robot-repair-shop.io/repairs/12345/unable-to-pass-butter`
* Robot B:
  * **processes request**
    * _Ah, looks like Robot C is requesting repair information related to robot #12345. Let me find that information in my database and send it over to Robot C._
  * **sends a response to Robot C**
    * StatusCode: `200`!
    * Data: JSON File
* Robot C:
  * **receives response**
    * _Perfect! Based on the StatusCode, I can see that my request was successful and I have received the data I want._

#### RESTful Thought Experiment Analysis

_[Back to Top](#table-of-contents)_

You may have guessed that, in the context of the request-response cycle and client-server relationship, Robots A and C were acting as clients sending requests to Robot B, who was acting as a server.

Notice how in the first example, the server was unable to process the requests because the server had no idea what kind of resource it had to work with. Remember, the server is stateless, so the server has no memory of previous requests. All the information that the server needs to process the request must be transmitted as part of the request.

In the second example, we added the missing piece which was a URL that describes the resource in question. Via the combination of an HTTP Verb and a URL, Robot B was able to figure out what to do with the resource.

Note that some simplifications were made for the sake of discussion. In reality, clients and servers can communicate with more than just StatusCodes and HTTP Verbs. For example, they can send headers that describe the type of data being transmitted. The headers may also indicate which resources the client is allowed to see. There may also be other meta-data transmitted as part of the request that the server needs in order to fulfil said request.

As you continue to learn more about HTTP Requests, you will begin to make use of headers and other properties on the request/response objects. For now, as I've mentioned previously, we have enough to build up a mental model of how HTTP Requests work in the context of REST.

## References

_[Back to Top](#table-of-contents)_

The discussion of REST draws heavily from Roy Thomas Fielding's doctoral dissertation titled: [Architectural Styles and
the Design of Network-based Software Architectures](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm). Uses of the word "dissertation" hereafter refer to this document.

<a name="footnote1">1</a>: https://www.ics.uci.edu/~fielding/pubs/dissertation/introduction.htm

<a name="footnote2">2</a>: I encourage you to read up on this topic over some weekend.
https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm

<a name="footnote3">3</a>: For a great and concise explanation of the client-server relationship, read section 3.4.1.
https://www.ics.uci.edu/~fielding/pubs/dissertation/net_arch_styles.htm#sec_3_4_1

<a name="footnote4">4</a>: The following citation can be found in the dissertation. The citation is for a description of clients and servers: G. Andrews. Paradigms for process interaction in distributed programs. ACM Computing Surveys, 23(1), Mar. 1991, pp. 49-90.
