console.log("Its fortune time!");

let order = {
  fortunes: [],
};

const allButtons = document.querySelectorAll(".addToOrderBtn");

allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log(this);
    console.log(e.target.id);
    const fortuneId = e.target.id;
    order.fortunes.push(fortuneId);
  });
});

console.log(allButtons);
const submit = document.querySelector("#submit");

submit.addEventListener("click", async (e) => {
  let res = await fetch("/fortune/order", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  let response = await res.json();
  if (response) {
    order = {
      fortunes: [],
    };
    window.location = `/fortune/order/${response._id}`;
  }
  console.log(response);
});

console.log(allButtons);
