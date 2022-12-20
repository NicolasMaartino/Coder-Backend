import fs from "fs";


class ProductManager{

    
    constructor(filename){
        this.path = filename;
        if(fs.existsSync(filename)){
            this.productos = JSON.parse(fs.readFileSync(filename))
        }else{
            this.productos = [];
        }
    }

    async agregarProducto(nombreProducto, descripcionProducto, precio, rutaDeImagen, codigoProducto, stock){
        
        let nuevoProducto = {
            nombreProducto,
            descripcionProducto,
            precio,
            rutaDeImagen,
            codigoProducto,
            stock,
            id: this.productos.length + 1
        }
        this.productos.push(nuevoProducto);
        await fs.promises.writeFile(this.path,JSON.stringify(this.productos,null,'\t'))

    }

     getProductos(){
        return (this.productos);
    }

    getProducto(id){
       
        let valor = this.productos.find(producto => producto.id === id);
        if (valor == undefined){
            throw (new Error());
        } 
        return this.productos.find(producto => producto.id === id);
    }

    async deleteProduct(id){
        let indiceAEliminar;
        for (const indiceProducto in this.productos) {
            if (this.productos[indiceProducto].id == id){
                indiceAEliminar = indiceProducto;
                break;
            }
        }
        
        this.productos.splice(indiceAEliminar,indiceAEliminar+1);

        await fs.promises.writeFile(this.path,JSON.stringify(this.productos,null,'\t'))
    }

    async updateProduct(id,campoActualizar, nuevoDato){
        
        let productoEncontrando = this.productos.find(producto => producto.id === id);


        Object.defineProperty(productoEncontrando,campoActualizar,{value:nuevoDato});


        await fs.promises.writeFile(this.path,JSON.stringify(this.productos,null,'\t'))
    }

}

let catalogo = new ProductManager("productos.json");
//catalogo.agregarProducto("Alfajor grandote", "Doble y triple sabor", 100, "/asdasdas.1", "AG02",100);
//catalogo.agregarProducto("Block", "Cofler", 100, "/asdasdas.1", "AG05",100);
//catalogo.updateProduct(1,"stock",130);
//catalogo.getProductos().then(data=> console.log(data));
//console.log(catalogo.getProducto(2));
//catalogo.deleteProduct(3);

export default new ProductManager("productos.json")