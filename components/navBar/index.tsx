import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import style from "./navbar.module.css";

// bell.png
// info.png
// menu1black.png
// menu2black.png
// menu3black.png
// menu4black.png
const NavBar = () => {
  const route = useRouter();
  console.log(route.pathname);

  function Title() {
    switch (route.pathname) {
      case "/admin":
        return "Эхлэх";
        break;
      case "/admin/register":
        return "Бүртгэл";
        break;
      case "/admin/lab":
        return "Лаборатор ашиглалт";
        break;
      case "/admin/list":
        return "Жагсаалт";
        break;
      case "/admin/userRegister":
        return "Хэрэглэгчийн бүртгэл";
        break;
      case "/admin/orderList":
        return "Захиалгын жагсаалт";
        break;
      default:
        return "Эхлэх";
    }
  }
  function Icon() {
    switch (route.pathname) {
      case "/admin":
        return "/icons/menu1black.png";
        break;
      case "/admin/register":
        return "/icons/menu2black.png";
        break;
      case "/admin/lab":
        return "/icons/menu3black.png";
        break;
      case "/admin/list":
        return "/icons/menu4black.png";
        break;
      case "/admin/userRegister":
        return "/icons/menu3black.png";
        break;
      case "/admin/orderList":
        return "/icons/menu4black.png";
        break;
      default:
        return "/icons/menu1black";
    }
  }
  return (
    <div className={style.container}>
      <div className={style.title}>
        <div>
          {Title()}
          <Image
            src={Icon()}
            alt=""
            width={25}
            height={25}
            style={{ marginLeft: "15px" }}
          />
        </div>
        <div style={{ fontSize: "15px", color: "gray" }}>
          Дэлгэрэнгүй мэдээлэл
          <Image
            src="/icons/more.png"
            alt=""
            width={15}
            height={10}
            style={{ marginLeft: "5px" }}
          />
        </div>
      </div>

      <div className={style.pro}>
        <Image src="/icons/info.png" alt="" width={35} height={35} />
        <Image src="/icons/bell.png" alt="" width={35} height={35} />
        <Image
          src="/icons/menu1black.png"
          alt=""
          width={35}
          height={35}
          style={{ borderRadius: "16px" }}
        />
      </div>
    </div>
  );
};

export default NavBar;
