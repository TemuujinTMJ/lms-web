import { checkMethod } from "../../utils/checkAuth"
import { client } from "../../utils/dbClient"

export default checkMethod((req, res)=>{
        const {description_of_goods, mongolianname, goodpurpose, manufacturer, model_no, year_of_manufacture, tagId, serialnumber, price} = req.body;
        client.query(
            'INSERT INTO equipment_list (description_of_goods, mongolianname, goodpurpose, manufacturer, model_no, year_of_manufacture, tagId, serialnumber, price) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [description_of_goods, mongolianname, goodpurpose, manufacturer, model_no, year_of_manufacture, tagId, serialnumber, price],
            (error, result) => {
                if(error){
                    console.log(error)
                    res.status(500).json({message: "error creating new equipment"});
                }
                else {
                    console.log(result.rows);
                    res.status(201).json({message: 'Equipment created'})
                }
            }
        )
 }, ["POST"]);
