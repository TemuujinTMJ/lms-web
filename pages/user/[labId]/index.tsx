/* eslint-disable max-lines */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Calendar, DateRange } from 'react-date-range';
import ReactPannellum from 'react-pannellum';
import { Button, Card, Carousel, Checkbox, Col, Image, Input, message, Modal, Popover, Radio, Row } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import moment from 'moment';
import { useRouter } from 'next/router';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { config } from '@/boot/config';
import { useAppDispatch, useAppSelector } from '@/modules/hooks';
import {
  postUserDevoceOrders,
  postUserLaboratoryDeviceOrder,
  postUserLaboratorySingle,
} from '@/modules/user/laboratory/laboratory.services';

import style from './index.module.css';

const isValidDate = (dateObject) => {
  return dateObject && new Date(dateObject).toString() !== 'Invalid Date' ? dateObject : null;
};

const { TextArea } = Input;
const Index = () => {
  dayjs.extend(customParseFormat);
  const hours = [
    { hour: '08:00-09:00', value: 0 },
    { hour: '09:00-10:00', value: 1 },
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
  const dateaa = moment();
  const [desc, setDesc] = useState('');
  const isoString = moment(dateaa).startOf('day').toISOString();
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const { laboratory, submitLoading, orders } = useAppSelector((state) => state.userLaboratoryReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [device, setDevice] = useState({ _id: '', title: '' });
  const [value, setValue] = useState('hour');
  const [date, setDate] = useState(new Date());
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
      color: undefined,
      autoFocus: undefined,
      disabled: undefined,
      showDateDisplay: undefined,
    },
  ]);
  const showModal = (dev) => {
    setValue('hour');
    setState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
        color: undefined,
        autoFocus: undefined,
        disabled: undefined,
        showDateDisplay: undefined,
      },
    ]);
    setDate(new Date());
    setDesc('');
    setCheckedList([]);
    setDevice({ _id: dev?._id, title: dev?.title });
    dispatch(postUserDevoceOrders({ device_id: dev?._id, date: isoString, type: 'hour' }));
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (isValidDate(state[0].startDate) && isValidDate(state[0].endDate)) {
      if (value === 'day') {
        dispatch(
          postUserLaboratoryDeviceOrder({
            device_id: device?._id,
            data: convertDateRangeToArray(state[0]),
            description: desc,
            type: 'day',
          }),
        ).then((d) => {
          if (d?.payload?.success) {
            message.success('Хүсэлт амжилттай хадгалагдлаа');
            setIsModalOpen(false);
            dispatch(postUserDevoceOrders({ device_id: device?._id, date: isoString, type: 'day' }));
          }
        });
      } else {
        dispatch(
          postUserLaboratoryDeviceOrder({
            device_id: device?._id,
            data: checkedList.map((num) => ({
              date: moment(date).startOf('day').toISOString(),
              hour: num,
            })),
            description: desc,
            type: 'hour',
          }),
        ).then((d) => {
          if (d?.payload?.success) {
            message.success('Хүсэлт амжилттай хадгалагдлаа');
            setIsModalOpen(false);
            dispatch(postUserDevoceOrders({ device_id: device?._id, date: isoString, type: 'hour' }));
          }
        });
      }
    } else {
      message.warning('Эхлэх болон дуусах өдрийг оруулна уу.');
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [uniqueDates, setUniqueDates] = useState<Date[]>([]);
  useEffect(() => {
    const disDays = [...new Set(orders.map((item) => new Date(moment(item).format('YYYY-MM-DD'))))];
    setUniqueDates(disDays);
  }, [orders]);

  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router?.query?.labId !== undefined) {
      dispatch(postUserLaboratorySingle({ _id: router?.query?.labId }));
    }
  }, [router?.query?.labId]);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setCheckedList(checkedValues);
  };
  function orderFunc(e) {
    setValue(e);
    if (e === 'hour') {
      dispatch(postUserDevoceOrders({ device_id: device?._id, date: isoString, type: 'hour' }));
    } else {
      dispatch(postUserDevoceOrders({ device_id: device?._id, date: isoString, type: 'day' }));
    }
  }
  function onDate(item) {
    setCheckedList([]);
    setDate(item);
    dispatch(
      postUserDevoceOrders({ device_id: device?._id, date: moment(item).startOf('day').toISOString(), type: 'hour' }),
    );
  }
  function convertDateRangeToArray(dateRange: { startDate: Date; endDate: Date }) {
    const { startDate, endDate } = dateRange;
    if (isValidDate(startDate) && isValidDate(endDate)) {
      if (startDate.getTime() >= endDate.getTime()) {
        return [{ date: moment(startDate).startOf('day').toISOString() }];
      }
      const datesArray: { date: string }[] = [];
      for (let datex = startDate; datex.getTime() <= endDate.getTime(); datex.setDate(datex.getDate() + 1)) {
        datesArray.push({ date: moment(datex).startOf('day').toISOString() });
      }
      return datesArray;
    }
    return null;
  }
  return submitLoading ? (
    <></>
  ) : (
    <div style={{ padding: '20px' }}>
      <Row>
        <Col className={style.cols} span={8}>
          <div className={style.col}>
            <div className={style.text}>Сургууль</div>
            <div className={style.card}>{laboratory?.school}</div>
          </div>
        </Col>
        <Col className={style.cols} span={8}>
          <div className={style.col}>
            <div className={style.text}>Лабораторийн ангийн дугаар</div>
            <div className={style.card}>{laboratory?.room}</div>
          </div>
        </Col>
        <Col className={style.cols} span={8}>
          <div className={style.col}>
            <div className={style.text}>Давхар</div>
            <div className={style.card}>{laboratory?.floor}</div>
          </div>
        </Col>
        <Col className={style.cols} span={8}>
          <div className={style.col}>
            <div className={style.text}>Лабораторийн нэршил</div>
            <div className={style.card}>{laboratory?.title}</div>
          </div>
        </Col>
        <Col className={style.cols} span={8}>
          <div className={style.col}>
            <div className={style.text}>Хариуцсан багшийн нэр</div>
            <div className={style.card} style={{ backgroundColor: '#F3EEF4' }}>
              <Popover
                content={
                  <>
                    <div className={style.flex}>
                      <div>Овог:</div>
                      <div>{laboratory?.teacher?.last_name}</div>
                    </div>
                    <div className={style.flex}>
                      <div>Нэр:</div>
                      <div>{laboratory?.teacher?.first_name}</div>
                    </div>
                    <div className={style.flex}>
                      <div>Утас:</div>
                      <div>{laboratory?.teacher?.phone}</div>
                    </div>
                    <div className={style.flex}>
                      <div>email:</div>
                      <div>{laboratory?.teacher?.email}</div>
                    </div>
                  </>
                }
                title="Багшийн мэдээлэл"
                trigger="click"
              >
                <div style={{ cursor: 'pointer' }}>{laboratory?.teacher?.first_name}</div>
              </Popover>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12} className={style.cols}>
          <Carousel autoplay style={{ width: '400px' }}>
            {laboratory?.medias?.map((e, key) => {
              return e?.type === 'image' ? (
                <Image key={key} alt="" width={400} src={`${config.HOST}${e?.path}`} />
              ) : null;
            })}
          </Carousel>
        </Col>
        <Col span={12}>
          {laboratory?.medias?.map((e, key) => {
            return e?.type === 'pano' ? (
              <ReactPannellum key={key} id="1" sceneId="firstScene" imageSource={`${config.HOST}${e?.path}`} />
            ) : null;
          })}
        </Col>
      </Row>
      <h1 style={{ marginLeft: '70px' }}>Төхөөрөмжүүд</h1>
      <Row wrap style={{ margin: '0px 10px 50px 10px' }}>
        {laboratory?.devices?.map((dev, key) => {
          return (
            <Col span={12} className={style.cols} key={key}>
              <Card hoverable title={dev?.title} extra={<Button onClick={() => showModal(dev)}>Захиалах</Button>}>
                <div className={style.device}>
                  <Image key={key} alt="" width={200} height={200} src={`${config.HOST}${dev?.medias[0]?.path}`} />
                  <ul style={{ margin: '0px', width: '300px' }}>
                    <li className={style.list}>
                      <span style={{ fontWeight: '700' }}>- Төхөөрөмж:</span> {dev?.title}
                    </li>
                    <li className={style.list}>
                      <span style={{ fontWeight: '700' }}>- Модел:</span> {dev?.model}
                    </li>
                    <li className={style.list}>
                      <span style={{ fontWeight: '700' }}>- Үйлдвэрлэсэн он:</span>{' '}
                      {moment(dev?.manufacturedDate).format('YYYY-MM-DD')}
                    </li>
                    <li className={style.list}>
                      <span style={{ fontWeight: '700' }}>- Төхөөрөмжийн үнэлгээ:</span> {dev?.price} MNT
                    </li>
                  </ul>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Modal
        title={device?.title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        okText="Захиалах"
        cancelText="Цуцлах"
      >
        <div>
          <Radio.Group value={value} size="large" onChange={(e) => orderFunc(e?.target?.value)}>
            <Radio.Button value="hour">Цагаар</Radio.Button>
            <Radio.Button value="day">Өдрөөр</Radio.Button>
          </Radio.Group>
          <Row style={{ marginTop: '20px', marginBottom: '50px' }}>
            {value === 'day' ? (
              <>
                <Col span={9}>
                  <DateRange
                    minDate={new Date()}
                    editableDateInputs={true}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(item: any) => setState([item?.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                    disabledDates={uniqueDates}
                  />
                </Col>
                <Col span={15}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', border: '1px solid #eeeeee' }}>
                    Ашиглах зорилго:
                  </div>
                  <TextArea
                    style={{ border: 'none', height: '300px', overflow: 'auto' }}
                    value={desc}
                    onChange={(e) => setDesc(e?.target?.value)}
                  />
                </Col>
              </>
            ) : (
              <>
                <Col span={9}>
                  <div
                    style={{
                      border: '1px solid #eeeeee',
                      paddingBottom: '10px',
                    }}
                  >
                    <Calendar onChange={(item) => onDate(item)} date={date} minDate={new Date()} />
                  </div>
                </Col>
                <Col span={8}>
                  <Checkbox.Group onChange={onChange} value={checkedList}>
                    <Row wrap>
                      {hours.map((e, key) => {
                        return (
                          <Col key={key} span={8} className={style.orderCard}>
                            <div>{e?.hour}</div>
                            <Checkbox value={e?.value} disabled={orders.includes(e?.value)}>
                              {orders.includes(e?.value) ? 'Захиалсан' : 'Захиалах'}
                            </Checkbox>
                          </Col>
                        );
                      })}
                    </Row>
                  </Checkbox.Group>
                </Col>
                <Col span={7}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', border: '1px solid #eeeeee' }}>
                    Ашиглах зорилго:
                  </div>
                  <TextArea
                    style={{ border: 'none', height: '300px', overflow: 'auto' }}
                    value={desc}
                    onChange={(e) => setDesc(e?.target?.value)}
                  />
                </Col>
              </>
            )}
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default Index;
