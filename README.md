# Server-Side Concepts, REST, and Node.js

## Introduction

## Prerequisites

## Major Concepts

#### Request-Response Cycle

#### REST

REST stands for Representational State Transfer. Okay great, but what exactly does that mean?

REST is an architectural style that makes use of a combination of HTTP (Hypertext Transfer Protocol) and URLs (Uniform Resource Locators) to standardize communication between clients and servers (or even servers and servers) across the web. There is more to REST than this, but this is the core of what we need to start building a mental model.

A brief aside to discuss HTTP and URLs:

HTTP is the underlying set of rules for exchanging data between computers. It takes the form of a request-response cycle, as described above.

A URL is the address of a resource that can be located on the web. We can examine the following URL to further explain what is meant by the term "resource": [https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming](https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming). 

This is a link to the questions section of Stack Overflow. It would be reasonable to assume that the number located in the middle of the URL may be some sort of unique identifier. The last portion of the url describes the question we are viewing on Stack Overflow. Putting all the pieces together, we can see how this URL describes a resource (a question of interest on Stack Overflow) that exists on the web.

Now that we have been exposed to the concepts of REST, HTTP, and URLs, let's illustrate via analogy exactly what we mean by the above definition of REST.

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