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
    "revision": "d61c7ddeeb30730bb442dcfea74bcb40"
  },
  {
    "url": "2018/11/10/数据结构迷宫问题/index.html",
    "revision": "6d8f0771852fe2a6fb57310a4040ddcd"
  },
  {
    "url": "2018/12/01/csapp-bomb-lab/index.html",
    "revision": "25baa8050648d8065f0566d9a719932f"
  },
  {
    "url": "2018/12/01/数据结构bm算法/index.html",
    "revision": "7b5e782b5499ffffe203707641f4ada9"
  },
  {
    "url": "2018/12/08/csapp-attack-lab/index.html",
    "revision": "d37178315941d3ab641b423cb745ffe0"
  },
  {
    "url": "2018/12/09/python-elementtree数据清洗/index.html",
    "revision": "d593ba98bd526a22ae52b776bc91b15f"
  },
  {
    "url": "2019/02/01/ubuntu安装tf-gpu/index.html",
    "revision": "0e59ceb7613b8e83d0439d3bc9297713"
  },
  {
    "url": "2020/04/18/_20年春招字节跳动后端开发实习面试/index.html",
    "revision": "3c157ee547bc854f97457b260187bbd6"
  },
  {
    "url": "2020/06/19/github-actions简介/index.html",
    "revision": "966c2ca23b5b9624ee0cf000d6a8cca3"
  },
  {
    "url": "2020/08/21/linux使用clash代理/index.html",
    "revision": "2558bea5fffc3936b30a97cd675dbdd6"
  },
  {
    "url": "2020/10/29/cmake-tutorial/index.html",
    "revision": "2f9c182fffd74a5d9f46b7d1a86c6926"
  },
  {
    "url": "2021/01/30/rust智能指针cow/index.html",
    "revision": "6dae28d4e250a97e490af9c6e03ba12e"
  },
  {
    "url": "2021/02/11/告别2020庚子鼠年/index.html",
    "revision": "3034f8f7eb79c2d04e4f7d93d06e46d1"
  },
  {
    "url": "2021/02/22/_6-s081-lab3-page-tables/index.html",
    "revision": "b74d20fb460731340300e98d117d41de"
  },
  {
    "url": "2021/02/25/_6-s081-lab4-traps/index.html",
    "revision": "8f17d1a223ecb54a1a91d1d5df8abec5"
  },
  {
    "url": "2021/02/25/_6-s081-lab5-lazy/index.html",
    "revision": "0b8502168df52856ee98a69cba799d3d"
  },
  {
    "url": "2021/02/27/_6-s081-lab6-cow/index.html",
    "revision": "b861c76303ac9b8bb381d1e3b37436cb"
  },
  {
    "url": "2021/02/28/_6-s081-lab7-thread/index.html",
    "revision": "707f59729d9fdeba457888d33d55d606"
  },
  {
    "url": "2021/03/01/_6-s081-lab8-lock/index.html",
    "revision": "a94b6e53a8ea71a732b67e931f9bfa06"
  },
  {
    "url": "2021/03/02/_6-s081-lab9-fs/index.html",
    "revision": "759cebbd8e0812ee73cb56245164689e"
  },
  {
    "url": "2021/03/03/_6-s081-lab10-mmap/index.html",
    "revision": "f36126cf9c7ed35d3a23c41edd6ab9ce"
  },
  {
    "url": "404.html",
    "revision": "cba29e666b901c2d8f16f3379837cf7c"
  },
  {
    "url": "about.html",
    "revision": "5997e8eeb85c689bb83cf58e59cbe5ce"
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
    "url": "assets/js/33.ba689688.js",
    "revision": "6cc161e5f4bfb9e5d8aab63a1d5815b0"
  },
  {
    "url": "assets/js/34.55f32c39.js",
    "revision": "eb7c5d47ea819ad11dcbce992f5819c0"
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
    "url": "assets/js/app.acf8092b.js",
    "revision": "72426606916bb8e28938a8cff7ae02a3"
  },
  {
    "url": "assets/js/vuejs-paginate.dfe54976.js",
    "revision": "e3ed1c74b2335d06b9fa703336f0edf5"
  },
  {
    "url": "blog/index.html",
    "revision": "678b511a310f5c73ad260a29b3d38971"
  },
  {
    "url": "blog/page/2/index.html",
    "revision": "de875cba2b4df7d99bc62d7c61739448"
  },
  {
    "url": "blog/page/3/index.html",
    "revision": "40e9a0c7fd626f001f08d45ab9f574ac"
  },
  {
    "url": "blog/page/4/index.html",
    "revision": "648de6fc1d64a67386ccca7028af1265"
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
    "revision": "c5631de478f3c338d3161a74fb35d5d1"
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
    "revision": "903f8686ad25e3ff06a5537d9bc05d4b"
  },
  {
    "url": "tag/6.S081/page/2/index.html",
    "revision": "0cc81f4dce3069f6489089881f3165d7"
  },
  {
    "url": "tag/CI/CD/index.html",
    "revision": "85edb72dd53e19428317a42e882fb23e"
  },
  {
    "url": "tag/clash/index.html",
    "revision": "5196d35dc219c6e48bc1ac8d34ff8653"
  },
  {
    "url": "tag/CMake/index.html",
    "revision": "a32f4593b44d02f5003a3eddd6e922fa"
  },
  {
    "url": "tag/cow/index.html",
    "revision": "44ae4775fc6942d38d2ff0d19e60cc10"
  },
  {
    "url": "tag/CS:APP/index.html",
    "revision": "0b358cda23c0f745da6bf479ec4ce280"
  },
  {
    "url": "tag/file system/index.html",
    "revision": "db69e986d51ed93c361c8a896a5a641d"
  },
  {
    "url": "tag/gitpages/index.html",
    "revision": "27684c8c2b0d99dbc06a4d89e7fa8b55"
  },
  {
    "url": "tag/index.html",
    "revision": "e3817a6e29ca1321ba5c3f514d98def1"
  },
  {
    "url": "tag/Java/index.html",
    "revision": "835668ef88680787d3ca3cf20cdb0436"
  },
  {
    "url": "tag/lazy allocation/index.html",
    "revision": "b42669af420a19f3208f24bcacd4ae9e"
  },
  {
    "url": "tag/lock/index.html",
    "revision": "a36cbfc8a3136df3749efc72b0f57e20"
  },
  {
    "url": "tag/mmap/index.html",
    "revision": "87d78451daf8e73e711264af519c9993"
  },
  {
    "url": "tag/Multithreading/index.html",
    "revision": "f41942bd01a3b7305c5f88f4f2daa740"
  },
  {
    "url": "tag/page table/index.html",
    "revision": "d4aafb8d51d46297b86f84b06c20d13e"
  },
  {
    "url": "tag/rust/index.html",
    "revision": "5b298cd3e96fd8c0d10685aff47def7b"
  },
  {
    "url": "tag/tensorflow-gpu/index.html",
    "revision": "39d9188b01832e6cfd265c5480ed9b0a"
  },
  {
    "url": "tag/traps/index.html",
    "revision": "d6dc040a5ca9b6231c9ca120a42bb33f"
  },
  {
    "url": "tag/XML/index.html",
    "revision": "c7b27d1af5d73c79f270b9e6a7db34d4"
  },
  {
    "url": "tag/串匹配/index.html",
    "revision": "1bedc6c939006807ff1d52d592f90927"
  },
  {
    "url": "tag/二进制炸弹/index.html",
    "revision": "91f3df3e6036837ae6e56e66e6914fc4"
  },
  {
    "url": "tag/代理/index.html",
    "revision": "558fa853bc636feb5938282b445eaf3a"
  },
  {
    "url": "tag/后端/index.html",
    "revision": "40883f1a588a6e89db02b979a7900d95"
  },
  {
    "url": "tag/数据清洗/index.html",
    "revision": "4f04adea700588b5997f4624a181bdc4"
  },
  {
    "url": "tag/数据结构/index.html",
    "revision": "39764b6b89210d0303fb3540d96c68a6"
  },
  {
    "url": "tag/新年/index.html",
    "revision": "656436c2035f00454f68176ee483a84f"
  },
  {
    "url": "tag/智能指针/index.html",
    "revision": "162d4df0076613fc676e2039a9bd97ae"
  },
  {
    "url": "tag/汇编/index.html",
    "revision": "fde1b21ab4cd8373e0e2c65ca1327b9a"
  },
  {
    "url": "tag/迷宫问题/index.html",
    "revision": "ea81d28d2ba281d585c75e2db7cc282a"
  },
  {
    "url": "tag/面经/index.html",
    "revision": "75d2a8da84ed2d1110c0e93bfc6efa49"
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
