/* eslint-disable max-lines */
import * as React from 'react';
import { useEffect } from 'react';
import ReactPannellum from 'react-pannellum';
import { Card, Carousel, Col, Image, Popover, Row } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import moment from 'moment';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { config } from '@/boot/config';
import { useAppDispatch, useAppSelector } from '@/modules/hooks';
import { getTeacherLaboratory, postTeacherLaboratorySingle } from '@/modules/lab/laboratory/laboratory.services';

import style from './index.module.css';

const Index = () => {
  dayjs.extend(customParseFormat);

  const { laboratory, submitLoading } = useAppSelector((state) => state.userLaboratoryReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getTeacherLaboratory({
        pageSize: 0,
        pageNum: 0,
      }),
    ).then((c) => {
      if (c.payload.success) {
        const lab = c.payload.laboratories.filter((labo) => labo.teacher._id === c.payload.userId);
        dispatch(postTeacherLaboratorySingle({ _id: lab[0]._id }));
      }
    });
  }, []);

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
              <Card hoverable title={dev?.title}>
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
    </div>
  );
};

export default Index;
