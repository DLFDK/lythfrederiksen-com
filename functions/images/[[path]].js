export async function onRequest(context) {
    const { request } = context;
    const regex = /.*images\/(.*)/;
    const url = request.url.match(regex)[1];
    const imageRequest = new Request(url, {
        headers: request.headers
    });
    // let response = await fetch(imageRequest);
    // response = new Response(response.body, response)
    // response.headers.set("myHeader", "myKey")
    // return response;

    return await fetch(imageRequest);

    // return fetch(imageRequest);
}