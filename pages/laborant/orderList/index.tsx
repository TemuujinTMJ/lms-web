import React, { useEffect } from 'react';
import { Button, Popconfirm, Popover, Table, Tag } from 'antd';

import { useAppDispatch, useAppSelector } from '@/modules/hooks';
import { getTeacherRequest, postTeacherRequest } from '@/modules/lab/order/order.services';

import style from './userRegister.module.css';

const Index = () => {
  // const hours = [
  //   { hour: '09:00-10:00', value: 0 },
  //   { hour: '08:00-09:00', value: 1 },
  //   { hour: '10:00-11:00', value: 2 },
  //   { hour: '11:00-12:00', value: 3 },
  //   { hour: '12:00-13:00', value: 4 },
  //   { hour: '13:00-14:00', value: 5 },
  //   { hour: '14:00-15:00', value: 6 },
  //   { hour: '15:00-16:00', value: 7 },
  //   { hour: '16:00-17:00', value: 8 },
  //   { hour: '17:00-18:00', value: 9 },
  //   { hour: '18:00-19:00', value: 10 },
  //   { hour: '19:00-20:00', value: 11 },
  // ];
  // function getHourFromValue(value: number): string {
  //   const timeSlot = hours.find((slot) => slot.value === value);
  //   return timeSlot ? timeSlot.hour : '';
  // }
  const columns = [
    {
      title: 'Захиалагчийн нэр',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => <>{record?.user?.first_name}</>,
    },
    {
      title: 'Хэрэглэх төхөөрөмж',
      dataIndex: 'device',
      key: 'device',
      render: (_, record) => <>{record?.device?.title}</>,
    },
    {
      title: 'Захиалгын хугацаа',
      dataIndex: 'date',
      key: 'date',
      render: () => (
        <Popover
          // content={record?.orders.map((d, key) => {
          //   return (
          //     <div
          //       key={key}
          //       style={{
          //         display: 'flex',
          //         flexDirection: 'row',
          //         justifyContent: 'space-between',
          //         width: '200px',
          //       }}
          //     >
          //       <div>{moment(d?.date).format('YYYY-MM-DD')}</div>
          //       <div>{getHourFromValue(d?.hour)}</div>
          //     </div>
          //   );
          // })}
          title="Захиалгын жагсаалт"
          trigger="click"
        >
          <Button>Захиалга харах</Button>
        </Popover>
      ),
    },
    {
      title: 'Лабораторын нэршил',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => <>{record?.laboratory?.title}</>,
    },
    {
      title: 'Тайлбар',
      dataIndex: 'description',
      key: 'description',
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
      title: 'Батгаажуулалт',
      dataIndex: 'delete',
      key: 'delete',
      render: (_, record) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '150px',
          }}
        >
          {record?.status === 'pending' ? (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Popconfirm
                title="Захиалгй цуцлах"
                description="Хүлээгдэж буй захиалгыг цуцлахдаа итгэлтэй байна уу??"
                onConfirm={() => {
                  dispatch(postTeacherRequest({ request_id: record?._id, status: 'declined' })).then((d) => {
                    if (d?.payload?.success) {
                      dispatch(getTeacherRequest({ pageNum: 0, pageSize: 0 }));
                    }
                  });
                }}
                okText="Устгах"
                cancelText="Цуцлах"
              >
                <div style={{ color: 'red', cursor: 'pointer', marginRight: '20px' }}>Цуцлах</div>
              </Popconfirm>
              <Popconfirm
                title="Захиалгй баталгаажуулах"
                description="Хүлээгдэж буй захиалгыг баталгаажуулахдаа итгэлтэй байна уу??"
                onConfirm={() => {
                  dispatch(postTeacherRequest({ request_id: record?._id, status: 'approved' })).then((d) => {
                    if (d?.payload?.success) {
                      dispatch(getTeacherRequest({ pageNum: 0, pageSize: 0 }));
                    }
                  });
                }}
                okText="Баталгаажуулах"
                cancelText="Цуцлах"
              >
                <div style={{ color: 'green', cursor: 'pointer' }}>Баталгаажуулах</div>
              </Popconfirm>
            </div>
          ) : record?.status === 'approved' ? (
            <Tag color="success">Баталгаажсан</Tag>
          ) : (
            <Tag color="error">Цуцлагдсан</Tag>
          )}
        </div>
      ),
    },
  ];
  const dispatch = useAppDispatch();
  const { requests } = useAppSelector((state) => state.teacherRequestReducer);
  useEffect(() => {
    dispatch(getTeacherRequest({ pageNum: 0, pageSize: 0 }));
  }, []);
  return (
    <div>
      <div className={style.header}>
        <div className={style.cards}>
          <div className={style.card} onClick={() => dispatch(getTeacherRequest({ pageNum: 0, pageSize: 0 }))}>
            Захиалгууд
          </div>
          <div
            className={style.card}
            onClick={() => dispatch(getTeacherRequest({ pageNum: 0, pageSize: 0, status: 'approved' }))}
          >
            Баталгаажуулсан захиалга харах
          </div>
          <div
            className={style.card}
            onClick={() => dispatch(getTeacherRequest({ pageNum: 0, pageSize: 0, status: 'declined' }))}
          >
            Цуцалсан захиалга
          </div>
        </div>
      </div>
      <Table dataSource={requests} columns={columns} />
    </div>
  );
};

export default Index;
