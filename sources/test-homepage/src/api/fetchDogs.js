import axios from 'axios';

// 環境変数からAPIキーとドメインを取得
const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;
const domain = import.meta.env.VITE_MICROCMS_DOMAIN;

// MicroCMS APIのベースURLと共通ヘッダーを持つAxiosインスタンスを作成
const microcmsClient = axios.create({
  baseURL: `https://${domain}.microcms.io/api/v1`,
  headers: {
    'X-MICROCMS-API-KEY': apiKey,
  },
});

/**
 * MicroCMSから取得した犬の生データを、アプリケーションで使用する形式に整形する
 * @param {object} dogData - MicroCMSから返された生の犬データオブジェクト
 * @returns {object} - 整形された犬データオブジェクト
 */
function formatDogData(dogData) {
  return {
    id: dogData.id,
    name: dogData.name,
    images: dogData.images || [], // 画像がない場合のデフォルト値
    breed: dogData.breed || '不明', // 犬種がない場合のデフォルト値
    age: dogData.age || null, // 年齢がない場合のデフォルト値
    gender: Array.isArray(dogData.gender) ? dogData.gender[0] : '', // 配列でない場合も考慮
    status: Array.isArray(dogData.status) ? dogData.status[0] : '', // 配列でない場合も考慮
    weight: dogData.weight || null, // 体重がない場合のデフォルト値
    character: dogData.character || '不明', // 性格がない場合のデフォルト値
    health: dogData.health || '不明', // 健康状態がない場合のデフォルト値
    rescueDate: dogData.rescueDate || null, // 保護日がない場合のデフォルト値
    birthday: dogData.birthday || null, // 誕生日がない場合のデフォルト値
    // 必要に応じてnotesなどのフィールドも追加
  };
}

/**
 * 全ての犬のデータを取得する
 * @returns {Promise<Array<object>>} - 整形された犬データオブジェクトの配列
 * @throws {Error} - APIリクエストに失敗した場合
 */
export async function fetchDogs() {
  try {
    const response = await microcmsClient.get('/dogs');
    // `contents`が存在しない場合も考慮
    const dogs = response.data.contents ? response.data.contents.map(formatDogData) : [];
    return dogs;
  } catch (error) {
    console.error('犬データ一覧の取得に失敗しました:', error);
    // エラーを再スローするか、適切なエラーハンドリングを行う
    throw new Error('犬データ一覧の取得に失敗しました。');
  }
}

/**
 * 特定のIDを持つ犬のデータを取得する
 * @param {string} id - 取得したい犬のID
 * @returns {Promise<object>} - 整形された犬データオブジェクト
 * @throws {Error} - APIリクエストに失敗した場合、または犬が見つからない場合
 */
export async function fetchDogById(id) {
  try {
    const response = await microcmsClient.get(`/dogs/${id}`);
    return formatDogData(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
      console.warn(`ID: ${id} の犬は見つかりませんでした。`);
      return null; // または適切なエラーをスロー
    }
    console.error(`ID: ${id} の犬データ取得に失敗しました:`, error);
    throw new Error(`ID: ${id} の犬データ取得に失敗しました。`);
  }
}