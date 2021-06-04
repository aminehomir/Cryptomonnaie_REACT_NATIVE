const { Wallet } = require("../models");
const { User } = require("../models");
const {sendMail} = require('../services/sendMail.js');

const addWallet = async (req, res) => {






    // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&');
    // console.log(email);
    // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&');


    // console.log('**************************');
    // console.log(currencyPrice);
    // console.log('**************************');



    // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&$$$');
    // console.log(cryptoName);
    // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&$$$');



    // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&££££');
    // console.log(currencyValue);
    // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&££££');


  try {
  const email = req.body.email;
  const currencyPriceUnit = parseFloat(req.body.currencyPrice);
  const cryptoName = req.body.cryp_name;
  const currencyValue = parseFloat(req.body.value);

    const currencyPrice = currencyPriceUnit * currencyValue;

    const user = await User.findOne({ email: email });
    const newSolde = user.solde - currencyPrice;

    if (user.solde >= currencyPrice) {
      //check existing wallet

      const userWallet = await Wallet.findAll({
        where: {
          user: email,
          cryp_name: cryptoName,
        },
      });

      if (userWallet.length > 0) {
        // update wallet

        const newValue = userWallet[0].value + currencyValue;

        await userWallet[0]
          .update({
            value: newValue,
          })
          .then(() => {
            user.update({
              solde: newSolde,
            });
            res.send("payement Update");

          });
      } else {
        await Wallet.create({
          user: email,
          cryp_name: cryptoName,
          value: currencyValue,
        }).then(() => {
          user.update({
            solde: newSolde,
          });
          res.send("payement created");

        });
        res.send("payement created");

        let subject = "Buy Crypto";
        let text = "Crypto tracker";
        let output;
        output = `
        <h2>you have successfully buy  ${currencyValue} of ${cryptoName}  </h2>
        `;

        sendMail(email,subject,text,output);


      }
    } else {
      res.send("Solde insuffisant ");
    }
  } catch (err) {
    res.json(err);
  }




  
};

const sellCrypto = async (req, res) => {
  const email = req.body.email;
  const currencyName = req.body.cryp_name;
  const value =parseFloat(req.body.value);
  // const currencyPrice = parseFloat(req.body.currencyPrice);

  // const email = req.body.email;
  const currencyPriceUnit = parseFloat(req.body.currencyPrice);
  // const cryptoName = req.body.cryp_name;


  const currencyPrice =currencyPriceUnit * value;


  try {
    const findWallet = await Wallet.findAll({
      where: {
        user: email,
        cryp_name: currencyName,
      },
    });

    const user = await User.findOne({ email: email });
    const newSolde = user.solde + currencyPrice;

    if (findWallet.length > 0) {
      if (findWallet[0].value > value) {
        const newValue = findWallet[0].value - value;

        await findWallet[0]
          .update({
            value: newValue,
          })
          .then(() => {
            user.update({
              solde: newSolde,
            });
            res.send("Currency selled successfully");
          });
      

        let subject = "Sell Crypto";
        let text = "Crypto tracker";
        let output;
        output = `
        <h2>you have successfully sell  ${currencyValue} of${cryptoName}  </h2>
        `;

        await sendMail(email,subject,text,output);

      } else {
        res.send(`Please set a value less than ${value}`);
      }
    }
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { addWallet, sellCrypto };
