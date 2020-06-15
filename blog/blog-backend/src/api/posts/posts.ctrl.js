let postId = 1; // id 초기값

// posts 배열 초기 데이터
const posts = [
	{
		id: 1,
		title: '제목',
		body: '내용',
	},
];

/**
 * 포스트 작성
 * POST /api/posts
 * { title, body }
 */
exports.write = (ctx) => {
	// REST API 의 request body 는 ctx.request.body 에서 조회할 수 있습니다.
	const { title, body } = ctx.request.body;
	postId += 1; // 기존 postId 값에 1을 더합니다.
	const post = { id: postId, title, body };
	posts.push(post);
	ctx.body = post;
};

/**
 * 포스트 목록 조회
 * GET /api/posts
 */
exports.list = (ctx) => {
	ctx.body = posts;
};

/**
 * 특정 포스트 조회
 * GET /api/posts/:id
 */
exports.read = (ctx) => {
	const { id } = ctx.params;
	// 주어진 id 값으로 포스트를 찾음
	// 파라미터로 받아온 값은 문자열 형식이라 숫자로 바꿔주거나
	// 비교할 값을 문자열로 변경해야함
	const post = posts.find((p) => p.id.toString() === id);
	// 포스트가 없으면 오류를 반환
	if (!post) {
		ctx.status = 404;
		ctx.body = {
			message: '포스트가 존재하지 않습니다.',
		};
		return;
	}
	ctx.body = post;
};

/**
 * 특정 포스트 제거
 * DELETE /api/posts/:id
 */
exports.remove = (ctx) => {
	const { id } = ctx.params;
	// 해당 id 를 가진 post 가 몇 번째 인지 확인함
	const index = posts.findIndex((p) => p.id.toString() === id);
	// 포스트가 없으면 오류를 반환함
	if (index === -1) {
		ctx.status = 404;
		ctx.body = {
			message: '포스트가 존재하지 않습니다.',
		};
		return;
	}
	// index 번째 아이템을 제거함
	posts.splice(index, 1);
	ctx.status = 204; // No Content
};

/**
 * 포스트 수정(교체)
 * PUT /api/posts/:id
 * { title, body }
 */

exports.replace = (ctx) => {
	// PUT 메서드는 전체 포스트 정보를 입력하여 데이터를 통째로 교체할 때 사용함
	const { id } = ctx.params;
	// 해당 id 를 가진 post 가 몇번째인지 확인 =
	const index = posts.findIndex((p) => p.id.toString() === id);
	// 포스트가 없으면 오류를 반환
	if (index === -1) {
		ctx.status = 404;
		ctx.body = {
			message: '포스트가 존재하지 않습니다.',
		};
		return;
	}
	// 전체 객체를 덮어 씌웁니다.
	// 따라서 id를 제외한 기존정보를 날리고, 객체를 새로 만듭닌다.
	posts[index] = {
		id,
		...ctx.request.body,
	};

	ctx.body = posts[index];
};

/**
 * 포스트 수정(특정 필드 변경)
 * PATCH /api/posts/:id
 * { title, body }
 */
exports.update = (ctx) => {
	// PATCH 메서드는 주어진 필드만 교체합니다.
	const { id } = ctx.params;
	// 해당 id 를 가진 post 가 몇번째인지 확인
	const index = posts.findIndex((p) => p.id.toString() === id);
	// 포스트가 없으면 오류를 반환
	if (index === -1) {
		ctx.status = 404;
		ctx.body = {
			message: '포스트가 존재하지 않습니다.',
		};
		return;
	}
	// 기존 값에 정보를 덮어 씌웁니다.
	posts[index] = {
		...posts[index],
		...ctx.request.body,
	};
	ctx.body = posts[index];
};
