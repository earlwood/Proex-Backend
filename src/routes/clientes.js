const express = require('express');
const router = express.Router();
const db = require('../DB/dbConnection');
const jwt = require('jsonwebtoken');
const verifyToken = require('../tokenConfig/token');

//Requests para Clientes

router.get('/getClientesInfo', verifyToken, (req, res) =>{        
    jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) => {
        if(error){
            res.sendStatus(403);
        }
        else{
            const sqlGet = "call GetClientes()";
            db.query(sqlGet, (err, result) =>{
                res.send(result);
            });
        }
    });
});

router.get('/getSellers', (req, res) =>{
    const sqlGet = "call GetSellersDropDownList()";
    db.query(sqlGet, (err, result) =>{
        console.log(result);
        res.send(result);
    })
});

router.post('/InsertCliente', verifyToken, (req, res) =>{    
    jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) => {
        if(error){
            res.sendStatus(403);
        }
        else{
            const Name = req.body.Name;
            const Address = req.body.Address;
            const Cel = req.body.Cel;
            const Email = req.body.Email;
            const Rate_x_Lb = req.body.Rate_x_Lb;
            const Rate_x_Vol = req.body.Rate_x_Vol;
            const id_Seller = req.body.id_Seller;
        
            const sqlInsert = "call InsertCliente(?,?,?,?,?,?,?)";
            db.query(sqlInsert, [Name, Address, Cel, Email, Rate_x_Lb, Rate_x_Vol, id_Seller], (err, result) =>{
                if(err) {
                    res.status(400).json({
                        status: 400,
                        success: false
                    });
                    console.log(err);
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

router.delete('/DeleteCliente/:id', verifyToken, (req, res) =>{
    jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) => {
        if(error){
            res.sendStatus(403);
        }
        else{
            const sqlDelete = `call DeleteCliente(${req.params.id})`;
            db.query(sqlDelete, (err, result) =>{
                if(err) {
                    res.status(400).json({
                        status: 400,
                        success: false
                    });
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

router.get('/SelectCliente/:id', (req, res) =>{
    const sqlSelectByID = `call SelectCliente(${req.params.id})`;
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

router.put('/UpdateCliente/:id', verifyToken, (req, res) =>{
    jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) => {
        if(error){
            res.sendStatus(403);
        }
        else{
            const idClientes_Informacion = req.params.id;
            const Name = req.body.Name;
            const Address = req.body.Address;
            const Cel = req.body.Cel;
            const Email = req.body.Email;
            const Rate_x_Lb = req.body.Rate_x_Lb;
            const Rate_x_Vol = req.body.Rate_x_Vol;
            const id_Seller = req.body.id_Seller;
        
            const sqlUpdateByID = `call UpdateCliente(?,?,?,?,?,?,?,?)`;
            db.query(sqlUpdateByID, [idClientes_Informacion, Name, Address, Cel, Email, Rate_x_Lb, Rate_x_Vol, id_Seller ], (err, result) =>{
                    if(err) {
                        res.status(400).json({
                            status: 400,
                            success: false
                    });
                }
                else{
                    res.send(result);
                };
            });
        }
    });
});


module.exports = router;