async function api(path, options = {}) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data?.message || "Request failed";
    const details = data?.details ? `\n- ${data.details.join("\n- ")}` : "";
    throw new Error(msg + details);
  }

  return data;
}

function bookOptionText(b) {
  return `${b.title} — ${b.author} (${b.price} KZT)`;
}

async function loadBooks() {
  const books = await api("/api/books");

  const list = document.getElementById("booksList");
  list.innerHTML = "";

  const select = document.getElementById("orderBook");
  select.innerHTML = "";

  if (books.length === 0) {
    list.innerHTML = "<li>No books yet.</li>";
    select.innerHTML = "<option value='' disabled selected>Add a book first</option>";
    return;
  }

  for (const b of books) {
    const li = document.createElement("li");
    li.textContent = `${b.title} — ${b.author} | ${b.category} | ${b.price} KZT | inStock: ${b.inStock}`;
    list.appendChild(li);

    const opt = document.createElement("option");
    opt.value = b._id;
    opt.textContent = bookOptionText(b);
    select.appendChild(opt);
  }
}

async function loadOrders() {
  const orders = await api("/api/orders");

  const list = document.getElementById("ordersList");
  list.innerHTML = "";

  if (orders.length === 0) {
    list.innerHTML = "<li>No orders yet.</li>";
    return;
  }

  for (const o of orders) {
    const first = o.items?.[0];
    const bookTitle = first?.book?.title || "Unknown book";
    const qty = first?.quantity ?? 0;

    const li = document.createElement("li");
    li.textContent = `${o.customerName} | ${o.status} | ${bookTitle} x${qty} | total: ${o.totalAmount} KZT`;
    list.appendChild(li);
  }
}

document.getElementById("bookForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    title: document.getElementById("bookTitle").value.trim(),
    author: document.getElementById("bookAuthor").value.trim(),
    price: Number(document.getElementById("bookPrice").value),
    category: document.getElementById("bookCategory").value.trim(),
    inStock: document.getElementById("bookInStock").value === "true",
  };

  try {
    await api("/api/books", { method: "POST", body: JSON.stringify(payload) });
    e.target.reset();
    document.getElementById("bookInStock").value = "true";
    await loadBooks();
  } catch (err) {
    alert(err.message);
  }
});

document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    customerName: document.getElementById("customerName").value.trim(),
    customerEmail: document.getElementById("customerEmail").value.trim(),
    items: [
      {
        bookId: document.getElementById("orderBook").value,
        quantity: Number(document.getElementById("orderQty").value),
      },
    ],
  };

  try {
    await api("/api/orders", { method: "POST", body: JSON.stringify(payload) });
    e.target.reset();
    document.getElementById("orderQty").value = 1;
    await loadOrders();
  } catch (err) {
    alert(err.message);
  }
});

(async function init() {
  try {
    await loadBooks();
    await loadOrders();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
})();
