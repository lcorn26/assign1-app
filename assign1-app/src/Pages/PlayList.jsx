import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, Layout, Table, Button, Row, Col, Form, Input, Card, Select } from 'antd';
import {
    HeartTwoTone,
    DeleteTwoTone
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Option } = Select;
export const playsList = () => {
    const navigate = useNavigate();
    const [isLaoded, setIsloaded] = useState(false);
    const [playsList, setPlaysList] = useState(JSON.parse(localStorage.getItem("playsList")));
    const [allplaysList, setAllplaysList] = useState(JSON.parse(localStorage.getItem("playsList")));
    const [favouriteList, setFavouriteList] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        if (!playsList) {
            fetch('https://randyconnolly.com/funwebdev/3rd/api/shakespeare/list.php')
                .then(function (response) {
                    localStorage.setItem('playsList', JSON.stringify(response.data));
                    setPlaysList(response.data);
                    setAllplaysList(response.data);
                })
        }
        setIsloaded(true);
    }, [])

    const markToFavourite = (row) => {
        setFavouriteList(prevArray => [...prevArray, row]);
        setPlaysList(playsList.filter(plays => plays.id !== row.id));
    }

    const unmarkToFavourite = (row) => {
        setPlaysList(prevArray => [row, ...prevArray]);
        setFavouriteList(favouriteList.filter(plays => plays.id !== row.id));
    }
    const onViewDetails = (row) => {
        localStorage.setItem("playDetails", JSON.stringify(row));
        navigate("/play-details/"+row.id);
    }
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Year',
            dataIndex: 'likelyDate',
        },
        {
            title: '',
            dataIndex: 'address',
            render: (text, row, index) => {
                return <div>
                    <Button type="primary" icon={<HeartTwoTone />} onClick={() => markToFavourite(row)} />
                    <Button onClick={() => onViewDetails(row)}> View </Button>
                </div>
            },
        },
    ];
    const favouritesColumns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Year',
            dataIndex: 'likelyDate',
        },
        {
            title: '',
            dataIndex: 'address',
            render: (text, row, index) => {
                return <div>
                    <Button type="primary" icon={<DeleteTwoTone />} onClick={() => unmarkToFavourite(row)} />
                </div>
            },
        },
    ];

    const onFilter = (value) => {
        console.log(value)
        let FilteredData = [];
        if(value.title){
            let titleData = allplaysList.filter(play => play.title.includes(value.title));
            console.log(titleData);
            FilteredData.push(titleData);
        }
        if(value.before && value.after){
            let genreData = allplaysList.filter(play => +play.likelyDate < +value.before && +play.likelyDate > +value.after);
            console.log(genreData)
            FilteredData.push(...genreData);
        }
        if(value.after && !value.before){
            let genreData = allplaysList.filter(play => +play.likelyDate > +value.after);
            console.log(genreData)
            FilteredData.push(...genreData);
        }
        if(!value.after && value.before){
            let genreData = allplaysList.filter(play => +play.likelyDate < +value.before);
            console.log(genreData)
            FilteredData.push(...genreData);
        }
        if(value.genre){
            let genreData = allplaysList.filter(play => play.genre === value.genre);
            console.log(genreData)
            FilteredData.push(...genreData);
        }
        //names.filter(name => name.includes('J'))
        console.log(FilteredData)
        setPlaysList(FilteredData)
    }
    return (
        <div>
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><Link to="/">Logo</Link>
                        </Menu.Item>
                        <Menu.Item key="2">About</Menu.Item>
                    </Menu>
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <Row>
                        <Col span={8}>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                                <h1>Favourites</h1>
                                {isLaoded ? <Table pagination={false} dataSource={favouriteList} columns={favouritesColumns} /> : null}
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                                <h1>Play Filters</h1>
                                <Card>
                                    <Form
                                        layout={{
                                            labelCol: { span: 4 },
                                            wrapperCol: { span: 14 },
                                        }}
                                        onFinish={onFilter}
                                        form={form}
                                    >
                                        <Form.Item name="title" label="Title">
                                            <Input placeholder="" />
                                        </Form.Item>
                                        <Form.Item label="Year">
                                            <Row gutter={8}>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name="before"
                                                        label="Before"
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name="after"
                                                        label="After"
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item name="genre" label="Genre">
                                            <Select>
                                                <Option value="comedy">Comedy</Option>
                                                <Option value="tragedy">Tragedy</Option>
                                                <Option value="history">History</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item layout={{
                                            wrapperCol: { offset: 8, span: 16 },
                                        }}>
                                            <Button type="primary" htmlType="submit">Filter</Button>
                                            <Button htmlType="button" onClick={() => {
                                                form.resetFields();
                                            }}>
                                                Clear
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </div>
                        </Col>
                        <Col span={8}> <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                            <h1>List / Matches</h1>
                            {isLaoded ? <Table pagination={false} dataSource={playsList} columns={columns} /> : null}
                        </div></Col>
                    </Row>
                </Content>
            </Layout>
        </div>
    )
}
