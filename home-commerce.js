document.addEventListener("DOMContentLoaded", () => {
  const account = document.querySelector('a[href="#account"]');
  if (account) account.href = "account.html";
  document
    .querySelectorAll(".cart")
    .forEach((link) => (link.href = "cart.html"));
  const all = document.querySelector(".all-products");
  if (all) all.href = "products.html";
  const count = document.querySelector("#cart-count");
  if (count)
    count.textContent = JSON.parse(
      localStorage.getItem("zac-flower-cart") || "[]",
    ).reduce((sum, item) => sum + item.quantity, 0);
});
