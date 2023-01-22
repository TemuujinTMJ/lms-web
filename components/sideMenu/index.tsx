import Image from "next/image";
import React from "react";
import style from "./sidemenu.module.css";

import bg from "../../public/images/menu.png";
import Link from "next/link";
const SideMenu = () => {
  return (
    <div className={style.container}>
      <Image
        src="/images/shutis.png"
        alt=""
        width={80}
        height={160}
        style={{ alignSelf: "center" }}
      />
      <div
        style={{
          backgroundImage: `url(${bg.src})`,
          width: "96px",
          height: "690px",
          marginTop: "-80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <Link href='/admin' className={style.menuItem}>
          <Image
            src="/icons/menu1.png"
            alt=""
            width={25}
            height={25}
            style={{ margin: "20px 0px 0px 20px" }}
          />
          Эхлэл
        </Link>
        <Link href="/admin/register" className={style.menuItem}>
          <Image
            src="/icons/menu2.png"
            alt=""
            width={25}
            height={25}
            style={{ margin: "20px 0px 0px 20px" }}
          />
          Бүртгэл
        </Link>
        <Link href="/admin/lab" className={style.menuItem}>
          <Image
            src="/icons/menu3.png"
            alt=""
            width={25}
            height={25}
            style={{ margin: "20px 0px 0px 20px" }}
          />
          Лаборатор ашиглалт
        </Link>
        <Link href="/admin/list" className={style.menuItem}>
          <Image
            src="/icons/menu4.png"
            alt=""
            width={25}
            height={25}
            style={{ margin: "20px 0px 0px 20px" }}
          />
          Жагсаалт
        </Link>
        <Link href="/admin/userRegister" className={style.menuItem}>
          <Image
            src="/icons/menu3.png"
            alt=""
            width={25}
            height={25}
            style={{ margin: "20px 0px 0px 20px" }}
          />
          Хэрэглэгчийн бүртгэл
        </Link>
        <Link href="/admin/orderList" className={style.menuItem}>
          <Image
            src="/icons/menu4.png"
            alt=""
            width={25}
            height={25}
            style={{ margin: "20px 0px 0px 20px" }}
          />
          Захиалгын жагсаалт
        </Link>
      </div>

      <Image
        src="/icons/settings.png"
        alt=""
        width={30}
        height={30}
        style={{ margin: "20px 0px 0px 20px" }}
      />
    </div>
  );
};

export default SideMenu;
