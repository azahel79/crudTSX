import App from "./config/app/App.js";

const crudApp =new  App();

crudApp.controllers();
crudApp.middlewares();
crudApp.routes();
crudApp.conectedDB();
crudApp.listen();