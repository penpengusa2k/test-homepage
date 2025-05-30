<template>
  <div class="max-w-6xl mx-auto px-4 py-10 bg-peach-50 rounded-lg" v-if="dog">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-extrabold text-orange-700 mb-2">{{ dog.name }}</h1>
      <span
        class="status-badge px-4 py-1.5 rounded-full text-lg font-semibold"
        :class="{
          'bg-green-100 text-green-700': dog.status === '募集中',
          'bg-blue-100 text-blue-700': dog.status === 'トライアル中',
          'bg-gray-200 text-gray-600': dog.status === '譲渡済'
        }"
      >
        {{ dog.status }}
      </span>
    </div>

    <div class="flex flex-col md:flex-row gap-8 items-start">
      <div class="md:w-1/2 w-full">
        <div 
          class="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg border border-peach-200 cursor-zoom-in flex items-center justify-center bg-peach-100"
          @click="openPhotoSwipe(0)"
        >
          <img
            v-if="dog.images && dog.images.length > 0"
            :src="dog.images[0].url"
            :alt="`${dog.name}の画像`"
            class="w-full h-full object-contain"
          />
          <div v-else class="text-gray-500">画像がありません</div>
        </div>
        
        <div class="flex mt-4 gap-2 overflow-x-auto">
          <div 
            v-for="(image, index) in dog.images" 
            :key="index"
            class="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border border-peach-100 hover:border-orange-400 transition-colors duration-200 bg-peach-100 flex items-center justify-center"
            @click="openPhotoSwipe(index)"
          >
            <img 
              :src="image.url" 
              :alt="`${dog.name}の画像 ${index + 1}`" 
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div class="md:w-1/2 w-full mt-6 md:mt-0 bg-white p-6 rounded-2xl shadow-lg border border-peach-200">
        <div class="space-y-4">
          <div
            v-for="(item, index) in details"
            :key="index"
            class="py-3 border-b border-orange-100 last:border-b-0"
          >
            <div>
              <span class="font-bold text-orange-700 text-lg">{{ item.label }}</span><br />
              <span class="text-gray-700 text-base">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full text-center mt-12">
      <template v-if="dog.status === '譲渡済'">
        <div
          class="inline-flex flex-col items-center justify-center bg-gray-200 text-gray-600 py-6 px-8 rounded-full text-2xl font-bold w-full max-w-md mx-auto cursor-not-allowed shadow-md"
        >
          <span class="material-icons text-4xl mb-2">info</span>
          このわんちゃんは新しい家族と幸せに暮らしています
        </div>
      </template>
      <template v-else>
        <router-link
          to="/contact"
          class="inline-flex flex-col sm:flex-row items-center justify-center bg-gradient-to-r from-orange-400 to-peach-500 text-white py-5 px-8 rounded-full hover:bg-orange-500 transition duration-300 ease-in-out text-2xl font-bold w-full max-w-md mx-auto shadow-lg transform hover:scale-105"
        >
          <span class="material-icons text-3xl mr-0 sm:mr-3 mb-2 sm:mb-0">mail</span>
          このわんちゃんについて<br class="sm:hidden" />お問い合わせする
        </router-link>
      </template>
    </div>

    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { fetchDogById } from '@/api/fetchDogs';

// PhotoSwipe のインポート
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/dist/photoswipe.css'; // PhotoSwipe v5 のコアCSS

// Swiper関連のインポートは削除
// import { Swiper, SwiperSlide } from 'swiper/vue';
// import { Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

const route = useRoute();
const dog = ref(null);
// PhotoSwipeの場合、`modalOpen` や `currentIndex` は直接操作しません
// const modalOpen = ref(false);
// const currentIndex = ref(0);

// PhotoSwipe Lightbox インスタンス
let lightbox = null;

