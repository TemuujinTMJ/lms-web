import { checkMethod } from "../../utils/checkAuth"
import { client } from "../../utils/dbClient"

export default checkMethod((req, res)=>{
        const {id, schoolname, floor, labnumber, teachername, imagename, data} = req.body;
        client.query(
            'INSERT INTO class (id, schoolname, floor, labnumber, teachername, imagename, data) VALUES($1, $2, $3, $4, $5, $6, $7)',
            [id, schoolname, floor, labnumber, teachername, imagename, data],
            (error, result) => {
                if(error){
                    console.log(error)
                    res.status(500).json({message: "error creating new class"});
                }
                else {
                    console.log(result.rows);
                    res.status(201).json({message: 'Class created'})
                }
            }
        )
 }, ["POST"]);