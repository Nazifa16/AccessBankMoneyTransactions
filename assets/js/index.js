const TranInput = document.querySelector("#TranInput");
const BtnMoneyIn = document.querySelector("#BtnMoneyIn");
const BtnMoneyOut = document.querySelector("#BtnMoneyOut");
const BtnShow = document.querySelector("#BtnShow");
const TranList = document.querySelector("#TranList");

const Transaction = {
  balance: 0,
  limit: 5000,
  report: [],
  date: new Date(),

  increase: function (money) {
    if (money <= 0) {
      alert("Please enter a valid number");
      return;
    } else if (money >= this.limit) {
      alert("The amount you want to deposit exceeds the limit");
      return;
    } else if (this.balance + money > this.limit) {
      alert(
        "If you enter this amount, your balance will exceed the limit, so it is not possible to enter this amount, take a look at your balance"
      );
      return;
    } else {
      this.balance += money;
    }

    const history = {
      type: "Money In",
      amount: money,
      balance: this.balance,
      created: this.date,
    };

    this.report.push(history);
    return this.balance;
  },

  decrease: function (money) {
    if (money <= 0) {
    } else if (this.balance - money < 0) {
      alert("You don't have enough money in your balance");
      return;
    } else {
      this.balance -= money;
    }

    const history = {
      type: "Money Out",
      amount: money,
      balance: this.balance,
      created: this.date,
    };

    this.report.push(history);
    return this.balance;
  },

  show: function () {
    return this.balance;
  },
};
console.log(Transaction.increase(0));

BtnMoneyIn.addEventListener("click", function () {
  const value = TranInput.value;
  Transaction.increase(Number(value));
  TranInput.value = "";
});

BtnMoneyOut.addEventListener("click", function () {
  const value = TranInput.value;
  Transaction.decrease(Number(value));
  TranInput.value = "";
});

BtnShow.addEventListener("click", function () {
  const list = Transaction.report
    .map(
      (historyObj, index) => `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${historyObj.type}</td>
        <td class="text-${
          historyObj.type === "Money In" ? "success" : "danger"
        }">${
        historyObj.type === "Money In"
          ? "+" + historyObj.amount
          : "-" + historyObj.amount
      }</td>
        <td>${historyObj.balance}</td>
        <td>${historyObj.created}</td>
      </tr>
    `
    )
    .join("");
  TranList.innerHTML = list;
});
