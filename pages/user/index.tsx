import React, { useEffect } from 'react';
import { Popover, Table } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '@/modules/hooks';
import { getUserLaboratory } from '@/modules/user/laboratory/laboratory.services';

import style from './index.module.css';
import { config } from '@/boot/config';

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
  console.log(config.HOST, 'hhe')

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
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Table dataSource={laboratories} columns={columns} loading={loading} />
    </div>
  );
};

export default User;
