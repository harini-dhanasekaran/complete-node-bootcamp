//blocking or synchronous way
const fs=require('fs'); 
const http=require('http');
const url=require('url');
const replaceTemplate=require('./modules/replaceTemplate');
const slugify=require('slugify');
/////////////////////////////////////
//files
// const textIn=fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);

// const textOut= `This is what we know about avacado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('File written');

//non-blocking or asynchronous way
// fs.readFile('./txt/start.txt','utf-8',(error,data1)=>{
//     if(error) return console.log('bad error');
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(error,data2)=>{
//     console.log(data2);
//     fs.readFile('./txt/append.txt','utf-8',(error,data3)=>{
//     console.log(data3);

//     fs.writeFile('./txt/final.txt',`${data2} \n ${data3}`,'utf-8',(error)=>{
//       console.log('your file is written');
//     });
// });
// });
// });
// console.log('will read file!');
/////////////////////////////////////////////
//server.


//read data
const overview=fs.readFileSync(`${__dirname}/templates/TEMP-overview.html`,'utf-8');
const product=fs.readFileSync(`${__dirname}/templates/TEMP-product.html`,'utf-8');
const card=fs.readFileSync(`${__dirname}/templates/TEMP-card.html`,'utf-8');

const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj=JSON.parse(data);

const newName=dataObj.map(el=>slugify(el.productName,{ lower: true}));
console.log(newName);

const server=http.createServer((req,res)=>{
   const {query,pathname}=url.parse(req.url,true);
   
   //overview
   if(pathname==='/overview' || pathname==='/'){
    res.writeHead(200,{'Content-Type': 'text/html'});
    const cardHtml=dataObj.map(el=>replaceTemplate(card,el)).join('');
    const op=overview.replace('{%PRODUCT_CARDS%}',cardHtml);
    res.end(op);
}

   //products page 
   else if(pathname==='/product'){
    res.writeHead(200,{'Content-Type': 'text/html'});
    const sel=dataObj[query.id];
    const op=replaceTemplate(product,sel);
    res.end(op);
}
   //API 
   else if(pathname==='/api'){
    res.writeHead(200,{'Content-Type': 'application/json'});
    res.end(data);
   }

   //error
   else{
     res.writeHead(404,{'Content-Type':'text/html'});
     res.end('<h1> page not found</h1>');
   }
});
server.listen(8000,'127.0.0.1',()=>{
  console.log('server listening on port 8000');
});
