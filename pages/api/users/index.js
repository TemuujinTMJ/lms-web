import { checkMethod } from "../../utils/checkAuth"
import { client } from "../../utils/dbClient"

export default checkMethod(async(_, res)=>{

    await client.query("select username, firstName,lastName, email, phoneNumber from users", (err, result)=>{
        if(err){
            res.status(500).json({message:"internal server error!!!"});
            return;
        }

        res.status(200).json(result.rows);
    })

});