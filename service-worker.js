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
    "revision": "706d749cf099f6b3b86b77589c6361e3"
  },
  {
    "url": "2018/11/10/数据结构迷宫问题/index.html",
    "revision": "a3a648b5eecc9358be08b489310b9c76"
  },
  {
    "url": "2018/12/01/csapp-bomb-lab/index.html",
    "revision": "6e2f92c68b5526e7f27f8dbeca8b85f3"
  },
  {
    "url": "2018/12/01/数据结构bm算法/index.html",
    "revision": "898abfcc3dcf9c94273afec616c67b48"
  },
  {
    "url": "2018/12/08/csapp-attack-lab/index.html",
    "revision": "4afd70d2190e8c2df566d7b0af451dc4"
  },
  {
    "url": "2018/12/09/python-elementtree数据清洗/index.html",
    "revision": "cd1d499731a01480108ae2b3a0343047"
  },
  {
    "url": "2019/02/01/ubuntu安装tf-gpu/index.html",
    "revision": "54e36f4345495fbfe53fafff822b2516"
  },
  {
    "url": "2020/04/18/_20年春招字节跳动后端开发实习面试/index.html",
    "revision": "33737b3dc34dee5a880954d793068c82"
  },
  {
    "url": "2020/06/19/github-actions简介/index.html",
    "revision": "ae6ab053a9f29cf21f4bd5a4c76ef831"
  },
  {
    "url": "2020/08/21/linux使用clash代理/index.html",
    "revision": "b761702e3064e78017f33832d7472a99"
  },
  {
    "url": "2020/10/29/cmake-tutorial/index.html",
    "revision": "69477dcc8fea37824a29025e2182e778"
  },
  {
    "url": "2021/01/30/rust智能指针cow/index.html",
    "revision": "0f985714a08ed828e8b07b3bf9ab0cfc"
  },
  {
    "url": "2021/02/11/goodbyte-2020/index.html",
    "revision": "f2eda5397efd550eefdc371b4a34f04d"
  },
  {
    "url": "2021/02/22/_6-s081-lab3-page-tables/index.html",
    "revision": "1567382c01b7a777d2f94ba21ff19c56"
  },
  {
    "url": "2021/02/25/_6-s081-lab4-traps/index.html",
    "revision": "344e76ca04f0f5dae3553e93625fdad1"
  },
  {
    "url": "2021/02/25/_6-s081-lab5-lazy/index.html",
    "revision": "d9d2eed58024e76c08c115630c412915"
  },
  {
    "url": "2021/02/27/_6-s081-lab6-cow/index.html",
    "revision": "1ee2b4baa3fcf9fe2ddb7a1c9161d304"
  },
  {
    "url": "2021/02/28/_6-s081-lab7-thread/index.html",
    "revision": "7dc3af931d4883bb7c949e56f76f7869"
  },
  {
    "url": "2021/03/01/_6-s081-lab8-lock/index.html",
    "revision": "0c6fb483a799b7b99d388241b9e77ca6"
  },
  {
    "url": "2021/03/02/_6-s081-lab9-fs/index.html",
    "revision": "5cd3570c60757376d9d167aa681d5803"
  },
  {
    "url": "2021/03/03/_6-s081-lab10-mmap/index.html",
    "revision": "7ac13ea43279f912847501864ba44f8e"
  },
  {
    "url": "404.html",
    "revision": "93ff080f7f222b2e57d63f62a3aa5f08"
  },
  {
    "url": "about.html",
    "revision": "95e83cac2e285aea946e492aeb3cf5f4"
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
    "url": "assets/js/12.70f661e0.js",
    "revision": "154b0dbecf5d65f916e51bcc6107f31d"
  },
  {
    "url": "assets/js/13.d65c3f2e.js",
    "revision": "ddd0dc4a707c78aa7349de887616a367"
  },
  {
    "url": "assets/js/14.c843da93.js",
    "revision": "40b75a033741b79db6e93dfa156e290d"
  },
  {
    "url": "assets/js/15.53a8cc2c.js",
    "revision": "a1bb5a0700237e081c77f7928f637876"
  },
  {
    "url": "assets/js/16.a53f2a9a.js",
    "revision": "034cad8177cc092fb9200f8d344baaf4"
  },
  {
    "url": "assets/js/17.25310fe8.js",
    "revision": "bdac3246c5c001a6c3f8cb7fe288b743"
  },
  {
    "url": "assets/js/18.11db103f.js",
    "revision": "eaf3df50a12d3f1cf6f7731cfde69a8f"
  },
  {
    "url": "assets/js/19.6dcddce8.js",
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
    "url": "assets/js/24.8ccc75fe.js",
    "revision": "6148809cb227eec5efb094a1bc849d30"
  },
  {
    "url": "assets/js/25.d1cafbf8.js",
    "revision": "f3576ef2ebdee68b89d59758e9809d70"
  },
  {
    "url": "assets/js/26.43dfaf51.js",
    "revision": "fe90b521dc64579dd268a80db317b723"
  },
  {
    "url": "assets/js/27.810edfcd.js",
    "revision": "33df191059d77bf14960e3e7cf61847e"
  },
  {
    "url": "assets/js/28.99270da5.js",
    "revision": "e122c0bd85b06d050bcb5e8c04a86dd2"
  },
  {
    "url": "assets/js/29.bfb66778.js",
    "revision": "a0634046b2148a37bfc391a7980402c6"
  },
  {
    "url": "assets/js/3.8a94293e.js",
    "revision": "a828a8e6ea7c84fb148127541d9615f1"
  },
  {
    "url": "assets/js/30.529c1543.js",
    "revision": "31cf9b43a1696224502d97807944551d"
  },
  {
    "url": "assets/js/31.175faa6a.js",
    "revision": "92b1785e273f052400fa77815cdd2406"
  },
  {
    "url": "assets/js/32.8157eb9a.js",
    "revision": "815e54187da6a538f122ae28d2b75223"
  },
  {
    "url": "assets/js/33.10f78892.js",
    "revision": "6cc161e5f4bfb9e5d8aab63a1d5815b0"
  },
  {
    "url": "assets/js/34.f6bd907a.js",
    "revision": "21a0002a68f3e5df58202f00d79a36ac"
  },
  {
    "url": "assets/js/35.fce0da3a.js",
    "revision": "620e6de964dae93002b1d34e5febf2b8"
  },
  {
    "url": "assets/js/36.d2d453af.js",
    "revision": "9a34ac0b9d7aa8d3487da4a89cc4353a"
  },
  {
    "url": "assets/js/37.11846bd5.js",
    "revision": "65c4aba62bad6c6249393650afaac1e1"
  },
  {
    "url": "assets/js/4.0397dafd.js",
    "revision": "9e106195de8a9e75432065593cad8284"
  },
  {
    "url": "assets/js/5.ed205acd.js",
    "revision": "6a942dd0ce6e0afa37913c407da0ec94"
  },
  {
    "url": "assets/js/6.0bf6d70e.js",
    "revision": "e42820c200f1783220758d59c7ea1f28"
  },
  {
    "url": "assets/js/7.6a5b0d9c.js",
    "revision": "bbabe6dba6a3a24df73b55893cc10d8a"
  },
  {
    "url": "assets/js/8.cab27c3e.js",
    "revision": "13f049d6e6a4322daffe0378a2efdf9a"
  },
  {
    "url": "assets/js/9.151ac344.js",
    "revision": "eba829dbbfb95c5ed8ae54ea0371f3b1"
  },
  {
    "url": "assets/js/app.8e772de0.js",
    "revision": "2f7f854f657d8cf96dc0e55ecf090cc7"
  },
  {
    "url": "assets/js/vuejs-paginate.dfe54976.js",
    "revision": "e3ed1c74b2335d06b9fa703336f0edf5"
  },
  {
    "url": "essay/index.html",
    "revision": "788ea0abdeb72a524e693bb855222206"
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
    "revision": "78b590deb018e3af696d4dc3159636fe"
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
    "revision": "c483769f1f64977c83e1f950c9af66be"
  },
  {
    "url": "tag/6.S081/page/2/index.html",
    "revision": "3d1022cac3ea3a95399eded043467f72"
  },
  {
    "url": "tag/CI/CD/index.html",
    "revision": "0f2c7a4d1e1221491e5d8eeaab419074"
  },
  {
    "url": "tag/clash/index.html",
    "revision": "0a34b1d4b51f64f16b0d4ef0b87a25a7"
  },
  {
    "url": "tag/CMake/index.html",
    "revision": "53aaeb7f17392287c69943b1481a3601"
  },
  {
    "url": "tag/cow/index.html",
    "revision": "6c078bffb62de06c46319f877c0c9d51"
  },
  {
    "url": "tag/CS:APP/index.html",
    "revision": "c7f5f2937f9389ea43b9cc089fc9d3b9"
  },
  {
    "url": "tag/file system/index.html",
    "revision": "fd434166459579cbe28ce880f035a947"
  },
  {
    "url": "tag/gitpages/index.html",
    "revision": "aad307136e3640f0fc424900c3e5504f"
  },
  {
    "url": "tag/index.html",
    "revision": "78f74522fbc965592ebe159cf6c125cc"
  },
  {
    "url": "tag/Java/index.html",
    "revision": "8f5fd6dd47ae2174be57245ba9e8032e"
  },
  {
    "url": "tag/lazy allocation/index.html",
    "revision": "f3d3ea5d6c271c11fd56c5fa5b2b79e6"
  },
  {
    "url": "tag/lock/index.html",
    "revision": "4536d67157a249c0879a50077ababecf"
  },
  {
    "url": "tag/mmap/index.html",
    "revision": "20d593d7176ec8d6da3a02286fe3b48f"
  },
  {
    "url": "tag/Multithreading/index.html",
    "revision": "20caaecd78963951cb27afd3f7ac96e4"
  },
  {
    "url": "tag/page table/index.html",
    "revision": "e820bd9a4159c1fac1869152df60fffa"
  },
  {
    "url": "tag/rust/index.html",
    "revision": "865356e55ea83b56bf980922b718c720"
  },
  {
    "url": "tag/tensorflow-gpu/index.html",
    "revision": "f4b540e5b7ecc6861c81f5eb6f08d348"
  },
  {
    "url": "tag/traps/index.html",
    "revision": "35df08aa62898e61843cb19fb1011a64"
  },
  {
    "url": "tag/XML/index.html",
    "revision": "b7691256b84f8c6b1f4ec924a387f863"
  },
  {
    "url": "tag/串匹配/index.html",
    "revision": "f196f744a8fba997618a5a96ed276b28"
  },
  {
    "url": "tag/二进制炸弹/index.html",
    "revision": "6c0977a43096fb4955722e22c0d016ca"
  },
  {
    "url": "tag/代理/index.html",
    "revision": "52382846189241c188ae71b77cd3ea57"
  },
  {
    "url": "tag/后端/index.html",
    "revision": "a0866f3804133ca4e2e3f65b787c8c01"
  },
  {
    "url": "tag/数据清洗/index.html",
    "revision": "48e6d1b3a10519e7337782227ee74ff8"
  },
  {
    "url": "tag/数据结构/index.html",
    "revision": "8fdebbd1a1f9914e79402a5de0408734"
  },
  {
    "url": "tag/新年/index.html",
    "revision": "72acb3c2f54340c802e3f2074381bbd0"
  },
  {
    "url": "tag/智能指针/index.html",
    "revision": "f39bc5aa538bb1e12b40286873fda81b"
  },
  {
    "url": "tag/汇编/index.html",
    "revision": "7b1179184d1f79de951212bb07a4234e"
  },
  {
    "url": "tag/迷宫问题/index.html",
    "revision": "d25b429a5b0f827089dfd784d179dfbd"
  },
  {
    "url": "tag/面经/index.html",
    "revision": "f8a0a0af613f006b9d58c0e02d793c71"
  },
  {
    "url": "tech/index.html",
    "revision": "580b3a95b2c9141632d59afccff15467"
  },
  {
    "url": "tech/page/2/index.html",
    "revision": "29d1c3128e58818b8c79207d80507571"
  },
  {
    "url": "tech/page/3/index.html",
    "revision": "609bd33db4652933c465da729fa6c31f"
  },
  {
    "url": "tech/page/4/index.html",
    "revision": "101e94ca900a55c49e7ddeea2265420f"
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
