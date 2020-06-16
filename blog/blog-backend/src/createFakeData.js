import Post from './models/post';

export default function createFakeData() {
	const posts = [...Array(40).keys()].map((index) => ({
		title: `포스트 #${index}`,
		// https://www.libsum.com 에서 복사한 200자 이상의 텍스트
		body:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		tags: ['가짜', '데이터'],
	}));

	Post.insertMany(posts, (err, docs) => {
		console.log(docs);
	});
}