// PhotoSwipe を開く関数
async function openPhotoSwipe(index = 0) {
  if (!dog.value || !dog.value.images || dog.value.images.length === 0) {
    console.warn('画像がありません。PhotoSwipeを開けません。');
    return;
  }

  // PhotoSwipeLightBox は基本的にDOM要素のグループから自動でアイテムを検出しますが、
  // JavaScriptでitems配列を渡すこともできます。
  // ここでは、詳細ページなので直接itemsを渡す方式にします。
  const items = dog.value.images.map(img => ({
    src: img.url,
    // w, h はオプションですが、ピンチズームの挙動を良くするために推奨されます。
    // 可能であれば、画像のオリジナルサイズを取得して設定してください。
    // 例: w: img.width, h: img.height
    width: img.width || 0, // もし画像データにwidth, heightがなければ0や適当な値を設定
    height: img.height || 0,
    alt: img.alt || '',
  }));

  // Lightboxのインスタンスがまだなければ初期化
  if (!lightbox) {
    // 適切なターゲット要素は不要。PhotoSwipe v5は自動的に<body>にコンテナを追加
    lightbox = new PhotoSwipeLightbox({
      gallery: '#gallery--dog-detail', // 任意のユニークなID。ただしitemsを直接渡す場合は不要
      children: 'a', // ギャラリー要素内のリンクを検出する場合。今回は不要
      pswpModule: () => import('photoswipe'), // Photoswipe本体を遅延ロード
      dataSource: items, // 直接アイテムデータを渡す
      initialIndex: index, // クリックした画像のインデックスから開始
      preload: [1, 2], // 前後の画像をプリロードする数
      bgOpacity: 0.85, // 背景の透明度
      // その他のオプション (例: クロースボタンのスタイル、ズームアニメーションなど)
    });

    // Lightboxが閉じられたときにクリーンアップ（オプション）
    lightbox.on('destroy', () => {
      // Lightboxのインスタンスを再利用する場合、ここでnullにしない
      // 必要に応じてイベントリスナーなどを解除
    });

    lightbox.init();
  } else {
    // 既存のインスタンスがある場合、データソースと初期インデックスを更新して開く
    // Lightboxのインスタンスを再利用し、dataSourceを更新する方法はv5では直接提供されていません。
    // 通常は、一度閉じられたら新しいインスタンスを作成するか、
    // `initialIndex` だけを更新して`loadAndOpen`を使います。
    // シンプルにするため、ここでは毎回新しいインスタンスを作成する（または単一インスタンスを再初期化）アプローチを取ります。
    // ただし、PhotoSwipe Lightboxのベストプラクティスとしては、ギャラリーがあるなら
    // `gallery`と`children`を定義して自動検出させるのが推奨されます。
    // 今回のように動的なデータソースの場合、`dataSource`を渡し、`initialIndex`で開くのが一般的です。
    // もし既存インスタンスを再利用するなら、`lightbox.loadAndOpen(initialIndex)`のようなメソッドを使うことになりますが、
    // その場合は`dataSource`を毎回設定するのではなく、一度設定したものを共有する必要があります。
    // 一旦、毎回新しいインスタンスを作成するシンプルな方法を採用します。
    // より高度な再利用は、PhotoSwipeのドキュメントを参照してください。

    // 既存のインスタンスを破棄して再作成
    if (lightbox.pswp) { // pswpプロパティはPhotoSwipeコアインスタンス
      lightbox.pswp.destroy();
    }
    lightbox = null; // nullにして次回呼び出し時に再初期化
    await nextTick(); // DOMの更新を待つ
    openPhotoSwipe(index); // 再帰的に呼び出す
    return; // ここで処理を終了
  }
  
  // lightboxをinitした後にopen
  lightbox.loadAndOpen(index);
}


// --- 以下のロジックはPhotoSwipeが自動で処理するため不要になります ---
// function closeModal() { ... }
// function handleKeydown(e) { ... }
// onMounted, onUnmounted からのbodyスクロール制御やkeydownイベントリスナーも不要

onMounted(async () => {
  // PhotoSwipeLightboxのインスタンスはopenPhotoSwipe内で初回のみ作成
  // document.addEventListener('keydown', handleKeydown); // PhotoSwipeがEscキーを処理
  try {
    dog.value = await fetchDogById(route.params.id);
    // 画像の幅と高さを取得する（オプションだが推奨）
    if (dog.value && dog.value.images) {
      const promises = dog.value.images.map(image => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            image.width = img.width;
            image.height = img.height;
            resolve();
          };
          img.onerror = () => {
            console.warn('画像のロードに失敗しました:', image.url);
            image.width = 0; // またはデフォルト値
            image.height = 0; // またはデフォルト値
            resolve();
          };
          img.src = image.url;
        });
      });
      await Promise.all(promises);
    }
  } catch (error) {
    console.error('犬詳細データ取得エラー:', error);
  }
});

onUnmounted(() => {
  // PhotoSwipeLightboxインスタンスがあれば破棄
  if (lightbox) {
    if (lightbox.pswp) { // pswpプロパティはPhotoSwipeコアインスタンス
        lightbox.pswp.destroy();
    }
    lightbox = null;
  }
  // document.removeEventListener('keydown', handleKeydown); // PhotoSwipeがEscキーを処理
  // bodyのoverflowもPhotoSwipeが管理するため、明示的なリセットは不要
});

function formatDate(dateStr) {
  if (!dateStr) return '不明';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '不明';
  return date.toLocaleDateString('ja-JP');
}

const details = computed(() => {
  if (!dog.value) return [];

  const getValueOrDefault = (value, defaultValue = '不明') => {
    return value !== null && value !== undefined && value !== '' ? value : defaultValue;
  };

  const list = [
    { label: '犬種', value: getValueOrDefault(dog.value.breed) },
    { label: '性別', value: getValueOrDefault(dog.value.gender) },
    { label: '誕生日', value: formatDate(dog.value.birthday) },
    { label: '体重', value: dog.value.weight ? `${dog.value.weight} kg` : '不明' },
    { label: '保護日', value: formatDate(dog.value.rescueDate) },
    { label: '健康状態', value: getValueOrDefault(dog.value.health) },
    { label: '性格', value: getValueOrDefault(dog.value.character) },
    { label: '備考', value: getValueOrDefault(dog.value.notes, '特になし') },
  ];

  return list;
});
</script>

<style scoped>
/* ステータスバッジのスタイルはDogCardコンポーネントと共通化しても良いかもしれません */
.status-badge {
  white-space: nowrap;
}

/* PhotoSwipe のデフォルトUIは Photoswipe v5 以降は photoswipe.css に含まれます */
/* 必要に応じてカスタムCSSを追加してUIを調整してください */

/* PhotoSwipeのデフォルトUIを非表示にする例（完全にカスタマイズする場合） */
/* :global(.pswp__button) { display: none !important; } */
/* :global(.pswp__counter) { display: none !important; } */
</style>