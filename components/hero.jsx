import Image from 'next/image';

import classes from './hero.module.css';

export default function Hero() {
	return (
		<section className={classes.hero}>
			<div className={classes.image}>
				<Image
					src='/images/site/profile.jpg'
					alt='image showing Justin'
					width={300}
					height={300}
				/>
			</div>
			<h1>Hey, I am Justin!</h1>
			<p>
				I am a full stack web developer and I like to blog about things
				I have learned.
			</p>
		</section>
	);
}
