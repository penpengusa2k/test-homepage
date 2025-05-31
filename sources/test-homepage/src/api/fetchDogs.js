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
  // 日付を「YYYY年M月D日」形式にフォーマットするヘルパー関数
  // 値がない場合や不正な日付の場合は'不明'を返す
  const formatDate = (dateString) => {
    if (!dateString) {
      return '不明';
    }
    const date = new Date(dateString);
    // Dateオブジェクトが不正な日付（例: 無効な日付文字列）を示す場合は'不明'を返す
    if (isNaN(date.getTime())) {
      return '不明';
    }
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return {
    id: dogData.id,
    name: dogData.name,
    images: dogData.images,
    breed: dogData.breed,
    notes: dogData.notes || '特になし',
    gender: dogData.gender[0],
    status: dogData.status[0],
    weight: `${dogData.weight} kg`,
    character: dogData.character,
    health: dogData.health,
    rescueDate: formatDate(dogData.rescueDate), // ★修正: formatDogData内で変換
    birthday: formatDate(dogData.birthday),     // ★修正: formatDogData内で変換
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