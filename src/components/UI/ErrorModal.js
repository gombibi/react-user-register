import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import Card from './Card';
import classes from './ErrorModal.module.css';

const Backdrop = (props) => {
	return <div className={classes.backdrop} onClick={props.onConfirm} />;
};
const ModalOverlay = (props) => {
	return (
		<Card className={classes.modal}>
			<header className={classes.header}>
				<h2>{props.title}</h2>
			</header>
			<div className={classes.content}>
				<p>{props.message}</p>
			</div>
			<footer className={classes.actions}>
				<Button onClick={props.onConfirm}>OK</Button>
			</footer>
		</Card>
	);
};

const ErrorModal = (props) => {
	return (
		<React.Fragment>
			{/* 리액트 포털을 사용해서 backdrop과 modal을 body의 직계 자식이 되도록 함. */}
			{/* 포털에 필요한 두가지
			1. 컴포넌트를 이동시킬 장소 -> index.html - root 위로
			2. 컴포넌트에게 그 곳에 포털을 가져야 한다고 알려줘야 함*/}
			{/* createPortal(1. 렌더링되어야 하는 리액트 노드, 2. 포인터) */}
			{/* DOM API (ex)document.getElementById()) 로 실제 DOM 요소에 접근; 명시적 사용 */}
			{/* ===> 아무리 다른 요소에 깊숙히 둘러싸여 있어도 Body의 직접적인 자식으로 할 수 있음 */}
			{ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById('backdrop-root'))}
			{ReactDOM.createPortal(<ModalOverlay title={props.title} message={props.message} onConfirm={props.onConfirm} />, document.getElementById('overlay-root'))}
		</React.Fragment>
	);
};

export default ErrorModal;
