import express from "express";
import productManager from "./productManager.js";



const app = express();

/* 
    Aca resuelvo el primer response sobre filtrar por ID
*/
  
app.get('/products/:id', async (req, res) => {
const { id } = req.params
let productos = productManager.getProductos();
const producto = productos.find(producto => producto.id == id)
console.log(producto)

if(!producto) {
    return res.send('User not found')
}

res.json(producto)
})


/* 
    Aca resuelvo el segundo response sobre limitar la cantidad de resultados
*/
 app.get('/productos', (req, res) => {
let productos = productManager.getProductos();
let limite = req.query.limits;
if(limite == undefined){
    res.json(productos)
}
let listaProductos = [];

for (let i = 0; i < limite; i++) {
    if(i < productos.length){
        listaProductos.push(productos[i]);
    }
    
}

res.json(listaProductos);
})



app.listen(3000,()=>{
    console.log("Servicio direccionado en puerto 3000")
})