const express = require('express');
const router = express.Router();
const db = require('../DB/dbConnection');
const jwt = require('jsonwebtoken');
const verifyToken = require('../tokenConfig/token');

//Requests para Direcciones
        
router.get('/getDirecciones', verifyToken, (req, res) =>{
    jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) => {
        if(error){
            res.sendStatus(403);
        }
        else{
            const sqlGet = "call GetDirecciones()";
            db.query(sqlGet, (err, result) =>{
                res.send(result);
            });
        }
    });
});

router.post('/insertDireccion', verifyToken, (req, res) =>{
    jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) => {
        if(error){
            res.sendStatus(403);
        }
        else{
            const Tipo_Direccion = req.body.Tipo_Direccion;
            const Direccion = req.body.Direccion;
            
            const sqlInsert = "call InsertDireccion(?,?)";
            db.query(sqlInsert, [Tipo_Direccion, Direccion], (err, result) =>{
                res.send(result);
            });
        }
    });
});

router.delete('/deleteDireccion/:id', verifyToken, (req, res) =>{
    jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) => {
        if(error){
            res.sendStatus(403);
        }
        else{
            const sqlDelete = `call DeleteDireccion(${req.params.id})`;
            db.query(sqlDelete, (err, result) =>{
                if(err) {
                    res.status(400).json({
                        status: 400,
                        success: false
                    });
                    console.log(result);
                }
                else{
                    res.status(200).json({
                        status: 200,
                        success: true
                    });
                };
            });
        }
    });
});

router.get('/SelectDireccion/:id', (req, res) =>{
    const sqlSelectByID = `call SelectDireccion(${req.params.id})`;
    db.query(sqlSelectByID, (err, result) =>{
        if(err) {
            res.status(400).json({
                status: 400,
                success: false
            });
            console.log(result);
        }
        else{
            res.send(result);
        };
    })
});

router.put('/UpdateDireccion/:id', verifyToken, (req, res) =>{
    jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) => {
        if(error){
            res.sendStatus(403);
        }
        else{
            const id_Direccion = req.params.id;
            const Tipo_Direccion = req.body.Tipo_Direccion;
            const Direccion = req.body.Direccion;
            
            const sqlUpdateByID = `call UpdateDireccion(?,?,?)`;
            db.query(sqlUpdateByID, [id_Direccion, Tipo_Direccion, Direccion], (err, result) =>{
                if(err) {
                    res.status(400).json({
                        status: 400,
                        success: false
                    });
                    console.log(err);
                }
                else{
                    res.send(result);
                };
            });
        }
    });
});


module.exports = router;