// JS
animateBlock(e) {
	var mainDiv = e.currentTarget
	var { x: rectX, y: rectY } = mainDiv.getBoundingClientRect()
	var wrapperCircle = mainDiv.getElementsByClassName('wrapperCircle')[0]
	var coords = { x: e.clientX, y: e.clientY }

	var circle = document.createElement('div')
	circle.classList.add('animatedCircle')

	var width = 1, height = 1
	circle.style.width = width + 'px'
	circle.style.height = height + 'px'
	circle.style.background = '#7bc2fb'
	circle.style.borderRadius = '50%'

	wrapperCircle.style.position = 'absolute'
	wrapperCircle.style.top = (coords.y - rectY) - (height / 2) + 'px'
	wrapperCircle.style.left = (coords.x - rectX) - (width / 2) + 'px'

	if(wrapperCircle.children.length > 2) {
		wrapperCircle.removeChild(wrapperCircle.firstChild)
	}

	wrapperCircle.appendChild(circle)
}

// HTML
<div className={classes.falseButton} onClick = {(e) => this.animateBlock(e)}>
	<h3>Кнопка</h3>
	<div className='wrapperCircle'></div>
</div>
	
// CSS
falseButton : {
	position: 'relative',
	height: '50px',
    width: '250px',
    borderBottom: '1px solid #0066b8',
    overflow: 'hidden',
    '&:hover': {
		borderBottom: '2px solid #0066b8',
        cursor: 'pointer'
	},
    color: '#0066b8',
    textAlign: 'center',
    '& h3': {
        position: 'relative',
        zIndex: 100
    },
    '& .wrapperCircle': {
        zIndex: 1
    }
},
.animatedCircle {
    opacity: 0;
    animation: scaleCircle .6s linear;
}

@keyframes scaleCircle {
    0% {
        transform: scale(1);
    }
    10% {
        opacity: 0.1;
        transform: scale(5);
    }
    20% {
        opacity: 0.2;
        transform: scale(15);
    }
    30% {
        opacity: 0.3;
        transform: scale(35);
    }
    40% {
        opacity: 0.4;
        transform: scale(50);
    }
    50% {
        opacity: 0.5;
        transform: scale(100);
    }
    60% {
        opacity: 0.5;
        transform: scale(150);
    }
    70% {
        opacity: 0.4;
        transform: scale(200);
    }
    80% {
        opacity: 0.3;
        transform: scale(250);
    }
    85% {
        opacity: 0.2;
        transform: scale(260);
    }
    90% {
        opacity: 0.15;
        transform: scale(270);
    }
    95% {
        opacity: 0.1;
        transform: scale(280);
    }
    99% {
        opacity: 0.05;
        transform: scale(290);
    }
    100% {
        opacity: 0.01;
        transform: scale(300);
    }
}