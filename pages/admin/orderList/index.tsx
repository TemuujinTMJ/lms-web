import React from 'react';
import { Input, Select, Table, Tag } from 'antd';

import style from './orderlist.module.css';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
    tag: <Tag color="error">used</Tag>,
    delete: <a>цуцлах</a>,
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
    tag: <Tag color="success">using</Tag>,
    delete: <a>цуцлах</a>,
  },
];

const columns = [
  {
    title: 'Id',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Нэр',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Захиалсан өдөр',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Захиалга дуусах өдөр',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Төхөөрөмжийн төрөл',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Тайлбар',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Хариуцаж буй багш',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'анги',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Төлөв',
    dataIndex: 'tag',
    key: 'tag',
  },
  {
    title: '',
    dataIndex: 'delete',
    key: 'delete',
  },
];

const index = () => {
  return (
    <div>
      <div className={style.header}>
        <div>
          Анги:
          <Select placeholder="сонгоно уу" style={{ marginLeft: '10px', width: '200px' }} />
        </div>
        <Input placeholder="Хайх" style={{ width: '200px' }} />
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default index;
