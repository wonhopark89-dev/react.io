import React, { Component } from 'react';

class ScrollBox extends Component {

    scrollToBottom = () => {
        const { scrollHeight, clientHeight } = this.box;
        // 비구조화 할당 
        // const scrollHeight = this.box.scrollHeight;
        // const clientHeight = this.box.clientHeight;
        this.box.scrollTop = scrollHeight - clientHeight;
    }

	render() {
		const style = {
			border: '1px solid black',
			height: '300px',
			width: '300px',
			overflow: 'auto',
			position: 'relative',
		};

		const innerStyle = {
			width: '100%',
			height: '650px',
			background: 'linear-gradient(white,red)',
		};

		return (
			<div style={style} ref={(tomato) => (this.box = tomato)}>
				<div style={innerStyle} />
			</div>
		);
	}
}

export default ScrollBox;
