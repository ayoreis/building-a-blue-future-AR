# AR for the [Building a Blue Future event](https://www.facebook.com/events/5561409547261645) poster

## Setup

This project uses [Deno](//deno.land) to create a [Secure context](//developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) for other devices (eg phone) to access your local website, and use [`MediaDevices.getUserMedia`](//developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) which is only available in Secure contexts.

It needs a [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) certificate and key with the names `cerificate.pem` and `key.pem`, you can create them using [mkcert](//github.com/FiloSottile/mkcert).

## To do

-   [ ] Resize scan region to screen
-   [ ] Make content not scroll before animation end (`position: fixed`?)
