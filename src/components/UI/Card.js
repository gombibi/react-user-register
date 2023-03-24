import React from 'react';
import classes from './Card.module.css';

const Card = (props) => {
	return (
		// CSS Module 사용(classes) -> 고유한 클래스명 자동 생성 -> div에 할당
		// props를 통해 잠재적으로 외부에서 들어오는 클래스 적용, 템플릿 리터럴을 통해 동적으로 추가
		<div className={`${classes.card} ${props.className}`}>{props.children}</div>
	);
};

export default Card;
