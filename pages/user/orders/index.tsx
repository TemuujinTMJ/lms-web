import React, { useEffect } from 'react';
import { Button, Popconfirm, Popover, Table, Tag } from 'antd';
import moment from 'moment';

import { useAppDispatch, useAppSelector } from '@/modules/hooks';
import { deleteUserRequest, getUserRequest } from '@/modules/user/order/order.services';

import style from './orderlist.module.css';

const Index = () => {
  const hours = [
    { hour: '09:00-10:00', value: 0 },
    { hour: '08:00-09:00', value: 1 },
    { hour: '10:00-11:00', value: 2 },
    { hour: '11:00-12:00', value: 3 },
    { hour: '12:00-13:00', value: 4 },
    { hour: '13:00-14:00', value: 5 },
    { hour: '14:00-15:00', value: 6 },
    { hour: '15:00-16:00', value: 7 },
    { hour: '16:00-17:00', value: 8 },
    { hour: '17:00-18:00', value: 9 },
    { hour: '18:00-19:00', value: 10 },
    { hour: '19:00-20:00', value: 11 },
  ];
  function getHourFromValue(value: number): string {
    const timeSlot = hours.find((slot) => slot.value === value);
    return timeSlot ? timeSlot.hour : '';
  }
  const columns = [
    {
      title: 'Сургууль',
      dataIndex: 'school',
      key: 'school',
      render: (_, record) => <>{record?.laboratory?.school}</>,
    },
    {
      title: 'Захиалга',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (_, record) => (
        <Popover
          content={record?.orders.map((d, key) => {
            return (
              <div
                key={key}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '200px',
                }}
              >
                <div>{moment(d?.date).format('YYYY-MM-DD')}</div>
                <div>{getHourFromValue(d?.hour)}</div>
              </div>
            );
          })}
          title="Захиалгын жагсаалт"
          trigger="click"
        >
          <Button>Захиалга харах</Button>
        </Popover>
      ),
    },
    {
      title: 'Давхар',
      dataIndex: 'floor',
      key: 'floor',
      render: (_, record) => <>{record?.laboratory?.floor}</>,
    },
    {
      title: 'Өрөө',
      dataIndex: 'class',
      key: 'class',
      render: (_, record) => <>{record?.laboratory?.room}</>,
    },
    {
      title: 'Тайлбар',
      dataIndex: 'class',
      key: 'class',
      render: (_, record) => (
        <Popover
          content={
            <div
              style={{
                width: '400px',
              }}
            >
              {record?.description}
            </div>
          }
          title="Захиалгын тайлбар"
          trigger="click"
        >
          <Button>Тайлбар харах</Button>
        </Popover>
      ),
    },
    {
      title: 'төхөөрөмжийн нэршил',
      dataIndex: 'device',
      key: 'device',
      render: (_, record) => <>{record?.device?.title}</>,
    },
    {
      title: 'Лаборатори хариуцагч',
      dataIndex: 'laborant',
      key: 'laborant',
      render: (_, record) => (
        <Popover
          content={
            <>
              <div className={style.flex}>
                <div>Овог:</div>
                <div>{record?.laboratory?.teacher?.last_name}</div>
              </div>
              <div className={style.flex}>
                <div>Нэр:</div>
                <div>{record?.laboratory?.teacher?.first_name}</div>
              </div>
              <div className={style.flex}>
                <div>Утас:</div>
                <div>{record?.laboratory?.teacher?.phone}</div>
              </div>
              <div className={style.flex}>
                <div>email:</div>
                <div>{record?.laboratory?.teacher?.email}</div>
              </div>
            </>
          }
          title="Багшийн мэдээлэл"
          trigger="click"
        >
          <a>{record?.laboratory?.teacher?.first_name}</a>
        </Popover>
      ),
    },
    {
      title: 'Төлөв',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '150px',
          }}
        >
          <Tag color={text === 'approved' ? 'success' : text === 'declined' ? 'error' : 'warning'}>
            {text === 'approved' ? 'Баталгаажсан' : null}
            {text === 'declined' ? 'Цуцлагдсан' : null}
            {text === 'pending' ? 'Хүлээгдэж байна' : null}
          </Tag>
          <Popconfirm
            title="Захиалга устгах"
            description="Хүлээгдэж буй захиалгыг устгахдаа итгэлтэй байна уу??"
            onConfirm={() =>
              dispatch(deleteUserRequest({ _id: record?._id })).then((d) => {
                if (d?.payload?.success) {
                  dispatch(getUserRequest({ pageSize: 0, pageNum: 0 }));
                }
              })
            }
            okText="Устгах"
            cancelText="Цуцлах"
          >
            <div style={{ color: 'red', cursor: 'pointer' }}>{record?.status === 'pending' ? 'устгах' : null}</div>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const dispatch = useAppDispatch();
  const { requests } = useAppSelector((state) => state.userRequestReducer);
  useEffect(() => {
    dispatch(getUserRequest({ pageSize: 0, pageNum: 0 }));
  }, []);
  return <Table style={{ padding: '20px' }} dataSource={requests} columns={columns} />;
};

export default Index;
