import React, { useRef, useState } from 'react';
import Card from '../UI/Card';
import classes from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

const AddUser = (props) => {
	// useState VS useRef
	// 값만 읽고 싶다면? 아무것도 바꿀 계획이 없다면? ======> ref
	// state를 키 로그 기록용으로 사용하는 건 별로 좋지 않음(불필요한 코드와 작업이 많다)
	// 단, DOM을 조작한다는 상당히 예외적인 일을 해야함 (ex) 초기화 시 nameInputRef.current.value = '')
	// 아래의 예시에서 useState -> 제어된 컴포넌트(모든 입력 상황에 state로 관리) / useRef -> 제어되지않는 컴포넌트(DOM요소.. 리액트로 제어X)
	const nameInputRef = useRef();
	const ageInputRef = useRef();
	// const [enteredUsername, setEnteredUsername] = useState('');
	// const [enteredUserage, setEnteredUserage] = useState('');
	const [error, setError] = useState();

	const addUserHandler = (event) => {
		// submit 이벤트 발생 시 기존으로 페이지가 리로드되는 현상 방지
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredAge = ageInputRef.current.value;

		// validation
		if (!enteredName || !enteredAge) {
			setError({
				title: 'Invalid input',
				message: 'Please enter a value',
			});
			return;
		}
		if (Number(enteredAge) < 1) {
			setError({
				title: 'Invalid age',
				message: 'Please enter a valid age (>0)',
			});
			return;
		}

		// 부모 컴포넌트에 입력값 전달
		props.onAddUser(enteredName, enteredAge);

		// 입력값 빈문자열로 초기화
		nameInputRef.current.value = '';
		ageInputRef.current.value = '';
		// setEnteredUsername('');
		// setEnteredUserage('');
	};

	// const usernameChangeHandler = (event) => {
	// 	setEnteredUsername(event.target.value);
	// };

	// const ageChangeHandler = (event) => {
	// 	setEnteredUserage(event.target.value);
	// };

	const errorHandler = () => {
		setError(null);
	};

	return (
		<>
			{/* 조건부로 JSX요소 렌더링 : error가 있으면 랜더링 */}
			{error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
			<Card className={classes.input}>
				{/* addUserHandler 괄호X -> 코드가 파싱되었을 때 바로 동작하지 않도록 */}
				{/* 대신, 포인터를 함수의 onSubmit 속성에 전달해서 필요할 때마다(폼이 제출될 때) 함수를 호출하도록 함 */}
				<form onSubmit={addUserHandler}>
					{/* for는 class와 마찬가지로 JSX에서 사용할 수 없음(JS 예약어), 대신 htmlFor라는 props에 for의 속성 할당 */}
					{/* 어떤 레이블이 어떤 input에 속하는지 */}
					<label htmlFor='username'>Username</label>
					{/* value를 통한 양방향 바인딩 -> 사용자 입력값을 설정할 수 있음 */}
					<input
						id='username'
						type='text'
						// value={enteredUsername} onChange={usernameChangeHandler}
						ref={nameInputRef}
					/>
					<label htmlFor='age'>Age</label>
					<input
						id='age'
						type='number'
						// value={enteredUserage} onChange={ageChangeHandler}
						ref={ageInputRef}
					/>
					<Button type='submit' onClick={addUserHandler}>
						Add User
					</Button>
				</form>
			</Card>
		</>
	);
};

export default AddUser;
