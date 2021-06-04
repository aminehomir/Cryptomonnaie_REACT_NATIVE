const { User } = require('../models');



 const addUser = async (req, res) => {

        try {

                let email = req.body.email;
            const existingUser = await User.findOne({
                where: {
                    email: email,
                },
              });


         

            if (existingUser  == null) {

                let user =  await User.create({
                    email : email,
                   
                 
                })

                res.send(user)

              
                console.log(user);
                
                
            }else {

             

                res.send(existingUser);

            }

             
                
            }
            catch (err) {
                res.status(400).json({message: err.message})
            }
     
}

const getUserByEmail = async (req , res) => {
    try {
        const id = req.params.id
    const userEmail = await User.findOne ({
        where: {
            id: id,
        },
      });
      console.log(userEmail); 
    res.send(userEmail);

    }
    catch (err) {
        res.status(400).json({message: err.message})
    }

}

module.exports = { addUser,  getUserByEmail }