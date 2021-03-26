const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../DB/dbConnection');
const jwt = require('jsonwebtoken');
const verifyToken = require('../tokenConfig/token');

//Requests Para Login, Logout y usuarios

router.get('/getRoles', (req, res) =>{
    
    const sqlGet = "call GetRolesDropDownList()";
    db.query(sqlGet, (err, result) =>{
        res.send(result);
    });           
});

router.post('/insertUser', verifyToken,  (req, res) =>{

    jwt.verify(req.token, process.env.JWT_SECRET, async (error, authData) =>{
        if(error){
            res.sendStatus(403);
        }
        else{
            const salt = await bcrypt.genSalt(10);
            const Password = req.body.Password;
            const encryptedPassword = await bcrypt.hash(Password, salt);
            const Email = req.body.Email;
            const id_Role = req.body.id_Role;
        
            const sqlInsert = "call insertUser(?,?,?)";
        
            db.query(sqlInsert, [Email, encryptedPassword, id_Role], (err, result, fields) => {
                if (err) {
                    console.log("error", err);
                } else {
        
                    if(result.affectedRows > 0){
                        res.json({message:'Se ha creado el Usuario!', inserted: result});
                        console.log("Se insertó");
                    }
                    else{
                        res.json({message: 'Este correo ya está siendo usado', inserted: result});
                        console.log("No se insertó");
                    }
                    // console.log(Object.prototype.toString.call(result).length);
                    console.log(Object.prototype.toString.call(result));
                    console.log(result);
                }
            });
        }
    })
    
});

router.post('/getUserLogin', async (req, res) =>{

    const Email = req.body.Email;
    const Password = req.body.Password;

    const sqlGetLogin = "call getUserLogin(?)";

    db.query(sqlGetLogin, [Email], (err, result) => {
        if (err) {
            console.log("error", err);
        }
        
        if(result.length > 0) {
            bcrypt.compare(Password, result[0][0].Pass, async (error, response) => {
                if(error){
                    throw error;
                }
                if(response){

                    const payload = {
                        id: result[0][0].id_User
                    };
                    jwt.sign({payload}, process.env.JWT_SECRET, { expiresIn: '1y' }, (e, token) =>{
                        res.json({
                        auth: true,
                        token,
                        result
                        });
                    });
                }
                else{
                    res.json({
                        auth: false,
                        message: 'Password incorrecto'
                    });
                }
            });
        }
        else{
            res.json({
                auth: false,
                message: 'El email no existe'
            });
        }
    });
});

router.get('/getUserLogged/:id', (req, res) => {
    const id_User = req.params.id;
    const sqlGetUserLogged = "call getUserLogged(?)";
    db.query(sqlGetUserLogged, [id_User], (err, result) =>{
        res.json({
            isLoggedIn: true,
            result
        });
    })
});

router.get('/getUserLogout/:id', (req, res) => {
    const id_User = req.params.id;
    const sqlLogout = 'call getUserLogout(?)';

    db.query(sqlLogout, [id_User], (err, result) => {
        res.json({
            message: 'Ha cerrado sesión.'
        })
    });
});

module.exports = router;