const db = require('../database/db')
var newValue = []
module.exports = app => {
    app.get('/', (req, res) => {
        res.send('<h1>Welcome!!</h1>')
    })
    app.get('/comp-controlado', (req, res) => {
        db.query('SELECT * FROM ctr_cmpcontrolado ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            res.send('Consultando')
            results.rows.forEach((value) => {
                const {id, descricao, nome} = value
                try {
                    var newDesc = decodeURIComponent(escape(descricao))
                    var newname = decodeURIComponent(escape(nome))
                } catch (e) {
                    newDesc = descricao
                    newname = nome
                }
                newValue.push({id, newDesc, newname})
                if (newValue.length === 479) {
                    atualisa(newValue)
                }
            })
        })
        function atualisa(lista) {
            lista.forEach(value => {

                const {id, newDesc, newname} = value
                parseInt(id)
                console.log(id, newDesc, newname)
                db.query(
                    'UPDATE ctr_cmpcontrolado SET nome=$1, descricao = $2 WHERE id =$3', [newname, newDesc,id], (error, results) => {
                        if (error) {
                            throw error
                        }
                    }
                )
            })

        }

    })

}