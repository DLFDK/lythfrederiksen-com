export async function onRequest(context) {
    const { request } = context;
    const regex = /.*images\/(.*)/;
    const url = request.url.match(regex)[1];
    const imageRequest = new Request(url, {
        headers: request.headers
    });
    return fetch(imageRequest);
}