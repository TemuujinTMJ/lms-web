import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Doughnut, Line } from 'react-chartjs-2';
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
import moment from 'moment';
import Image from 'next/image';

import 'react-calendar/dist/Calendar.css';

import { getAdminHome, getAdminHomeChart, getAdminHomePie } from '@/modules/admin/dashboard/dashboard.services';
import { useAppDispatch, useAppSelector } from '@/modules/hooks';

import style from './index.module.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const Admin = () => {
  const [date, setDate] = useState(new Date());
  const dispatch = useAppDispatch();
  const { users, requests, devices, loading, activeDevices, requestedDevices, mostDevices } = useAppSelector(
    (state) => state.adminHomeReducer,
  );
  useEffect(() => {
    dispatch(getAdminHome({}));
    dispatch(getAdminHomeChart({}));
    dispatch(getAdminHomePie({ date: new Date().toISOString() }));
  }, []);
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
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };
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
  const dataLine = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: result,
        borderColor: 'rgba(0, 0, 0, 0.267)',
        backgroundColor: 'rgba(0, 0, 0, 0.262)',
      },
    ],
  };

  const data = {
    labels: ['Ашиглагдаж байгаа', 'Захиалгатай', 'Ашиглагдаагүй'],
    datasets: [
      {
        label: 'тоо ширхэг',
        data: [activeDevices, requestedDevices, devices - activeDevices],
        backgroundColor: ['#605CFF', '#FF69B4', '#FFF'],
      },
    ],
  };
  return loading ? (
    <></>
  ) : (
    <>
      <div className={style.row}>
        <div style={{ width: '660px' }}>
          <Line options={options} data={dataLine} />
        </div>
        <div className={style.card}>
          <div className={style.item}>
            <Image src="/icons/people.png" width={70} height={70} alt="" />
            <div className={style.count}>{users}</div>
            <div style={{ fontSize: '18px' }}>Хэрэглэгч</div>
          </div>
          <div className={style.item}>
            <Image src="/icons/graphic.png" width={70} height={70} alt="" />
            <div className={style.count}>{requests}</div>
            <div style={{ fontSize: '18px' }}>Нийт захиалга</div>
          </div>
          <div className={style.item}>
            <Image src="/icons/device.png" width={70} height={70} alt="" />
            <div className={style.count}>{devices}</div>
            <div style={{ fontSize: '18px' }}>Төхөөрөмжийн тоо</div>
          </div>
        </div>
      </div>
      <div className={style.row}>
        <div style={{ width: '300px' }}>
          <Doughnut options={options} data={data} />
        </div>
        <div className={style.calendar}>
          <div className={style.schedule}>
            <div className={style.day}>
              <div className={style.month}>
                <div>{moment().format('MM')} сарын</div>
                <div>{moment().format('YYYY')}</div>
              </div>
              {moment().format('DD')}
            </div>
            <div className={style.list}>test</div>
            <div className={style.list}>title</div>
            <div className={style.title}>SCHEDULE</div>
            <div className={style.list}>
              <div>08:00 - 22:00</div>
              <div>Ажлын цаг</div>
            </div>
            <div className={style.list}>
              <div>02:00 - 03:00</div>
              <div>Цайны цаг</div>
            </div>
            <div className={style.list}>
              <div>12:00 - 12:30</div>
              <div>Хурлын цаг</div>
            </div>
            <div className={style.list}>
              <div>22:00 - 08:00</div>
              <div>Амралтын цаг</div>
            </div>
          </div>
          <Calendar onChange={setDate} value={date} />
        </div>
      </div>
    </>
  );
};

export default Admin;
