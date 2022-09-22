const fs = require('fs');
const path = require('path');
// Recibo por parámetro la entidad para reutilizarlo

const universalModel = function (name) {
    console.log('entre al modelo de Mercado')
    console.log(name)
    console.log(path.resolve(__dirname, '../database/', `${name}.json`))
    return {
        tablePath: path.resolve(__dirname, '../database/', `${name}.json`),

        // Leo el archivo Json y lo transformo en Array de objeto literal     
        readFile: function () {
            console.log('Leo el archivo')
            let tableContents = fs.readFileSync(this.tablePath, 'utf-8');
            return JSON.parse(tableContents) || [];
        },
        // Grabo el array que recibo por parámetro y lo paso a formato Json
        writeFile: function (contents) {
            let tableContents = JSON.stringify(contents, null, ' ');
            fs.writeFileSync(this.tablePath, tableContents);
        },
        // Averiguo el próximo id
        nextId: function () {
            let rows = this.readFile();
            let lastRow = rows.pop();

            return lastRow ? ++lastRow.id : 1;
        },
        // Leo todos los registros del archivo
        findAll: function () {
            
            return this.readFile();
        },
        // Busco por id
        findById: function (id) {
            let rows = this.readFile();
            console.log(" --- por el find")
            return rows.find(i => i.id == id);
        },

        // agrego un registro que paso por parámetro
        create: function (row) {
            let rows = this.readFile();
            // Averiguo el último id y lo actualizo
            row.id = this.nextId();
            // Agrego en el array
            rows.push(row);
            // grabo el array en el archivo
            this.writeFile(rows);
            //Retorno el último id generado
            return row.id;
        },
        // Actualizo el archivo
        update: function (row) {
            let rows = this.readFile();

            let updatedRows = rows.map(oneRow => {
                if (oneRow.id == row.id) {
                    return row;
                }

                return oneRow;
            });
            // escribo el archivo
       //     console.log(updatedRows)
            this.writeFile(updatedRows);

            return row.id;
        },

        // Elimino el registro en el archivo según un id    
        delete: function (id) {

            console.log('Elimino :' + id)
            let rows = this.readFile();
            let updatedRows = rows.filter(row => {
                return row.id != id;
            });

            this.writeFile(updatedRows);
        },

    //     table: function () {
    //         let rows = this.readFile();
    //         console.log(" --- filtro los visitados")
            
    //         const table = rows.filter(i => i.category == 'table')
    //         console.log(" --- ESTOY ----------------------")
    //    //     console.log(visitados)
    //         return table 

    //     },
    //     visited: function () {
    //         let rows = this.readFile();
    //         console.log(" --- filtro los visitados")
            
    //         const visitados = rows.filter(i => i.category == 'visited')
    //         console.log(" --- ESTOY ----------------------")
    //    //     console.log(visitados)
    //         return visitados 

    //     },

    //     inSale: function () {
    //         let rows = this.readFile();
    //         console.log(" --- filtro los que están para venta")
  
    //         const enVenta = rows.filter(i => i.category == 'in-sale')
    //         console.log(" --- ESTOY EN VENTA--------------------")
    //  //       console.log(enVenta)
    //         return enVenta

    //     },

        //findFirstByField: function(text){
        //    let rows = this.findAll();
    /*
            let elementFound = rows.find(element => element.id == text);
            return elementFound;
        },

        findAllByField: function(text){
            let rows = this.findAll();
            let allElementsFound = rows.filter(element => element.estado == text);
            return allElementsFound;
        },*/
        findFirstByField: function(field, text){
            let rows = this.findAll();
            let elementFound = rows.find(element => element[field] == text);
            return elementFound;
        },

        findAllByField: function(field, text){
            let rows = this.findAll();
            let allElementsFound = rows.filter(element => element[field] == text);
            return allElementsFound;
        }

    


    }
}

module.exports = universalModel