<template>
  <div class="bg-gray-50 min-h-screen pt-20 pb-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-peach-100">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-orange-700 text-center mb-6 drop-shadow-md">
          アクセス
        </h1>
        <p class="text-center text-gray-700 text-lg sm:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
          INUカフェへの道順をご案内します。<br class="hidden sm:inline">
          わんちゃんたちがお待ちしております。
        </p>

        <section class="mb-12">
          <div class="relative w-full pb-[65%] sm:pb-[50%] h-0 overflow-hidden rounded-xl shadow-2xl border-4 border-orange-200">
            <iframe
              class="absolute top-0 left-0 w-full h-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.9300305884787!2d139.6385495!3d35.7533036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d30e58f01c3%3A0x6b7b2b6c9b6b7b2b!2s%E5%9F%BC%E7%8E%89%E7%9C%8C%E3%81%95%E3%81%84%E3%81%9F%E3%81%BE%E5%B8%82%E5%A4%A7%E5%AE%AE%E5%8C%BA!5e0!3m2!1sja!2sjp!4v1717145572620!5m2!1sja!2sjp"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        <section class="mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-orange-700 flex items-center">
            <span class="material-icons text-4xl mr-3 text-orange-500">location_on</span>
            所在地
          </h2>
          <p class="text-gray-700 text-lg sm:text-xl pl-12 leading-relaxed">
            〒330-0854 埼玉県さいたま市大宮区桜木町4丁目
          </p>
        </section>

        <section>
          <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-orange-700 flex items-center">
            <span class="material-icons text-4xl mr-3 text-orange-500">directions_walk</span>
            アクセス方法
          </h2>
          <ul class="list-none pl-0 space-y-4 text-gray-700 text-lg sm:text-xl">
            <li class="flex items-center">
              <span class="material-icons text-orange-500 text-3xl mr-4">train</span>
              JR大宮駅 西口より 徒歩約5分
            </li>
            <li class="flex items-center">
              <span class="material-icons text-orange-500 text-3xl mr-4">local_taxi</span>
              タクシーで約2分
            </li>
            <li class="flex items-center">
              <span class="material-icons text-orange-500 text-3xl mr-4">drive_eta</span>
              首都高速埼玉新都心線 さいたま見沼ICより 車で約10分
            </li>
            <li class="flex items-center">
              <span class="material-icons text-orange-500 text-3xl mr-4">local_parking</span>
              近隣にコインパーキング多数あり（提携駐車場はございません）
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* カスタムスタイルは不要になりました。全てTailwind CSSクラスで表現されています。 */
</style>