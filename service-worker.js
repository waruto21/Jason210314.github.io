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
    "revision": "6084be6c9d166dd806808b0602db5668"
  },
  {
    "url": "2018/11/10/数据结构迷宫问题/index.html",
    "revision": "4463864dbbdf1e70f1fac5449f69824b"
  },
  {
    "url": "2018/12/01/csapp-bomb-lab/index.html",
    "revision": "63f9cfdc5daa59a704140640c1f32ada"
  },
  {
    "url": "2018/12/01/数据结构bm算法/index.html",
    "revision": "983f0d05badb9bd326418ea6ead37ccf"
  },
  {
    "url": "2018/12/08/csapp-attack-lab/index.html",
    "revision": "f070032b7d43084468629874ac365d6f"
  },
  {
    "url": "2018/12/09/python-elementtree数据清洗/index.html",
    "revision": "651b8bbf0c2de9574bed5bb1b419b377"
  },
  {
    "url": "2019/02/01/ubuntu安装tf-gpu/index.html",
    "revision": "5be0f7e7a99e50553c86c7521fdc1f1d"
  },
  {
    "url": "2020/04/18/_20年春招字节跳动后端开发实习面试/index.html",
    "revision": "44f3098dbe1df75a3c642c0faae15d73"
  },
  {
    "url": "2020/06/19/github-actions简介/index.html",
    "revision": "3e7bc6bee9ae47dd1933311babaeb858"
  },
  {
    "url": "2020/08/21/linux使用clash代理/index.html",
    "revision": "ad4b96b75f30b922c29a490c4d7afa80"
  },
  {
    "url": "2020/10/29/cmake-tutorial/index.html",
    "revision": "1f4c54323b2c16c60c5254c30a8090bf"
  },
  {
    "url": "2021/01/30/rust智能指针cow/index.html",
    "revision": "dd382f13a4d12a066f114e1550b4288f"
  },
  {
    "url": "2021/02/11/goodbyte-2020/index.html",
    "revision": "6955c8e63c0a83479cdf1428a4e8ccaf"
  },
  {
    "url": "2021/02/22/_6-s081-lab3-page-tables/index.html",
    "revision": "5a0240586737d102f96e7bb2f25f73ca"
  },
  {
    "url": "2021/02/25/_6-s081-lab4-traps/index.html",
    "revision": "7bb9ca82b006244ff86dda69509760df"
  },
  {
    "url": "2021/02/25/_6-s081-lab5-lazy/index.html",
    "revision": "b10e2bc5fdbfabf4705ff22c4695c5ea"
  },
  {
    "url": "2021/02/27/_6-s081-lab6-cow/index.html",
    "revision": "f733613d75f6d27fd9f9982882baa5f6"
  },
  {
    "url": "2021/02/28/_6-s081-lab7-thread/index.html",
    "revision": "cfa3b0c092589204cf7aabc3c12ace50"
  },
  {
    "url": "2021/03/01/_6-s081-lab8-lock/index.html",
    "revision": "cca311cc20307fe2f88cea82e3a2fbce"
  },
  {
    "url": "2021/03/02/_6-s081-lab9-fs/index.html",
    "revision": "74350e10c8f3214cf7ad1068b9144888"
  },
  {
    "url": "2021/03/03/_6-s081-lab10-mmap/index.html",
    "revision": "5b34d848f7fe635ff08af233a81c808a"
  },
  {
    "url": "404.html",
    "revision": "d0b20eff5c6c8ab88d1ba1c3ad5a6ca9"
  },
  {
    "url": "about.html",
    "revision": "a4c99903d3283eb46e80628458524472"
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
    "url": "assets/js/app.6c8592c1.js",
    "revision": "9870f6fb2d2ac90b909b28c360092daf"
  },
  {
    "url": "assets/js/vuejs-paginate.dfe54976.js",
    "revision": "e3ed1c74b2335d06b9fa703336f0edf5"
  },
  {
    "url": "essay/index.html",
    "revision": "9307e544733a7c41f9081ccd8fa4fc9d"
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
    "revision": "083a4c18ce510ffab481ca5d6b1c689b"
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
    "revision": "d29503d6a2e79e2cdf77d1301de9c37b"
  },
  {
    "url": "tag/6.S081/page/2/index.html",
    "revision": "10180b25dd1a2777c3f38b9300139660"
  },
  {
    "url": "tag/CI/CD/index.html",
    "revision": "88e384537ef74e7a3107ab55340c103d"
  },
  {
    "url": "tag/clash/index.html",
    "revision": "eafc821cffb500c5153aa2b5b02ff94d"
  },
  {
    "url": "tag/CMake/index.html",
    "revision": "be2051825811b408fb98efac7ccbbe32"
  },
  {
    "url": "tag/cow/index.html",
    "revision": "8258842b2a142ecde2f8e13d1a349cbd"
  },
  {
    "url": "tag/CS:APP/index.html",
    "revision": "30a8d6de5e01892029495c10c8f4a40f"
  },
  {
    "url": "tag/file system/index.html",
    "revision": "9cb015c9774661977e1be44aaef1358a"
  },
  {
    "url": "tag/gitpages/index.html",
    "revision": "31d700432e2961474f95ded13060c6ea"
  },
  {
    "url": "tag/index.html",
    "revision": "cb11894bc5651268749447e375479153"
  },
  {
    "url": "tag/Java/index.html",
    "revision": "532da7b9cd0345f476ceeb8439934ea7"
  },
  {
    "url": "tag/lazy allocation/index.html",
    "revision": "751dc6c402677541c6b3006ca1a31130"
  },
  {
    "url": "tag/lock/index.html",
    "revision": "f037e52bf58bdd20bbc26e6382abde2f"
  },
  {
    "url": "tag/mmap/index.html",
    "revision": "cfa85b452db62cc611e70e3e5ba2e1f9"
  },
  {
    "url": "tag/Multithreading/index.html",
    "revision": "d5035da2b0e6ce94fd11d41fe1f6ff11"
  },
  {
    "url": "tag/page table/index.html",
    "revision": "59687f7622435a8dc553fda42d947ef1"
  },
  {
    "url": "tag/rust/index.html",
    "revision": "17711e7c90cc1c1711d20c29ad83d7dd"
  },
  {
    "url": "tag/tensorflow-gpu/index.html",
    "revision": "dd35403fa2c38963d82b37be996380a3"
  },
  {
    "url": "tag/traps/index.html",
    "revision": "fc5efa8f19a6f9d392e04cea75b2cc6f"
  },
  {
    "url": "tag/XML/index.html",
    "revision": "bd68b158cdbf634c037296918191b790"
  },
  {
    "url": "tag/串匹配/index.html",
    "revision": "b25809aa15ba19228cc61c5373386e54"
  },
  {
    "url": "tag/二进制炸弹/index.html",
    "revision": "a2fa880dbfd0ac4c7d2cbaba65f09f34"
  },
  {
    "url": "tag/代理/index.html",
    "revision": "e82dfc5900e7b12375dbb8e75f07aad2"
  },
  {
    "url": "tag/后端/index.html",
    "revision": "dd742ba4e8447beca67aeffc9c50d2b0"
  },
  {
    "url": "tag/数据清洗/index.html",
    "revision": "774def38ce868f70ef20e9709a511002"
  },
  {
    "url": "tag/数据结构/index.html",
    "revision": "90e6c35766e45993281b70ad95781be1"
  },
  {
    "url": "tag/新年/index.html",
    "revision": "68217b746d27e3b2a89d3b811886978c"
  },
  {
    "url": "tag/智能指针/index.html",
    "revision": "d839a290c0062f87a01afec70a572542"
  },
  {
    "url": "tag/汇编/index.html",
    "revision": "f929eff912ca0771a601bc3bde5b7372"
  },
  {
    "url": "tag/迷宫问题/index.html",
    "revision": "4de1efe66462cb1456bccf42a22bc276"
  },
  {
    "url": "tag/面经/index.html",
    "revision": "5979670df6d214ccef4a24d336d582e4"
  },
  {
    "url": "tech/index.html",
    "revision": "eab3c49f02123bacbe5b3ebe188da87c"
  },
  {
    "url": "tech/page/2/index.html",
    "revision": "05570bec855566ecc851604a8cc65df3"
  },
  {
    "url": "tech/page/3/index.html",
    "revision": "51dad252c9946ac6f59bc3ab4ca72be2"
  },
  {
    "url": "tech/page/4/index.html",
    "revision": "f93b3f9b3d4aed8d9c73bcde54e19afe"
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
