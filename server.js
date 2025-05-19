const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;

//create server listens for incoming traffic
const server = http.createServer((request,response) => {
   const filePath = path.join(__dirname, request.url === "/" ? "index.html" : "request.url");

   const extName = String(path.extname(filePath)).toLowerCase();

   // mime types is what types of files I am supporting
   const mimeTypes = {
     ".html" : "text/html",
     ".css" : "text/css",
     ".js" : "text/js",
     ".png" : "text/png"
   }

   // define object content type and we have to make sure that we are supporting that content type
   const contentType = mimeTypes[extName] || "application/octet-stream";

   fs.readFile(filePath, (error,content) => {
      if(error){
        if(error.code === "ENOENT")
           response.writeHead(404, {"Content-Type" : "text/html"});
           response.end("404 : File Not Found Broo");    
      }
      else{
        //headpart
        response.writeHead(200, {"content-type": contentType});
        //bodypart
        response.end(content , "utf-8");
      }
   })
});


//takes 2 parameter - 1st one is on which port number it will listen and 2nd what will be the call back of it
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    
})