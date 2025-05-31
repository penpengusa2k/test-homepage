<template>
  <div class="p-6 bg-peach-50 min-h-screen py-10">
    <div class="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-peach-200">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-orange-700 text-center mb-6">
        アクセス
      </h1>
      <p class="text-center text-gray-700 text-lg mb-8">
        里親カフェへのアクセス情報をご案内します。お気軽にお立ち寄りください。
      </p>

      <section class="mb-10">
        <h2 class="text-2xl font-bold mb-4 text-orange-600 flex items-center">
          <span class="material-icons text-3xl mr-2 text-orange-500">location_on</span>
          所在地
        </h2>
        <p class="text-gray-700 text-lg pl-10 leading-relaxed">
          〒330-0854 埼玉県さいたま市大宮区桜木町1丁目10-16 エクアス大宮
        </p>
      </section>

      <section class="mb-10">
        <h2 class="text-2xl font-bold mb-4 text-orange-600 flex items-center">
          <span class="material-icons text-3xl mr-2 text-orange-500">map</span>
          地図
        </h2>
        <div class="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-xl border border-peach-200">
          <iframe
            class="absolute top-0 left-0 w-full h-full border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.340024921612!2d139.61523931526365!3d35.90159498014589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDU0JzExLjciTiAxMznCsDM2JzU5LjAiRQ!5e0!3m2!1sen!2sjp!4v1678888888888!5m2!1sen!2sjp" 
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-bold mb-4 text-orange-600 flex items-center">
          <span class="material-icons text-3xl mr-2 text-orange-500">directions_walk</span>
          アクセス方法
        </h2>
        <ul class="list-none pl-0 space-y-3 text-gray-700 text-lg">
          <li class="flex items-center">
            <span class="material-icons text-orange-500 text-2xl mr-3">train</span>
            JR大宮駅 西口より犬に跨れば 約5分
          </li>
          <li class="flex items-center">
            <span class="material-icons text-orange-500 text-2xl mr-3">local_taxi</span>
            大宮駅からタクシーで約2分
          </li>
          <li class="flex items-center">
            <span class="material-icons text-orange-500 text-2xl mr-3">drive_eta</span>
            首都高速埼玉大宮線「与野出入口」から車で約10分
          </li>
          <li class="flex items-center">
            <span class="material-icons text-orange-500 text-2xl mr-3">local_parking</span>
            近隣にコインパーキングあり
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* カスタムスタイルは不要になりました。全てTailwind CSSクラスで表現されています。 */
</style>