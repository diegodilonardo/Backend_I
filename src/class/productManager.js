import { promises } from 'node:dns'
import fs from 'node:fs'

class ProductsManager {
    constructor(path){
        this.path = path

        this.product = {}
        this.productsList = []
    }

    async setNewId(){
        const now = await new Date();
        return now.getTime();
    }

    // Funciones para Productos (ABM)
    async getProduct(id){
        const list = await fs.promises.readFile(this.path, 'utf-8')
        this.productsList = [...JSON.parse(list).products]
        this.productsList.map((prod,i)=>{
            if (prod.id == id) {
                this.product = prod
            }
        })
        return {...this.product}
    }
    async getAllProducts(){
        const list = await fs.promises.readFile(this.path, 'utf-8')
        this.productsList = [...JSON.parse(list).products]
        return [...this.productsList]
    }
    async addProduct(product){
        const newId = await this.setNewId()
        await this.getAllProducts();
        let newProduct = {
            "id": newId,
            "nombre": "",
            "descripcion": "",
            "codigo": "",
            "colorprod": "",
            "talle": "",
            "precio": 0,
            "stock": 0,
            "categoria": ""
        }
        product.nombre ? newProduct.nombre = product.nombre : null
        product.descripcion ? newProduct.descripcion = product.descripcion : null
        product.codigo ? newProduct.codigo = product.codigo : null
        product.colorprod ? newProduct.colorprod = product.colorprod : null
        product.talle ? newProduct.talle = product.talle : null
        product.precio ? newProduct.precio = product.precio : null
        product.stock ? newProduct.stock = product.stock : null
        product.categoria ? newProduct.categoria = product.categoria : null
        this.productsList.push(newProduct)

        await fs.promises.writeFile(this.path,JSON.stringify({ products: this.productsList }))
    }
    async updateProduct(id){
        await this.getAllProducts();
        if (this.productsList.some(obj => obj.id == id)) {
            const prod = this.productsList.find(obj => obj.id == id)
            
            product.id ? prod.id = product.id : null
            product.nombre ? prod.nombre = product.nombre : null
            product.descripcion ? prod.descripcion = product.descripcion : null
            product.codigo ? prod.codigo = product.codigo :null
            product.colorprod ? prod.colorprod = product.colorprod :null
            product.talle ? prod.talle = product.talle :null
            product.precio ? prod.precio = product.precio :null
            product.stock ? prod.stock = product.stock :null
            product.categoria ? prod.categoria = product.categoria :null
            
            await fs.promises.writeFile(this.path,JSON.stringify({ products: this.productsList }))
            console.log("Producto Modificado")
        } else {
            console.log("ID no encontrado")
            
        }
    }
    async deleteProduct(id){
        await this.getAllProducts();
        if (this.productsList.some(obj => obj.id == id)) {
            const i = this.productsList.findIndex(obj => obj.id == id)
            
            this.productsList.splice(i,1)
            await fs.promises.writeFile(this.path,JSON.stringify({ products: this.productsList }))
            
         
            console.log("Producto Eliminado")
        } else {
            console.log("ID no encontrado")
        }
    }


}

export default ProductsManager