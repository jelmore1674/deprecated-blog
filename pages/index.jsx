import { Fragment } from 'react';
import Hero from '../components/hero';
import Head from 'next/head';
import FeaturedPosts from '../components/featured-posts';
import { getFeaturedPosts } from '../lib/posts-util';

export default function HomePage(props) {
	return (
		<Fragment>
			<Head>
				<meta
					httpEquiv='Content-Type'
					content='text/html; charset=UTF-8'
				/>
				<title>Justin Elmore Blog </title>
				<meta
					name='description'
					content='I am a web developer, looking to spread my experiences on my coding journey.'
				/>
			</Head>
			{/* // Hero Section => Present Ourselves */}
			<Hero />
			{/* // Featured Posts Section */}
			<FeaturedPosts posts={props.posts} />
		</Fragment>
	);
}

export function getStaticProps() {
	const featuredPosts = getFeaturedPosts();
	return {
		props: {
			posts: featuredPosts,
		},
		revalidate: 1800,
	};
}
