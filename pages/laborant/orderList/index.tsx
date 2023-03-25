import React from 'react';
import { Table } from 'antd';

import style from './userRegister.module.css';

const dataSource = [
  {
    key: '1',
    name: 'Э.Тэнгис',
    code: 'В201900002',
    device: 'IMAC',
    date: '2023-02-08 15:30-16:30 ',
    class: '315',
    DeviceDamage: 'Одоогоор байхгүй',
    description: 'Бие даалт хийх',
    delete: (
      <>
        <a>хасах</a> <a>нэмэх</a>
      </>
    ),
  },
];

const columns = [
  {
    title: 'Захиалга өгсөн оюутны нэр',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Оюутны код',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Хэрэглэх төхөөрөмж',
    dataIndex: 'device',
    key: 'device',
  },
  {
    title: 'Хугацаагаа',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Анги',
    dataIndex: 'class',
    key: 'class',
  },
  {
    title: 'Төхөөрөмжийн гэмтэл',
    dataIndex: 'DeviceDamage',
    key: 'DeviceDamage',
  },
  {
    title: 'Мэдэгдэл',
    dataIndex: 'description',
    key: 'description',
  },

  {
    title: 'Батгаажуулалт',
    dataIndex: 'delete',
    key: 'delete',
  },
];

const Index = () => {
  return (
    <div>
      <div className={style.header}>
        <div className={style.cards}>
          <div className={style.card}>Захиалгууд</div>
          <div className={style.card}>Баталгаажуулсан захиалга харах</div>
          <div className={style.card}>Цуцалсан захиалга</div>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Index;
