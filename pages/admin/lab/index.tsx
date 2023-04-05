import React, { useEffect } from 'react';
import { Input, Popover, Select, Table, Tag } from 'antd';

import { getAdminLabUsage } from '@/modules/admin/dashboard/dashboard.services';
import { useAppDispatch, useAppSelector } from '@/modules/hooks';

import style from './lab.module.css';

const columns = [
  {
    title: 'Сургууль',
    dataIndex: 'school',
    key: 'school',
  },
  {
    title: 'Давхар',
    dataIndex: 'floor',
    key: 'floor',
  },
  {
    title: 'Лабораториын ангийн дугаар',
    dataIndex: 'room',
    key: 'room',
  },
  {
    title: 'Хариуцсан багшийн нэр',
    dataIndex: 'teacher',
    key: 'teacher',
    render: (_, record) => (
      <Popover
        content={
          <>
            <div className={style.flex}>
              <div>Овог:</div>
              <div>{record?.teacher?.last_name}</div>
            </div>
            <div className={style.flex}>
              <div>Нэр:</div>
              <div>{record?.teacher?.first_name}</div>
            </div>
            <div className={style.flex}>
              <div>Утас:</div>
              <div>{record?.teacher?.phone}</div>
            </div>
            <div className={style.flex}>
              <div>email:</div>
              <div>{record?.teacher?.email}</div>
            </div>
          </>
        }
        title="Багшийн мэдээлэл"
        trigger="click"
      >
        <a>{record?.teacher?.first_name}</a>
      </Popover>
    ),
  },
  {
    title: 'Төлөв',
    dataIndex: 'inUse',
    key: 'inUse',
    render: (_, record) => (
      <Tag color={record?.inUse ? 'success' : 'warning'}>{record?.inUse ? 'Ашиглагдаж байна' : 'Ашиглагдаагүй'}</Tag>
    ),
  },
];

const Index = () => {
  const { loadingLab, labUsages } = useAppSelector((state) => state.adminHomeReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAdminLabUsage({ pageNum: 0, pageSize: 0 }));
  }, []);
  return (
    <div>
      <div className={style.header}>
        <div>
          Анги:
          <Select placeholder="сонгоно уу" style={{ marginLeft: '10px', width: '200px' }} />
        </div>
        <Input placeholder="Хайх" style={{ width: '200px' }} />
      </div>
      <Table dataSource={labUsages} columns={columns} loading={loadingLab} />
    </div>
  );
};

export default Index;
