"use strict"

const DOMAIN = '' //http://localhost:8080

export async function doQuery(url, opts) {
    return await fetch(DOMAIN + url, opts);
}