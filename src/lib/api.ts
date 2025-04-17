// lib/api.ts
const tenantId = 'hoxey';
const BASE_URL = `https://assignment-todolist-api.vercel.app/api/${tenantId}`;

export interface Item {
  id?: string;
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
}

export interface ImageResponse {
  url: string;
}

// ✅ Swagger API 주소를 사용하여 함수 생성

// ✅ 할 일 추가 기능
export async function addItem(item: Item): Promise<Item> {
  const res = await fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });

  return res.json();
}

// ✅ 할 일 목록 가져오기 기능
export async function getItemList(): Promise<Item[]> {
  const res = await fetch(`${BASE_URL}/items`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  return res.json();
}

// ✅ 한개의 할 일 가져오기 기능 (상세페이지용)
export async function getItem(itemId: string): Promise<Item> {
  const res = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  return res.json();
}

// ✅ 할 일 목록 업데이트 기능
export async function updateListItem(itemId: string, isCompleted: boolean): Promise<Item> {
  const item = await getItem(itemId);
  const res = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: item.name || '',
      memo: item.memo || '',
      imageUrl: item.imageUrl || '',
      isCompleted: isCompleted,
    }),
  });

  return res.json();
}

// ✅ 할 일 상세정보 업데이트 기능
export async function updateDetailItem(
  itemId: string,
  name: string | '',
  memo: string,
  imageUrl: string | '',
  isCompleted: boolean
): Promise<Item> {
  console.log('updateDetailItem', itemId, name, memo, imageUrl, isCompleted);
  const res = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name || '',
      memo: memo || '',
      imageUrl: imageUrl || '',
      isCompleted: isCompleted,
    }),
  });

  return res.json();
}

// ✅ 할 일 삭제 기능
export async function deleteItem(itemId: string): Promise<{ success: boolean }> {
  const res = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: '새 아이템', desc: '설명' }),
  });

  return res.json();
}

// ✅ 이미지 업로드용 (상세페이지 이미지) / 주소를  return함
export async function addImage(image: File): Promise<{ success: string }> {
  const formData = new FormData();
  formData.append('image', image);
  const res = await fetch(`${BASE_URL}/images/upload`, {
    method: 'POST',
    // headers: { 'Content-Type': 'application/json' },
    body: formData,
  });
  const result = await res.json();
  return result;
}
