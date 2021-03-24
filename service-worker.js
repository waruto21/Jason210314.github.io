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
    "url": "2018/11/08/csapp解题记录/index.html",
    "revision": "d7f7ba579cad72fccfe5e0e1295cce2b"
  },
  {
    "url": "2018/11/10/数据结构迷宫问题/index.html",
    "revision": "515463cc12dbde1faaf99be8b1f4036a"
  },
  {
    "url": "2018/12/01/csapp-bomb-lab/index.html",
    "revision": "3fe128cb6c2b60bf22edc6e14e0a5ae5"
  },
  {
    "url": "2018/12/01/数据结构bm算法/index.html",
    "revision": "f3efb8877f2608785c4d36d6c345787e"
  },
  {
    "url": "2018/12/08/csapp-attack-lab/index.html",
    "revision": "139a50bc2f9d1e8c71d7cf6a6c03e29b"
  },
  {
    "url": "2018/12/09/python-elementtree数据清洗/index.html",
    "revision": "d68696908a5b18039119aba23094e26e"
  },
  {
    "url": "2019/02/01/ubuntu安装tf-gpu/index.html",
    "revision": "8f79d5726472ed698eb5645277fe1486"
  },
  {
    "url": "2020/04/18/_20年春招字节跳动后端开发实习面试/index.html",
    "revision": "aeb67e1c942c687e3f9e79df5c336aeb"
  },
  {
    "url": "2020/06/19/github-actions简介/index.html",
    "revision": "2fb42ee07cf1f292cd74074a1d69f72b"
  },
  {
    "url": "2020/08/21/linux使用clash代理/index.html",
    "revision": "ed3ca48b9266da2f137bebd48ba3961c"
  },
  {
    "url": "2020/10/29/cmake-tutorial/index.html",
    "revision": "1d618b6be30bcef254570657abf2924a"
  },
  {
    "url": "2021/01/30/rust智能指针cow/index.html",
    "revision": "c58d707de5ca4212269a6ae12059105c"
  },
  {
    "url": "2021/02/11/告别2020庚子鼠年/index.html",
    "revision": "223df2ebffe70e764913339431a1133f"
  },
  {
    "url": "2021/02/22/_6-s081-lab3-page-tables/index.html",
    "revision": "d73bade70bc66cc46d0ab876eef4365e"
  },
  {
    "url": "2021/02/25/_6-s081-lab4-traps/index.html",
    "revision": "c6e9b0cb580c5dbf90eeb7957c862ed1"
  },
  {
    "url": "2021/02/25/_6-s081-lab5-lazy/index.html",
    "revision": "8671d36b930ecb233f914afbf960cd43"
  },
  {
    "url": "2021/02/27/_6-s081-lab6-cow/index.html",
    "revision": "f232ec044e6b9a1009339d3c743c8d75"
  },
  {
    "url": "2021/02/28/_6-s081-lab7-thread/index.html",
    "revision": "792d4e3e248e1db13c7bee375eae8bb9"
  },
  {
    "url": "2021/03/01/_6-s081-lab8-lock/index.html",
    "revision": "b41f9ccd3337f7ce451ee2cf962e4cb6"
  },
  {
    "url": "2021/03/02/_6-s081-lab9-fs/index.html",
    "revision": "11a7fc7bc7426f0e980b949e72ca4612"
  },
  {
    "url": "2021/03/03/_6-s081-lab10-mmap/index.html",
    "revision": "a9f6343e6b8f1520fc085d3472fe6321"
  },
  {
    "url": "404.html",
    "revision": "6f0235bbb234ea30a8bea9d3351d7dee"
  },
  {
    "url": "about.html",
    "revision": "ebdb6e6c15bebf9b3075f6d2ed582433"
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
    "url": "assets/img/driver1.13754a36.png",
    "revision": "13754a36b8963f1ee63a1e3a242bac78"
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
    "url": "assets/js/10.e077d793.js",
    "revision": "11f08858c6d264abdd9531755c3c0587"
  },
  {
    "url": "assets/js/11.93b1eff1.js",
    "revision": "4403e7a87306de1f67cfabcd8ef6903e"
  },
  {
    "url": "assets/js/12.165a8f38.js",
    "revision": "cf65b9e6f47864bb14bf4cee16574890"
  },
  {
    "url": "assets/js/13.86b71190.js",
    "revision": "ddd0dc4a707c78aa7349de887616a367"
  },
  {
    "url": "assets/js/14.f7c31146.js",
    "revision": "a071734d73909a7b2b76f35a4cce64a7"
  },
  {
    "url": "assets/js/15.b61267d7.js",
    "revision": "56794b448db5fa476a5e520e105555c9"
  },
  {
    "url": "assets/js/16.e7b2390a.js",
    "revision": "c7fdf8ec1f6d429dbe05cc023d360806"
  },
  {
    "url": "assets/js/17.c6ea5fff.js",
    "revision": "38c232d3f379c0873692168ef3a5b249"
  },
  {
    "url": "assets/js/18.678082c9.js",
    "revision": "5d4a1e7b9cb54a24681e3aa037acebc0"
  },
  {
    "url": "assets/js/19.21a8a34e.js",
    "revision": "5ecca5bdb51097f19ec4c08839046a96"
  },
  {
    "url": "assets/js/20.9edcae00.js",
    "revision": "8c5d0885e2a0d78a089bf0c45bccc423"
  },
  {
    "url": "assets/js/21.f0f9d500.js",
    "revision": "59f06726f29b360689d3163349e73409"
  },
  {
    "url": "assets/js/22.b54c9990.js",
    "revision": "ad8d0c310d615530efc95eeb320dbaa2"
  },
  {
    "url": "assets/js/23.53b24cbf.js",
    "revision": "5b63ef29361378d007dc7ae4105be9e8"
  },
  {
    "url": "assets/js/24.659f2811.js",
    "revision": "f4ee072de76679861ee8135b3858378f"
  },
  {
    "url": "assets/js/25.d1cafbf8.js",
    "revision": "f3576ef2ebdee68b89d59758e9809d70"
  },
  {
    "url": "assets/js/26.b17873ae.js",
    "revision": "a13002ccab9cd7b7d45d55661055e9a0"
  },
  {
    "url": "assets/js/27.2aa200a3.js",
    "revision": "ce5b478f9f1e9e14ae2bebd0f95016cb"
  },
  {
    "url": "assets/js/28.15123e9b.js",
    "revision": "34983fe7af3f4efe11e4e37486549953"
  },
  {
    "url": "assets/js/29.f9430524.js",
    "revision": "30d489a48099dac5ee842c14fbd6b3c1"
  },
  {
    "url": "assets/js/3.e3d55509.js",
    "revision": "8bfda50795a2b1ee7dad74fb35a5f9a8"
  },
  {
    "url": "assets/js/30.ea435c6a.js",
    "revision": "a5832b7021621468e11847cc46243980"
  },
  {
    "url": "assets/js/31.cefe08f6.js",
    "revision": "df576bddde4ab43f0677600f54bd4740"
  },
  {
    "url": "assets/js/32.df4e8226.js",
    "revision": "29a0ac15b6efb0c9c15453bcf3b2759a"
  },
  {
    "url": "assets/js/33.89c22683.js",
    "revision": "cfa3063655ef8a83d4cde8f94bfbfec2"
  },
  {
    "url": "assets/js/34.431af884.js",
    "revision": "c2066dd0779ccc3db9a4486389e5ebea"
  },
  {
    "url": "assets/js/35.5b664f83.js",
    "revision": "ae18e412940cea93ecb30afe897f7be1"
  },
  {
    "url": "assets/js/36.f179d54b.js",
    "revision": "8a9a01099f28e0f3bb6ea696db8d5e46"
  },
  {
    "url": "assets/js/37.11846bd5.js",
    "revision": "65c4aba62bad6c6249393650afaac1e1"
  },
  {
    "url": "assets/js/4.d1c52263.js",
    "revision": "bbb858b70062f135ccace276af4e74cf"
  },
  {
    "url": "assets/js/5.ed205acd.js",
    "revision": "6a942dd0ce6e0afa37913c407da0ec94"
  },
  {
    "url": "assets/js/6.036fc43e.js",
    "revision": "f44696e37338a6b1199712e0a3dcd65d"
  },
  {
    "url": "assets/js/7.43914937.js",
    "revision": "36e96551826f459b1cd67c5039615b75"
  },
  {
    "url": "assets/js/8.21172198.js",
    "revision": "d1374a016f68cffa05e8b55562d906f4"
  },
  {
    "url": "assets/js/9.151ac344.js",
    "revision": "eba829dbbfb95c5ed8ae54ea0371f3b1"
  },
  {
    "url": "assets/js/app.f25a4321.js",
    "revision": "45be4cdf21241c8145199f0fd483c038"
  },
  {
    "url": "assets/js/vuejs-paginate.dfe54976.js",
    "revision": "e3ed1c74b2335d06b9fa703336f0edf5"
  },
  {
    "url": "blog/index.html",
    "revision": "8ff8aef12892a769df61ca7031da3da0"
  },
  {
    "url": "blog/page/2/index.html",
    "revision": "00079614184fc53c5b5e0e617be989fb"
  },
  {
    "url": "blog/page/3/index.html",
    "revision": "94385515d254b25502337d639cfaf85c"
  },
  {
    "url": "blog/page/4/index.html",
    "revision": "cc8042935cbdad94b278864f91078a7c"
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
    "revision": "a91af26fe23faab9dd2bacbfd3ab009e"
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
    "revision": "3a67c0af712a2289396f3b1e8f44ca38"
  },
  {
    "url": "tag/6.S081/page/2/index.html",
    "revision": "db1b2d3b92f8646e344abb22dd6471e0"
  },
  {
    "url": "tag/CI/CD/index.html",
    "revision": "5d9316ca65f78648cae01e2dc8d59105"
  },
  {
    "url": "tag/clash/index.html",
    "revision": "da77de6638356b11d8e6ba88e44521f3"
  },
  {
    "url": "tag/CMake/index.html",
    "revision": "bc17b592694016abc4f49353e17c39ba"
  },
  {
    "url": "tag/cow/index.html",
    "revision": "0078695a828bb6e72facf428698b7009"
  },
  {
    "url": "tag/CS:APP/index.html",
    "revision": "b83e3d477047c6d409827acebdee37fc"
  },
  {
    "url": "tag/file system/index.html",
    "revision": "011083bc7001ab2d7b94e9ca1092ee11"
  },
  {
    "url": "tag/gitpages/index.html",
    "revision": "5a3f50859b96028396a7129873f24997"
  },
  {
    "url": "tag/index.html",
    "revision": "a5aaecc096faafe414f218ecc42f44e7"
  },
  {
    "url": "tag/Java/index.html",
    "revision": "65b470a1819d94627220265d72f999d8"
  },
  {
    "url": "tag/lazy allocation/index.html",
    "revision": "40273c8e62e266cbf23d7950caf92cb6"
  },
  {
    "url": "tag/lock/index.html",
    "revision": "63e049bd24f8cc2adc5d9cfc6ceddd6f"
  },
  {
    "url": "tag/mmap/index.html",
    "revision": "3ad74a9de4f34912b2d18ff4269b8049"
  },
  {
    "url": "tag/Multithreading/index.html",
    "revision": "73d0b9c9546952000aab7ab8d43472a0"
  },
  {
    "url": "tag/page table/index.html",
    "revision": "907b2bcfd56d6804bdaab60f3ecfd8e4"
  },
  {
    "url": "tag/rust/index.html",
    "revision": "6c5a82795d24eb00838b8be75d78d8e8"
  },
  {
    "url": "tag/tensorflow-gpu/index.html",
    "revision": "3aabd4772b86d0eb711f74a950c263e9"
  },
  {
    "url": "tag/traps/index.html",
    "revision": "10d9787aa136b977e35ae74c499f2805"
  },
  {
    "url": "tag/XML/index.html",
    "revision": "3b64bd7346248e9604a7d039b7fba5ca"
  },
  {
    "url": "tag/串匹配/index.html",
    "revision": "e7cac04b41cb9554d7577b805ff7ac18"
  },
  {
    "url": "tag/二进制炸弹/index.html",
    "revision": "afff1629b69346bc5d178b4c3d631f6f"
  },
  {
    "url": "tag/代理/index.html",
    "revision": "ce2667353651e11a55b80c8169a7c1b2"
  },
  {
    "url": "tag/后端/index.html",
    "revision": "6fbb2bc1b7ea871b210395e2fda024c8"
  },
  {
    "url": "tag/数据清洗/index.html",
    "revision": "7335df46ffa0f3fcf99bc2cf49ac9c5a"
  },
  {
    "url": "tag/数据结构/index.html",
    "revision": "58f5d126394581f8bca7d7dcafc84418"
  },
  {
    "url": "tag/新年/index.html",
    "revision": "572a6ff576fe0a12d4f23e39ea1806cb"
  },
  {
    "url": "tag/智能指针/index.html",
    "revision": "42d72a9c89c18c725e43fac34e97769b"
  },
  {
    "url": "tag/汇编/index.html",
    "revision": "54c28b07d0bf38c981d86ae0cfeba187"
  },
  {
    "url": "tag/迷宫问题/index.html",
    "revision": "7f6d4069e9fb98157de50ffe958ad2d1"
  },
  {
    "url": "tag/面经/index.html",
    "revision": "dcd2c611e4cfc8568bb0750fcd5acc5b"
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
