# Demo Server

This server is useful for helping us test the properties of promises.

A few endpoints are included which are intended to work together for tests.

All the endpoints return a JSON object in the format:

`{ value: calculatedValue }`

 - `/double/[number]` - *returns (2 x number).*
 - `/tripple/[number]` - *returns (3 x number).*
 - `/quad/[number]` - *returns (4 x number).*  
 - `/weather` - *returns a random weather condition string (ex: 'clear', 'cloudy', etc...)*
 - `/time` - *returns a random string of the general time of day (ex: 'morning', 'evening', etc...)*
