import React, {useState} from 'react';
import { client } from "../utils/dbClient";
import jwt from "jsonwebtoken";

export default function handler(req, res){
    console.log(req.body);

    const query = `SELECT * FROM users where username='${req.body.username}' and password='${req.body.password}'`;
    console.log(query)
    client.query(query, (err, result) => {
        if(err){
            client.end();
            res.status(500).json({message: "internal server error!!!"});

            return;
        }

        console.log(result.rows);

        if(result.rows.length===0){
            res.status(400).json({message: "username or password is wrong!!!"});
            return;
        }
        const token=jwt.sign(result.rows[0], "itsKey", {expiresIn:"1d"});

        client.end();

        res.status(200).json(token);
        });
    console.log("just testing")
    // res.status(200).json({something: "something"});
}