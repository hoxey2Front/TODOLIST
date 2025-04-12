// lib/api.ts
const tenantId = "hoxey";
const BASE_URL = `https://assignment-todolist-api.vercel.app/api/${tenantId}`;

export async function addItem(item) {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });

  return res.json();
}

export async function getItemList() {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
}

export async function getItem(itemId) {
  const res = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
}

export async function updateItem(itemId, isCompleted) {
  const item = await getItem(itemId);
  const res = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "name": item.name || "",
      "memo": item.memo || "",
      "imageUrl": item.imageUrl || "",
      "isCompleted": isCompleted
    }),
  });

  return res.json();
}

export async function deleteItem(itemId) {
    const res = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "새 아이템", desc: "설명" }),
  });

  return res.json();
}

export async function addImage() {
    const res = await fetch(`${BASE_URL}/images/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "새 아이템", desc: "설명" }),
  });

  return res.json();
}
