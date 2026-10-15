import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, relative, sep } from 'node:path';
const root=resolve('out'), port=Number(process.env.PORT||3000);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.ico':'image/x-icon','.woff2':'font/woff2'};
try{await stat(resolve(root,'index.html'));}catch{console.error('請先執行 npm run build。');process.exit(1);}
createServer(async(req,res)=>{
  try{
    const pathname=decodeURIComponent(new URL(req.url||'/','http://localhost').pathname);
    let file=resolve(root,'.'+pathname);
    const rel=relative(root,file);
    if(rel==='..'||rel.startsWith('..'+sep)||rel.includes(':')){res.writeHead(403);res.end();return;}
    if((await stat(file)).isDirectory())file=resolve(file,'index.html');
    res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});
    res.end(await readFile(file));
  }catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(resolve(root,'404.html')).catch(()=>Buffer.from('404')));}
}).listen(port,'127.0.0.1',()=>console.log(`Local: http://localhost:${port} · 靜態審閱版本`));
