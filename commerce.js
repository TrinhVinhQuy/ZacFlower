const products = [
  [
    "Sớm Mai",
    "bouquet",
    "HOA BÓ",
    450000,
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Khai Trương Hồng Phát",
    "stand",
    "KỆ CHÚC MỪNG",
    1250000,
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Ngày Yêu",
    "gift",
    "HOA & QUÀ",
    680000,
    "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Lời Hứa",
    "wedding",
    "HOA CƯỚI",
    890000,
    "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Mùa Trong Vắt",
    "bouquet",
    "HOA BÓ",
    490000,
    "https://images.unsplash.com/photo-1494336934272-fd6c2e3b7c14?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Nắng Vàng",
    "basket",
    "HOA GIỎ",
    750000,
    "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Hồng Mơ",
    "bouquet",
    "HOA BÓ",
    550000,
    "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=700&q=85",
  ],
  [
    "Mãi Bên Nhau",
    "wedding",
    "HOA CƯỚI",
    950000,
    "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=700&q=85",
  ],
].map(([name, category, label, price, image], id) => ({
  id,
  name,
  category,
  occasion:
    category === "wedding"
      ? "wedding"
      : category === "stand"
        ? "congrats"
        : category === "gift"
          ? "gift"
          : "love",
  label,
  price,
  image,
}));
const money = (n) => new Intl.NumberFormat("vi-VN").format(n) + "đ",
  readCart = () => JSON.parse(localStorage.getItem("zac-flower-cart") || "[]"),
  writeCart = (c) => {
    localStorage.setItem("zac-flower-cart", JSON.stringify(c));
    badge();
  },
  badge = () =>
    document
      .querySelectorAll(".cart-count")
      .forEach(
        (e) => (e.textContent = readCart().reduce((s, x) => s + x.quantity, 0)),
      );
const add = (id) => {
  let c = readCart(),
    x = c.find((x) => x.id === id);
  x ? x.quantity++ : c.push({ id, quantity: 1 });
  writeCart(c);
};
const card = (p) =>
  `<article class="flower-card"><img src="${p.image}" alt="${p.name}"><div class="card-info"><small>${p.label}</small><h3>${p.name}</h3><p>${money(p.price)}</p><button class="add-cart" data-id="${p.id}">Thêm vào giỏ</button></div></article>`;
