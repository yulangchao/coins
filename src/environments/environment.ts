// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDbahswBhyoFmIfwtppEBAdEbGoXOZislc",
    authDomain: "myapp-ac3f0.firebaseapp.com",
    databaseURL: "https://myapp-ac3f0.firebaseio.com",
    projectId: "myapp-ac3f0",
    storageBucket: "myapp-ac3f0.appspot.com",
    messagingSenderId: "433624163562"
  }
};