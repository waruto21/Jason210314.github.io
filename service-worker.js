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
    "revision": "e76d92b5d68662a637ac986a2555a866"
  },
  {
    "url": "2018/11/10/数据结构迷宫问题/index.html",
    "revision": "d4b1b9b97b447affdcec31dcacc538fd"
  },
  {
    "url": "2018/12/01/csapp-bomb-lab/index.html",
    "revision": "8cb784b283a04dda01249d167c14ced1"
  },
  {
    "url": "2018/12/01/数据结构bm算法/index.html",
    "revision": "6897105717437017a0b8557368c0ce88"
  },
  {
    "url": "2018/12/08/csapp-attack-lab/index.html",
    "revision": "7feeab228916da41fe51a4632da00c61"
  },
  {
    "url": "2018/12/09/python-elementtree数据清洗/index.html",
    "revision": "78954392075e18daeae4dd9d887234b0"
  },
  {
    "url": "2019/02/01/ubuntu安装tf-gpu/index.html",
    "revision": "2cc6b7ad462f01b6f29fd2aaf0d1a9c1"
  },
  {
    "url": "2020/04/18/_20年春招字节跳动后端开发实习面试/index.html",
    "revision": "70f57a6c4afb94df96f06ae73d6a59a5"
  },
  {
    "url": "2020/06/19/github-actions简介/index.html",
    "revision": "fe604f356eb1c33e5343b97ff79773e4"
  },
  {
    "url": "2020/08/21/linux使用clash代理/index.html",
    "revision": "25751fb77c6943df36bbf2fb35e25c3f"
  },
  {
    "url": "2020/10/29/cmake-tutorial/index.html",
    "revision": "d1112b46cf9a8802a69a4f7a526b91e3"
  },
  {
    "url": "2021/01/30/rust智能指针cow/index.html",
    "revision": "f77009347b823b67971b9d9b3ed1389d"
  },
  {
    "url": "2021/02/11/goodbyte-2020/index.html",
    "revision": "12378008b5209dc48b9b61d44081d433"
  },
  {
    "url": "2021/02/22/_6-s081-lab3-page-tables/index.html",
    "revision": "f27feed51fcf9a8080f7e0e31506a4a0"
  },
  {
    "url": "2021/02/25/_6-s081-lab4-traps/index.html",
    "revision": "643a488a49927dc0f6e1c12f5b88357e"
  },
  {
    "url": "2021/02/25/_6-s081-lab5-lazy/index.html",
    "revision": "35bbd90b6e1b6cd3c9d62f8997c62bc9"
  },
  {
    "url": "2021/02/27/_6-s081-lab6-cow/index.html",
    "revision": "0d6bdff3ea7593ca0cf7358237c9f9ab"
  },
  {
    "url": "2021/02/28/_6-s081-lab7-thread/index.html",
    "revision": "5c3c371f82ff80aab0fa7fa257bf9bd8"
  },
  {
    "url": "2021/03/01/_6-s081-lab8-lock/index.html",
    "revision": "5b5d7c8981c4d05f21ea13e7a85664e2"
  },
  {
    "url": "2021/03/02/_6-s081-lab9-fs/index.html",
    "revision": "0848bf983fdc9608ab8b56dab2198629"
  },
  {
    "url": "2021/03/03/_6-s081-lab10-mmap/index.html",
    "revision": "cc7c19721c8b677c51164ba1aa8c004d"
  },
  {
    "url": "404.html",
    "revision": "efa20cc1fd2130be339e740248e22cef"
  },
  {
    "url": "about.html",
    "revision": "0fba05d1738f1c98c4847b41f425ad04"
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
    "url": "assets/js/12.837958ba.js",
    "revision": "e7cbcb712b7c5257e5e805add82362e6"
  },
  {
    "url": "assets/js/13.d65c3f2e.js",
    "revision": "ddd0dc4a707c78aa7349de887616a367"
  },
  {
    "url": "assets/js/14.a2bf66dc.js",
    "revision": "9413b7e8f402ebfc2114409fb8e365ea"
  },
  {
    "url": "assets/js/15.22612c24.js",
    "revision": "aec6cb9aecca338492c2ed143d56b0dd"
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
    "url": "assets/js/25.3f9dadb3.js",
    "revision": "9dc573b323a4226e2101ee1477cb3ec0"
  },
  {
    "url": "assets/js/26.67b7ce20.js",
    "revision": "a13002ccab9cd7b7d45d55661055e9a0"
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
    "url": "assets/js/app.9e7f2e58.js",
    "revision": "9d6a414adc10b8bed8b3811206d73de2"
  },
  {
    "url": "assets/js/vuejs-paginate.dfe54976.js",
    "revision": "e3ed1c74b2335d06b9fa703336f0edf5"
  },
  {
    "url": "essay/index.html",
    "revision": "d0ed3a7824968b6df3b08bbffe5321e8"
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
    "revision": "067d1a731c59d3aec0a8fb82659306fb"
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
    "revision": "972b18601c752886d9d4d09d28bcc6b0"
  },
  {
    "url": "tag/6.S081/page/2/index.html",
    "revision": "cbfc4bb61004c21216f15e3576cc3448"
  },
  {
    "url": "tag/CI/CD/index.html",
    "revision": "7ebac043310b7a47eb06c255da89be33"
  },
  {
    "url": "tag/clash/index.html",
    "revision": "84b2b346695dcf67448e9f9cfb56d109"
  },
  {
    "url": "tag/CMake/index.html",
    "revision": "c82aa1b60cf9e70ee2975c6f3626c0b5"
  },
  {
    "url": "tag/cow/index.html",
    "revision": "fa1a20ca7aa8c6f27d43187bd40adecd"
  },
  {
    "url": "tag/CS:APP/index.html",
    "revision": "7e77b1d50fc9a9eb6b6dbc51653092a0"
  },
  {
    "url": "tag/file system/index.html",
    "revision": "d190efacffc552f74c8ed745dc56c8ac"
  },
  {
    "url": "tag/gitpages/index.html",
    "revision": "1e9782454c6e758412c82ab710b49e14"
  },
  {
    "url": "tag/index.html",
    "revision": "9d8adb56a429177ab9f6deae93892283"
  },
  {
    "url": "tag/Java/index.html",
    "revision": "d2d2c62eddd18f56b4f26dde1e5950a9"
  },
  {
    "url": "tag/lazy allocation/index.html",
    "revision": "a8d4fa68f1166e1e1c41d7faf891deb9"
  },
  {
    "url": "tag/lock/index.html",
    "revision": "d20c9cc0a59f3d1a29fccc36d0774e03"
  },
  {
    "url": "tag/mmap/index.html",
    "revision": "5742dac155fe37bfe1d9bacc01820fc1"
  },
  {
    "url": "tag/Multithreading/index.html",
    "revision": "b2f89e862c0dc4fd2ea55c349b005878"
  },
  {
    "url": "tag/page table/index.html",
    "revision": "e710f08ed4e6d3568067d318f78ebc59"
  },
  {
    "url": "tag/rust/index.html",
    "revision": "e66815dcab72f1161bfbe028b572c735"
  },
  {
    "url": "tag/tensorflow-gpu/index.html",
    "revision": "5c3a9684202065679b20664ce97b6d96"
  },
  {
    "url": "tag/traps/index.html",
    "revision": "15186042710fe1e4815d1237d3e5bc9d"
  },
  {
    "url": "tag/XML/index.html",
    "revision": "de5bc5f73c684a330d7949555270a948"
  },
  {
    "url": "tag/串匹配/index.html",
    "revision": "6c6fb7bbf028cb48e2a70760705bfc81"
  },
  {
    "url": "tag/二进制炸弹/index.html",
    "revision": "fd99781dc57e222e53191ded62f89353"
  },
  {
    "url": "tag/代理/index.html",
    "revision": "b48c8b8397648853f062502fa1372da0"
  },
  {
    "url": "tag/后端/index.html",
    "revision": "24a9e55e8bd105690a2808b2278931fc"
  },
  {
    "url": "tag/数据清洗/index.html",
    "revision": "52e194593784078ad1b754bd031da249"
  },
  {
    "url": "tag/数据结构/index.html",
    "revision": "625a866536769ec7948405e3697df4dd"
  },
  {
    "url": "tag/新年/index.html",
    "revision": "1211f844786ec11fda3ff5624d9fb82e"
  },
  {
    "url": "tag/智能指针/index.html",
    "revision": "ee4a1bd05a6b9f16fa84e6f4d64c6622"
  },
  {
    "url": "tag/汇编/index.html",
    "revision": "8526e3902029676b6cbcdee8b14bdaae"
  },
  {
    "url": "tag/迷宫问题/index.html",
    "revision": "ffaef46abc99bdb812ebcf2976268056"
  },
  {
    "url": "tag/面经/index.html",
    "revision": "3ae3c06b0e436b1a47c9ec62d914e021"
  },
  {
    "url": "tech/index.html",
    "revision": "71183f08538a8ec53f040730339ddfb4"
  },
  {
    "url": "tech/page/2/index.html",
    "revision": "1f8da6a876f362cba89fefed737de52b"
  },
  {
    "url": "tech/page/3/index.html",
    "revision": "b579edb744deeb8ce598cae0b1d8e743"
  },
  {
    "url": "tech/page/4/index.html",
    "revision": "8ef8a4e198062110d64bf413294ffc00"
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
