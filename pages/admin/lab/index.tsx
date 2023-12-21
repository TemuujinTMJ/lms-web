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
    title: 'Лабораторийн нэршил',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Лабораторийн ангийн дугаар',
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
        <a>
          {record?.teacher?.last_name} {record?.teacher?.first_name}
        </a>
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

// ... (existing imports)

const Index = () => {
  const { loadingLab, labUsages } = useAppSelector((state) => state.adminHomeReducer);
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = React.useState('');
  const [searchCategory, setSearchCategory] = React.useState('room');

  useEffect(() => {
    dispatch(getAdminLabUsage({ pageNum: 0, pageSize: 0 }));
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleCategoryChange = (value) => {
    setSearchCategory(value);
    setSearchText(''); // Clear the search text when the category changes
  };

  const filteredLabUsages = labUsages.filter((item) => {
    if (searchCategory === 'teacher') {
      // Handle teacher search separately
      const teacherInfo = item.teacher || {};
      const teacherFullName = `${teacherInfo.first_name} ${teacherInfo.last_name}`.toLowerCase();

      return (
        teacherFullName.includes(searchText.toLowerCase()) ||
        teacherInfo.phone.includes(searchText.toLowerCase()) ||
        teacherInfo.email.includes(searchText.toLowerCase())
      );
    }

    // Handle other search categories
    const valueToSearch =
      typeof item[searchCategory] === 'string'
        ? item[searchCategory].toLowerCase()
        : String(item[searchCategory]).toLowerCase();

    return valueToSearch.includes(searchText.toLowerCase());
  });

  return (
    <div>
      <div className={style.header}>
        <div>
          <Select
            defaultValue="room"
            style={{ width: 300 }}
            onChange={handleCategoryChange}
            options={[
              { value: 'room', label: 'Лабораторийн ангийн дугаараар' },
              { value: 'teacher', label: 'Хариуцсан багшийн мэдээллээр' },
              { value: 'title', label: 'Лабораторийн нэршилээр' },
            ]}
          />
        </div>
        <Input placeholder="Хайх" style={{ width: '200px' }} onChange={(e) => handleSearch(e.target.value)} />
      </div>
      <Table dataSource={filteredLabUsages} columns={columns} loading={loadingLab} />
    </div>
  );
};

export default Index;
