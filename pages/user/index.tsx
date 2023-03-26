import React, { useEffect } from 'react';
import { Table } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/modules/hooks';
import { getUserLaboratory } from '@/modules/user/laboratory/laboratory.services';

const User = () => {
  const router = useRouter();
  const { laboratories, loading } = useAppSelector((state) => state.userLaboratoryReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getUserLaboratory({
        pageSize: 20,
        pageNum: 0,
      }),
    );
  }, []);

  const columns = [
    {
      title: 'Сургууль',
      dataIndex: 'school',
      key: 'school',
      render: (_, record) => <Link href={`${router.asPath}/${record?._id}`}>{record?.school}</Link>,
    },
    {
      title: 'Давхар',
      dataIndex: 'floor',
      key: 'floor',
    },
    {
      title: 'Лабораторын ангийн дугаар',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: 'Лабораторын нэршил',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'лаборант хариуцагч',
      dataIndex: 'teacher',
      key: 'teacher',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Table dataSource={laboratories} columns={columns} loading={loading} />
    </div>
  );
};

export default User;
