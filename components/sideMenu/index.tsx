import React from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import bg from '../../public/images/menu.png';
import style from './sidemenu.module.css';

const SideMenu = () => {
  const router = useRouter();
  return (
    <div className={style.container}>
      <Image src="/images/shutis.png" alt="" width={80} height={160} style={{ alignSelf: 'center' }} />
      {router.asPath[1] === 'a' ? (
        <div
          style={{
            backgroundImage: `url(${bg.src})`,
            width: '96px',
            height: '690px',
            marginTop: '-80px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Link href="/admin" className={style.menuItem}>
            <Image src="/icons/menu1.png" alt="" width={25} height={25} style={{ margin: '20px 0px 0px 20px' }} />
            Эхлэл
          </Link>
          <Link href="/admin/register" className={style.menuItem}>
            <Image src="/icons/menu2.png" alt="" width={25} height={25} style={{ margin: '20px 0px 0px 20px' }} />
            Бүртгэл
          </Link>
          <Link href="/admin/lab" className={style.menuItem}>
            <Image src="/icons/menu3.png" alt="" width={25} height={25} style={{ margin: '20px 0px 0px 20px' }} />
            Лаборатори ашиглалт
          </Link>
          <Link href="/admin/orderList" className={style.menuItem}>
            <Image src="/icons/menu4.png" alt="" width={25} height={25} style={{ margin: '20px 0px 0px 20px' }} />
            Захиалгын жагсаалт
          </Link>
        </div>
      ) : router.asPath[1] === 'l' ? (
        <div
          style={{
            backgroundImage: `url(${bg.src})`,
            width: '96px',
            height: '690px',
            marginTop: '-80px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Link href="/laborant" className={style.menuItem}>
            <Image src="/icons/menu1.png" alt="" width={25} height={25} style={{ margin: '20px 0px 0px 20px' }} />
            Эхлэл
          </Link>
          <Link href="/laborant/orderList" className={style.menuItem}>
            <Image src="/icons/menu2.png" alt="" width={25} height={25} style={{ margin: '20px 0px 0px 20px' }} />
            Захиалга харах
          </Link>
          {/* <Link href="/laborant/report" className={style.menuItem}>
            <Image src="/icons/menu4.png" alt="" width={25} height={25} style={{ margin: '20px 0px 0px 20px' }} />
            Тайлан
          </Link> */}
        </div>
      ) : (
        <div
          style={{
            backgroundImage: `url(${bg.src})`,
            width: '96px',
            height: '690px',
            marginTop: '-80px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Link href="/user" className={style.menuItem}>
            <Image src="/icons/menu1.png" alt="" width={25} height={25} style={{ margin: '20px 0px 0px 20px' }} />
            Эхлэл
          </Link>
          <Link href="/user/orders" className={style.menuItem}>
            <Image src="/icons/menu2.png" alt="" width={25} height={25} style={{ margin: '20px 0px 0px 20px' }} />
            Захиалгууд
          </Link>
        </div>
      )}

      <Image src="/icons/settings.png" alt="" width={30} height={30} style={{ margin: '20px 0px 0px 20px' }} />

      <Link href="/" onClick={() => Cookies.remove('token')}>
        <Image src="/icons/logout.png" alt="" width={30} height={30} style={{ margin: '20px 0px 0px 20px' }} />
      </Link>
    </div>
  );
};

export default SideMenu;
