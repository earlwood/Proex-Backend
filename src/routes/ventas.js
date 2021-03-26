const express = require('express');
const router = express.Router();
const db = require('../DB/dbConnection');
const jwt = require('jsonwebtoken');
const verifyToken = require('../tokenConfig/token');

//Requests Para catalogo ventas
router.get('/getVentas', verifyToken, (req, res) =>{

    jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) => {
        if(error){
            res.sendStatus(403);
        }else{
            console.log("Auth Data: ",authData);
            const sqlGet = "call GetVentas()";
            db.query(sqlGet, (err, result) =>{
                res.send(result);
            });
            // console.log(req);
        }
    });
})


router.post('/insertVentas', verifyToken, (req, res) =>{
    
    jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) => {
        if(error){
            res.sendStatus(403);
        }
        else{
            const Date_Arrival = req.body.Date_Arrival;
            const idClientes_Informacion = req.body.idClientes_Informacion;
            const Real_Weight = req.body.Real_Weight;
            const Vol_Weight = req.body.Vol_Weight;
            const Total_Weight = req.body.Total_Weight;
            const Total_RW = req.body.Total_RW;
            const Total_Vol_W = req.body.Total_Vol_W;
            const Total = req.body.Total;
            const Paid = req.body.Paid;
            const Internal_Cost_Percentage = req.body.Internal_Cost_Percentage;
            const Cost_x_Lb = req.body.Cost_x_Lb;
            const Total_Cost = req.body.Total_Cost;
            const Revenue = req.body.Revenue;
            const Percentage = req.body.Percentage;
            const Notes = req.body.Notes;
            const Estatus = req.body.Estatus;

            const sqlInsert = "call InsertVenta(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            db.query(sqlInsert, [Date_Arrival, idClientes_Informacion, Real_Weight, Vol_Weight, Total_Weight,
                Total_RW, Total_Vol_W, Total, Paid, Internal_Cost_Percentage, Cost_x_Lb, Total_Cost,
                Revenue, Percentage, Notes, Estatus], (err, result) =>{
                    res.send(result);
                    // console.log(result);
                })
        }
    });
});

router.get('/getClientes', (req, res) =>{
    const sqlGet = "call GetClientesDropDownList()";
    db.query(sqlGet, (err, result) =>{
        res.send(result);
    })
});

router.delete('/deleteVenta/:id', verifyToken, (req, res) =>{
    
    jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) => {
        if(error){
            res.sendStatus(403);
        }
        else{
            const sqlDelete = `call DeleteVenta(${req.params.id})`;
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
})

router.get('/selectVenta/:id', (req, res) =>{
    
    const sqlSelectByID = `call SelectVenta(${req.params.id})`;
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
            // console.log(result);
        };
    })
});

router.get('/getRatexLb/:id', (req, res) =>{
    
    const sqlSelectByID = `call GetRatexLb(${req.params.id})`;
    db.query(sqlSelectByID, (err, result) =>{
        if(err) {
            res.status(400).json({
                status: 400,
                success: false
            });
            console.log(result);
        }
        else{
            res.json(result[0][0].Rate_x_Lb);
            // console.log(result[0][0].Rate_x_Lb);
        };
    })
});

router.put('/UpdateVenta/:id', verifyToken, (req, res) =>{
    
    jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) => {
        if(error){
            res.sendStatus(403);
        }
        else{
            const id_Venta = req.params.id;
            const Date_Arrival = req.body.Date_Arrival;
            const idClientes_Informacion = req.body.idClientes_Informacion;
            const Real_Weight = req.body.Real_Weight;
            const Vol_Weight = req.body.Vol_Weight;
            const Total_Weight = req.body.Total_Weight;
            const Total_RW = req.body.Total_RW;
            const Total_Vol_W = req.body.Total_Vol_W;
            const Total = req.body.Total;
            const Paid = req.body.Paid;
            const Internal_Cost_Percentage = req.body.Internal_Cost_Percentage;
            const Cost_x_Lb = req.body.Cost_x_Lb;
            const Total_Cost = req.body.Total_Cost;
            const Revenue = req.body.Revenue;
            const Percentage = req.body.Percentage;
            const Notes = req.body.Notes;
            const Estatus = req.body.Estatus;
            
            const sqlUpdateByID = `call UpdateVenta(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            db.query(sqlUpdateByID, [id_Venta, Date_Arrival, idClientes_Informacion, Real_Weight, Vol_Weight, Total_Weight,
            Total_RW, Total_Vol_W, Total, Paid, Internal_Cost_Percentage, Cost_x_Lb, Total_Cost,
            Revenue, Percentage, Notes, Estatus ], (err, result) =>{
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
            });
        }
    });
});


module.exports = router;