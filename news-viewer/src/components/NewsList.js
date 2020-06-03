import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
	box-sizing: border-box;
	padding-bottom: 3rem;
	width: 768px;
	margin: 0 auto;
	margin-top: 2rem;
	@media screen and (max-width: 768px) {
		width: 100%;
		padding-left: 1rem;
		padding-right: 1rem;
	}
`;

const sampleArticle = {
	title: '제목',
	description: '내용',
	url: 'https://google.com',
	urlToImage: 'https://via.placeholder.com/160',
};

const NewsList = ({ category }) => {
	const [loading, response, error] = usePromise(() => {
		const query = category === 'all' ? '' : `&category=${category}`;
		return axios.get(
			`http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=9cafd8de3cb8480883e96b303c4fea59`,
		);
	}, [category]);

	// 대기중일때
	if (loading) {
		return <NewsListBlock>대기 중...</NewsListBlock>;
	}

	// 아직 데이터가 설정되지 않았을 때
	if (!response) {
		return null;
	}

	// 에러가 발생했을 때
	if (error) {
		return <NewsListBlock>에러 발생...</NewsListBlock>;
	}

	// 데이터가 유효할 때
	const { articles } = response.data;
	return (
		<NewsListBlock>
			{articles.map((tomato) => (
				<NewsItem key={tomato.url} article={tomato} />
			))}
		</NewsListBlock>
	);
};

export default NewsList;
