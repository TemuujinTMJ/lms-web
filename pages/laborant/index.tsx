import React, { useEffect } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { Table } from 'antd';
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

import { useAppDispatch, useAppSelector } from '@/modules/hooks';
import {
  getTeacherHomeChart,
  getTeacherHomePie,
  getTeacherHomeTable,
  getTeacherLabUsage,
} from '@/modules/lab/dashboard/dashboard.services';

import style from './index.module.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const Index = () => {
  const { activeDevices, mostDevices, labUsages, activeOrders, requestedDevices } = useAppSelector(
    (state) => state.teacherHomeReducer,
  );
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1);
  const endDate = new Date(today.getFullYear() + 1, 0, 1);
  const numMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;

  const result = Array(numMonths).fill(0);
  mostDevices.forEach((d) => {
    const month = new Date(d.month);
    const index = (month.getFullYear() - startDate.getFullYear()) * 12 + (month.getMonth() - startDate.getMonth());
    result[index] += d.value;
  });
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTeacherHomeChart({}));
    dispatch(getTeacherHomePie({}));
    dispatch(getTeacherHomeTable({ pageNum: 0, pageSize: 0 }));
    dispatch(getTeacherLabUsage({}));
  }, []);
  const columns = [
    {
      title: 'Нэр',
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
      title: 'Тайлбар',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Дуусах хугацаа',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: '2022-2023 оны Лаборатори ашигласан байдал',
      },
    },
  };
  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Хэрэглэгдэж буй төхөөрөмжийн мэдээлэл',
      },
    },
  };
  const data = {
    labels: ['Ашиглагдаж байгаа төхөөрөмж', 'Хүсэлт илгээсэн төхөөрөмж', 'Ашиглагдаж байгаа төхөөрөмж'],
    datasets: [
      {
        label: 'тоо ширхэг',
        data: [activeDevices, requestedDevices, activeOrders],
        backgroundColor: ['#605CFF', '#FFF', '#ff0000'],
      },
    ],
  };

  const dataLine = {
    labels,
    datasets: [
      {
        label: 'Төхөөрөмж',
        data: result,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <>
      <div className={style.row}>
        <div style={{ width: '400px' }}>
          <Doughnut options={options2} data={data} />
        </div>
        <div style={{ width: '700px' }}>
          <Line options={options} data={dataLine} />
        </div>
      </div>
      <Table dataSource={labUsages} columns={columns} />
    </>
  );
};

export default Index;
