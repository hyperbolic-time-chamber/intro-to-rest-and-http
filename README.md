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

Below I list all of the constraints imposed by REST<sup>[2](#myfootnote2)</sup>, however I don't discuss all of them in detail. I instead focus on those most relevant to the exercise included in this repo. I encourage you to follow the link provided in footnote #2 some time after you have completed the exercises. This link will take you to the source material on REST and allow you to read about the others.

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
    - Resulting Improvement:

5. Layered System
6. Code-On-Demand (Optional)

Now that we have an understanding of REST as an architectural style, let's discuss the tools we use to enable communication between clients and servers. 

In order to communicate across the web, we use of a combination of HTTP (Hypertext Transfer Protocol) and URLs (Uniform Resource Locators). 

HTTP is the underlying set of rules for exchanging data between computers. It takes the form of a request-response cycle, as described above.

A URL describes a resource that can be located on the web. The term "resource" can be loosely interpreted to be any of sort of data or media (JSON, images, text, etc.) We can examine the following URL to see an example of this: [https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming](https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming). 

This URL actually gives us a lot of information about the resource we are requesting. Given that the word "questions" comes right after the domain, we can assume that we are requesting a question. It would also be reasonable to assume that the number located in the middle of the URL may be some sort of unique identifier for the question. The last portion of the url then names the specific question we are viewing on Stack Overflow. Putting all the pieces together, we can see how this URL describes data (a question of interest on Stack Overflow) that exists on the web.

Now that we have been exposed to the concepts of REST, HTTP, and URLs, let's put all the pieces together and run a thought experiment.
<!-- everything above is good, need to improve everything below (in the REST section) -->
Say there are three robots sitting in their respective robot offices in factories that are on the opposite ends of town. Robot A needs to transmit some data to Robot B so that Robot B can record this data and then indicate to Robot A that it has completed recording the data. Robot C will want to retrieve the recorded data at some point in the future.

The caveat is that these robots have very limited speech. In fact, their speech is so limited that they are only able to communicate using verbs and numbers. The verbs that they use the most are `GET`, `POST`, `PUT`, and `DELETE`. They are capable of thought, but can only verbally express thoughts using one verb at a time or using a number.

You can imagine that if Robot A and C are only able to communicate with a verb while transmitting data then Robot B could easily get confused. The interaction might go something like this:
* Robot A: ---> **transmits a request that contains data to Robot B** ---> `POST`!
* Robot B: *What do I do with this data...the other robot said `POST`, but `POST` it where? What is this data in the first place? Where do I record this data? What am I doing? What is my purpose...?*
* Robot A: *I don't seem to be getting any response back...wonder what Robot B is doing...*
* Robot C: ---> **transmits a request for data to Robot B** --> `GET`!
* Robot B: *`GET` WHAT?!?*

So this wasn't very successful. A single verb by itself isn't enough information for Robot B to determine what to do with the transmitted data/message.

Upon learning this, the overlords of the robots decide to upgrade them and give them the ability to not just communicate using a single verb but to also transmit some information in addition to the data they are trying to send. They can now additionally send URLs that describe a resource and it's location on the web.

Let's retry the interaction:
* Robot A: ---> **transmits a request that contains data to Robot B** ---> `POST`! to `https://robot-repair-shop/repairs/12345/unable-to-spread-butter`
* Robot B: *Aha! I know where to put this now. Looks like the data sent to me relates to a repair to robot #12345 because this robot is unable to spread butter. I will store this data on my hard drive and respond with a status code indicating the `POST` was successful!* ---> **sends response to Robot A** --> `201`!
* Robot A: *Looks like my data was successfully stored!*
* Robot C: ---> **transmits a request for data to Robot B** --> `GET`! from `https://robot-repair-shop/repairs/12345/unable-to-spread-butter`
* Robot B: *Ah, looks like Robot C is requesting information related to robot #12345. I'd better send back that information.* ---> **transmits repair data to Robot C** --> `200`!

Some simplifications were made for the sake of the example. We did not discuss headers, meta-data, what exactly is meant by stateless transfer. These topics warrant greater discussion but for now we are building out our mental model of what REST means and how the request-response cycle fits into REST.

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