"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export const composers = {
  a: [
    {
      slug: "addinsell",
      name: "Addinsell Richard",
      chinese: "理查德·阿汀塞尔",
      birthday: "1904-01-13",
    },
    {
      slug: "albeniz",
      name: "Albeniz Isaac",
      chinese: "埃赛克·阿尔贝尼兹",
      birthday: "1860-05-29",
    },
    {
      slug: "albinoni",
      name: "Albinoni Tomaso",
      chinese: "托马索·阿尔宾诺尼",
      birthday: "1671-06-08",
    },
    {
      slug: "alexandrov",
      name: "Alexandrov Anatoly",
      chinese: "阿纳托利·亚历山德罗夫",
      birthday: "1888-05-13",
    },
    {
      slug: "alkan",
      name: "Alkan Charles Valentin",
      chinese: "查理斯·沃伦丁·阿尔坎",
      birthday: "1813-11-30",
    },
    {
      slug: "antheil",
      name: "Antheil George",
      chinese: "乔治·安太尔",
      birthday: "1900-07-08",
    },
    {
      slug: "arensky",
      name: "Arensky Anton Stepanovich",
      chinese: "安东·斯捷潘诺维奇·阿连斯基",
      birthday: "1861-07-12",
    },
  ],

  b: [
    {
      slug: "bach",
      name: "Bach Johann Sebastian",
      chinese: "约翰·塞巴斯蒂安·巴赫",
      birthday: "1685-03-31",
    },
    {
      slug: "badarzewska",
      name: "Badarzewska Thekla",
      chinese: "苔克拉·芭达捷芙丝卡",
      birthday: "1834-09-14",
    },
    {
      slug: "balakirev",
      name: "Balakirev Mily",
      chinese: "米利·巴拉基列夫",
      birthday: "1837-01-02",
    },
    {
      slug: "barber",
      name: "Barber Samuel",
      chinese: "塞缪尔·巴伯",
      birthday: "1910-03-09",
    },
    {
      slug: "bartok",
      name: "Bartok Bela",
      chinese: "贝拉·巴托克",
      birthday: "1881-03-25",
    },
    {
      slug: "beach",
      name: "Beach Amy",
      chinese: "艾咪·比奇夫人",
      birthday: "1867-09-05",
    },
    {
      slug: "beethoven",
      name: "Beethoven Ludwig van",
      chinese: "路德维希·冯·贝多芬",
      birthday: "1770-12-17",
    },
    {
      slug: "bellini",
      name: "Bellini Vincenzo",
      chinese: "温森佐·贝里尼",
      birthday: "1801-11-03",
    },
    {
      slug: "berio",
      name: "Berio Luciano",
      chinese: "鲁契亚诺·贝里奥",
      birthday: "1925-10-24",
    },
    {
      slug: "berg",
      name: "Berg Alban",
      chinese: "阿尔班·贝尔格",
      birthday: "1885-02-09",
    },
    {
      slug: "berlioz",
      name: "Berlioz Hector",
      chinese: "路易斯·埃克托·柏辽兹",
      birthday: "1803-12-11",
    },
    {
      slug: "bernstein",
      name: "Bernstein Leonard",
      chinese: "里奥纳多·伯恩斯坦",
      birthday: "1918-08-25",
    },
    {
      slug: "beyer",
      name: "Beyer Ferdinand",
      chinese: "费迪南德·拜厄",
      birthday: "1803-07-25",
    },
    {
      slug: "bizet",
      name: "Bizet Georges",
      chinese: "乔治·比才",
      birthday: "1838-10-25",
    },
    {
      slug: "blumenfeld",
      name: "Blumenfeld Felix",
      chinese: "菲利克斯·米歇尔洛维奇·布鲁门费尔德",
      birthday: "1863-04-19",
    },
    {
      slug: "bolcom",
      name: "Bolcom William",
      chinese: "威廉·博尔科姆",
      birthday: "1938-05-26",
    },
    {
      slug: "borodin",
      name: "Borodin Alexander",
      chinese: "亚历山大·波菲里耶维奇·鲍罗丁",
      birthday: "1833-11-12",
    },
    {
      slug: "bortkiewicz",
      name: "Bortkiewicz Sergei",
      chinese: "谢尔盖·艾德华多维奇·波特凯维茨",
      birthday: "1877-02-28",
    },
    {
      slug: "boulez",
      name: "Boulez Pierre",
      chinese: "皮埃尔·布莱兹",
      birthday: "1925-03-26",
    },
    {
      slug: "bowen",
      name: "Bowen York",
      chinese: "约克·鲍恩",
      birthday: "1884-02-22",
    },
    {
      slug: "brahms",
      name: "Brahms Johannes",
      chinese: "约翰内斯·勃拉姆斯",
      birthday: "1833-05-07",
    },
    {
      slug: "bridge",
      name: "Bridge Frank",
      chinese: "弗兰克·布里奇",
      birthday: "1879-02-26",
    },
    {
      slug: "britten",
      name: "Britten Benjamin",
      chinese: "爱德华·本杰明·布里顿",
      birthday: "1913-11-22",
    },
    {
      slug: "bruckner",
      name: "Bruckner Anton",
      chinese: "安东·布鲁克纳",
      birthday: "1824-09-04",
    },
    {
      slug: "burgmuller",
      name: "Burgmuller Johann",
      chinese: "约翰·布格缪勒",
      birthday: "1806-12-04",
    },
    {
      slug: "busoni",
      name: "Busoni Ferruccio",
      chinese: "法鲁奇奥·班温努特·布索尼",
      birthday: "1866-04-01",
    },
    {
      slug: "byrd",
      name: "Byrd William",
      chinese: "威廉·拜尔德",
      birthday: "1540-01-01",
    },
  ],

  c: [
    {
      slug: "cage",
      name: "Cage John",
      chinese: "约翰•凯奇",
      birthday: "1912-09-05",
    },
    {
      slug: "carter",
      name: "Carter Eliott",
      chinese: "艾洛特·卡特",
      birthday: "1908-12-11",
    },
    {
      slug: "casadesus",
      name: "Casadesus Robert",
      chinese: "罗伯特·卡萨德修",
      birthday: "1899-04-07",
    },
    {
      slug: "catoire",
      name: "Catoire Georgy L'vovich",
      chinese: "乔治·莱沃维奇·卡托瓦",
      birthday: "1861-04-16",
    },
    {
      slug: "chabrier",
      name: "Chabrier Alexis Emmanuel",
      chinese: "亚历克西·埃马纽埃尔·夏布里埃",
      birthday: "1841-01-18",
    },
    {
      slug: "chaminade",
      name: "Chaminade Louise Stephanie",
      chinese: "路易斯·史蒂芬妮·夏米娜德",
      birthday: "1857-08-08",
    },
    {
      slug: "chasins",
      name: "Chasins Abram",
      chinese: "阿布拉姆·蔡辛斯",
      birthday: "1903-08-17",
    },
    {
      slug: "chopin",
      name: "Chopin Frederic François",
      chinese: "弗雷德里克·弗朗索瓦·肖邦",
      birthday: "1810-03-01",
    },
    {
      slug: "clementi",
      name: "Clementi Muzio",
      chinese: "穆齐奥·克莱门蒂",
      birthday: "1752-01-23",
    },
    {
      slug: "copland",
      name: "Copland Aaron",
      chinese: "艾伦·科普兰",
      birthday: "1900-11-14",
    },
    {
      slug: "couperin",
      name: "Couperin Francois",
      chinese: "弗朗索瓦·库普兰",
      birthday: "1668-11-10",
    },
    {
      slug: "cowell",
      name: "Cowell Henry",
      chinese: "亨利·考威尔",
      birthday: "1897-03-11",
    },
    {
      slug: "cramer",
      name: "Cramer Johann Baptist",
      chinese: "约翰·巴蒂斯特·克拉莫",
      birthday: "1771-02-24",
    },
    {
      slug: "crumb",
      name: "Crumb George Henry",
      chinese: "乔治·亨利·克拉姆",
      birthday: "1929-10-24",
    },
    {
      slug: "czerny",
      name: "Czerny Carl",
      chinese: "卡尔·车尔尼",
      birthday: "1791-02-21",
    },
  ],

  d: [
    {
      slug: "dallapiccola",
      name: "Dallapiccola Luigi",
      chinese: "路易基·达拉皮科拉",
      birthday: "1904-02-03",
    },
    {
      slug: "debussy",
      name: "Debussy Claude",
      chinese: "阿希尔·克劳德·德彪西",
      birthday: "1862-08-22",
    },
    {
      slug: "delius",
      name: "Delius Frederick",
      chinese: "弗雷德里克·戴留斯",
      birthday: "1862-01-29",
    },
    {
      slug: "diabelli",
      name: "Diabelli Anton",
      chinese: "安东·狄亚贝利",
      birthday: "1781-09-05",
    },
    {
      slug: "dindy",
      name: "D'Indy Vincent",
      chinese: "樊尚·丹第",
      birthday: "1851-03-27",
    },
    {
      slug: "dohnanyi",
      name: "Dohnanyi Ernst von",
      chinese: "厄恩斯特·凡·多南依",
      birthday: "1877-07-27",
    },
    {
      slug: "donizetti",
      name: "Donizetti Gaetano",
      chinese: "葛塔诺·多尼采蒂",
      birthday: "1797-11-29",
    },
    {
      slug: "dukas",
      name: "Dukas Paul",
      chinese: "保罗·杜卡斯",
      birthday: "1865-10-01",
    },
    {
      slug: "duphly",
      name: "Duphly Jacques",
      chinese: "雅克·迪普利",
      birthday: "1715-01-12",
    },
    {
      slug: "durand",
      name: "Durand Auguste",
      chinese: "奥古斯特·杜朗",
      birthday: "1830-08-23",
    },
    {
      slug: "dussek",
      name: "Dussek Jan Ladislav",
      chinese: "扬·拉迪斯拉夫·杜舍克",
      birthday: "1760-02-12",
    },
    {
      slug: "duvernoy",
      name: "Duvernoy Jean Baptiste",
      chinese: "简·巴提斯特·杜维诺依",
      birthday: "1802-08-16",
    },
    {
      slug: "dvorak",
      name: "Dvorak Antonin",
      chinese: "安东宁·德沃夏克",
      birthday: "1841-09-08",
    },
  ],

  e: [
    {
      slug: "elgar",
      name: "Elgar Edward William",
      chinese: "爱德华·威廉·埃尔加",
      birthday: "1857-06-02",
    },
  ],

  f: [
    {
      slug: "falla",
      name: "Falla Manuel de",
      chinese: "曼努埃尔·德·法雅",
      birthday: "1876-11-23",
    },
    {
      slug: "faure",
      name: "Faure Gabriel",
      chinese: "加布里埃尔·福雷",
      birthday: "1845-05-12",
    },
    {
      slug: "feinberg",
      name: "Feinberg Samuel",
      chinese: "塞缪尔·费恩伯格",
      birthday: "1890-05-26",
    },
    {
      slug: "field",
      name: "Field John",
      chinese: "约翰·菲尔德",
      birthday: "1782-07-26",
    },
    {
      slug: "fibich",
      name: "Fibich Zdenek",
      chinese: "日登内克·菲比赫",
      birthday: "1850-12-21",
    },
    {
      slug: "francaix",
      name: "Francaix Jean",
      chinese: "简·法朗赛",
      birthday: "1912-05-23",
    },
    {
      slug: "franck",
      name: "Franck Cesar",
      chinese: "赛扎尔·弗兰克",
      birthday: "1822-12-10",
    },
    {
      slug: "friedman",
      name: "Friedman Ignaz",
      chinese: "伊格纳茨·弗莱德曼",
      birthday: "1882-02-13",
    },
  ],

  g: [
    {
      slug: "gade",
      name: "Gade Niels",
      chinese: "尼尔斯·加德",
      birthday: "1817-02-22",
    },
    {
      slug: "gershwin",
      name: "Gershwin George",
      chinese: "乔治·格什温",
      birthday: "1898-09-26",
    },
    {
      slug: "ginastera",
      name: "Ginastera Alberto",
      chinese: "阿尔伯特·吉纳斯特拉",
      birthday: "1916-04-11",
    },
    {
      slug: "glass",
      name: "Glass Philip",
      chinese: "菲利普·格拉斯",
      birthday: "1937-01-31",
    },
    {
      slug: "glazunov",
      name: "Glazunov Alexander",
      chinese: "亚历山大·康斯坦丁诺维奇·格拉祖诺夫",
      birthday: "1865-08-10",
    },
    {
      slug: "glebov",
      name: "Glebov Yevgeny",
      chinese: "叶浦盖尼·格列波夫",
      birthday: "1929-09-10",
    },
    {
      slug: "glier",
      name: "Gliere Reinhold",
      chinese: "莱因霍尔德·莫里泽维奇·格里埃尔",
      birthday: "1875-01-11",
    },
    {
      slug: "glinka",
      name: "Glinka Mikhail",
      chinese: "米哈伊尔·伊万诺维奇·格林卡",
      birthday: "1804-06-01",
    },
    {
      slug: "gluck",
      name: "Gluck Christoph Willibald",
      chinese: "克里斯托弗·威利巴尔德·格鲁克",
      birthday: "1714-07-02",
    },
    {
      slug: "godard",
      name: "Godard Benjamin",
      chinese: "本杰明·路易斯·保罗·戈达尔",
      birthday: "1849-08-18",
    },
    {
      slug: "godowsky",
      name: "Godowsky Leopold",
      chinese: "里奥鲍尔德·戈多夫斯基",
      birthday: "1870-02-13",
    },
    {
      slug: "gottschalk",
      name: "Gottschalk Louis Moreau",
      chinese: "路易斯·莫劳·戈特沙尔克",
      birthday: "1829-05-08",
    },
    {
      slug: "gounod",
      name: "Gounod Charles Francois",
      chinese: "查尔斯·弗朗索瓦·古诺",
      birthday: "1818-06-17",
    },
    {
      slug: "grainger",
      name: "Grainger Percy Aldridge",
      chinese: "帕西·奥尔德里奇·葛仁杰",
      birthday: "1882-07-08",
    },
    {
      slug: "granados",
      name: "Granados Enrique",
      chinese: "恩里克·格拉纳多斯",
      birthday: "1867-07-27",
    },
    {
      slug: "grieg",
      name: "Grieg Edvard Hagerup",
      chinese: "爱德华·哈格吕普·格里格",
      birthday: "1843-06-15",
    },
    {
      slug: "griffes",
      name: "Griffes Charles Tomlinson",
      chinese: "查理斯·汤姆林森·格里菲斯",
      birthday: "1884-09-17",
    },
    {
      slug: "grondahl",
      name: "Grondahl Agathe Backer",
      chinese: "阿格斯·巴克·格伦达尔",
      birthday: "1847-12-01",
    },
    {
      slug: "guastavino",
      name: "Guastavino Carlos",
      chinese: "卡洛斯·瓜斯塔维诺",
      birthday: "1912-04-05",
    },
    {
      slug: "gubaidulina",
      name: "Gubaidulina Sofia",
      chinese: "索非亚·阿斯戈托芙娜·古拜杜丽娜",
      birthday: "1931-10-24",
    },
    {
      slug: "gulda",
      name: "Gulda Friedrich",
      chinese: "弗雷德里希·古尔达",
      birthday: "1930-05-16",
    },
  ],

  h: [
    {
      slug: "hamelin",
      name: "Hamelin Marc Andre",
      chinese: "马克·安德鲁·哈默林",
      birthday: "1961-09-05",
    },
    {
      slug: "handel",
      name: "Handel George Frideric",
      chinese: "乔治·弗里德里克·亨德尔",
      birthday: "1685-02-23",
    },
    {
      slug: "hanon",
      name: "Hanon Charles Louis",
      chinese: "查尔斯·路易斯·哈农",
      birthday: "1819-07-02",
    },
    {
      slug: "haydn",
      name: "Haydn Franz Joseph",
      chinese: "弗朗茨·约瑟夫·海顿",
      birthday: "1732-03-31",
    },
    {
      slug: "henselt",
      name: "Henselt Adolf von",
      chinese: "阿道夫·冯·亨赛尔特",
      birthday: "1814-05-12",
    },
    {
      slug: "herz",
      name: "Herz Henri",
      chinese: "亨利·赫尔茨",
      birthday: "1803-01-06",
    },
    {
      slug: "hindemith",
      name: "Hindemith Paul",
      chinese: "保罗·亨德米特",
      birthday: "1895-11-16",
    },
    {
      slug: "hofmann",
      name: "Hofmann Josef Casimir",
      chinese: "约瑟夫·卡西马·霍夫曼",
      birthday: "1876-01-20",
    },
    {
      slug: "holst",
      name: "Holst Gustav Theodore",
      chinese: "古斯塔夫·迪奥多·霍尔斯特",
      birthday: "1874-09-21",
    },
    {
      slug: "honegger",
      name: "Honegger Arthur",
      chinese: "阿图尔·奥涅格",
      birthday: "1892-03-10",
    },
    {
      slug: "horowitz",
      name: "Horowitz Vladimir",
      chinese: "弗拉基米尔·霍洛维兹",
      birthday: "1903-10-01",
    },
    {
      slug: "huber",
      name: "Huber Hans",
      chinese: "汉斯·胡贝尔",
      birthday: "1852-06-28",
    },
    {
      slug: "hummel",
      name: "Hummel Johann Nepomuk",
      chinese: "约翰·尼波默克·胡梅尔",
      birthday: "1778-11-14",
    },
  ],

  i: [
    {
      slug: "ibert",
      name: "Ibert Jacques Francois",
      chinese: "雅克·弗朗索瓦·艾伯特",
      birthday: "1890-08-15",
    },
    {
      slug: "ichiyanagi",
      name: "Ichiyanagi Toshi",
      chinese: "一柳 慧",
      birthday: "1933-02-04",
    },
    {
      slug: "ives",
      name: "Ives Charles Edward",
      chinese: "查尔斯·爱德华·艾夫斯",
      birthday: "1874-10-20",
    },
  ],

  j: [
    {
      slug: "janacek",
      name: "Janacek Leos",
      chinese: "里奥斯·雅纳切克",
      birthday: "1854-07-03",
    },
    {
      slug: "jolivet",
      name: "Jolivet Andre",
      chinese: "安德烈·朱利维",
      birthday: "1905-08-08",
    },
    {
      slug: "jongen",
      name: "Jongen Joseph",
      chinese: "约瑟夫·祖根",
      birthday: "1873-12-14",
    },
    {
      slug: "joplin",
      name: "Joplin Scott",
      chinese: "斯科特·乔普林",
      birthday: "1868-11-24",
    },
  ],

  k: [
    {
      slug: "kabalevsky",
      name: "Kabalevsky Dmitri",
      chinese: "德米特里·卡巴列夫斯基",
      birthday: "1904-12-30",
    },
    {
      slug: "kapustin",
      name: "Kapustin Nikolai",
      chinese: "尼古拉·凯帕斯汀",
      birthday: "1937-11-22",
    },
    {
      slug: "katsaris",
      name: "Katsaris Cyprien",
      chinese: "西普林·卡萨利斯",
      birthday: "1951-05-05",
    },
    {
      slug: "ketelbey",
      name: "Ketelbey Albert William",
      chinese: "艾伯特·威廉·凯特尔贝",
      birthday: "1875-08-09",
    },
    {
      slug: "khachaturian",
      name: "Khachaturian Aram Ilyich",
      chinese: "阿拉姆·伊里奇·哈恰图良",
      birthday: "1903-06-06",
    },
    {
      slug: "kirchner",
      name: "Kirchner Theodor",
      chinese: "狄奥多·柯希纳",
      birthday: "1823-12-10",
    },
    {
      slug: "kreisler",
      name: "Kreisler Fritz",
      chinese: "弗里兹·克莱斯勒",
      birthday: "1875-02-02",
    },
    {
      slug: "krenek",
      name: "Krenek Ernst",
      chinese: "厄恩斯特·克热内克",
      birthday: "1900-08-23",
    },
    {
      slug: "kuhlau",
      name: "Kuhlau Daniel Friedrich",
      chinese: "丹尼尔·弗雷德里克·库劳",
      birthday: "1786-09-11",
    },
  ],

  l: [
    {
      slug: "lecuona",
      name: "Lecuona Ernesto",
      chinese: "恩纳斯托·莱库纳",
      birthday: "1895-08-06",
    },
    {
      slug: "lemoine",
      name: "Lemoine Henry",
      chinese: "亨利·莱蒙",
      birthday: "1776-11-21",
    },
    {
      slug: "leschetizky",
      name: "Leschetizky Theodor",
      chinese: "特奥多·莱谢蒂茨基",
      birthday: "1830-06-22",
    },
    {
      slug: "leybach",
      name: "Leybach Ignaz",
      chinese: "伊格纳茨·莱贝奇",
      birthday: "1817-02-11",
    },
    {
      slug: "liadov",
      name: "Liadov Anatoly Konstantinovich",
      chinese: "康斯坦丁诺维奇·里亚多夫",
      birthday: "1855-05-12",
    },
    {
      slug: "liapunov",
      name: "Liapunov Sergei Mikhailovich",
      chinese: "赛盖·米凯洛维奇·里亚普诺夫",
      birthday: "1859-11-30",
    },
    {
      slug: "liebermann",
      name: "Liebermann Lowell",
      chinese: "洛厄尔·李伯曼",
      birthday: "1961-02-22",
    },
    {
      slug: "ligeti",
      name: "Ligeti Gyorgy",
      chinese: "乔治·李盖蒂",
      birthday: "1923-05-28",
    },
    {
      slug: "liszt",
      name: "Liszt Franz",
      chinese: "弗兰茨·李斯特",
      birthday: "1811-10-22",
    },
    {
      slug: "lutoslawski",
      name: "Lutoslawski Witold",
      chinese: "维托尔德·卢托斯拉夫斯基",
      birthday: "1913-01-25",
    },
  ],

  m: [
    {
      slug: "macdowell",
      name: "MacDowell Edward Alexander",
      chinese: "爱德华·亚力山大·麦克道威尔",
      birthday: "1860-12-18",
    },
    {
      slug: "mahler",
      name: "Mahler Gustav",
      chinese: "古斯塔夫·马勒",
      birthday: "1860-07-07",
    },
    {
      slug: "martin",
      name: "Martin Frank",
      chinese: "弗兰克·马丁",
      birthday: "1890-09-15",
    },
    {
      slug: "martinu",
      name: "Martinu Bohuslav",
      chinese: "波哈斯拉夫·马尔蒂努",
      birthday: "1890-12-08",
    },
    {
      slug: "massenet",
      name: "Massenet Jules Emile",
      chinese: "朱尔斯·埃米尔·马斯涅",
      birthday: "1842-05-12",
    },
    {
      slug: "medtner",
      name: "Medtner Nikolai Karlovich",
      chinese: "尼古拉斯·卡洛维奇·梅特纳",
      birthday: "1880-01-05",
    },
    {
      slug: "mehul",
      name: "Mehul Etienne Nicolas",
      chinese: "艾蒂安·尼古拉斯·梅于尔",
      birthday: "1763-06-22",
    },
    {
      slug: "mendelssohn",
      name: "Mendelssohn Felix",
      chinese: "菲利克斯·门德尔松-巴托尔迪",
      birthday: "1809-02-03",
    },
    {
      slug: "messiaen",
      name: "Messiaen Olivier",
      chinese: "奥利维埃·梅西安",
      birthday: "1908-12-10",
    },
    {
      slug: "meyerbeer",
      name: "Meyerbeer Giacomo",
      chinese: "吉亚克莫·迈耶贝尔",
      birthday: "1791-09-05",
    },
    {
      slug: "milhaud",
      name: "Milhaud Darius",
      chinese: "达律斯·米约",
      birthday: "1892-09-04",
    },
    {
      slug: "mompou",
      name: "Mompou Federico",
      chinese: "费德里克·蒙波",
      birthday: "1893-04-16",
    },
    {
      slug: "moscheles",
      name: "Moscheles Ignaz",
      chinese: "伊格纳茨·莫舍勒斯",
      birthday: "1794-05-23",
    },
    {
      slug: "moszkowski",
      name: "Moszkowski Moritz",
      chinese: "莫里兹·莫什科夫斯基",
      birthday: "1854-08-23",
    },
    {
      slug: "mozart",
      name: "Mozart Wolfgang Amadeus",
      chinese: "沃尔夫冈·阿玛多伊斯·莫扎特",
      birthday: "1756-01-27",
    },
    {
      slug: "muczynski",
      name: "Muczynski Robert",
      chinese: "罗伯特·穆钦斯基",
      birthday: "1929-03-19",
    },
    {
      slug: "musorgsky",
      name: "Musorgsky Modest Petrovich",
      chinese: "莫蒂斯特·彼得罗维奇·穆索尔斯基",
      birthday: "1839-03-21",
    },
    {
      slug: "myaskovsky",
      name: "Myaskovsky Nikolai",
      chinese: "尼古拉·米亚斯科夫斯基",
      birthday: "1881-04-20",
    },
  ],

  n: [
    {
      slug: "nielsen",
      name: "Nielsen Carl August",
      chinese: "卡尔·奥古斯特·尼尔森",
      birthday: "1865-06-09",
    },
    {
      slug: "nyman",
      name: "Nyman Michael",
      chinese: "米歇尔·尼曼",
      birthday: "1944-03-23",
    },
  ],

  o: [
    {
      slug: "oesten",
      name: "Oesten Theodor",
      chinese: "狄奥多·奥斯丁",
      birthday: "1813-10-31",
    },
    {
      slug: "onslow",
      name: "Onslow George",
      chinese: "乔治·翁斯洛",
      birthday: "1784-07-27",
    },
    {
      slug: "orff",
      name: "Orff Carl",
      chinese: "卡尔·奥尔夫",
      birthday: "1895-07-10",
    },
    {
      slug: "ornstein",
      name: "Ornstein Leo",
      chinese: "里奥·奥恩斯坦",
      birthday: "1892-12-02",
    },
  ],

  p: [
    {
      slug: "pachelbel",
      name: "Pachelbel Johann",
      chinese: "约翰·帕赫贝尔",
      birthday: "1653-09-01",
    },
    {
      slug: "paderewski",
      name: "Paderewski Ignacy Jan",
      chinese: "伊格南希·简·帕德雷夫斯基",
      birthday: "1860-11-18",
    },
    {
      slug: "palmgren",
      name: "Palmgren Selim",
      chinese: "塞林姆·帕姆格伦",
      birthday: "1878-02-13",
    },
    {
      slug: "peterson",
      name: "Peterson Oscar",
      chinese: "奥斯卡·彼得森",
      birthday: "1925-08-15",
    },
    {
      slug: "philipp",
      name: "Philipp Isidore",
      chinese: "伊西多尔·菲利普",
      birthday: "1863-09-02",
    },
    {
      slug: "piazzolla",
      name: "Piazzolla Astor",
      chinese: "亚斯托尔·皮亚佐拉",
      birthday: "1921-03-11",
    },
    {
      slug: "pierne",
      name: "Pierne Gabriel",
      chinese: "加布里埃尔·皮尔纳",
      birthday: "1863-08-16",
    },
    {
      slug: "pischna",
      name: "Pischna Josef",
      chinese: "约瑟夫·皮史纳",
      birthday: "1826-06-19",
    },
    {
      slug: "poulenc",
      name: "Poulenc Francis",
      chinese: "弗朗西斯·普朗克",
      birthday: "1899-01-07",
    },
    {
      slug: "pratch",
      name: "Pratch Iwan",
      chinese: "伊万·普拉齐",
      birthday: "1749-01-01",
    },
    {
      slug: "prokofiev",
      name: "Prokofiev Sergei",
      chinese: "谢尔盖·普罗科菲耶夫",
      birthday: "1891-04-23",
    },
  ],

  r: [
    {
      slug: "rachmaninoff",
      name: "Rachmaninoff Sergei",
      chinese: "谢尔盖·拉赫玛尼诺夫",
      birthday: "1873-04-01",
    },
    {
      slug: "raff",
      name: "Raff Joseph Joachim",
      chinese: "约瑟夫·乔西姆·拉夫",
      birthday: "1822-05-27",
    },
    {
      slug: "rameau",
      name: "Rameau Jean-Philippe",
      chinese: "让-菲利普·拉摩",
      birthday: "1683-09-25",
    },
    {
      slug: "ravel",
      name: "Ravel Maurice",
      chinese: "莫里斯·拉威尔",
      birthday: "1875-03-07",
    },
    {
      slug: "reger",
      name: "Reger Max",
      chinese: "马克斯·雷格",
      birthday: "1873-03-19",
    },
    {
      slug: "reinhold",
      name: "Reinhold Hugo",
      chinese: "莱茵赫德",
      birthday: "1854-03-03",
    },
    {
      slug: "respighi",
      name: "Respighi Ottorino",
      chinese: "奥托里诺·雷斯庇基",
      birthday: "1879-07-09",
    },
    {
      slug: "rimskykorsakov",
      name: "Rimsky-Korsakov Nikolai",
      chinese: "里姆斯基-柯萨科夫",
      birthday: "1844-03-18",
    },
    {
      slug: "rodrigo",
      name: "Rodrigo Joaquin",
      chinese: "华金·罗德里戈",
      birthday: "1901-11-22",
    },
    {
      slug: "rossini",
      name: "Rossini Gioachino",
      chinese: "吉奥阿基诺·罗西尼",
      birthday: "1792-02-29",
    },
    {
      slug: "rubinstein",
      name: "Rubinstein Anton",
      chinese: "安东·鲁宾斯坦",
      birthday: "1829-11-28",
    },
    {
      slug: "rzewski",
      name: "Rzewski Frederic",
      chinese: "弗雷德里克·列夫斯基",
      birthday: "1938-04-13",
    },
  ],

  s: [
    {
      slug: "saintsaens",
      name: "Saint-Saens Camille",
      chinese: "卡米耶·圣-桑",
      birthday: "1835-10-09",
    },
    {
      slug: "satie",
      name: "Satie Erik",
      chinese: "埃里克·萨蒂",
      birthday: "1866-05-17",
    },
    {
      slug: "sauer",
      name: "Sauer Emil von",
      chinese: "埃米尔·冯·绍尔",
      birthday: "1862-10-08",
    },
    {
      slug: "scarlatti",
      name: "Scarlatti Domenico",
      chinese: "朱塞佩·多梅尼科·斯卡拉蒂",
      birthday: "1685-10-26",
    },
    {
      slug: "scharwenka",
      name: "Scharwenka Xavier",
      chinese: "泽维尔·沙温卡",
      birthday: "1850-01-06",
    },
    {
      slug: "schoenberg",
      name: "Schoenberg Arnold",
      chinese: "阿诺德·勋伯格",
      birthday: "1874-09-13",
    },
    {
      slug: "schubert",
      name: "Schubert Franz",
      chinese: "弗兰茨·舒伯特",
      birthday: "1797-01-31",
    },
    {
      slug: "schumann",
      name: "Schumann Robert",
      chinese: "罗伯特·舒曼",
      birthday: "1810-06-08",
    },
    {
      slug: "schumannclara",
      name: "Schumann Clara Wieck",
      chinese: "克拉拉·维克·舒曼",
      birthday: "1819-09-13",
    },
    {
      slug: "scriabin",
      name: "Scriabin Alexander",
      chinese: "亚力山大·斯克里亚宾",
      birthday: "1872-01-06",
    },
    {
      slug: "sgambati",
      name: "Sgambati Giovanni",
      chinese: "乔瓦尼·斯甘巴蒂",
      birthday: "1841-05-28",
    },
    {
      slug: "shchedrin",
      name: "Shchedrin Rodion Konstantinovich",
      chinese: "康斯坦汀诺维奇·谢德林",
      birthday: "1932-12-16",
    },
    {
      slug: "shostakovich",
      name: "Shostakovich Dmitri",
      chinese: "德米特里·肖斯塔科维奇",
      birthday: "1906-09-25",
    },
    {
      slug: "sibelius",
      name: "Sibelius Jean",
      chinese: "简·西贝柳斯",
      birthday: "1865-12-08",
    },
    {
      slug: "sinding",
      name: "Sinding Christian",
      chinese: "克里斯蒂安·辛丁",
      birthday: "1856-01-11",
    },
    {
      slug: "smetana",
      name: "Smetana Bedrich",
      chinese: "贝德瑞赫·斯美塔那",
      birthday: "1824-03-02",
    },
    {
      slug: "soler",
      name: "Soler Padre Antonio",
      chinese: "帕德鲁·安东尼奥·索勒",
      birthday: "1729-12-03",
    },
    {
      slug: "sorabji",
      name: "Sorabji Kaikhosru Shapurji",
      chinese: "凯克豪斯鲁·沙帕吉·索拉布吉",
      birthday: "1892-08-14",
    },
    {
      slug: "sousa",
      name: "Sousa John Philip",
      chinese: "约翰·菲力浦·苏萨",
      birthday: "1854-11-06",
    },
    {
      slug: "stanchinsky",
      name: "Stanchinsky Alexei",
      chinese: "阿力克西·斯坦钦斯基",
      birthday: "1888-03-09",
    },
    {
      slug: "stockhausen",
      name: "Stockhausen Karlheinz",
      chinese: "卡尔海因兹·施托克豪森",
      birthday: "1928-08-22",
    },
    {
      slug: "stojowski",
      name: "Stojowski Zygmunt",
      chinese: "西基斯蒙德·斯托霍夫斯基",
      birthday: "1870-05-04",
    },
    {
      slug: "straussjohann",
      name: "Strauss Johann",
      chinese: "约翰·施特劳斯",
      birthday: "1825-10-25",
    },
    {
      slug: "straussrichard",
      name: "Strauss Richard",
      chinese: "理查德·施特劳斯",
      birthday: "1864-06-11",
    },
    {
      slug: "stravinsky",
      name: "Stravinsky Igor",
      chinese: "伊戈尔·斯特拉文斯基",
      birthday: "1882-06-17",
    },
    {
      slug: "suk",
      name: "Suk Josef",
      chinese: "约瑟夫·苏克",
      birthday: "1874-01-04",
    },
    {
      slug: "szymanowski",
      name: "Szymanowski Karol",
      chinese: "卡罗·席曼诺夫斯基",
      birthday: "1882-10-03",
    },
  ],

  t: [
    {
      slug: "takemitsu",
      name: "Takemitsu Toru",
      chinese: "武满彻",
      birthday: "1930-10-08",
    },
    {
      slug: "taneyev",
      name: "Taneyev Sergei Ivanovich",
      chinese: "谢尔盖·伊凡诺维奇·塔涅耶夫",
      birthday: "1856-11-25",
    },
    {
      slug: "tansman",
      name: "Tansman Alexandre",
      chinese: "亚历山大·汤斯曼",
      birthday: "1897-06-12",
    },
    {
      slug: "tausig",
      name: "Tausig Carl",
      chinese: "卡尔·陶西格",
      birthday: "1841-11-04",
    },
    {
      slug: "tchaikovsky",
      name: "Tchaikovsky Pyotr Ilyich",
      chinese: "彼得·伊利奇·柴可夫斯基",
      birthday: "1840-05-07",
    },
    {
      slug: "tcherepnin",
      name: "Tcherepnin Alexander",
      chinese: "亚历山大·齐尔品",
      birthday: "1899-01-21",
    },
    {
      slug: "thalberg",
      name: "Thalberg Sigismond",
      chinese: "西伊斯蒙德·塔尔贝格",
      birthday: "1812-01-08",
    },
    {
      slug: "trutovsky",
      name: "Trutovsky Vasily Fyodorovich",
      chinese: "瓦西里·佛多洛维其·特鲁托夫斯基",
      birthday: "1740-01-01",
    },
    {
      slug: "turina",
      name: "Turina Joaquin",
      chinese: "华金·图里纳",
      birthday: "1882-12-09",
    },
  ],

  u: [
    {
      slug: "ustvolskaya",
      name: "Ustvolskaya Galina",
      chinese: "嘉莉娜·乌斯特沃尔斯卡娅",
      birthday: "1919-06-17",
    },
  ],

  v: [
    {
      slug: "verdi",
      name: "Verdi Giuseppe",
      chinese: "居塞比·威尔第",
      birthday: "1813-10-10",
    },
    {
      slug: "villalobos",
      name: "Villa-Lobos Heitor",
      chinese: "海托尔·维拉-罗勃斯",
      birthday: "1887-03-05",
    },
    {
      slug: "vivaldi",
      name: "Vivaldi Antonio",
      chinese: "安东尼奥·维瓦尔第",
      birthday: "1678-03-04",
    },
    {
      slug: "vladigerov",
      name: "Vladigerov Pancho",
      chinese: "潘乔·弗拉季格罗夫",
      birthday: "1899-03-13",
    },
  ],

  w: [
    {
      slug: "wagner",
      name: "Wagner Richard",
      chinese: "理查德·瓦格纳",
      birthday: "1813-05-22",
    },
    {
      slug: "weber",
      name: "Weber Carl Maria Von",
      chinese: "卡尔·玛利亚·冯·韦伯",
      birthday: "1786-11-18",
    },
    {
      slug: "webern",
      name: "Webern Anton",
      chinese: "安东·韦伯恩",
      birthday: "1883-12-03",
    },
    {
      slug: "widor",
      name: "Widor Charles-Marie",
      chinese: "维多尔",
      birthday: "1844-02-21",
    },
  ],

  x: [
    {
      slug: "xenakis",
      name: "Xenakis Iannis",
      chinese: "雅尼斯·希纳基斯",
      birthday: "1922-05-29",
    },
  ],

  z: [
    {
      slug: "zemlinsky",
      name: "Zemlinsky Alexander",
      chinese: "亚历山大·封·泽姆林斯基",
      birthday: "1871-10-14",
    },
    {
      slug: "zipoli",
      name: "Zipoli Domenico",
      chinese: "多门尼科·齐波利",
      birthday: "1688-10-17",
    },
  ],
};
export default function LetterPage() {
  const params = useParams();

  const letter = String(params.letter);

  const list = composers[letter] || [];

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-6 py-8">
      {/* 返回 */}
      <div className="flex justify-between mb-10">
        <Link
          href="/sheet"
          className="text-base opacity-60 hover:opacity-40 transition"
        >
          作曲家索引页
        </Link>

        <Link
          href="/"
          className="text-base opacity-60 hover:opacity-40 transition"
        >
          首页
        </Link>
      </div>

      {/* 标题 */}
      <h1
        className="
    text-[115px]
    leading-none
    font-bold
    tracking-tight
    uppercase
    mb-8
    -ml-[1px]
  "
      >
        {letter}
      </h1>

      {/* 作曲家列表 */}
      <div className="space-y-5">
        {list.map((composer) => (
          <Link
            key={composer.slug}
            href={`/sheet/${letter}/${composer.slug}`}
            className="   apple-card   tap-effect   block   px-6   py-5 "
          >
            <h2 className="text-2xl md:text-3xl font-semibold leading-relaxed">
              {composer.name}
            </h2>

            <p className="opacity-55 text-base md:text-lg mt-1 leading-relaxed">
              {composer.chinese}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
