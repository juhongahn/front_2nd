// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import { App } from "./App.tsx";

const app = express();
const port = 3333;

const cacheMap = new Map<string, { content: string; timestamp: number }>();
const CACHE_AGE = 5 * 60 * 1000;

const renderApp = (url: string) => {
  const app = ReactDOMServer.renderToString(<App url={url} />);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple SSR</title>
    </head>
    <body>
      <div id="root">${app}</div>
    </body>
    </html>
  `;
};

app.get("*", (req, res) => {
  const cacheKey = req.url;
  const now = Date.now();
  const cachedItem = cacheMap.get(cacheKey);

  if (cachedItem && now - cachedItem.timestamp < CACHE_AGE) {
    return res.send(cachedItem.content);
  }

  const content = renderApp(req.url);
  cacheMap.set(cacheKey, { content, timestamp: now });
  res.send(content);

  if (cacheMap.size > 100) {
    const oldestKey = [...cacheMap.keys()].sort(
      (a, b) =>
        (cacheMap.get(a)?.timestamp || 0) - (cacheMap.get(b)?.timestamp || 0),
    )[0];
    cacheMap.delete(oldestKey);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
