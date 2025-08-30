import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from "@components/AppWrapper"
// Test CSRF
// import runCookieTest from "@modules/runCsrfTest.js";
// import {runPOSTTest} from "@modules/runCsrfTest.js";
//const csrfTest = runCookieTest();
//runPOSTTest()

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
)


