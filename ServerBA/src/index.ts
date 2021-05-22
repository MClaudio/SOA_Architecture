import express from "express";
import path from "path";
import * as file from "fs";
import { Transfer } from "./interface/Transfer";
import { Account } from "./interface/Account";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.set("port", process.env.PORT || 5000);

app.use(express.static(path.join(__dirname, "public")));

var data = file.readFileSync(path.join(__dirname, "data.json"), "utf8");
var accounts: Account[] = JSON.parse(data);

app.get("/account", (req, res) => {
  return res.send(accounts);
});

app.get("/account/:number", (req, res) => {
  let account = accountFind(req.params.number);
  console.log(account)
  if (account) {
    return res.send(account);
  } else {
    return res.status(404).send({ message: "the account does not exist" });
  }
});

app.post("/account/transfer-send", (req, res) => {

  console.log("send", req.body)

  let account: Account = accountFind(req.body.accountOrigin.account) as Account;

  if (account) {
    if (account.total > req.body.amount) {
      let transfer: Transfer = {
        type:"send",
        account_number: req.body.accountDestination.account,
        organisation: req.body.accountDestination.organisation,
        amount: req.body.amount,
        date: new Date(),
      };
      account.total -= Number(req.body.amount);
      account.transfers?.push(transfer);
      return res.send(req.body);
    } else {
      return res.status(400).send({ message: "The account balance is insufficient" });
    }
  } else {
    return res.status(404).send({ message: "the account does not exist" });
  }
});

app.post("/account/transfer-received", (req, res) => {
  console.log("received", req.body)
  let account: Account = accountFind(req.body.accountDestination.account) as Account;

  if (account) {
 
      let transfer: Transfer = {
        type:"received",
        account_number: req.body.accountOrigin.account,
        organisation: req.body.accountOrigin.organisation,
        amount: req.body.amount,
        date: new Date(),
      };
      account.total += Number(req.body.amount);
      account.transfers?.push(transfer);
      return res.send({status:"ok", process:req.body});
  } else {
    return res.status(404).send({ message: "the account does not exist" });
  }
});

const server = app.listen(app.get("port"), () => {
  console.log("listening on *:5000");
});

var accountFind = (number: any) =>
  accounts.find((account: any) => account.numberAccount === number);
