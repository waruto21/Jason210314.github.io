/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "2018/11/08/csapp-problems/index.html",
    "revision": "ab17e9eb77fc5b9cd18457e605b5d52b"
  },
  {
    "url": "2018/11/10/ds-maze/index.html",
    "revision": "480b11e91b25fc9235cd2ff2e02146f4"
  },
  {
    "url": "2018/12/01/csapp-bomb-lab/index.html",
    "revision": "84a3db5280ada071b173844a40cffee3"
  },
  {
    "url": "2018/12/01/ds-bm/index.html",
    "revision": "f064580b4fbf585bc5dabf6eab7785b5"
  },
  {
    "url": "2018/12/08/csapp-attack-lab/index.html",
    "revision": "08109b940691b37546e9de7bd8be4483"
  },
  {
    "url": "2018/12/09/python-dataclean/index.html",
    "revision": "2739d90ae64de97d28fe0a1a8d3dbc04"
  },
  {
    "url": "2019/02/01/ubuntu-install-tf-gpu/index.html",
    "revision": "f1edfb06f950d422682cb288a1ec07b8"
  },
  {
    "url": "2020/04/18/_2020-bytedance-backend-intern/index.html",
    "revision": "169af41113481b3b89609beae24ad260"
  },
  {
    "url": "2020/06/19/github-actions-introduction/index.html",
    "revision": "5a8270d9f803920d14f415efb572328d"
  },
  {
    "url": "2020/08/21/linux-clash-proxy/index.html",
    "revision": "ca9ced52b1d0f1cf44eb24410eaf6fae"
  },
  {
    "url": "2020/10/29/cmake-tutorial/index.html",
    "revision": "0d3cc65392c3e37f5324bcb0ce57f903"
  },
  {
    "url": "2021/01/30/rust-smartpointer-cow/index.html",
    "revision": "021675f51135c6154a75c8c5c31cac5e"
  },
  {
    "url": "2021/02/11/goodbyte-2020/index.html",
    "revision": "6b580cb7041f6e9799e03c3f511605bd"
  },
  {
    "url": "2021/02/22/_6-s081-lab3-page-tables/index.html",
    "revision": "03468faebfcded025d0416d270a5f7b7"
  },
  {
    "url": "2021/02/25/_6-s081-lab4-traps/index.html",
    "revision": "58539f7b4f6bd875fb4bc0984f4a6559"
  },
  {
    "url": "2021/02/25/_6-s081-lab5-lazy/index.html",
    "revision": "c21055b281e7dbe97614d2873ca2a645"
  },
  {
    "url": "2021/02/27/_6-s081-lab6-cow/index.html",
    "revision": "3a65fe4f3a5b5c1915d304f3ac8ffe0a"
  },
  {
    "url": "2021/02/28/_6-s081-lab7-thread/index.html",
    "revision": "edb311e7d7f711320fa84b281aa8d856"
  },
  {
    "url": "2021/03/01/_6-s081-lab8-lock/index.html",
    "revision": "553936e89b61253df846ba2a4d4e86d9"
  },
  {
    "url": "2021/03/02/_6-s081-lab9-fs/index.html",
    "revision": "2c2febac56d9925edf3460587690f463"
  },
  {
    "url": "2021/03/03/_6-s081-lab10-mmap/index.html",
    "revision": "8fc392e85c65fe7d9e33ffe714fea1cd"
  },
  {
    "url": "404.html",
    "revision": "9c5f60c1a7ad32cb3634ce7d3146a5c3"
  },
  {
    "url": "about.html",
    "revision": "684a0bfd1e203954299e87250ad01f97"
  },
  {
    "url": "android-icon-144x144.png",
    "revision": "95e169681b0376e1fddbf1aebbe46e41"
  },
  {
    "url": "android-icon-192x192.png",
    "revision": "b4677aca4abb7bbaadbdf5a417841933"
  },
  {
    "url": "android-icon-36x36.png",
    "revision": "923a1231f3758248ee01f4953a3dd8d5"
  },
  {
    "url": "android-icon-48x48.png",
    "revision": "57580606f804f40c90037ad21dac2eca"
  },
  {
    "url": "android-icon-72x72.png",
    "revision": "9f31fe474d4f697e608cc76977c8a141"
  },
  {
    "url": "android-icon-96x96.png",
    "revision": "4ef44d71d3151ab8e8ae627250a2bbbb"
  },
  {
    "url": "apple-icon-114x114.png",
    "revision": "5d6b9a74e323ad18a436f441e6b975e2"
  },
  {
    "url": "apple-icon-120x120.png",
    "revision": "d6a326c673fa820a0fd0de7de67ef9df"
  },
  {
    "url": "apple-icon-144x144.png",
    "revision": "95e169681b0376e1fddbf1aebbe46e41"
  },
  {
    "url": "apple-icon-152x152.png",
    "revision": "52ffe6a81c26272123da2d43b9dc7362"
  },
  {
    "url": "apple-icon-180x180.png",
    "revision": "180da911d1eaf6ce4e08150dc120a489"
  },
  {
    "url": "apple-icon-57x57.png",
    "revision": "ee7309e179733a51dae2be06d39d0ace"
  },
  {
    "url": "apple-icon-60x60.png",
    "revision": "fdf11c409356b6bb38e0b00d456f12a7"
  },
  {
    "url": "apple-icon-72x72.png",
    "revision": "9f31fe474d4f697e608cc76977c8a141"
  },
  {
    "url": "apple-icon-76x76.png",
    "revision": "1cea82e3b49b8068f07e1331680d4b25"
  },
  {
    "url": "apple-icon-precomposed.png",
    "revision": "58d590b7b4b7fbedadea6c7f918e3238"
  },
  {
    "url": "apple-icon.png",
    "revision": "58d590b7b4b7fbedadea6c7f918e3238"
  },
  {
    "url": "assets/css/0.styles.e4481a5a.css",
    "revision": "56030b425ca2cc98b5ed9dff68d885a6"
  },
  {
    "url": "assets/fonts/EJRVQgYoZZY2vCFuvAFbzr-_dSb_nco.9738e026.woff2",
    "revision": "9738e026c7397b4e3b543ae7f1cf4b6c"
  },
  {
    "url": "assets/fonts/EJRVQgYoZZY2vCFuvAFWzr-_dSb_.b450bfca.woff2",
    "revision": "b450bfca16a8beb05580180de7b678f0"
  },
  {
    "url": "assets/img/clash_boot.1c48150e.png",
    "revision": "1c48150ee143241d9cef8d9bad24a3dd"
  },
  {
    "url": "assets/img/driver1.13754a36.png",
    "revision": "13754a36b8963f1ee63a1e3a242bac78"
  },
  {
    "url": "assets/img/google.aec40cb5.png",
    "revision": "aec40cb50a9dbd752538f2d5dd5a1cf7"
  },
  {
    "url": "assets/img/image-20210131002520961.257010e3.png",
    "revision": "257010e372526b08c61301c6194d67dd"
  },
  {
    "url": "assets/img/image-20210211222552783.16ade900.png",
    "revision": "16ade9006b20cdaaa50a4e24d910350b"
  },
  {
    "url": "assets/img/image-20210225005912570.3d518477.png",
    "revision": "3d518477243a8c8170ea933dfd989957"
  },
  {
    "url": "assets/img/image-20210303172730172.ee87e578.png",
    "revision": "ee87e5781bf22b29bdcd09cde48bb071"
  },
  {
    "url": "assets/img/maze-graph.4ab112d2.png",
    "revision": "4ab112d2a05c8338189fa9ab47e48377"
  },
  {
    "url": "assets/img/ohmyzsh.9e3a5fe5.png",
    "revision": "9e3a5fe5ff6e3d27abb4848027695337"
  },
  {
    "url": "assets/img/overview-actions-design.75c78490.png",
    "revision": "75c78490fad62c1dafd72a63225f5eb0"
  },
  {
    "url": "assets/img/ret.536739a9.png",
    "revision": "536739a924500890241f0072a59785af"
  },
  {
    "url": "assets/img/ret.6dcfd0ef.png",
    "revision": "6dcfd0efb5e567eb725bb4649a80f4b9"
  },
  {
    "url": "assets/img/ret1.636be771.png",
    "revision": "636be77127d30dc84a452e106bb3b4c5"
  },
  {
    "url": "assets/img/run1.d57d78b4.png",
    "revision": "d57d78b4cec957aab92a3d73079764bc"
  },
  {
    "url": "assets/img/rust.8823f044.png",
    "revision": "8823f044d834b84eb510f0cae9473450"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/tensor1.320561e0.png",
    "revision": "320561e09b15f1318c03b3ad591751fc"
  },
  {
    "url": "assets/img/wget.c737bea4.png",
    "revision": "c737bea426234d927277774b095b8619"
  },
  {
    "url": "assets/img/yacd.0a40015a.png",
    "revision": "0a40015a492f934149f311b5fc0e3791"
  },
  {
    "url": "assets/js/10.e18bd8c5.js",
    "revision": "e9b9200f8e9ec320437e21128ebc0619"
  },
  {
    "url": "assets/js/11.498448c4.js",
    "revision": "106092a2e7f26806ad82867470829935"
  },
  {
    "url": "assets/js/12.0f0dd10c.js",
    "revision": "633a0bc3952cdc1dbc38d20939dbc259"
  },
  {
    "url": "assets/js/13.a87c0069.js",
    "revision": "0412e17698da35defb0bf64a521f0ce0"
  },
  {
    "url": "assets/js/14.afbf6447.js",
    "revision": "a75751a521d2c7a5b38be8b159642271"
  },
  {
    "url": "assets/js/15.b86d9e93.js",
    "revision": "4984c2103d2c0c94a195b078ff6419e0"
  },
  {
    "url": "assets/js/16.52b245ed.js",
    "revision": "2ae384e9ad34462927825ad344e5c56c"
  },
  {
    "url": "assets/js/17.faacbaf9.js",
    "revision": "f5df9c0e5ff54066c8cadb9e3bf2a626"
  },
  {
    "url": "assets/js/18.f951d5a9.js",
    "revision": "2fb4868e6a743202d17d9c2b844705fc"
  },
  {
    "url": "assets/js/19.7092a738.js",
    "revision": "146ece2ce67708ede2cec77ee91b6cf6"
  },
  {
    "url": "assets/js/20.0fd458e1.js",
    "revision": "77beb64d0ef9eecab17eebae3dc87569"
  },
  {
    "url": "assets/js/21.4ac787da.js",
    "revision": "335e30ae7504e1fa7725507982e7ded6"
  },
  {
    "url": "assets/js/22.5b5a3957.js",
    "revision": "1078019bdc8406b3b938b3514f84b935"
  },
  {
    "url": "assets/js/23.9b3242e5.js",
    "revision": "e364c63cabf1f7c450e680a28a35a4c4"
  },
  {
    "url": "assets/js/24.a40aa949.js",
    "revision": "5ffea85c6a5a6f10bb32152b219d4628"
  },
  {
    "url": "assets/js/25.3f9dadb3.js",
    "revision": "9dc573b323a4226e2101ee1477cb3ec0"
  },
  {
    "url": "assets/js/26.eb9cd1ee.js",
    "revision": "35774b53c808488677e1fd1fd8b0166f"
  },
  {
    "url": "assets/js/27.275f6832.js",
    "revision": "f3ef470d86df61bf4bd09c0b98bb732b"
  },
  {
    "url": "assets/js/28.71b35aa4.js",
    "revision": "9bf83e569def96c8aa0de5e40747d346"
  },
  {
    "url": "assets/js/29.b9ffaa0b.js",
    "revision": "ac4a6dd6b5f5f6769996339bf7217222"
  },
  {
    "url": "assets/js/3.c84470d0.js",
    "revision": "97a9268f70690f99b8b048f2e6600bcc"
  },
  {
    "url": "assets/js/30.54e16abb.js",
    "revision": "c6e90f48dd365d802514b285e96dd426"
  },
  {
    "url": "assets/js/31.9db5ebb5.js",
    "revision": "1e25bf77584586074c15ccc5b61a6894"
  },
  {
    "url": "assets/js/32.e5a269f3.js",
    "revision": "58e33e21d9b6853a1cad405c9e5eec45"
  },
  {
    "url": "assets/js/33.0679b9b3.js",
    "revision": "8b01d49b2130111d9f87043ff0f72722"
  },
  {
    "url": "assets/js/34.a1e50b9e.js",
    "revision": "b8ec087fa258ede8b3a5c876f5e967a1"
  },
  {
    "url": "assets/js/35.f01dc698.js",
    "revision": "5da53115c77108ba23384fbfe74bee56"
  },
  {
    "url": "assets/js/36.1bc73bfd.js",
    "revision": "e943e8d30eefa8281f1a0012f7bf376d"
  },
  {
    "url": "assets/js/37.e830eb7f.js",
    "revision": "a08a90df07e77b8171b12fb7c32fe38a"
  },
  {
    "url": "assets/js/4.3e7a94b3.js",
    "revision": "38900a52919b902ab04bf87aa0ebe25c"
  },
  {
    "url": "assets/js/5.1f9243d7.js",
    "revision": "330ca6ea3bdcc77725331d704505cc61"
  },
  {
    "url": "assets/js/6.248ff0f4.js",
    "revision": "3f4e6f5ccc17177e787a1559c6f6c81d"
  },
  {
    "url": "assets/js/7.70700ebc.js",
    "revision": "9dd0298de7b1c9ea33527c0f46c5bf8b"
  },
  {
    "url": "assets/js/8.fc8d5d07.js",
    "revision": "1399708aea0f572978739753231bfab2"
  },
  {
    "url": "assets/js/9.52f1af14.js",
    "revision": "38dbd7031b7bfd45ab3c614ae75b92a6"
  },
  {
    "url": "assets/js/app.c936c517.js",
    "revision": "a96df904aff221c98af266f7dacc1a5b"
  },
  {
    "url": "assets/js/vuejs-paginate.9b3f7e90.js",
    "revision": "18879d0520e41920a8a323041527c546"
  },
  {
    "url": "essay/index.html",
    "revision": "2ae746965e25d4cb1cf56723fd8e5294"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "3b9743e89edffa87ee1c096f24073328"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "9378b8fcc25464a8760ff6ba5e0e85d2"
  },
  {
    "url": "favicon-96x96.png",
    "revision": "4ef44d71d3151ab8e8ae627250a2bbbb"
  },
  {
    "url": "index.html",
    "revision": "8b1e860c1f60e50262bf7e2c46ee1901"
  },
  {
    "url": "logo.jpeg",
    "revision": "fb1feb928471fca314e39cd54fd89e62"
  },
  {
    "url": "ms-icon-144x144.png",
    "revision": "95e169681b0376e1fddbf1aebbe46e41"
  },
  {
    "url": "ms-icon-150x150.png",
    "revision": "41188ba53d404b4833e836a372efa047"
  },
  {
    "url": "ms-icon-310x310.png",
    "revision": "8edb3550309dd6907d01e309e27a6446"
  },
  {
    "url": "ms-icon-70x70.png",
    "revision": "d025f390d01a056a3cb6d3388de089b6"
  },
  {
    "url": "tag/6.S081/index.html",
    "revision": "58ef681965f12fb1aae044eff6bcf202"
  },
  {
    "url": "tag/6.S081/page/2/index.html",
    "revision": "2a24ac941b94823985b2b3362012d1f2"
  },
  {
    "url": "tag/CI/CD/index.html",
    "revision": "dea48ef54a8d6226125010d9ef34dff4"
  },
  {
    "url": "tag/clash/index.html",
    "revision": "71f93808e156b332d4aebc33afab915e"
  },
  {
    "url": "tag/CMake/index.html",
    "revision": "ffae81f758277106c4e90c26f4068186"
  },
  {
    "url": "tag/cow/index.html",
    "revision": "d0d30817cfdd35b415a5c1638079e48a"
  },
  {
    "url": "tag/CS:APP/index.html",
    "revision": "da3a3d48ef275210f794799121d26ffd"
  },
  {
    "url": "tag/file system/index.html",
    "revision": "1aaf2ebf17c1a011dde77e6b1526d372"
  },
  {
    "url": "tag/gitpages/index.html",
    "revision": "418a7c406ce9b6bc4ddf214c2b330009"
  },
  {
    "url": "tag/index.html",
    "revision": "809f5881d35d3483aa8dbb870fcd4d54"
  },
  {
    "url": "tag/Java/index.html",
    "revision": "2118480b8922b31beba8f1451a5f44cb"
  },
  {
    "url": "tag/lazy allocation/index.html",
    "revision": "bb5e4ff5795edd25f0adfca73aa88d48"
  },
  {
    "url": "tag/lock/index.html",
    "revision": "b7f1ede4d99d69b477053315e3252c41"
  },
  {
    "url": "tag/mmap/index.html",
    "revision": "59a1c61e80bca61734cd12bc36032235"
  },
  {
    "url": "tag/Multithreading/index.html",
    "revision": "597bdab843c229b6c20cc878d9bfe4f3"
  },
  {
    "url": "tag/page table/index.html",
    "revision": "ca80414f046fb3da90f970c41f60d674"
  },
  {
    "url": "tag/rust/index.html",
    "revision": "58b11e5da70b148a8523d78152e6f7f8"
  },
  {
    "url": "tag/tensorflow-gpu/index.html",
    "revision": "67064f9e94e08bb1b9d7bb5fbaac2612"
  },
  {
    "url": "tag/traps/index.html",
    "revision": "8096468a6ee3592ede479b90646c641d"
  },
  {
    "url": "tag/XML/index.html",
    "revision": "b496a044b0f2ea9d8febcbcfffcaa0a4"
  },
  {
    "url": "tag/串匹配/index.html",
    "revision": "a2a5e91281260f4aee5034e11605b0bb"
  },
  {
    "url": "tag/二进制炸弹/index.html",
    "revision": "97191c81d2db832a5b5398ec0bacda07"
  },
  {
    "url": "tag/代理/index.html",
    "revision": "bf9cb204d2137aa9faf81e97bca0e558"
  },
  {
    "url": "tag/后端/index.html",
    "revision": "de89e0ea5da3a517a2301ef57f6fd5cb"
  },
  {
    "url": "tag/数据清洗/index.html",
    "revision": "14cf44384f258c9c570016f507660e1c"
  },
  {
    "url": "tag/数据结构/index.html",
    "revision": "e32e05fb701e4fdfff81e31c6b906dc8"
  },
  {
    "url": "tag/新年/index.html",
    "revision": "fbf18e68b56bce52fa3d8e04cc738616"
  },
  {
    "url": "tag/智能指针/index.html",
    "revision": "5064c9dc8d26cb0947731c4f573ac079"
  },
  {
    "url": "tag/汇编/index.html",
    "revision": "2f1668e517c37e1c4010d2506ba5d0d3"
  },
  {
    "url": "tag/迷宫问题/index.html",
    "revision": "f5b120a4adb7d3da15b28c5987ebaf24"
  },
  {
    "url": "tag/面经/index.html",
    "revision": "e8784e87c4856ac11227e181e270db1e"
  },
  {
    "url": "tech/index.html",
    "revision": "59d188ce57ff8d6a2404fe496afc8291"
  },
  {
    "url": "tech/page/2/index.html",
    "revision": "7d4e4d6f52fb3970c10cf1ee950508c3"
  },
  {
    "url": "tech/page/3/index.html",
    "revision": "a375ef20c467996ce1411a79e397eb1c"
  },
  {
    "url": "tech/page/4/index.html",
    "revision": "610164f90ed160cbbd294863ab6ff152"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
