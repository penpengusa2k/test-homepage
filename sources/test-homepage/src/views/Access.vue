<template>
  <div class="p-6 bg-peach-50 min-h-screen py-10">
    <div class="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-peach-200">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-orange-700 text-center mb-6">
        アクセス
      </h1>
      <p class="text-center text-gray-700 text-lg mb-8">
        INUカフェへのアクセス情報をご案内します。お気軽にお立ち寄りください。
      </p>

      <section class="mb-10">
        <div class="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-xl border border-peach-200">
          <iframe
            class="absolute top-0 left-0 w-full h-full border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2975.563515085786!2d140.7245774254044!3d41.77306772198478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f9ef39f45fd5b59%3A0x503b7ed9a3dfd008!2z5Ye96aSo6aeF!5e0!3m2!1sja!2sjp!4v1748655063079!5m2!1sja!2sjp" 
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <section class="mb-10">
        <h2 class="text-2xl font-bold mb-4 text-orange-600 flex items-center">
          <span class="material-icons text-3xl mr-2 text-orange-500">location_on</span>
          所在地
        </h2>
        <p class="text-gray-700 text-lg pl-10 leading-relaxed">
          〒XXX-YYYY ZZZZZZZ
        </p>
      </section>

      <section>
        <h2 class="text-2xl font-bold mb-4 text-orange-600 flex items-center">
          <span class="material-icons text-3xl mr-2 text-orange-500">directions_walk</span>
          アクセス方法
        </h2>
        <ul class="list-none pl-0 space-y-3 text-gray-700 text-lg">
          <li class="flex items-center">
            <span class="material-icons text-orange-500 text-2xl mr-3">train</span>
            犬に跨れば 約5分
          </li>
          <li class="flex items-center">
            <span class="material-icons text-orange-500 text-2xl mr-3">local_taxi</span>
            タクシーで約2分
          </li>
          <li class="flex items-center">
            <span class="material-icons text-orange-500 text-2xl mr-3">drive_eta</span>
            車で約10分
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