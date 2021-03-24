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
    "revision": "3d3aebc4a387142eb3587170f60eb97a"
  },
  {
    "url": "2018/11/10/数据结构迷宫问题/index.html",
    "revision": "ff6e8fffc1b0cf67c02246aa47af47f7"
  },
  {
    "url": "2018/12/01/csapp-bomb-lab/index.html",
    "revision": "49169aa6c17962a0f0898702f27bf1bb"
  },
  {
    "url": "2018/12/01/数据结构bm算法/index.html",
    "revision": "4ee5148e5bac9cb61d70fbfbb9ac1792"
  },
  {
    "url": "2018/12/08/csapp-attack-lab/index.html",
    "revision": "4e264e53d7e4a63b00f282b61d4a3bce"
  },
  {
    "url": "2018/12/09/python-elementtree数据清洗/index.html",
    "revision": "8e90333ea3de48130a357d0c45d40e91"
  },
  {
    "url": "2019/02/01/ubuntu安装tf-gpu/index.html",
    "revision": "7cc6cae5cb16f074f3548da0ecf22409"
  },
  {
    "url": "2020/04/18/_20年春招字节跳动后端开发实习面试/index.html",
    "revision": "2c162a8084b69defebb242d1fa603c2e"
  },
  {
    "url": "2020/06/19/github-actions简介/index.html",
    "revision": "d9bf861664fd47937c9784a53883edf1"
  },
  {
    "url": "2020/08/21/linux使用clash代理/index.html",
    "revision": "cc555bc774ec86b91f2ac2d4b7889d5e"
  },
  {
    "url": "2020/10/29/cmake-tutorial/index.html",
    "revision": "4a2d6feda1a840ba08fe5717f553075d"
  },
  {
    "url": "2021/01/30/rust智能指针cow/index.html",
    "revision": "561a6f07a04452216338b5eca73cefad"
  },
  {
    "url": "2021/02/11/goodbyte-2020/index.html",
    "revision": "c8429068bb202bdc5df99fccc9dd1ce7"
  },
  {
    "url": "2021/02/22/_6-s081-lab3-page-tables/index.html",
    "revision": "da5cfe5aaf7b2a34965e3ee88da32b84"
  },
  {
    "url": "2021/02/25/_6-s081-lab4-traps/index.html",
    "revision": "fe06f01794da97c2dea2c1b557eb97fb"
  },
  {
    "url": "2021/02/25/_6-s081-lab5-lazy/index.html",
    "revision": "790c93e83f94ad78c72292268ff3c026"
  },
  {
    "url": "2021/02/27/_6-s081-lab6-cow/index.html",
    "revision": "bc926e78ed45376c4e062ac7949717b2"
  },
  {
    "url": "2021/02/28/_6-s081-lab7-thread/index.html",
    "revision": "31ef41cf59a01009df4cf7c08b7ef8a1"
  },
  {
    "url": "2021/03/01/_6-s081-lab8-lock/index.html",
    "revision": "0b071696efe6f4ef82c90cddd2524507"
  },
  {
    "url": "2021/03/02/_6-s081-lab9-fs/index.html",
    "revision": "a99fe970f1ced7da5fc4b5d6a8bc67b4"
  },
  {
    "url": "2021/03/03/_6-s081-lab10-mmap/index.html",
    "revision": "263b950be6534a78109ecf1244253675"
  },
  {
    "url": "404.html",
    "revision": "7df23784b0a6d99f9711230f78cc3e0c"
  },
  {
    "url": "about.html",
    "revision": "dfc17c62e8580c7c0004c372ed73efdd"
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
    "url": "assets/js/10.5210da14.js",
    "revision": "d40798aef3532e6c6e7db828f7b3f977"
  },
  {
    "url": "assets/js/11.0fecb05e.js",
    "revision": "724e78914550db7e924c9b1319fa5f9b"
  },
  {
    "url": "assets/js/12.2cb069e8.js",
    "revision": "761aa345536ec6e9e8f8c40c4b9b5c27"
  },
  {
    "url": "assets/js/13.d7fb55e4.js",
    "revision": "0adef9476df22ced5a848c08bc8116b1"
  },
  {
    "url": "assets/js/14.62ba5311.js",
    "revision": "bcc534ea4cc1ff02702e49ad4e795dfa"
  },
  {
    "url": "assets/js/15.7798259d.js",
    "revision": "cc368c3a185f7f4cc8428d6afcef9a75"
  },
  {
    "url": "assets/js/16.f9c546f3.js",
    "revision": "05d9673477d294f3bf784c00a457d0e3"
  },
  {
    "url": "assets/js/17.a0701d67.js",
    "revision": "ca1f6337709d448ef996aa3e5bd4020a"
  },
  {
    "url": "assets/js/18.2d057624.js",
    "revision": "1097a6656e32933c6a6f671fbc4a17d9"
  },
  {
    "url": "assets/js/19.53ca5bfc.js",
    "revision": "904227276265f1ad7096ba4d39428af5"
  },
  {
    "url": "assets/js/20.589e23b5.js",
    "revision": "919e4025f6592f61fd9f0a551ee05391"
  },
  {
    "url": "assets/js/21.afdeed03.js",
    "revision": "e8d1d80e80a04e455722a286a10b2030"
  },
  {
    "url": "assets/js/22.7af8ba69.js",
    "revision": "71896efadbbd4543ad4edb57735e463d"
  },
  {
    "url": "assets/js/23.08cad042.js",
    "revision": "5e56717746304baf69c79be626da6212"
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
    "url": "assets/js/3.f6d98184.js",
    "revision": "9cdcda67cda742c2d9b7b8ed920a3586"
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
    "url": "assets/js/4.17bbf7c2.js",
    "revision": "2bbe98e09e9401378b5a963b2db407d2"
  },
  {
    "url": "assets/js/5.71113af4.js",
    "revision": "25819eedddf091db624eac2c53f537a4"
  },
  {
    "url": "assets/js/6.71adfc56.js",
    "revision": "1e69cc750016cbb8d7f0f611a66e827e"
  },
  {
    "url": "assets/js/7.6bba22bb.js",
    "revision": "181ede1f57ba4de4a7bd54bf24c53978"
  },
  {
    "url": "assets/js/8.88621ad2.js",
    "revision": "027d4fc2edb293d8300f329a608efc2b"
  },
  {
    "url": "assets/js/9.6ea3516d.js",
    "revision": "907ea1916706a3e9f42d2bf81deb178b"
  },
  {
    "url": "assets/js/app.d4339d46.js",
    "revision": "f2f2e98b4040dae6a671666b3cbf8a19"
  },
  {
    "url": "assets/js/vuejs-paginate.dfe54976.js",
    "revision": "e3ed1c74b2335d06b9fa703336f0edf5"
  },
  {
    "url": "essay/index.html",
    "revision": "fc5800d576ca915daa02abd8967d6fa6"
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
    "revision": "89acd908f68c954095b11213a1deab36"
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
    "revision": "81d0f112a6e87d2f56e9e27545c3a550"
  },
  {
    "url": "tag/6.S081/page/2/index.html",
    "revision": "d111cbffe1a87bf55d6ab2d8b0113a42"
  },
  {
    "url": "tag/CI/CD/index.html",
    "revision": "cdc1c4771a1035e48db2b7ec4930786e"
  },
  {
    "url": "tag/clash/index.html",
    "revision": "77d6170eeb37abb21b419bbab773b150"
  },
  {
    "url": "tag/CMake/index.html",
    "revision": "70491f13cce1c57497c5901195910405"
  },
  {
    "url": "tag/cow/index.html",
    "revision": "879aa2d220b78ff3958b7590cf0fe51a"
  },
  {
    "url": "tag/CS:APP/index.html",
    "revision": "4be6f4bacdc116117fb951deebcec989"
  },
  {
    "url": "tag/file system/index.html",
    "revision": "5b80088061e7d55a599d5801f9bf2959"
  },
  {
    "url": "tag/gitpages/index.html",
    "revision": "f2cd20e47270fcc8bc0fbbb35529f41e"
  },
  {
    "url": "tag/index.html",
    "revision": "be2f6b2ad1877706f4d5ea1832a270d1"
  },
  {
    "url": "tag/Java/index.html",
    "revision": "02337e8de74eadbfe579dd17339fcd7c"
  },
  {
    "url": "tag/lazy allocation/index.html",
    "revision": "8967d5f27fc1cce2acf7b1b1b1d4d42a"
  },
  {
    "url": "tag/lock/index.html",
    "revision": "bd5eb429f004bca1f12f426c1a0e61ec"
  },
  {
    "url": "tag/mmap/index.html",
    "revision": "a1a82ea7b9e2171d3f516b9f3363ce3d"
  },
  {
    "url": "tag/Multithreading/index.html",
    "revision": "b94bd38f1b5b2b76e85cd308e42fe741"
  },
  {
    "url": "tag/page table/index.html",
    "revision": "ce0171f70406ed143340d82f22784dd8"
  },
  {
    "url": "tag/rust/index.html",
    "revision": "3765d3258b8ee73f526dd40d86db3827"
  },
  {
    "url": "tag/tensorflow-gpu/index.html",
    "revision": "59f0792743186188e72b7b38513cd60f"
  },
  {
    "url": "tag/traps/index.html",
    "revision": "1132d8b6e5b4c8439f0bc67431d06087"
  },
  {
    "url": "tag/XML/index.html",
    "revision": "f29774263004b03523ae3ede84e2c27e"
  },
  {
    "url": "tag/串匹配/index.html",
    "revision": "11ec6a797c273dce749317623e00f0bd"
  },
  {
    "url": "tag/二进制炸弹/index.html",
    "revision": "5ad7fe84c8ebc0cf8c1ab02485c28ed8"
  },
  {
    "url": "tag/代理/index.html",
    "revision": "3c1cce62853ce48a751afa2378ae2956"
  },
  {
    "url": "tag/后端/index.html",
    "revision": "40b571a124449e8a51cc485d150054b5"
  },
  {
    "url": "tag/数据清洗/index.html",
    "revision": "d66e74e2986f6f67122f8e99f3a31b7a"
  },
  {
    "url": "tag/数据结构/index.html",
    "revision": "7d5fb9fc1d0f350222dabb7121a18cd3"
  },
  {
    "url": "tag/新年/index.html",
    "revision": "0bd63d79ffaa6d5235b88a35aa206a88"
  },
  {
    "url": "tag/智能指针/index.html",
    "revision": "0ac5d28868195e38e8478a9aeb0e257b"
  },
  {
    "url": "tag/汇编/index.html",
    "revision": "d19a493f8f06dbedcc4c319236b13fb5"
  },
  {
    "url": "tag/迷宫问题/index.html",
    "revision": "686bb7fd23533d51dfd870d9c06652c5"
  },
  {
    "url": "tag/面经/index.html",
    "revision": "08e5eb8f7560b608616dc1565ab299ea"
  },
  {
    "url": "tech/index.html",
    "revision": "d42e5dd817ecb584779415d7ef0158ee"
  },
  {
    "url": "tech/page/2/index.html",
    "revision": "2aace416b2662c52ce44e4f23c8bbc31"
  },
  {
    "url": "tech/page/3/index.html",
    "revision": "b1e41ee840d0518ca3470534704d98a9"
  },
  {
    "url": "tech/page/4/index.html",
    "revision": "18054af0f21aaeda5c0665dd22be89a8"
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
