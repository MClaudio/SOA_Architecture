import express from "express";
import path from "path";
import * as file from "fs";
import { Transfer } from "./interface/Transfer";
import { Account } from "./interface/Account";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("port", process.env.PORT || 6000);

app.use(express.static(path.join(__dirname, "public")));

var data = file.readFileSync(path.join(__dirname, "data.json"), "utf8");
var accounts: Account[] = JSON.parse(data);

app.get("/account", (req, res) => {
  return res.send(accounts);
});

app.get("/account/:number", (req, res) => {
  let account = accountFind(req.params.number);
  //console.log(account)
  if (account) {
    return res.send(account);
  } else {
    return res.send({ message: "the account does not exist" });
  }
});

app.post("/account/:number/transfer-send", (req, res) => {

  let account: Account = accountFind(req.params.number) as Account;

  if (account) {
    if (account.total > req.body.amount) {
      let transfer: Transfer = {
        type:"send",
        userName: req.body.username,
        organisation: req.body.corporation,
        amount: req.body.amount,
        date: new Date(),
      };
      account.total -= req.body.amount;
      account.transfers?.push(transfer);
      return res.send(account);
    } else {
      return res.send({ message: "The account balance is insufficient" });
    }
  } else {
    return res.status(404).send({ message: "the account does not exist" });
  }
});

app.post("/account/:number/transfer-received", (req, res) => {
  let account: Account = accountFind(req.params.number) as Account;
  if (account) {
    let transfer: Transfer = {
      type:"received",
      userName: req.body.username,
      organisation: req.body.corporation,
      amount: req.body.amount,
      date: new Date(),
    };
    account.total += req.body.amount;
    account.transfers?.push(transfer);
    return res.send(account);
  } else {
    return res.status(404).send({ message: "the account does not exist" });
  }
});

const server = app.listen(app.get("port"), () => {
  console.log("listening on *:6000");
});

var accountFind = (number: any) =>
  accounts.find((account: any) => account.numberAccount === number);