function catalog() {
  let grid = document.querySelector("#catalog-grid");
  if (!grid) return;
  let category = new URLSearchParams(location.search).get("category") || "all",
    q = "",
    sort = "featured",
    priceRange = "all",
    occasion = "all";
  document.querySelector(".catalog-aside").insertAdjacentHTML(
    "beforeend",
    `<div class="filter-group"><b>Khoảng giá</b><select id="price-filter" aria-label="Lọc theo khoảng giá"><option value="all">Tất cả mức giá</option><option value="under-500">Dưới 500.000đ</option><option value="500-800">500.000đ – 800.000đ</option><option value="800-1000">800.000đ – 1.000.000đ</option><option value="over-1000">Trên 1.000.000đ</option></select></div><div class="filter-group"><b>Dịp tặng</b><select id="occasion-filter" aria-label="Lọc theo dịp tặng"><option value="all">Tất cả dịp tặng</option><option value="love">Tình yêu & sinh nhật</option><option value="congrats">Khai trương, chúc mừng</option><option value="wedding">Ngày cưới</option><option value="gift">Quà tặng</option></select></div><button class="clear-filters" type="button">Xóa bộ lọc</button>`,
  );
  let render = () => {
    let a = products.filter(
      (x) =>
        (category === "all" || x.category === category) &&
        x.name.toLowerCase().includes(q) &&
        (occasion === "all" || x.occasion === occasion) &&
        (priceRange === "all" ||
          (priceRange === "under-500" && x.price < 500000) ||
          (priceRange === "500-800" && x.price >= 500000 && x.price <= 800000) ||
          (priceRange === "800-1000" && x.price > 800000 && x.price <= 1000000) ||
          (priceRange === "over-1000" && x.price > 1000000)),
    );
    if (sort === "low") a.sort((x, y) => x.price - y.price);
    if (sort === "high") a.sort((x, y) => y.price - x.price);
    grid.innerHTML =
      a.map(card).join("") || "<p>Chưa tìm thấy mẫu hoa phù hợp.</p>";
    document.querySelector("#result-count").textContent = a.length + " mẫu hoa";
    document
      .querySelectorAll(".catalog-filter")
      .forEach((b) =>
        b.classList.toggle("active", b.dataset.category === category),
      );
  };
  document.querySelectorAll(".catalog-filter").forEach(
    (b) =>
      (b.onclick = () => {
        category = b.dataset.category;
        render();
      }),
  );
  document.querySelector("#catalog-search").oninput = (e) => {
    q = e.target.value.toLowerCase();
    render();
  };
  document.querySelector("#sort-products").onchange = (e) => {
    sort = e.target.value;
    render();
  };
  document.querySelector("#price-filter").onchange = (e) => {
    priceRange = e.target.value;
    render();
  };
  document.querySelector("#occasion-filter").onchange = (e) => {
    occasion = e.target.value;
    render();
  };
  document.querySelector(".clear-filters").onclick = () => {
    category = priceRange = occasion = "all";
    q = "";
    document.querySelector("#catalog-search").value = "";
    document.querySelector("#price-filter").value = "all";
    document.querySelector("#occasion-filter").value = "all";
    render();
  };
  grid.onclick = (e) => {
    let b = e.target.closest(".add-cart");
    if (b) {
      add(+b.dataset.id);
      b.textContent = "Đã thêm ✓";
      setTimeout(() => (b.textContent = "Thêm vào giỏ"), 900);
    }
  };
  render();
}
function rows(el, compact) {
  let c = readCart(),
    a = c.map((x) => ({ ...products[x.id], quantity: x.quantity }));
  el.innerHTML = a.length
    ? a
        .map((p) =>
          compact
            ? `<div class="checkout-row"><span>${p.name} × ${p.quantity}</span><strong>${money(p.price * p.quantity)}</strong></div>`
            : `<article class="cart-row"><img src="${p.image}" alt="${p.name}"><div><small>${p.label}</small><h3>${p.name}</h3><p>${money(p.price)}</p></div><div class="quantity"><button data-a="-" data-id="${p.id}">−</button><span>${p.quantity}</span><button data-a="+" data-id="${p.id}">+</button></div><strong>${money(p.price * p.quantity)}</strong><button class="remove" data-a="x" data-id="${p.id}">×</button></article>`,
        )
        .join("")
    : '<div class="empty-cart"><h2>Giỏ hàng đang trống</h2><p>Hãy chọn một bó hoa thật xinh cho dịp đặc biệt của bạn.</p><a class="btn" href="products.html">Khám phá sản phẩm</a></div>';
  return a.reduce((s, p) => s + p.price * p.quantity, 0);
}
function cart() {
  let el = document.querySelector("#cart-items");
  if (!el) return;
  let render = () => {
    let s = rows(el),
      ship = s >= 800000 || !s ? 0 : 30000;
    document.querySelector("#subtotal").textContent = money(s);
    document.querySelector("#shipping").textContent = ship
      ? money(ship)
      : "Miễn phí";
    document.querySelector("#total").textContent = money(s + ship);
    document.querySelector(".checkout-link").classList.toggle("disabled", !s);
  };
  el.onclick = (e) => {
    let b = e.target.closest("[data-a]");
    if (!b) return;
    let c = readCart(),
      i = c.findIndex((x) => x.id === +b.dataset.id);
    if (b.dataset.a === "+") c[i].quantity++;
    if (b.dataset.a === "-" && c[i].quantity > 1) c[i].quantity--;
    if (b.dataset.a === "x" || (b.dataset.a === "-" && c[i].quantity === 1))
      c.splice(i, 1);
    writeCart(c);
    render();
  };
  render();
}
function checkout() {
  let el = document.querySelector("#checkout-items");
  if (!el) return;
  let s = rows(el, true),
    ship = s >= 800000 || !s ? 0 : 30000;
  document.querySelector("#checkout-total").textContent = money(s + ship);
  document.querySelector("#checkout-form").onsubmit = (e) => {
    e.preventDefault();
    if (!readCart().length) return (location.href = "products.html");
    const form = new FormData(e.currentTarget);
    const orderDetails = readCart()
      .map((item) => {
        const product = products[item.id];
        return `- ${product.name} x${item.quantity}: ${money(product.price * item.quantity)}`;
      })
      .join("\n");
    const zaloMessage = `ĐƠN HOA MỚI\nKhách hàng: ${form.get("name")}\nSĐT: ${form.get("phone")}\nĐịa chỉ: ${form.get("address")}\nLời nhắn: ${form.get("note") || "Không có"}\n\nSản phẩm:\n${orderDetails}\n\nTổng thanh toán: ${money(s + ship)}`;
    navigator.clipboard?.writeText(zaloMessage);
    localStorage.removeItem("zac-flower-cart");
    badge();
    document.querySelector("#success-message").hidden = false;
    const message = document.querySelector("#success-message p");
    message.textContent = "Thông tin đơn hàng đã được sao chép. Hãy mở Zalo và dán tin nhắn để gửi cho shop.";
    const zaloButton = document.createElement("a");
    zaloButton.className = "btn zalo-order-button";
    zaloButton.style.marginRight = "10px";
    zaloButton.href = "https://zalo.me/0905163918";
    zaloButton.target = "_blank";
    zaloButton.rel = "noopener";
    zaloButton.textContent = "Mở Zalo để gửi đơn";
    document.querySelector("#success-message > div").insertBefore(
      zaloButton,
      document.querySelector("#success-message .btn"),
    );
  };
}
const commerceStyles = document.createElement("link");
commerceStyles.rel = "stylesheet";
commerceStyles.href = "commerce.css";
document.head.append(commerceStyles);
const catalogFilterStyles = document.createElement("link");
catalogFilterStyles.rel = "stylesheet";
catalogFilterStyles.href = "catalog-filters.css";
document.head.append(catalogFilterStyles);
document.addEventListener("DOMContentLoaded", () => {
  badge();
  catalog();
  cart();
  checkout();
  let f = document.querySelector("#login-form");
  if (f)
    f.onsubmit = (e) => {
      e.preventDefault();
      alert("Tính năng đăng nhập sẽ sớm được kết nối với hệ thống khách hàng.");
    };
});
