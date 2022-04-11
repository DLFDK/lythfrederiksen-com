// addEventListener("fetch", event => {
//     event.respondWith(handleRequest(event.request))
// })

// async function handleRequest(request) {
//     const regex = /.*images\/(.*)/;
//     const url = request.url.match(regex)[1];
//     const imageRequest = new Request(url, {
//         headers: request.headers
//     });
//     return fetch(imageRequest);
// }

export async function onRequest(context) {
    // // Contents of context object
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context;

    // return new Response('Hello, world!');
    const regex = /.*images\/(.*)/;
    const url = request.url.match(regex)[1];
    const imageRequest = new Request(url, {
        headers: request.headers
    });
    return fetch(imageRequest);
}
