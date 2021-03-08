const express = require('express');
const router = express.Router();
const db = require('../DB/dbConnection');
const jwt = require('jsonwebtoken');
const verifyToken = require('../tokenConfig/token');

//Requests para Vendedores
        
router.get('/getSellersList', verifyToken, (req, res) =>{
    jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) => {
        if(error){
            res.sendStatus(403);
        }
        else{
            const sqlGet = "call GetSellers()";
            db.query(sqlGet, (err, result) =>{
                res.send(result);
            });
        }
    });
});

router.post('/insertSeller', verifyToken, (req, res) =>{    
    jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) => {
        if(error){
            res.sendStatus(403);
        }
        else{
            const Seller_Name = req.body.Seller_Name;
            
            const sqlInsert = "call InsertSeller(?)";
            db.query(sqlInsert, [Seller_Name], (err, result) =>{
                res.send(result);
            });
        }
    });    
    
});

router.delete('/deleteSeller/:id', verifyToken, (req, res) =>{    
    jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) => {
        if(error){
            res.sendStatus(403);
        }
        else{
            const sqlDelete = `call DeleteSeller(${req.params.id})`;
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

router.get('/SelectSeller/:id', (req, res) =>{    
    const sqlSelectByID = `call SelectSeller(${req.params.id})`;
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

router.put('/UpdateSeller/:id', verifyToken, (req, res) =>{    
    jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) => {
        if(error){
            res.sendStatus(403);
        }
        else{
            const id_Seller = req.params.id;
            const Seller_Name = req.body.Seller_Name;
            
            const sqlUpdateByID = `call UpdateSeller(?,?)`;
            db.query(sqlUpdateByID, [id_Seller, Seller_Name], (err, result) =>{
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