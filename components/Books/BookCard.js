import { useEffect, useState } from "react";

import { db } from "../../firebase";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// install Swiper modules
import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  Autoplay,
} from "swiper";
import "swiper/swiper-bundle.css";
import { StarIcon } from "@heroicons/react/outline";
import * as solid from "@heroicons/react/solid";

SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade, EffectCube]);

// db.collection("books").get();

export default function BookCard() {
  const i = [1, 2, 3, 4, 5];
  const image = [6, 7, 8, 9, 10];
  const [books, setBooks] = useState([]);

  const ibooks = [
    {
      id: "001",
      judul: "Ke Mana Larinya Harta Bersama Setelah Perceraian",
      penulis: "Verlyta Swislyn, S.H., M.Kn",
      image: "./images/books/Harta-Perceraian.jpg",
      deskripsi:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque enim culpa alias explicabo dolorem ex corporis excepturi officia, sed, natus, dignissimos velit. Repellendus sunt optio, soluta exercitationem quas mollitia voluptatum!",
    },
    {
      id: "002",
      judul: "Pengantar Hukum Indonesia (edisi Revisi)",
      penulis: "R. Abdoel Djamali, S.H.",
      image: "./images/books/Pengantar-hukum.jpg",
      deskripsi:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque enim culpa alias explicabo dolorem ex corporis excepturi officia, sed, natus, dignissimos velit. Repellendus sunt optio, soluta exercitationem quas mollitia voluptatum!",
    },
    {
      id: "003",
      judul: "Ujian Profesi Advokat",
      penulis: "Andika Wijaya dan Wida Peace Ananta",
      image: "./images/books/Ujian-advokat.jpg",
      deskripsi:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque enim culpa alias explicabo dolorem ex corporis excepturi officia, sed, natus, dignissimos velit. Repellendus sunt optio, soluta exercitationem quas mollitia voluptatum!",
    },
    {
      id: "004",
      judul: "Undang Undang Dasar Negara Republik Indonesia 1945",
      penulis: "DPR RI",
      image: "./images/books/UUD-45.png",
      deskripsi:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque enim culpa alias explicabo dolorem ex corporis excepturi officia, sed, natus, dignissimos velit. Repellendus sunt optio, soluta exercitationem quas mollitia voluptatum!",
    },
    {
      id: "005",
      judul: "Hukum Administrasi Negara",
      penulis: "DR. Ridwan Har",
      image: "./images/books/Hukum-Administrasi.jpg",
      deskripsi:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque enim culpa alias explicabo dolorem ex corporis excepturi officia, sed, natus, dignissimos velit. Repellendus sunt optio, soluta exercitationem quas mollitia voluptatum!",
    },
    {
      id: "006",
      judul: "Kompilasi Surat/Kontrak Perjanjian Terpilih",
      penulis: "Andika Wijaya Wida Peace Ananta",
      image: "./images/books/Kontrak.jpg",
      deskripsi:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque enim culpa alias explicabo dolorem ex corporis excepturi officia, sed, natus, dignissimos velit. Repellendus sunt optio, soluta exercitationem quas mollitia voluptatum!",
    },
    {
      id: "007",
      judul: "Politik Hukum di Indonesia",
      penulis: "Prof. DR. Moh. Mahfud MD",
      image: "./images/books/Politik-hukum.jpg",
      deskripsi:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque enim culpa alias explicabo dolorem ex corporis excepturi officia, sed, natus, dignissimos velit. Repellendus sunt optio, soluta exercitationem quas mollitia voluptatum!",
    },
    {
      id: "008",
      judul: "Pengantar Ilmu Hukum Tata Negara",
      penulis: "Prof. Dr. Jimly Asshiddiqie, SH",
      image: "./images/books/Tata-negara.jpg",
      deskripsi:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque enim culpa alias explicabo dolorem ex corporis excepturi officia, sed, natus, dignissimos velit. Repellendus sunt optio, soluta exercitationem quas mollitia voluptatum!",
    },
    {
      id: "009",
      judul: "Sebuah Seni Untuk Bersikap Bodo Amat",
      penulis: "Mark Manson",
      image: "./images/books/Bodo-amat.jpg",
      deskripsi:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque enim culpa alias explicabo dolorem ex corporis excepturi officia, sed, natus, dignissimos velit. Repellendus sunt optio, soluta exercitationem quas mollitia voluptatum!",
    },
  ];
  const bg = [
    "bg-rose-200",
    "bg-fuchsia-200",
    "bg-indigo-200",
    "bg-teal-200",
    // "bg-lime-200",
    // "bg-orange-200",
    // "bg-emerald-200",
    // "bg-cyan-200",
    // "bg-violet-200",
    "bg-amber-200",
  ];
  useEffect(() => {
    db.collection("books")
      .orderBy("judul")
      .onSnapshot((snapshoot) => {
        setBooks(snapshoot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
  }, []);

  return (
    <div>
      <Swiper
        breakpoints={{
          640: { slidesPerView: 1 },
          800: { slidesPerView: 2 },
        }}
        navigation
        spaceBetween={2}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="mySwiper"
      >
        {/* Swiper Slide Items */}
        {books.map((book, index) => (
          <SwiperSlide key={index}>
            <div className="h-80 flex">
              <div
                className={`w-full px-5 py-7 h-64 ${
                  bg[Math.floor(Math.random() * bg.length)]
                } flex justify-center`}
              >
                <div className="flex items-start">
                  <div className="w-40 mr-4 rounded-sm">
                    <img
                      src={book.bookImage}
                      alt={book.judul}
                      className="flex-shrink-0 shadow-lg"
                    />
                  </div>
                </div>
                <div className="w-2/3 text-md text-white ">
                  <h4 className="font-semibold text-md line-clamp-1">
                    {book.judul}
                  </h4>
                  <p className="text-gray-50 line-clamp-1">
                    by: {book.penulis}
                  </p>

                  {/* Stars Icons */}
                  <div className="flex items-center space-x-1 mb-2 mt-1">
                    {i.map((x) => (
                      <StarIcon className="h-4 w-4" key={x.toString()} />
                    ))}
                    <p className="pl-3 line-clamp-1 text-xs">1,983 votes</p>
                  </div>

                  <p className="line-clamp-3 md:line-clamp-2 lg:line-clamp-3 text-sm">
                    {book.deskripsi}
                  </p>
                  <a
                    href="#"
                    className="mt-5 py-2 px-9 text-sm rounded-full text-gray-400 font-semibold shadow-lg tracking-wide inline-block bg-white"
                  >
                    See The Book
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Popular Books */}
      <div className="px-5 bg-gray-100">
        <p className="text-gray-600 font-semibold text-md block border-b pb-3 border-gray-300">
          Buku Terbaru
        </p>

        <div className="mt-9 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3">
          {/* Book Card White */}
          {books.map((book, index) => (
            <div key={index} className="mt-10 bg-white shadow-md">
              <div className="px-4 py-4 mt-10 md:mt-0 flex space-x-4">
                <img
                  className="-mt-10 md:-mt-12 w-40 object-cover object-top shadow-lg"
                  src={book.bookImage}
                  alt="Kemana larinya harta bersama setelah perceraian"
                />

                <div className="text-sm text-gray-700">
                  <h4 className="text-base font-semibold line-clamp-1">
                    {book.judul}
                    Lorem ipsum dolor sit amet.
                  </h4>
                  <p className="text-gray-400">by: {book.penulis}</p>
                  <div className="mt-1 flex text-gray-300">
                    {/* {i.map((y, index) => ( */}
                    <div>
                      <solid.StarIcon className="mt-1 h-4 w-4 text-orange-300" />
                    </div>
                    <div>
                      <solid.StarIcon className="mt-1 h-4 w-4 text-orange-300" />
                    </div>
                    <div>
                      <solid.StarIcon className="mt-1 h-4 w-4 text-orange-300" />
                    </div>
                    <div>
                      <solid.StarIcon className="mt-1 h-4 w-4 text-orange-300" />
                    </div>
                    {/* ))} */}
                  </div>
                  <p className="mt-3 text-gray-400 line-clamp-4">
                    {book.deskripsi}
                  </p>
                </div>
              </div>

              <div className="px-4 py-2 border-gray-300 border-t flex items-center space-x-4">
                <div className="flex -space-x-3">
                  {image.map((e, index) => (
                    <img
                      className="w-9 h-9 rounded-full shadow-lg border-2 border-white"
                      key={index}
                      src={`https://randomuser.me/api/portraits/thumb/women/${e}.jpg`}
                      alt="username"
                    />
                  ))}
                </div>
                <p className="text-gray-400 text-xs">
                  <span className="font-semibold">Silvi </span>
                  and
                  <span className="font-semibold"> 2 lainnya </span>
                  meminjam buku ini
                </p>
              </div>
            </div>
          ))}
          {/* here it's end */}
        </div>
      </div>
    </div>
  );
}
