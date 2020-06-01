import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
	const array = [];
	for (let i = 1; i <= 2500; i++) {
		array.push({
			id: i,
			text: `할 일 ${i}`,
			checked: false,
		});
	}
	return array;
}

const App = () => {
	const [todos, setTodos] = useState(createBulkTodos);

	// 교유값으로 사용될 id
	// ref 를 사용하여 변수 담기
	const nextId = useRef(2501);
	const onInsert = useCallback((text) => {
		const todo = {
			id: nextId.current,
			text,
			checked: false,
		};
		setTodos((todos) => todos.concat(todo));
		nextId.current += 1; // nextId 1씩 더하기
	}, []);

	const onRemove = useCallback((id) => {
		setTodos((todos) => todos.filter((tomato) => tomato.id !== id));
	}, []);

	const onToggle = useCallback((id) => {
		setTodos((todos) =>
			todos.map((tomato) =>
				tomato.id === id ? { ...tomato, checked: !tomato.checked } : tomato,
			),
		);
	}, []);

	return (
		<TodoTemplate>
			<TodoInsert onInsert={onInsert} />
			<TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
		</TodoTemplate>
	);
};

export default App;
