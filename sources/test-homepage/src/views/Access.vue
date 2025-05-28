<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">アクセス</h1>
    <p class="text-gray-700">当カフェへのアクセス情報をご案内します。</p>
    <!-- 所在地 -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-2 text-gray-700 padding-locate">所在地</h2>
      <p class="text-gray-600">
        〒330-0854 埼玉県さいたま市大宮区桜木町1丁目10-16 エクアス大宮
      </p>
    </section>

    <!-- Googleマップ埋め込み -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-2 text-gray-700">地図</h2>
      <div class="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
        <iframe
          class="absolute top-0 left-0 w-full h-full border-0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3231.6199719106007!2d139.606956975098!3d35.90732211752221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018c157fe0ff557%3A0xc4296b35ac301edf!2z44CSMzMwLTA4NTEg5Z-8546J55yM44GV44GE44Gf44G-5biC5aSn5a6u5Yy65qub5byV55S677yR5LiB55uu77yR77yS77yT4oiS77yTIO-8pe-8se-8te-8oe-8syDvvK_vvK3vvKnvvLnvvKE!5e0!3m2!1sja!2sjp!4v1748475011566!5m2!1sja!2sjp"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>

    <!-- アクセス方法 -->
    <section>
      <h2 class="text-xl font-semibold mb-2 text-gray-700">アクセス方法</h2>
      <ul class="list-disc pl-5 space-y-2 text-gray-600">
        <li>JR大宮駅 西口より徒歩 約5分</li>
        <li>大宮駅からタクシーで約2分</li>
        <li>首都高速埼玉大宮線「与野出入口」から車で約10分</li>
        <li>近隣にコインパーキングあり</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>

.padding-locate {
  padding-top: 1rem; /* Tailwindのpl-4に相当 */
}

</style>
  