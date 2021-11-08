import React,  { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { Form, Input, Button, Row, Col } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export const Home = () => {
    const navigate = useNavigate();
    const [isLaoded, setIsloaded] = useState(false);
    const [movieList, setMovieList] = useState([]);
    useEffect(() => {
        axios.get('https://randyconnolly.com/funwebdev/3rd/api/shakespeare/list.php')
            .then(function (response) {
                localStorage.setItem('movieList', JSON.stringify(response.data));
                setMovieList(response.data);
            })
        setIsloaded(true);
    }, [])
    const onFinish = (value) => {
        let FilteredData = [];
        if(value.title){
            let titleData = movieList.filter(movie => movie.title.includes(value.title));
            console.log(titleData);
            FilteredData.push(...titleData);
        }
        localStorage.setItem('movieList', JSON.stringify(FilteredData));
        navigate("/movie-list");
    }
    return (
        <div>
            <Row justify="space-around" align="middle">
                <Col span={12}>
                    <h1>Play Browser</h1>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="title"
                        >
                            <Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item>
                            <Row justify="space-around">
                                <Col span={8}>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Show Matching Plays
                                    </Button>
                                </Col>
                                <Col span={8} offset={8}>
                                    <Link to={"/movie-list"}><Button type="primary" htmlType="button" className="login-form-button">
                                        Show All Plays
                                    </Button></Link>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}
